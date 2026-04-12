# ============================================================
# database.py — Tracks seen jobs to avoid duplicate notifications
# ============================================================

import sqlite3
from datetime import datetime
from config import DB_PATH


def get_connection():
    return sqlite3.connect(DB_PATH)


def init_db():
    """Create the database and tables if they don't exist."""
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS seen_jobs (
            id          TEXT PRIMARY KEY,
            title       TEXT,
            company     TEXT,
            link        TEXT,
            score       INTEGER,
            reason      TEXT,
            notified_at TEXT
        )
    """)
    conn.commit()
    print(f"[DB] Initialized database at {DB_PATH}")
    return conn


def is_new_job(conn, job_link: str) -> bool:
    """Return True if this job has NOT been seen before."""
    row = conn.execute(
        "SELECT 1 FROM seen_jobs WHERE id = ?", (job_link,)
    ).fetchone()
    return row is None


def save_job(conn, job: dict, score: int, reason: str):
    """Save a matched job to the database."""
    conn.execute(
        """
        INSERT OR IGNORE INTO seen_jobs
            (id, title, company, link, score, reason, notified_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            job["link"],
            job["title"],
            job["company"],
            job["link"],
            score,
            reason,
            datetime.now().isoformat()
        )
    )
    conn.commit()


def get_all_jobs(conn) -> list:
    """Return all saved jobs, newest first."""
    rows = conn.execute(
        "SELECT title, company, score, reason, link, notified_at FROM seen_jobs ORDER BY notified_at DESC"
    ).fetchall()
    return [
        {
            "title":       r[0],
            "company":     r[1],
            "score":       r[2],
            "reason":      r[3],
            "link":        r[4],
            "notified_at": r[5]
        }
        for r in rows
    ]


if __name__ == "__main__":
    # Quick test — run: python database.py
    conn = init_db()
    print("[DB] Test: inserting dummy job")
    save_job(
        conn,
        {"title": "Test Job", "company": "TestCo", "link": "https://example.com/job/999"},
        score=85,
        reason="Strong Python and Docker match"
    )
    jobs = get_all_jobs(conn)
    print(f"[DB] Total jobs saved: {len(jobs)}")
    print(jobs[0])
