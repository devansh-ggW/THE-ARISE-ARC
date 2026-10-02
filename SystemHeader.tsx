import { useArcState } from '../hooks/useArcState';
import { arcs } from '../data/system';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function SystemHeader() {
  const { state, isDayDone } = useArcState();
  const activeArc = arcs.find((arc) => state.activeDay >= arc.start && state.activeDay <= arc.end) ?? arcs[0];
  const completeInArc = Array.from({ length: activeArc.end - activeArc.start + 1 }, (_, index) => activeArc.start + index).filter(isDayDone).length;
  return <div className="system-route-header"><div className="container"><div className="system-route-header__top"><span>THE ARISE ARC / PRIVATE TO THIS BROWSER</span><Link to="/">Back to overview <ArrowRight size={13} /></Link></div><div className="system-route-header__arc"><span className="system-kicker">ARC {activeArc.numeral} / {activeArc.start}—{activeArc.end}</span><strong>{activeArc.name}</strong><p>{activeArc.aim}</p><div className="system-route-header__progress" role="progressbar" aria-label={`Progress in Arc ${activeArc.name}`} aria-valuenow={completeInArc} aria-valuemin={0} aria-valuemax={activeArc.end - activeArc.start + 1}><i style={{ width: `${completeInArc / (activeArc.end - activeArc.start + 1) * 100}%` }} /></div></div></div></div>;
}
