import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { arcs, days } from '../data/system';
import { Eyebrow, SectionHeading } from '../components/Primitives';

export function JourneyPreview() {
  const [activeArc, setActiveArc] = useState(0);
  const selected = arcs[activeArc];
  const arcDays = days.filter((day) => day.arc === selected.id);
  return <section className="section section--warm" id="journey">
    <div className="container"><SectionHeading number="05" kicker="THE 60-DAY JOURNEY" title={<>A route, not a<br />grid of boxes.</>} copy="Each day carries a clear intention. Move at a human pace; the map is there to orient you, not rush you." />
      <div className="journey-visual">
        <div className="journey-visual__rail" aria-hidden="true"><span /></div>
        <div className="journey-visual__arcs" role="tablist" aria-label="Choose an arc to preview">
          {arcs.map((arc, index) => <button key={arc.id} role="tab" aria-selected={activeArc === index} onClick={() => setActiveArc(index)} className={activeArc === index ? 'is-active' : ''}>
            <span className="journey-visual__roman">{arc.numeral}</span><span className="journey-visual__name">{arc.name}</span><span className="journey-visual__range">{arc.start}—{arc.end}</span>
          </button>)}
        </div>
        <div className="journey-visual__detail" role="tabpanel"><div><Eyebrow>ARC {selected.numeral} / DAYS {selected.start}—{selected.end}</Eyebrow><h3>{selected.name.toLowerCase()} the next step.</h3><p>{selected.aim} {selected.feeling}</p></div><div className="journey-visual__nodes" aria-label={`${arcDays.length} day markers in Arc ${selected.numeral}`}>{arcDays.map((day) => <span key={day.day} title={`Day ${day.day}: ${day.objective}`} aria-hidden="true">{String(day.day).padStart(2, '0')}</span>)}</div></div>
        <div className="journey-visual__footer"><span>01 / BEGIN WHERE YOU ARE</span><span>60 / CONTINUE BEYOND THE GUIDE</span></div>
      </div>
      <div className="journey-cta"><p>Progress is recorded by actions—not by perfect weeks.</p><a className="text-link" href="/system">Open the 60-day map <ArrowRight size={15} /></a></div>
    </div>
  </section>;
}
