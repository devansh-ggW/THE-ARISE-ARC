import { useEffect, useState } from 'react';
import { Check, Save } from 'lucide-react';
import { Eyebrow } from '../components/Primitives';
import { useArcState, weekKey } from '../hooks/useArcState';

const prompts = [
  ['improved', 'WHAT IMPROVED?'],
  ['failed', 'WHAT FAILED?'],
  ['distracted', 'WHAT DISTRACTED ME?'],
  ['inconsistent', 'WHAT CAUSED INCONSISTENCY?'],
  ['proud', 'WHAT AM I PROUD OF?'],
  ['adjustment', 'WHAT NEEDS ADJUSTMENT?'],
  ['focus', "NEXT WEEK'S FOCUS:"],
  ['standard', 'STANDARD I WILL PROTECT:'],
] as const;

export function WeeklyCheckpoint() {
  const { state, saveCheckpoint } = useArcState();
  const week = weekKey();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => setAnswers(state.reflections[week] ?? {}), [state.reflections, week]);
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const alreadyRewarded = state.checkpointWeeks.includes(week);
    window.setTimeout(() => {
      saveCheckpoint(week, answers);
      setSaving(false);
      setStatus(alreadyRewarded ? 'Reflection updated on this device.' : 'Checkpoint recorded. +100 XP. Your notes stay in this browser.');
    }, 250);
  };
  return <section className="system-panel checkpoint-panel" id="checkpoint" aria-labelledby="checkpoint-heading">
    <div className="system-panel__heading"><div><Eyebrow number="16">WEEKLY CHECKPOINT / PRIVATE</Eyebrow><h2 id="checkpoint-heading">Keep what works. Adjust what doesn’t.</h2></div><span className="checkpoint-week">{week}</span></div>
    <p className="system-panel__intro">A short review is not a verdict. Use it to change the next week so it fits the life you have.</p>
    <form onSubmit={submit}>
      <div className="checkpoint-fields">{prompts.map(([id, label]) => <label key={id} className={id === 'focus' || id === 'standard' ? 'checkpoint-field checkpoint-field--wide' : 'checkpoint-field'}><span>{label}</span><textarea value={answers[id] ?? ''} onChange={(event) => setAnswers((previous) => ({ ...previous, [id]: event.target.value }))} rows={2} maxLength={1000} aria-label={label} /></label>)}</div>
      <div className="checkpoint-footer"><p>Your responses are saved locally in this browser. They are not sent to ARISE ARC.</p><button className="system-action" type="submit" disabled={saving}>{saving ? 'SAVING…' : state.checkpointWeeks.includes(week) ? 'UPDATE CHECKPOINT' : 'SAVE CHECKPOINT'} {status ? <Check size={14} /> : <Save size={14} />}</button></div>
      {status && <p className="form-status" role="status">{status}</p>}
    </form>
  </section>;
}
