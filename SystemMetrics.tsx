import { ArrowRight, Activity, Check, Flame, RotateCcw, Sparkles } from 'lucide-react';
import { useArcState, type ParticipationKey } from '../hooks/useArcState';
import { levels } from '../data/system';
import { ProgressRing } from '../components/Primitives';

const selfManaged: { key: ParticipationKey; label: string }[] = [
  { key: 'environment', label: 'ENVIRONMENT' },
  { key: 'scrolling', label: 'LESS SCROLLING' },
  { key: 'commitment', label: 'KEPT A COMMITMENT' },
  { key: 'reflection', label: 'HONEST REFLECTION' },
];
const dayKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const localDate = (value: string) => dayKey(new Date(value));

export function SystemOverview() {
  const { state, xpToday, xpTotal, currentLevel, levelProgress, currentStreak, bestStreak, activeness, isDayDone, toggleParticipation } = useArcState();
  const completeDays = Array.from({ length: 60 }, (_, index) => index + 1).filter(isDayDone).length;
  const nextLevel = levels.find((level) => level.level === currentLevel.level + 1) ?? null;
  const today = dayKey();
  const loggedToday = Object.entries(state.questLog).filter(([, item]) => localDate(item.completedAt) === today);
  const activityRows = [
    { label: 'TRAINING', complete: state.trainingDates.includes(today), mode: 'RECORDED' },
    { label: 'MOVEMENT', complete: loggedToday.some(([id]) => id.endsWith('-main')), mode: 'RECORDED' },
    { label: 'QUESTS', complete: loggedToday.length > 0, mode: 'RECORDED' },
    { label: 'FOCUSED WORK', complete: state.focusSessions.some((session) => localDate(session.at) === today) || loggedToday.some(([id]) => id.endsWith('-focus')), mode: 'RECORDED' },
    { label: 'RECOVERY', complete: state.recoveryUpdatedOn === today || loggedToday.some(([id]) => id.endsWith('-recovery')), mode: 'RECORDED' },
    { label: 'SLEEP', complete: state.recoveryUpdatedOn === today && state.recovery.sleep > 0, mode: 'RECORDED' },
  ];
  const checkedToday = state.participation[today] ?? [];
  return <section className="system-overview" aria-label="Your current system position">
    <div className="system-overview__intro"><div><span className="system-kicker">PERSONAL COMMAND / 60 DAYS</span><h1>Keep the next<br /><em>promise.</em></h1><p>Day {String(state.activeDay).padStart(2,'0')} is ready when you are. There is no perfect time to begin.</p></div><div className="system-overview__ring"><ProgressRing value={activeness} max={10} size={116} label="ACTIVENESS" sublabel="OF 10"/><span className="system-overview__definition">Participation in your life.<br />Not calories burned.</span></div></div>
    <div className="system-stats">
      <div className="system-stat"><span>XP TODAY</span><strong>{xpToday.toLocaleString()}</strong><small>earned by completed actions</small></div>
      <div className="system-stat"><span>TOTAL XP</span><strong>{xpTotal.toLocaleString()}</strong><small>your recorded progress</small></div>
      <div className="system-stat"><span>CURRENT LEVEL</span><strong>{String(currentLevel.level).padStart(2,'0')} <i>{currentLevel.name}</i></strong><div className="system-level-bar" role="progressbar" aria-label="Progress to next level" aria-valuenow={levelProgress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${levelProgress}%` }} /></div><small>{nextLevel ? `${(nextLevel.threshold - xpTotal).toLocaleString()} XP to ${nextLevel.name}` : 'Highest level reached'}</small></div>
      <div className="system-stat"><span>CURRENT STREAK</span><strong>{currentStreak}<i> DAYS</i></strong><small><Flame size={12} /> Best: {bestStreak} days</small></div>
      <div className="system-stat"><span>COMEBACKS</span><strong>{state.comebacks.length}</strong><small><RotateCcw size={12} /> returns recorded</small></div>
      <div className="system-stat"><span>60-DAY PATH</span><strong>{completeDays}<i> / 60</i></strong><small><Activity size={12} /> core missions complete</small></div>
    </div>
    <div className="activeness-record"><div className="activeness-record__intro"><span>DAILY ACTIVENESS / {activeness} OF 10</span><p>Participation, not calories. Log the parts of the day the system cannot observe for you. This score is not a reason to add training.</p></div><div className="activeness-record__list" aria-label="Activeness sources">
      {activityRows.map((item) => <span className={`activeness-source${item.complete ? ' is-complete' : ''}`} key={item.label}><i>{item.complete && <Check size={10} />}</i>{item.label}</span>)}
      {selfManaged.map(({ key, label }) => { const checked = checkedToday.includes(key); return <button className={`activeness-source activeness-source--button${checked ? ' is-complete' : ''}`} key={key} type="button" aria-pressed={checked} onClick={() => toggleParticipation(key)}><i>{checked && <Check size={10} />}</i>{label}</button>; })}
    </div></div>
  </section>;
}

export function SystemWarnings() {
  const { state } = useArcState();
  const today = dayKey();
  const warnings: { id: string; title: string; text: string }[] = [];
  if (state.missedSessions >= 2) warnings.push({ id: 'consistency', title: 'CONSISTENCY THREAT DETECTED', text: 'Return to the next planned session at its normal size. Do not punish yourself with extra training.' });
  if (state.recoveryUpdatedOn === today && (state.recovery.sleep < 6 || state.recovery.stress >= 8 || state.recovery.soreness >= 8)) warnings.push({ id: 'recovery', title: 'RECOVERY DEFICIT DETECTED', text: 'Lower today’s demands. Prioritize recovery and use the Floor where it helps.' });
  if (state.focusInterruptions >= 2) warnings.push({ id: 'distraction', title: 'DISTRACTION SPIKE DETECTED', text: 'Remove the immediate distraction and complete one focused block.' });
  if (!warnings.length) return <div className="system-signal system-signal--steady"><Sparkles size={16} /><div><b>SYSTEM STEADY</b><span>Use your readiness, not the calendar, to choose today’s demand.</span></div><a href="#recovery" aria-label="Review recovery"><ArrowRight size={15} /></a></div>;
  return <div className="warning-stack" aria-label="Contextual system recommendations">{warnings.map((warning) => <article className="system-signal system-signal--warning" key={warning.id}><span className="warning-indicator" /><div><b>{warning.title}</b><span>{warning.text}</span></div></article>)}</div>;
}
