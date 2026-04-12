# ============================================================
# resume_parser.py — Extracts text from your resume PDF
# ============================================================

import pdfplumber

def parse_resume(pdf_path: str) -> str:
    """Extract all text from a PDF resume."""
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        print(f"[Resume] Extracted {len(text)} characters from {pdf_path}")
    except FileNotFoundError:
        print(f"[Resume] ERROR: File not found — {pdf_path}")
        raise
    except Exception as e:
        print(f"[Resume] ERROR reading resume: {e}")
        raise
    return text.strip()


if __name__ == "__main__":
    # Quick test — run: python resume_parser.py
    from config import RESUME_PATH
    text = parse_resume(RESUME_PATH)
    print("\n--- Resume Preview (first 500 chars) ---")
    print(text[:500])
