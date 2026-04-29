import { useEffect, useState } from 'react';

export default function ResultsPanel({ result, onReset }) {
  const [animate, setAnimate] = useState(false);
  const score = result.match_score || result.ats_match_percentage || 0;

  useEffect(() => {
    setAnimate(true);
  }, []);

  const getScoreColor = (s) => {
    if (s >= 75) return 'var(--matched)';
    if (s >= 50) return '#FBBF24'; // Yellow
    return 'var(--missing)';
  };

  const getBadge = (s) => {
    if (s >= 75) return "STRONG MATCH";
    if (s >= 50) return "PARTIAL MATCH";
    return "LOW MATCH";
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* ATS SCORE CARD */}
      <div className="card p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-baseline gap-2 justify-center md:justify-start">
            <span className="text-7xl font-bold font-space" style={{ color: scoreColor }}>
              {score}
            </span>
            <span className="text-2xl text-[var(--text-muted)]">/ 100</span>
          </div>
          <div className="mono text-sm tracking-widest px-3 py-1 bg-white/5 rounded border border-white/10">
            {getBadge(score)}
          </div>
        </div>

        <div className="relative w-40 h-40 flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-full"
            style={{ 
              background: `conic-gradient(${scoreColor} ${score}%, var(--border) 0%)`,
              transition: 'all 1s ease-out'
            }}
          />
          <div className="absolute inset-4 rounded-full bg-[var(--surface)] shadow-inner" />
          <div className="z-10 mono text-xs text-[var(--text-muted)]">ATS SCORE</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: animate ? `${score}%` : '0%',
            backgroundColor: scoreColor,
            boxShadow: `0 0 10px ${scoreColor}`
          }}
        />
      </div>

      {/* SKILLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="mono text-[var(--matched)] text-sm tracking-tighter flex items-center gap-2">
            ✓ MATCHED
          </h3>
          <div className="flex flex-wrap gap-3">
            {result.matched_skills?.map((skill, i) => (
              <span key={i} className="tag-badge skill-matched">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--matched)] shadow-[0_0_5px_var(--matched)]" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="mono text-[var(--missing)] text-sm tracking-tighter flex items-center gap-2">
            ✕ MISSING
          </h3>
          <div className="flex flex-wrap gap-3">
            {result.missing_skills?.map((skill, i) => (
              <span key={i} className="tag-badge skill-missing">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--missing)] shadow-[0_0_5px_var(--missing)]" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="card p-6 space-y-6">
        <h3 className="mono text-[var(--accent)] text-sm uppercase tracking-widest flex items-center gap-2">
          &gt; RECOMMENDATIONS
        </h3>
        <div className="relative pl-8 space-y-8">
          <div className="absolute left-3.5 top-2 bottom-2 w-[1px] bg-[var(--border)]" />
          {result.suggestions?.map((rec, i) => (
            <div key={i} className="relative flex items-start gap-4 animate-fade-up" style={{ animationDelay: `${0.1 * i}s` }}>
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              </div>
              <div className="flex-shrink-0 w-8 h-8 rounded bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center font-bold text-xs">
                {i + 1}
              </div>
              <p className="text-[var(--text)] leading-relaxed text-sm pt-1">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RESET BUTTON */}
      <div className="flex justify-center pt-8">
        <button onClick={onReset} className="btn-outline min-w-[240px]">
          [ RUN NEW SCAN ]
        </button>
      </div>
    </div>
  );
}
