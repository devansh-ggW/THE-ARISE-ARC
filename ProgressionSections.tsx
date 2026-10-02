import { ArrowRight, CircleDot, RotateCcw } from 'lucide-react';
import { Button, Eyebrow, SectionHeading } from '../components/Primitives';
import { levels } from '../data/system';

const samples = [
  { type: 'MAIN QUEST', title: 'Move with intention', xp: '+100 XP' },
  { type: 'SIDE QUEST', title: 'Make the next start easier', xp: '+50 XP' },
  { type: 'FOCUS QUEST', title: 'One task. One window.', xp: '+40 XP' },
  { type: 'RECOVERY QUEST', title: 'Leave room to recover', xp: '+30 XP' },
];

export function QuestSection() {
  return <section className="section" id="quests"><div className="container">
    <div className="quest-intro"><div><SectionHeading number="06" kicker="THE QUEST SYSTEM" title={<>An action you can<br />actually begin.</>} copy="Each day is built from a few different kinds of effort. The optional quest stays optional." /></div>
      <div className="floor-note"><span className="floor-note__symbol">F</span><span className="floor-note__label">THE FLOOR RULE</span><h3>Make the minimum<br /><em>easy to keep.</em></h3><p>Every quest has a smaller version for hard days. A smaller completed action is better than an abandoned perfect plan.</p><div className="floor-note__example"><span>20 MINUTES</span><b>→</b><strong>5 MINUTES</strong></div></div>
    </div>
    <div className="mini-quest-list">{samples.map((quest) => <div className="mini-quest" key={quest.type}><span className="mini-quest__type">{quest.type}</span><span className="mini-quest__title">{quest.title}</span><span className="mini-quest__xp">{quest.xp}</span></div>)}</div>
    <p className="quest-footnote"><CircleDot size={13} /> Each quest includes an objective, time estimate, XP, floor version and a completion state.</p>
  </div></section>;
}

export function ProgressionSection() {
  return <section className="section section--paper" id="progression"><div className="container progression-layout">
    <div><SectionHeading number="07" kicker="XP + PROGRESSION" title={<>Credit for what<br />you chose to do.</>} copy="The numbers are a record of participation—not a measure of your worth. Training harder is never the only way forward." />
      <div className="xp-table"><div><span>MAIN QUEST</span><b>100</b></div><div><span>SIDE QUEST</span><b>50</b></div><div><span>FOCUS QUEST</span><b>40</b></div><div><span>RECOVERY QUEST</span><b>30</b></div><div><span>BONUS QUEST</span><b>25</b></div><div><span>COMEBACK</span><b>75</b></div><div><span>WEEKLY CHECKPOINT</span><b>100</b></div><div><span>CHALLENGE COMPLETED</span><b>150</b></div><div><span>BOSS DEFEATED</span><b>300</b></div></div>
    </div>
    <div className="level-structure"><div className="level-structure__head"><span>CURRENT / FUTURE STATES</span><span>01—08</span></div>{levels.map((level) => <div className="level-line" key={level.level}><span>{String(level.level).padStart(2,'0')}</span><strong>{level.name}</strong><i /><small>{level.threshold.toLocaleString()} XP</small></div>)}<p>AWAKEN → STABILIZE → BUILD → FORGE → DISCIPLINE → MOMENTUM → RISE → ASCEND</p></div>
  </div></section>;
}

export function ComebackSection() {
  return <section className="section section--warm" id="comeback"><div className="container">
    <div className="comeback-band"><div><Eyebrow number="08">COMEBACK PROTOCOL</Eyebrow><h3>A missed day is information.<br /><em>Not an instruction to restart.</em></h3><p>Progress stays. Log what happened, choose the next sensible action and continue from where you are. No punishment session. No Day 1 reset.</p></div><Button href="/system#comeback" variant="outline">See the way back</Button></div>
    <div className="comeback-after"><RotateCcw size={17} /><span>“Consistency is not never falling off.<br />It is getting better at returning.”</span><a href="/system#comeback" aria-label="Open comeback protocol"><ArrowRight size={17} /></a></div>
  </div></section>;
}

export function BossSection() {
  return <section className="section" id="bosses"><div className="container"><div className="boss-heading"><SectionHeading number="09" kicker="BOSS BATTLES" title={<>Meet the resistance<br />without making it a villain.</>} copy="Every obstacle is a pattern with a practical counter-move. No cartoon, no shame—just a plan for the moment friction appears." /><span className="boss-heading__mark">01<br /><i />03</span></div>
    <div className="boss-preview"><div className="boss-preview__seal">01</div><div><Eyebrow>ACTIVE / FIRST ENCOUNTER</Eyebrow><h3>THE BED</h3><p>Prepare the night before. When the alarm comes, put both feet on the floor within two minutes.</p></div><div className="boss-preview__reward">+300 XP&nbsp; · &nbsp;+1 DISCIPLINE</div></div>
    <div className="boss-footer"><span>THE REWARD IS FOLLOW-THROUGH.</span><a className="text-link" href="/system#bosses">Enter the system <ArrowRight size={15} /></a></div>
  </div></section>;
}
