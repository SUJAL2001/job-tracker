# ============================================================
# notifier.py — Sends email and/or Telegram notifications
# ============================================================

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import (
    NOTIFY_EMAIL, SENDER_EMAIL, SENDER_PASSWORD,
    TELEGRAM_ENABLED, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
)


# ---- Email ----
def send_email(job: dict, score: int, reason: str, skills_matched: list, skills_missing: list):
    """Send an HTML email notification for a matched job."""
    subject = f"✅ Job Match ({score}%): {job['title']} at {job['company']}"

    matched_html = "".join(f"<li>✅ {s}</li>" for s in skills_matched) or "<li>—</li>"
    missing_html = "".join(f"<li>❌ {s}</li>" for s in skills_missing) or "<li>—</li>"

    body = f"""
    <html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color:#2c7be5;">🎯 New Job Match Found!</h2>
        <table style="border-collapse:collapse; width:100%;">
            <tr><td style="padding:8px;"><b>Company</b></td><td>{job['company']}</td></tr>
            <tr style="background:#f8f9fa;"><td style="padding:8px;"><b>Role</b></td><td>{job['title']}</td></tr>
            <tr><td style="padding:8px;"><b>Match Score</b></td>
                <td><span style="font-size:1.3em; font-weight:bold; color:#2c7be5;">{score}%</span></td></tr>
            <tr style="background:#f8f9fa;"><td style="padding:8px;"><b>AI Summary</b></td><td>{reason}</td></tr>
        </table>

        <h3 style="margin-top:20px;">Skills You Have ✅</h3>
        <ul>{matched_html}</ul>

        <h3>Skills to Brush Up ❌</h3>
        <ul>{missing_html}</ul>

        <p style="margin-top:20px;">
            <a href="{job['link']}" style="
                background:#2c7be5; color:white; padding:10px 20px;
                text-decoration:none; border-radius:5px; font-weight:bold;">
                View Job Posting →
            </a>
        </p>
        <hr/>
        <p style="color:#888; font-size:0.8em;">Sent by your Job Tracker automation.</p>
    </body></html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"]    = SENDER_EMAIL
    msg["To"]      = NOTIFY_EMAIL
    msg.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        print(f"[Notifier] Email sent: {subject}")
    except Exception as e:
        print(f"[Notifier] Email ERROR: {e}")


# ---- Telegram ----
def send_telegram(job: dict, score: int, reason: str):
    """Send a Telegram message notification for a matched job."""
    if not TELEGRAM_ENABLED:
        return

    try:
        import requests
        text = (
            f"🎯 *New Job Match ({score}%)*\n\n"
            f"*{job['title']}* at *{job['company']}*\n"
            f"_{reason}_\n\n"
            f"[View Job]({job['link']})"
        )
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        resp = requests.post(url, json={
            "chat_id":    TELEGRAM_CHAT_ID,
            "text":       text,
            "parse_mode": "Markdown"
        }, timeout=10)
        if resp.ok:
            print(f"[Notifier] Telegram sent: {job['title']}")
        else:
            print(f"[Notifier] Telegram ERROR: {resp.text}")
    except Exception as e:
        print(f"[Notifier] Telegram ERROR: {e}")


# ---- Combined notifier ----
def notify(job: dict, match_result: dict):
    """Send all enabled notifications for a matched job."""
    score          = match_result.get("score", 0)
    reason         = match_result.get("reason", "")
    skills_matched = match_result.get("skills_matched", [])
    skills_missing = match_result.get("skills_missing", [])

    send_email(job, score, reason, skills_matched, skills_missing)
    send_telegram(job, score, reason)
