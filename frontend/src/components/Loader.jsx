import { useState, useEffect } from 'react';

const MESSAGES = [
  "Scanning resume...",
  "Matching keywords...",
  "Generating insights...",
  "Almost done..."
];

export default function Loader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-1 font-mono text-[var(--accent)] tracking-tight">
      <span>{MESSAGES[index]}</span>
      <span className="blink text-xl">█</span>
    </div>
  );
}
