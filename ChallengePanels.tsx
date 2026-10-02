import { useMemo } from 'react';
import { ArrowRight, Check, LockKeyhole, RotateCcw, Shield, ShieldCheck } from 'lucide-react';
import { useArcState } from '../hooks/useArcState';
import { days } from '../data/system';
import { Eyebrow } from '../components/Primitives';

export function ComebackPanel() {
  const { state, logMissedSession, recordComeback } = useArcState();
  const day = state.activeDay;
  const nextAction = days[day - 1]?.objective ?? days[0].objective;
  return <section className="system-panel comeback-panel" id="comeback" aria-labelledby="comeback-heading">
    <div className="system-panel__heading"><div><Eyebrow number="09">COMEBACK PROTOCOL / NO RESTART</Eyebrow><h2 id="comeback-heading">A way back is part of the plan.</h2></div><RotateCcw className="comeback-panel__icon" size={23} /></div>
    <p className="comeback-panel__quote">“Consistency is not never falling off. It is getting better at returning.”</p>
    <div className="comeback-protocol-grid"><div><span className="system-kicker">IF A SESSION WAS MISSED</span><ol><li>Keep the progress you have already made.</li><li>Record the setback without turning it into a verdict.</li><li>Return to the next planned action at its ordinary size—or use the Floor.</li></ol><p className="comeback-next"><b>NEXT APPROPRIATE ACTION</b><span>{nextAction}</span></p></div><div className="comeback-log"><span className="comeback-log__label">SETBACKS RECORDED / {state.missedSessions}</span><p>{state.missedSessions > 0 ? 'There is a next step. Choose it at a size that fits today.' : 'A hard day does not require a setback log. Record one only when you want the system to adjust with you.'}</p><button type="button" className="system-action system-action--quiet" onClick={logMissedSession}>Log a missed session <ArrowRight size={14} /></button>{state.missedSessions > 0 && <button type="button" className="system-action" onClick={recordComeback}>Record my comeback <span>+75 XP</span></button>}{state.comebacks.length > 0 && <div className="comeback-saved" role="status"><Check size={14} /> {state.comebacks.length} {state.comebacks.length === 1 ? 'return' : 'returns'} recorded. Progress preserved.</div>}</div></div>
  </section>;
}

const bosses = [
  { id: 'bed', number: '01', name: 'THE BED', problem: 'You decide the night before. Morning comes; the bed is warm and the plan quietly disappears.', strategy: 'Prepare the night before.', challenge: 'Put both feet on the floor within two minutes of the alarm.', unlock: 0, reward: '+300 XP  ·  +1 DISCIPLINE' },
  { id: 'noise', number: '02', name: 'THE NOISE', problem: 'The task is clear, but every alert offers a reason to leave it.', strategy: 'Remove the immediate distraction.', challenge: 'Complete one focused block with the phone away.', unlock: 7, reward: '+300 XP' },
  { id: 'perfect', number: '03', name: 'ALL OR NOTHING', problem: 'A smaller plan feels like failure, so the whole action gets postponed.', strategy: 'Decide the Floor before the day gets difficult.', challenge: 'Use the Floor on a hard day and record it without adding make-up work.', unlock: 21, reward: '+300 XP' },
];

export function BossPanel() {
  const { state, isDayDone, defeatBoss } = useArcState();
  const finishedDays = useMemo(() => days.filter((day) => isDayDone(day.day)).length, [isDayDone, state.questLog]);
  return <section className="system-panel boss-panel" id="bosses" aria-labelledby="boss-heading">
    <div className="system-panel__heading"><div><Eyebrow number="10">BOSS BATTLES / PATTERNS TO PRACTICE</Eyebrow><h2 id="boss-heading">The obstacle has a counter-move.</h2></div><Shield size={22} className="boss-panel__icon" /></div>
    <p className="system-panel__intro">Bosses are familiar friction—not villains. Unlocks follow recorded practice, not a timer or a streak.</p>
    <div className="boss-list">{bosses.map((boss) => {
      const defeated = state.defeatedBosses.includes(boss.id);
      const locked = finishedDays < boss.unlock;
      return <article className={`boss-card${locked ? ' is-locked' : ''}${defeated ? ' is-defeated' : ''}`} key={boss.id}>
        <div className="boss-card__seal"><span>{boss.number}</span><i /></div>
        <div className="boss-card__content"><div className="boss-card__meta"><Eyebrow>{locked ? 'LOCKED' : defeated ? 'DEFEATED / COMPLETE' : 'ACTIVE'}</Eyebrow><span>{boss.reward}</span></div><h3>{boss.name}</h3><p className="boss-card__problem">{boss.problem}</p><div className="boss-card__plan"><span><b>STRATEGY</b> {boss.strategy}</span><span><b>CHALLENGE</b> {boss.challenge}</span></div>{locked && <small className="boss-card__unlock"><LockKeyhole size={12} /> Record {boss.unlock - finishedDays} more complete {boss.unlock - finishedDays === 1 ? 'day' : 'days'} to activate this battle.</small>}</div>
        <div className="boss-card__action">{defeated ? <span className="boss-card__complete"><ShieldCheck size={16} /> COMPLETE{boss.id === 'bed' ? ` · ${state.discipline} DISCIPLINE` : ''}</span> : <button type="button" className="system-action" disabled={locked} onClick={() => defeatBoss(boss.id)}>{locked ? 'LOCKED' : 'Record defeat'} <ArrowRight size={14} /></button>}</div>
      </article>;
    })}</div>
  </section>;
}
