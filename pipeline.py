# ============================================================
# main.py — Orchestrates the full job-tracking pipeline
# ============================================================
# Run once:       python main.py
# Run on schedule: it will loop automatically every N hours
# ============================================================

import schedule
import time
from datetime import datetime

from config        import COMPANIES, MATCH_THRESHOLD, CHECK_INTERVAL_HOURS, RESUME_PATH
from resume_parser import parse_resume
from scraper       import fetch_jobs
from matcher       import match_job
from notifier      import notify
from database      import init_db, is_new_job, save_job
from excel_logger  import log_job_to_excel


def run_pipeline(resume_text: str, conn):
    print(f"\n{'='*55}")
    print(f"  Job Tracker — Run started at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*55}")

    total_found    = 0
    total_matched  = 0
    total_notified = 0

    for company in COMPANIES:
        print(f"\n[Pipeline] Checking {company['name']} ...")
        jobs = fetch_jobs(company)
        total_found += len(jobs)

        for job in jobs:
            # Skip already-seen jobs
            if not is_new_job(conn, job["link"]):
                continue

            # AI matching
            print(f"  Matching: {job['title']}")
            result = match_job(resume_text, job)
            score  = result.get("score", 0)

            print(f"  → Score: {score}% | {result.get('reason', '')[:80]}")

            # Save regardless (so we don't re-check it)
            save_job(conn, job, score, result.get("reason", ""))

            if score >= MATCH_THRESHOLD:
                total_matched  += 1
                notify(job, result)
                log_job_to_excel(job, result)
                total_notified += 1

    print(f"\n[Pipeline] Done. Found: {total_found} | New matches: {total_matched} | Notified: {total_notified}")
    print(f"[Pipeline] Next run in {CHECK_INTERVAL_HOURS} hour(s).\n")


def main():
    print("[Main] Starting Job Tracker...")

    # Load resume once
    resume_text = parse_resume(RESUME_PATH)

    # Initialize DB
    conn = init_db()

    # Run immediately on start
    run_pipeline(resume_text, conn)

    # Schedule recurring runs
    schedule.every(CHECK_INTERVAL_HOURS).hours.do(
        run_pipeline, resume_text=resume_text, conn=conn
    )

    print(f"[Main] Scheduled to run every {CHECK_INTERVAL_HOURS} hour(s). Press Ctrl+C to stop.")
    while True:
        schedule.run_pending()
        time.sleep(60)


if __name__ == "__main__":
    main()