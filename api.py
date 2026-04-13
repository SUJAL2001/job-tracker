# api.py — FastAPI server, sits on top of existing pipeline
# Run with: uvicorn api:app --reload --port 8000

from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import threading

from config        import COMPANIES, MATCH_THRESHOLD, RESUME_PATH
from database      import init_db, get_all_jobs, get_jobs_filtered, get_company_list, is_new_job, save_job
from scraper       import fetch_jobs
from matcher       import match_job
from resume_parser import parse_resume
from notifier      import notify
from excel_logger  import log_job_to_excel


# ── Shared state ──────────────────────────────────────────────────────────────

db_conn = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_conn
    db_conn = init_db()       # reuse your existing init_db()
    yield
    db_conn.close()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],   # Vite dev server
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Job routes ────────────────────────────────────────────────────────────────

@app.get("/api/jobs")
def get_jobs(company: str = None, role: str = None):
    """Return saved jobs, optionally filtered."""
    return get_jobs_filtered(db_conn, company=company, role=role)


@app.get("/api/companies")
def get_companies():
    """Return distinct company names for the filter dropdown."""
    return get_company_list(db_conn)


@app.get("/api/stats")
def get_stats():
    """Summary numbers for the dashboard header."""
    all_jobs = get_all_jobs(db_conn)
    return {
        "total":    len(all_jobs),
        "matched":  len([j for j in all_jobs if j["score"] >= MATCH_THRESHOLD]),
        "companies": len(set(j["company"] for j in all_jobs)),
    }


# ── Manual refresh ────────────────────────────────────────────────────────────

def _run_pipeline_once():
    """Runs your existing pipeline logic in a background thread."""
    resume_text = parse_resume(RESUME_PATH)
    for company in COMPANIES:
        jobs = fetch_jobs(company)
        for job in jobs:
            if not is_new_job(db_conn, job["link"]):
                continue
            result = match_job(resume_text, job)
            score  = result.get("score", 0)
            save_job(db_conn, job, score, result.get("reason", ""))
            if score >= MATCH_THRESHOLD:
                notify(job, result)
                log_job_to_excel(job, result)

@app.post("/api/refresh")
def trigger_refresh(background_tasks: BackgroundTasks):
    """Manually trigger a scrape from the UI — runs in background."""
    background_tasks.add_task(_run_pipeline_once)
    return {"status": "refresh started"}


# ── Resume match route ────────────────────────────────────────────────────────

@app.post("/api/match")
async def match_uploaded_resume(file: UploadFile = File(...)):
    """
    Upload a PDF resume → get all saved jobs ranked by match score.
    Does NOT save to DB, just returns scores for display.
    """
    content      = await file.read()
    resume_text  = parse_resume(content)        # pass bytes directly
    all_jobs     = get_all_jobs(db_conn)

    results = []
    for job in all_jobs[:30]:                   # cap at 30 to avoid Gemini overuse
        result = match_job(resume_text, job)
        results.append({
            **job,
            "match_score":   result.get("score", 0),
            "match_reason":  result.get("reason", ""),
            "skills_matched": result.get("skills_matched", []),
            "skills_missing": result.get("skills_missing", []),
        })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results


# ── Salary / levels.fyi ───────────────────────────────────────────────────────

@app.get("/api/levels-url")
def levels_embed_url(company: str, track: str = "Software Engineer"):
    """Build the levels.fyi embed URL for the frontend iframe."""
    return {
        "url": f"https://www.levels.fyi/charts_embed.html"
               f"?company={company}&track={track}&hide_selector=false"
    }