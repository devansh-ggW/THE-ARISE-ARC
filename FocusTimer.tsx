import { useEffect, useRef, useState } from 'react';
import { Check, CirclePause, CirclePlay, RotateCcw, Timer, TriangleAlert } from 'lucide-react';
import { formatDuration, formatShortDate } from '../lib/date';
import { useArcState } from '../hooks/useArcState';
import { Eyebrow } from '../components/Primitives';

export function FocusTimer() {
  const { state, completeFocusQuest, recordInterruption } = useArcState();
  const [minutes, setMinutes] = useState(25);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState('Choose one task. Leave the phone away.');
  const deadline = useRef(0);
  const completedOnce = useRef(false);
  const elapsed = Math.max(0, minutes * 60 - remaining);
  const elapsedMinutes = Math.floor(elapsed / 60);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0 && !completedOnce.current) {
        completedOnce.current = true;
        setRunning(false);
        setCompleted(true);
        completeFocusQuest(state.activeDay, minutes);
        setMessage('Session complete. Take a minute before choosing what comes next.');
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [running, minutes, state.activeDay, completeFocusQuest]);

  const start = () => {
    if (completed) return;
    if (remaining <= 0) setRemaining(minutes * 60);
    const seconds = remaining <= 0 ? minutes * 60 : remaining;
    deadline.current = Date.now() + seconds * 1000;
    completedOnce.current = false;
    setCompleted(false);
    setRunning(true);
    setMessage('One task. One window. Let the rest wait.');
  };
  const pause = () => {
    setRemaining(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
    setRunning(false);
    setMessage('Paused. Your place is held.');
  };
  const reset = () => {
    setRunning(false);
    setRemaining(minutes * 60);
    completedOnce.current = false;
    setCompleted(false);
    setMessage('Choose one task. Leave the phone away.');
  };
  const completeNow = () => {
    const left = running ? Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)) : remaining;
    const minutesDone = Math.floor((minutes * 60 - left) / 60);
    if (minutesDone < 10) return;
    completedOnce.current = true;
    setRunning(false);
    setCompleted(true);
    setRemaining(left);
    completeFocusQuest(state.activeDay, minutesDone);
    setMessage(`${minutesDone} minutes logged. Your focus quest is recorded on this device.`);
  };
  const changeLength = (value: number) => {
    if (running) return;
    setMinutes(value);
    setRemaining(value * 60);
    completedOnce.current = false;
    setCompleted(false);
    setMessage(value === 10 ? 'A ten-minute Floor is a real session.' : 'Choose one task. Leave the phone away.');
  };
  const interrupt = () => {
    if (running) pause();
    recordInterruption();
    setMessage('Interruption noted. Remove the immediate distraction, then continue or begin a smaller block.');
  };
  const progress = ((minutes * 60 - remaining) / (minutes * 60)) * 100;

  return <section className="system-panel focus-panel" id="focus" aria-labelledby="focus-heading">
    <div className="system-panel__heading"><div><Eyebrow number="12">FOCUS SESSION / ONE THING AT A TIME</Eyebrow><h2 id="focus-heading">Give the work a window.</h2></div><Timer size={22} className="focus-panel__icon" /></div>
    <div className="focus-layout">
      <div className="focus-clock">
        <div className="focus-clock__ring" style={{ '--clock-progress': `${progress}%` } as React.CSSProperties}><span>{formatDuration(remaining)}</span><small>{running ? 'IN SESSION' : remaining === 0 ? 'COMPLETE' : 'MINUTES'}</small></div>
        <div className="focus-clock__presets" role="group" aria-label="Session length">{[25,10].map((value) => <button key={value} aria-pressed={minutes === value} disabled={running} onClick={() => changeLength(value)}>{value === 25 ? '25 MIN' : '10 MIN FLOOR'}</button>)}</div>
      </div>
      <div className="focus-instructions"><span>ONE TASK</span><i /><span>ONE WINDOW</span><i /><span>PHONE AWAY</span></div>
      <div className="focus-copy"><h3>{running ? 'Stay with the next step.' : 'Start with what matters.'}</h3><p>{message}</p><div className="focus-controls"><button type="button" className="focus-control focus-control--primary" onClick={running ? pause : start} disabled={completed}>{running ? <><CirclePause size={18} /> Pause</> : <><CirclePlay size={18} /> {remaining === minutes * 60 ? 'Start' : 'Resume'}</>}</button><button type="button" className="focus-control" onClick={reset}><RotateCcw size={15} /> Reset</button><button type="button" className="focus-control" onClick={completeNow} disabled={elapsedMinutes < 10 || completed}><Check size={15} /> {completed ? 'Logged' : 'Complete'}</button></div><button type="button" className="focus-interrupt" onClick={interrupt}><TriangleAlert size={13} /> Log an interruption</button>{elapsedMinutes < 10 && !completed && <small className="focus-floor-note">Complete is available after 10 focused minutes—the Floor.</small>}</div>
    </div>
    <div className="focus-history"><span className="system-kicker">RECENT SESSIONS / THIS BROWSER</span>{state.focusSessions.length ? <div>{state.focusSessions.slice(0,3).map((session) => <span key={session.id}><b>{session.minutes} MIN</b>{formatShortDate(session.at)}</span>)}</div> : <p>Your completed sessions will appear here.</p>}</div>
  </section>;
}
