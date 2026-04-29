import { useState, useCallback } from 'react';
import Loader from '../components/Loader';
import ResultsPanel from '../components/ResultsPanel';
import axios from "axios";

export default function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setError(null);
    } else {
      setError("Only PDF files are supported.");
    }
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const handleSubmit = async () => {
    if (!resumeFile || !jobDesc) {
      setError("Please provide both a resume and a job description.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_description', jobDesc);

    try {
      const res = await axios.post(
        "https://9150-117-99-136-85.ngrok-free.app/api/analyze/",
        formData
      );

      console.log(res.data);

      // 👇 Backend ka actual response set karo
      setResult(res.data);

    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false); // ✅ ADD THIS
    }
  }

  const reset = () => {
    setResumeFile(null);
    setJobDesc('');
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="grid-bg" />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* HEADER */}
        <header className="scanline text-center space-y-4 py-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--surface2)] border border-[var(--border)] rounded text-[var(--matched)] mono text-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--matched)] shadow-[0_0_8px_var(--matched)] blink" />
            [ SYSTEM ONLINE ]
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">
            <span className="gradient-text">ResumeIQ</span>
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-lg mx-auto">
            AI-powered resume scanner. Beat the algorithm.
          </p>
        </header>

        {!result ? (
          <div className="space-y-8 animate-fade-up delay-1">
            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* UPLOAD ZONE */}
              <div className="card p-2">
                <div
                  className={`upload-zone h-full min-h-[300px] ${dragging ? 'dragging' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => handleFile(e.target.files[0])}
                  />

                  {!resumeFile ? (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full border-2 border-[var(--border)] flex items-center justify-center mx-auto text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-lg">Upload Resume</p>
                        <p className="text-sm text-[var(--text-muted)]">Drag and drop or click to browse</p>
                      </div>
                      <p className="text-[10px] mono text-[var(--text-muted)] uppercase tracking-widest">PDF ONLY</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 animate-fade-up">
                      <div className="w-16 h-16 rounded-full bg-[var(--matched)]/20 border-2 border-[var(--matched)] flex items-center justify-center mx-auto text-[var(--matched)]">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-[var(--accent)]">{resumeFile.name}</p>
                        <p className="text-sm text-[var(--text-muted)] mono">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                        className="text-xs text-[var(--missing)] hover:underline mono"
                      >
                        [ REMOVE ]
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* JOB DESCRIPTION */}
              <div className="card p-6 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <label className="mono text-xs text-[var(--text-muted)] uppercase tracking-widest">Job Description</label>
                  <span className="mono text-[10px] text-[var(--text-muted)]">{jobDesc.length} characters</span>
                </div>
                <textarea
                  className="flex-grow w-full bg-black/40 border border-[var(--border)] rounded-lg p-4 mono text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] resize-none transition-all"
                  placeholder="Paste job requirements here..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>
            </div>

            {/* ERROR BOX */}
            {error && (
              <div className="bg-[var(--missing)]/10 border border-[var(--missing)] p-4 rounded-lg flex items-center gap-3 animate-fade-up">
                <span className="text-[var(--missing)] text-xl leading-none">⚠</span>
                <p className="text-[var(--missing)] font-medium text-sm">{error}</p>
              </div>
            )}

            {/* ANALYZE BUTTON */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading || !resumeFile || !jobDesc}
                className="btn-primary w-full h-[64px]"
              >
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <span className="text-xl">▶</span>
                    <span>RUN ANALYSIS</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <ResultsPanel result={result} onReset={reset} />
        )}
      </div>
    </div>
  );
}
