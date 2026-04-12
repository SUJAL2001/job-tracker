# 🎯 Job Tracker Automation

Automatically scrapes company career portals, matches jobs against your resume using AI, and notifies you of relevant opportunities.

---

## 📁 Project Structure

```
job-tracker/
├── main.py            # Entry point — runs the full pipeline
├── config.py          # ⚙️  YOUR SETTINGS GO HERE
├── scraper.py         # Fetches job listings from career pages
├── resume_parser.py   # Reads your resume PDF
├── matcher.py         # AI-based job ↔ resume matching (Claude API)
├── notifier.py        # Sends email / Telegram alerts
├── database.py        # SQLite — tracks seen jobs
├── requirements.txt   # Python dependencies
└── resume.pdf         # ← PUT YOUR RESUME HERE
```

---

## 🚀 Setup (5 steps)

### 1. Install Python dependencies
```bash
pip install -r requirements.txt
playwright install chromium
```

### 2. Add your resume
Copy your resume PDF into the project folder and name it `resume.pdf`  
(or change `RESUME_PATH` in `config.py`)

### 3. Edit `config.py`
Open `config.py` and fill in:
- `COMPANIES` — list of company career page URLs
- `ANTHROPIC_API_KEY` — get from https://console.anthropic.com
- `NOTIFY_EMAIL` — where to receive job alerts
- `SENDER_EMAIL` + `SENDER_PASSWORD` — Gmail account to send from
- `MATCH_THRESHOLD` — minimum AI score to trigger a notification (default: 70)

### 4. Set up Gmail App Password
1. Go to https://myaccount.google.com/apppasswords
2. Create a new App Password for "Mail"
3. Paste it into `SENDER_PASSWORD` in `config.py`

### 5. Run it!
```bash
python main.py
```

---

## ⚙️ How It Works

```
Your Resume (PDF)
      +
Company Career URLs
      ↓
Scraper fetches job listings every N hours
      ↓
New jobs are compared to your resume using Claude AI
      ↓
Jobs scoring above your threshold → Email / Telegram alert
      ↓
All seen jobs saved to SQLite (no duplicate alerts)
```

---

## 📬 Notifications

### Email
Receive a beautifully formatted HTML email with:
- Job title, company, match score
- AI summary of why it's a match
- Skills you have ✅ and skills to brush up ❌
- Direct link to the job posting

### Telegram (optional)
1. Create a bot via @BotFather on Telegram
2. Get your chat ID from @userinfobot
3. Set `TELEGRAM_ENABLED = True` in `config.py`
4. Fill in `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`

---

## 🛠️ Customizing Scrapers

Each company's career page HTML is different. If no jobs are found:
1. Open the career URL in your browser
2. Right-click a job listing → Inspect Element
3. Find the CSS class names for job cards, titles, and links
4. Update the selectors in `scraper.py`

For JavaScript-rendered pages (React/Angular sites), set `"type": "dynamic"` in your company config.

---

## 💡 Tips

- Run as a background service using `nohup python main.py &` on Linux/Mac
- On Windows, use Task Scheduler or run in a terminal that stays open
- Deploy on a free VPS (Oracle Cloud Free Tier, Railway, Render) to run 24/7
- Increase `MATCH_THRESHOLD` to reduce noise; decrease it to get more alerts

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `anthropic` | Claude AI for resume matching |
| `requests` | HTTP requests for static pages |
| `beautifulsoup4` | HTML parsing |
| `pdfplumber` | PDF text extraction |
| `playwright` | JS-rendered page scraping |
| `schedule` | Recurring job scheduling |
