# matcher.py — using Google Gemini (free tier)

import json
import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")  # free and fast


def match_job(resume_text: str, job: dict) -> dict:
    prompt = f"""
You are an expert technical recruiter and resume analyst.

Below is a candidate's resume and a job posting. Your task is to:
1. Score how well the resume matches the job from 0 to 100.
2. Give a short reason for the score.
3. List skills/experience from the job that the resume covers.
4. List skills/experience from the job that the resume is missing.

Respond ONLY with valid JSON in this exact format (no extra text, no markdown):
{{
  "score": <integer 0-100>,
  "reason": "<one or two sentence summary>",
  "skills_matched": ["skill1", "skill2"],
  "skills_missing": ["skill3", "skill4"]
}}

--- RESUME ---
{resume_text[:3000]}

--- JOB TITLE ---
{job.get('title', 'N/A')}

--- JOB DESCRIPTION ---
{job.get('description', 'N/A')[:2000]}
"""

    try:
        response = model.generate_content(prompt)
        raw = response.text.strip()

        # Strip markdown fences if present
        raw = raw.replace("```json", "").replace("```", "").strip()
        result = json.loads(raw)

        result.setdefault("score", 0)
        result.setdefault("reason", "No reason provided.")
        result.setdefault("skills_matched", [])
        result.setdefault("skills_missing", [])

        return result

    except json.JSONDecodeError as e:
        print(f"[Matcher] JSON parse error: {e}")
        return {"score": 0, "reason": "Could not parse AI response.", "skills_matched": [], "skills_missing": []}
    except Exception as e:
        print(f"[Matcher] API error: {e}")
        return {"score": 0, "reason": f"API error: {e}", "skills_matched": [], "skills_missing": []}


if __name__ == "__main__":
    from resume_parser import parse_resume
    from config import RESUME_PATH

    resume = parse_resume(RESUME_PATH)
    sample_job = {
        "title": "Backend Software Engineer",
        "description": "We are looking for a Python developer with experience in REST APIs, Docker, and AWS.",
        "company": "TestCo",
        "link": "https://example.com/job/1"
    }
    result = match_job(resume, sample_job)
    print(f"Score: {result['score']}")
    print(f"Reason: {result['reason']}")
    print(f"Matched: {result['skills_matched']}")
    print(f"Missing: {result['skills_missing']}")