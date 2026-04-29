import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

def analyze_resume(resume_text, job_description):

    prompt = f"""
    Analyze the resume and job description.

    Resume:
    {resume_text}

    Job Description:
    {job_description}

    Return ONLY JSON:
    {{
      "match_score": number,
      "matched_skills": [],
      "missing_skills": [],
      "suggestions": []
    }}
    """

    # ✅ FIXED ENDPOINT (important)
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

    payload = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    print("STATUS:", response.status_code)
    print("RESPONSE:", response.text)

    try:
        data = response.json()
        return data['candidates'][0]['content']['parts'][0]['text']
    except Exception:
        return {
            "error": "Gemini API failed",
            "raw": response.text
        }