import json
import re
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import extract_text_from_pdf
from .ai import analyze_resume


def extract_json(text):
    try:
        text = text.replace("```json", "").replace("```", "").strip()

        match = re.search(r'\{.*\}', text, re.DOTALL)

        if match:
            return json.loads(match.group())
        else:
            return {"error": "No JSON found", "raw": text}

    except Exception:
        return {"error": "JSON parse failed", "raw": text}


@api_view(['POST'])
def analyze(request):
    try:
        print("🔥 API HIT")

        resume = request.FILES.get('resume')
        job_description = request.data.get('job_description')

        if not resume or not job_description:
            return Response({"error": "Missing data"}, status=400)

        resume_text = extract_text_from_pdf(resume)

        print("📄 Resume Text:", resume_text[:200])

        ai_response = analyze_resume(resume_text, job_description)

        if isinstance(ai_response, dict):
            return Response(ai_response)

        parsed = extract_json(ai_response)

        return Response(parsed)

    except Exception as e:
        print("❌ ERROR:", str(e))
        return Response({"error": str(e)}, status=500)