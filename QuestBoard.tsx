import { useArcState } from '../hooks/useArcState';
import { arcs, days, questsForDay, type DayQuest } from '../data/system';
import { Eyebrow } from '../components/Primitives';
import { Check, Clock3, CornerDownRight, ShieldCheck } from 'lucide-react';

const iconTone: Record<DayQuest['type'], string> = { main: 'quest-card--main', side: 'quest-card--side', focus: 'quest-card--focus', recovery: 'quest-card--recovery', bonus: 'quest-card--bonus' };

function QuestCard({ quest }: { quest: DayQuest }) {
  const { isQuestDone, completeQuest } = useArcState();
  const done = isQuestDone(quest.id);
  const floorDone = done && Boolean(useArcState().state.questLog[quest.id]?.floor);
  return <article className={`quest-card ${iconTone[quest.type]}${done ? ' is-done' : ''}`}>
    <div className="quest-card__top"><span className="quest-card__type">{quest.label}</span><span className="quest-card__xp">+{quest.xp} XP</span></div>
    <h3>{quest.title}</h3><p>{quest.detail}</p>
    <div className="quest-card__meta"><span><Clock3 size={13} /> {quest.minutes} MIN</span><span>OBJECTIVE / {quest.type.toUpperCase()}</span></div>
    <div className="quest-card__floor"><CornerDownRight size={14} /><span><b>FLOOR</b> {quest.floor}</span></div>
    {done ? <div className="quest-card__complete" role="status"><Check size={15} /> LOGGED {floorDone ? 'AT THE FLOOR' : 'AS PLANNED'}</div> : <div className="quest-card__actions"><button type="button" onClick={() => completeQuest(quest, false)}>Complete <Check size={14} /></button><button type="button" className="quest-card__floor-action" onClick={() => completeQuest(quest, true)} aria-label={`Complete ${quest.label} using Floor: ${quest.floor}`}>Use Floor</button></div>}
  </article>;
}

export function QuestBoard() {
  const { state, isDayDone } = useArcState();
  const day = days[state.activeDay - 1];
  const arc = arcs[day.arc - 1];
  const quests = questsForDay(day);
  const complete = isDayDone(day.day);
  return <section className="system-panel mission-panel" id="mission" aria-labelledby="mission-heading">
    <div className="system-panel__heading mission-heading"><div><Eyebrow number={`DAY ${String(day.day).padStart(2,'0')}`}>ARC {arc.numeral} / {arc.name}</Eyebrow><h2 id="mission-heading">Today’s mission</h2></div><span className={`mission-status${complete ? ' is-complete' : ''}`}>{complete ? 'DAY COMPLETE' : 'IN PROGRESS'}</span></div>
    <div className="mission-objective"><div><span className="system-kicker">THE DAY’S INTENTION</span><p>{day.objective}</p></div><div className="mission-objective__phase"><span>{arc.feeling}</span><small>DAYS {arc.start}—{arc.end}</small></div></div>
    {complete && <div className="day-complete-note" role="status"><ShieldCheck size={17} /> Required quests complete. Your progress is recorded. No need to add more work today.</div>}
    <div className="quest-grid">{quests.map((quest) => <QuestCard key={quest.id} quest={quest} />)}</div>
    <p className="mission-footnote">The bonus quest is always optional. On difficult days, use the Floor without making it up later.</p>
  </section>;
}
