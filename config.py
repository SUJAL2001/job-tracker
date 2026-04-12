# ============================================================
# config.py — Edit this file to customize your job tracker
# ============================================================

# ---- Companies to track ----
COMPANIES = [
    {"name": "Amazon",       "url": "https://www.amazon.jobs/en/search",                          "type": "dynamic"},
    {"name": "Microsoft",    "url": "https://jobs.microsoft.com/en-us/search",                    "type": "dynamic"},
    {"name": "Google",       "url": "https://careers.google.com/jobs/results/",                   "type": "dynamic"},
    {"name": "Rippling",     "url": "https://ats.rippling.com/rippling/jobs",                     "type": "dynamic"},
    {"name": "Rubrik",       "url": "https://www.rubrik.com/company/careers",                     "type": "dynamic"},
    {"name": "Salesforce",   "url": "https://careers.salesforce.com/en/jobs/",                    "type": "dynamic"},
    {"name": "AppDynamics",  "url": "https://appdynamics.wd1.myworkdayjobs.com/en-US/careers",    "type": "dynamic"},
    {"name": "Uber",         "url": "https://www.uber.com/us/en/careers/list/",                   "type": "dynamic"},
    {"name": "Atlassian",    "url": "https://www.atlassian.com/company/careers/all-jobs",         "type": "dynamic"},
    {"name": "Stripe",       "url": "https://stripe.com/jobs/search",                             "type": "dynamic"},
    {"name": "Airbnb",       "url": "https://careers.airbnb.com/",                                "type": "dynamic"},
    {"name": "Agoda",        "url": "https://careersatagoda.com/all-jobs/",                       "type": "dynamic"},
    {"name": "Intuit",       "url": "https://jobs.intuit.com/search-jobs",                        "type": "dynamic"},
    {"name": "Nutanix",      "url": "https://jobs.jobvite.com/nutanix",                           "type": "dynamic"},
    {"name": "JP Morgan",    "url": "https://careers.jpmorgan.com/global/en/jobs",                "type": "dynamic"},
    {"name": "Goldman Sachs","url": "https://higher.gs.com/roles",                                "type": "dynamic"},
    {"name": "Adobe",        "url": "https://careers.adobe.com/us/en/search-results",             "type": "dynamic"},
    {"name": "PhonePe",      "url": "https://www.phonepe.com/careers/",                           "type": "dynamic"},
    {"name": "ServiceNow",   "url": "https://careers.servicenow.com/careers/jobs",                "type": "dynamic"},
]

# ---- Matching ----
MATCH_THRESHOLD = 70          # Only notify if AI match score >= this value (0-100)
RESUME_PATH     = "resume.pdf"  # Path to your resume PDF

# ---- Scheduling ----
CHECK_INTERVAL_HOURS = 24    # How often to check for new jobs

# ---- Notification: Email ----
NOTIFY_EMAIL      = "sujalkumardas3@gmail.com"   # Where to send alerts
SENDER_EMAIL      = "your_bot@gmail.com"     # Gmail account used to send
SENDER_PASSWORD   = "your_app_password"      # Gmail App Password (NOT your real password)
                                              # Generate at: myaccount.google.com/apppasswords

# ---- Notification: Telegram (optional) ----
TELEGRAM_ENABLED  = False
TELEGRAM_BOT_TOKEN = "your_bot_token"        # From @BotFather on Telegram
TELEGRAM_CHAT_ID   = "your_chat_id"          # Your personal chat ID

# ---- Gemini API ----
GEMINI_API_KEY = "AIzaSyA_fiapXaWP5setfZE7WmVl_1IYhd9QFoA"

# ---- Database ----
DB_PATH = "jobs.db"
