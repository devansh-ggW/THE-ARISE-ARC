import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { DayPath } from '../system/DayPath';
import { QuestBoard } from '../system/QuestBoard';
import { SystemOverview, SystemWarnings } from '../system/SystemMetrics';
import { SystemHeader } from '../system/SystemHeader';
import { ComebackPanel, BossPanel } from '../system/ChallengePanels';
import { TrainingPanel } from '../system/TrainingPanel';
import { FocusTimer } from '../system/FocusTimer';
import { RecoveryPanel } from '../system/RecoveryPanel';
import { WeeklyCheckpoint } from '../system/WeeklyCheckpoint';

const sections = [
  ['days', '60 DAYS'], ['mission', 'QUESTS'], ['comeback', 'COMEBACK'], ['bosses', 'BOSS BATTLES'], ['training', 'TRAINING'], ['focus', 'FOCUS'], ['recovery', 'RECOVERY'], ['checkpoint', 'WEEKLY REVIEW'],
];

export default function SystemPage() {
  return <div className="system-workspace">
    <SystemHeader />
    <div className="system-system-nav"><div className="container system-system-nav__inner">{sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}<ArrowDown size={11} /></a>)}</div></div>
    <div className="container system-content">
      <div className="system-welcome"><div><span>YOUR PLACE / YOUR PACE</span><p>Everything you record stays in this browser. Start where you are; the system does not reset.</p></div><Link to="/" className="system-back">Return to the overview <ArrowUpRight size={14} /></Link></div>
      <SystemOverview />
      <SystemWarnings />
      <DayPath />
      <QuestBoard />
      <ComebackPanel />
      <BossPanel />
      <TrainingPanel />
      <FocusTimer />
      <RecoveryPanel />
      <WeeklyCheckpoint />
      <section className="system-continuation"><span>DAY 60 IS A THRESHOLD, NOT A DOOR CLOSING.</span><h2>Your arc continues<br /><em>as a personal standard.</em></h2><Link to="/contact">Questions about the system? <ArrowRight size={14} /></Link></section>
      <div className="system-privacy"><span>Your entries are stored locally in this browser.</span><Link to="/privacy">Read the privacy policy</Link><span>·</span><Link to="/disclaimer">Health disclaimer</Link></div>
    </div>
  </div>;
}
