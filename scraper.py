# ============================================================
# scraper.py — Fetches job listings from company career pages
# ============================================================
# NOTE: Each company's HTML structure is different.
# The selectors below are examples — you may need to inspect
# the actual page and adjust them per company.
# For JS-heavy pages, set "type": "dynamic" in config.py.
# ============================================================

import requests
from bs4 import BeautifulSoup

# ---- Static scraper (requests + BeautifulSoup) ----
def fetch_jobs_static(company: dict) -> list:
    """Fetch jobs from a plain HTML career page."""
    url  = company["url"]
    name = company["name"]
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        )
    }

    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"[Scraper] ERROR fetching {name}: {e}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    jobs = []

    # ----------------------------------------------------------------
    # CUSTOMIZE SELECTORS PER COMPANY
    # Use browser DevTools (F12 → Inspector) to find the right classes.
    # ----------------------------------------------------------------
    job_cards = soup.select(".job-listing, .job-card, article.job, li.job-item")

    if not job_cards:
        print(f"[Scraper] WARNING: No job cards found for {name}. Check selectors.")
        return []

    for card in job_cards:
        try:
            title_el = card.select_one(".job-title, h2, h3, .title")
            link_el  = card.select_one("a")
            desc_el  = card.select_one(".job-description, .description, p")

            title = title_el.get_text(strip=True) if title_el else "Unknown Title"
            link  = link_el["href"] if link_el else url
            desc  = desc_el.get_text(strip=True) if desc_el else ""

            # Make relative URLs absolute
            if link.startswith("/"):
                from urllib.parse import urlparse
                parsed = urlparse(url)
                link = f"{parsed.scheme}://{parsed.netloc}{link}"

            jobs.append({
                "title":       title,
                "link":        link,
                "description": desc,
                "company":     name
            })
        except Exception as e:
            print(f"[Scraper] WARNING: Could not parse a job card for {name}: {e}")
            continue

    print(f"[Scraper] Found {len(jobs)} jobs at {name}")
    return jobs


# ---- Dynamic scraper (Playwright — for JS-rendered pages) ----
def fetch_jobs_dynamic(company: dict) -> list:
    """Fetch jobs from a JavaScript-rendered career page using Playwright."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("[Scraper] Playwright not installed. Run: pip install playwright && playwright install")
        return []

    url  = company["url"]
    name = company["name"]
    jobs = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page    = browser.new_page()
        try:
            page.goto(url, timeout=30000)
            page.wait_for_load_state("networkidle", timeout=15000)

            # ----------------------------------------------------------------
            # CUSTOMIZE SELECTORS FOR DYNAMIC PAGES TOO
            # ----------------------------------------------------------------
            cards = page.query_selector_all(".job-listing, .job-card, article.job")

            for card in cards:
                try:
                    title_el = card.query_selector(".job-title, h2, h3")
                    link_el  = card.query_selector("a")
                    desc_el  = card.query_selector(".description, p")

                    title = title_el.inner_text().strip() if title_el else "Unknown Title"
                    link  = link_el.get_attribute("href") if link_el else url
                    desc  = desc_el.inner_text().strip() if desc_el else ""

                    if link and link.startswith("/"):
                        from urllib.parse import urlparse
                        parsed = urlparse(url)
                        link = f"{parsed.scheme}://{parsed.netloc}{link}"

                    jobs.append({
                        "title":       title,
                        "link":        link or url,
                        "description": desc,
                        "company":     name
                    })
                except Exception as e:
                    print(f"[Scraper] WARNING: Dynamic card parse error for {name}: {e}")
                    continue

        except Exception as e:
            print(f"[Scraper] ERROR (dynamic) for {name}: {e}")
        finally:
            browser.close()

    print(f"[Scraper] Found {len(jobs)} jobs at {name} (dynamic)")
    return jobs


# ---- Main dispatcher ----
def fetch_jobs(company: dict) -> list:
    """Route to static or dynamic scraper based on company config."""
    if company.get("type", "static") == "dynamic":
        return fetch_jobs_dynamic(company)
    return fetch_jobs_static(company)


if __name__ == "__main__":
    # Quick test — run: python scraper.py
    from config import COMPANIES
    for company in COMPANIES[:1]:
        jobs = fetch_jobs(company)
        print(f"\nSample job from {company['name']}:")
        if jobs:
            print(f"  Title: {jobs[0]['title']}")
            print(f"  Link:  {jobs[0]['link']}")
