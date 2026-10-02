import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Button, Eyebrow } from '../components/Primitives';

const pages = [
  { label: 'A NOTE ON THE FLOOR', text: 'When a day gets smaller, your next step can get smaller too.' },
  { label: 'ARC I / WAKE', text: 'A useful baseline tells the truth without turning it into a verdict.' },
  { label: 'WEEKLY CHECKPOINT', text: 'Keep what works. Adjust what does not. Protect one standard.' },
];

export function BookSection() {
  const [page, setPage] = useState(0);
  const [pointer, setPointer] = useState({ x: .5, y: .5, active: false });
  const tilt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({ x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)), y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)), active: true });
  };
  const resetTilt = () => setPointer({ x: .5, y: .5, active: false });
  const rotateY = pointer.active ? -14 + (pointer.x - .5) * 17 : -14;
  const rotateX = pointer.active ? 3 - (pointer.y - .5) * 13 : 2;

  return <section className="section" id="book"><div className="container book-layout">
    <div className="book-scene" aria-label="Interactive three-dimensional guide and selected interior pages">
      <div className="book-glow" aria-hidden="true" style={{ transform: pointer.active ? `translate(${(pointer.x - .5) * 18}px,${(pointer.y - .5) * 14}px)` : undefined }} />
      <div className="book-object" tabIndex={0} aria-label="THE ARISE ARC System Guide cover" style={{ transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) ${pointer.active ? 'translateY(-7px) scale(1.025)' : ''}` }} onPointerMove={tilt} onPointerLeave={resetTilt} onFocus={() => setPointer({ x: .5, y: .5, active: true })} onBlur={resetTilt}>
        <img src="/arise-arc-cover.jpg" alt="The dark gold-and-ivory ARISE ARC — System Guide cover showing a climber looking over mountains toward sunrise" width="1024" height="1536" loading="lazy" />
        <div className="book-reflection" aria-hidden="true" style={{ background: `linear-gradient(${110 + (pointer.x - .5) * 28}deg,transparent 31%,rgba(255,255,255,.25) 45%,transparent 58%)` }} />
      </div>
      <div className="book-pages" aria-label="Selectable sample pages">
        {pages.map((item, index) => <button type="button" key={item.label} className={`book-page${page === index ? ' is-selected' : ''}`} aria-pressed={page === index} aria-label={`Preview page ${index + 1}: ${item.label}`} onClick={() => setPage(index)}><span>{item.label}</span>{item.text}<i aria-hidden="true" /></button>)}
      </div>
    </div>
    <div className="book-copy"><Eyebrow number="14">INTERACTIVE BOOK PREVIEW</Eyebrow><h2>A guide with<br /><em>room to begin.</em></h2><p>The cover carries the cinematic identity. Inside, the system makes space for reflection, practical action and the floor you can keep on a difficult day.</p><div className="book-copy__pages" role="group" aria-label="Select a sample page">{pages.map((item, index) => <button type="button" key={item.label} aria-pressed={page === index} onClick={() => setPage(index)}>PAGE 0{index + 1}</button>)}</div><div className="book-copy__actions"><Button href="/system">Open the system</Button><span><BookOpen size={14} /> A system to use, not just a book to finish</span></div></div>
  </div></section>;
}
