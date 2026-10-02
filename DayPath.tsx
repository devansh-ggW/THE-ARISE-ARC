import { useArcState } from '../hooks/useArcState';
import { arcs, days, questsForDay } from '../data/system';

export function DayPath() {
  const { state, isDayDone, setActiveDay } = useArcState();
  return <section className="system-panel day-path-panel" id="days" aria-labelledby="path-heading">
    <div className="system-panel__heading"><div><span className="system-kicker">THE ROUTE / 60 DAYS</span><h2 id="path-heading">Your progression map</h2></div><span className="system-count">{days.filter((day) => isDayDone(day.day)).length}<i> / 60 COMPLETE</i></span></div>
    <p className="system-panel__intro">Choose a day to open its mission. Completed days stay recorded; a missed day never sends you back to the beginning.</p>
    <div className="day-path">
      {arcs.map((arc) => <div className="day-path__arc" key={arc.id}>
        <div className="day-path__arc-label"><span>ARC {arc.numeral}</span><strong>{arc.name}</strong><small>DAYS {String(arc.start).padStart(2,'0')}—{String(arc.end).padStart(2,'0')}</small><em>{arc.feeling}</em></div>
        <div className="day-path__nodes" role="group" aria-label={`Days ${arc.start} to ${arc.end}, Arc ${arc.name}`}>
          {days.filter((day) => day.arc === arc.id).map((day) => {
            const complete = isDayDone(day.day);
            const current = state.activeDay === day.day;
            const dayXP = questsForDay(day).reduce((sum, quest) => sum + quest.xp, 0) + 150;
            return <button key={day.day} className={`day-node${complete ? ' is-complete' : ''}${current ? ' is-current' : ''}`} aria-pressed={current} aria-label={`Day ${day.day}, Arc ${arc.name}${complete ? ', complete' : ', not complete'}. ${day.objective}`} title={`Day ${day.day} · ${arc.name} · ${day.objective}`} onClick={() => { setActiveDay(day.day); document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
              <span>{String(day.day).padStart(2,'0')}</span><span className="day-node__tooltip"><b>DAY {String(day.day).padStart(2,'0')} / UP TO {dayXP} XP</b><i>{arc.name}</i>{day.objective}<small>{complete ? 'COMPLETE' : 'OPEN MISSION'}</small></span>
            </button>;
          })}
        </div>
      </div>)}
    </div>
    <div className="day-path__legend"><span><i className="day-legend__dot" /> OPEN</span><span><i className="day-legend__dot day-legend__dot--active" /> SELECTED</span><span><i className="day-legend__dot day-legend__dot--complete" /> COMPLETE</span><span>Hover or focus a day for its objective.</span></div>
  </section>;
}
