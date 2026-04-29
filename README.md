# ResumeIQ — AI Resume Analyzer

ResumeIQ is a web application that helps users understand how well their resume matches a specific job description. It uses AI to analyze resumes and provide clear, actionable feedback.

---

## Overview

Most candidates don’t know why their resume gets rejected. ResumeIQ solves this by comparing a resume with a job description and highlighting what works and what’s missing.

The goal is simple: help users improve their resume before they apply.

---

## Features

- Upload resume in PDF format  
- Paste any job description  
- Get an ATS-style match score  
- View matched and missing skills  
- Receive suggestions to improve the resume  

---

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS

**Backend**
- Django REST Framework

**AI**
- Google Gemini API

**Other**
- PyMuPDF (PDF text extraction)
- Axios (API communication)

---

## How It Works

1. The user uploads a resume (PDF)
2. The user provides a job description
3. The backend extracts text from the resume
4. Both inputs are sent to the AI model
5. The AI returns:
   - Match score
   - Skills match
   - Missing skills
   - Suggestions
6. The frontend displays everything in a clean UI

---

## Challenges Faced

- Handling inconsistent AI responses (non-JSON outputs)
- Fixing API model and version issues
- Managing API key security
- Ensuring frontend and backend data consistency

---

## What I Learned

- Integrating AI into a real-world application
- Handling file uploads and parsing PDFs
- Building and connecting a full-stack application
- Debugging API-related issues efficiently

---

## Future Improvements

- Resume editing suggestions in real-time  
- Multiple job comparison  
- User dashboard with history  
- Deployment for public access  

---

## Running Locally

### Frontend
```bash
cd frontend
npm install
npm run dev

### Backend
cd backend
pip install -r requirements.txt
python manage.py runserver

## Backend Status

The backend (Django + Gemini API integration) is fully implemented and was used during the demo.  
It will be pushed to the repository shortly.
