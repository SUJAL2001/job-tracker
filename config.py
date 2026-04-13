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

from dotenv import load_dotenv
import os

load_dotenv()  # loads the .env file automatically

GEMINI_API_KEY    = os.getenv("GEMINI_API_KEY")
NOTIFY_EMAIL      = os.getenv("NOTIFY_EMAIL")
SENDER_EMAIL      = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD   = os.getenv("SENDER_PASSWORD")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID   = os.getenv("TELEGRAM_CHAT_ID")

# These are not secrets, keep them directly here
MATCH_THRESHOLD      = 70
CHECK_INTERVAL_HOURS = 6
RESUME_PATH          = "resume.pdf"
DB_PATH              = "jobs.db"
TELEGRAM_ENABLED     = False

