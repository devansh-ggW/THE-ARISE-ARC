import { Activity, ArrowRight, Moon, MoveUpRight } from 'lucide-react';
import { trainingSessions } from '../data/system';
import { Eyebrow, SectionHeading } from '../components/Primitives';

export function TrainingSection() {
  return <section className="section section--paper" id="training"><div className="container">
    <SectionHeading number="11" kicker="TRAINING / BUILD STRENGTH" title={<>Train with care.<br />Progress can be quiet.</>} copy="Technique and a comfortable range come first. Two foundation sessions give you somewhere practical to begin." />
    <div className="training-preview-grid">{trainingSessions.map((session) => <article className="training-preview" key={session.id}><div><span>SESSION {session.id}</span><h3>{session.name}</h3></div><ul>{session.exercises.map((exercise) => <li key={exercise.id}>{exercise.name}<small>{exercise.dose}</small></li>)}</ul><p>{session.note}</p></article>)}</div>
    <div className="practice-footer"><span><MoveUpRight size={15} /> Gradual progression</span><span><Activity size={15} /> Comfortable technique</span><a href="/system#training" className="text-link">Open training <ArrowRight size={14} /></a></div>
  </div></section>;
}

export function FocusSection() {
  return <section className="section" id="focus"><div className="container focus-editorial">
    <div><Eyebrow number="12">FOCUS / ONE WINDOW</Eyebrow><h2>Give the work<br /><em>a clear edge.</em></h2><p>A 25-minute focus session. One task, one window, phone away. Start, pause, finish—and let the next step be enough.</p><a href="/system#focus" className="text-link">Open focus session <ArrowRight size={14} /></a></div>
    <div className="focus-preview-card"><div className="focus-preview-card__head"><span>FOCUS SESSION</span><span>01 / 25</span></div><div className="focus-preview-clock"><span>25<span>:00</span></span><i /></div><div className="focus-preview-card__rule"><span>ONE TASK</span><span>ONE WINDOW</span><span>PHONE AWAY</span></div><small>PROTECTED TIME / NOT A PRODUCTIVITY SCORE</small></div>
  </div></section>;
}

export function RecoverySection() {
  const signals = ['SLEEP', 'MOBILITY', 'REST DAYS', 'WIND-DOWN', 'STRESS', 'ENERGY'];
  return <section className="section section--warm" id="recovery"><div className="container recovery-editorial">
    <div><Eyebrow number="13">RECOVERY / PART OF THE WORK</Eyebrow><h2>Read the signals.<br /><em>Adjust the demand.</em></h2><p>Recovery is not what you earn after training. Sleep, mobility, rest, wind-down, stress and energy belong in the plan from the start.</p><a href="/system#recovery" className="text-link">View recovery dashboard <ArrowRight size={14} /></a></div>
    <div className="recovery-signal-panel"><div className="recovery-signal-panel__top"><span>READINESS / CHECK IN</span><Moon size={17} /></div><div className="recovery-signal-panel__grid">{signals.map((signal, index) => <div key={signal}><span>0{index + 1}</span><b>{signal}</b><i /></div>)}</div><p>Lower today's demands when the signals ask you to. You do not need to make the work up later.</p><span className="recovery-signal-panel__local">TRACKED BY YOU / STORED LOCALLY</span></div>
  </div></section>;
}
