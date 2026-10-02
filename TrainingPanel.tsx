import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { trainingSessions } from '../data/system';
import { useArcState } from '../hooks/useArcState';
import { Eyebrow } from '../components/Primitives';

export function TrainingPanel() {
  const [active, setActive] = useState(0);
  const { state, toggleTraining } = useArcState();
  const session = trainingSessions[active];
  return <section className="system-panel" id="training" aria-labelledby="training-heading">
    <div className="system-panel__heading"><div><Eyebrow number="10">TRAINING / STEADY OVER EXTREME</Eyebrow><h2 id="training-heading">Movement you can repeat.</h2></div><span className="system-count">{session.exercises.filter((exercise) => state.trainingDone.includes(exercise.id)).length}<i> / 5 LOGGED</i></span></div>
    <p className="system-panel__intro">Good technique and a comfortable range come first. These are general movement examples, not a personal assessment. Reduce or skip anything that does not feel appropriate for you.</p>
    <div className="session-tabs" role="tablist" aria-label="Training session">
      {trainingSessions.map((item, index) => <button key={item.id} role="tab" aria-selected={index === active} onClick={() => setActive(index)}><span>SESSION {item.id}</span><strong>{item.name}</strong></button>)}
    </div>
    <p className="session-note">{session.note}</p>
    <div className="exercise-list">{session.exercises.map((exercise, index) => {
      const done = state.trainingDone.includes(exercise.id);
      return <details className="exercise-card" key={exercise.id}>
        <summary><span className="exercise-card__number">{String(index + 1).padStart(2,'0')}</span><span className="exercise-card__main"><strong>{exercise.name}</strong><small>{exercise.dose}</small></span><span className={`exercise-card__state${done ? ' is-done' : ''}`}>{done ? 'LOGGED' : 'GUIDANCE'}{done ? <Check size={13} /> : <ChevronDown size={13} />}</span></summary>
        <div className="exercise-card__details"><div><span>TECHNIQUE</span><p>{exercise.technique}</p></div><div><span>PROGRESSION</span><p>{exercise.progression}</p></div><div className="exercise-card__safety"><Shield size={14} /><p>{exercise.safety}</p></div><button className="exercise-card__complete" type="button" aria-pressed={done} onClick={() => toggleTraining(exercise.id)}>{done ? 'Marked complete' : 'Mark exercise complete'} {done ? <Check size={14} /> : <ChevronUp size={14} />}</button></div>
      </details>;
    })}</div>
    <p className="panel-local-note">Progress is stored in this browser. A rest day is a training decision, too.</p>
  </section>;
}
