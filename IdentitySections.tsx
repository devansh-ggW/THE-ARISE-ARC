import { lazy, Suspense, useState } from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { arcs, attributeProfiles } from '../data/system';
import { Button, Eyebrow, SectionHeading } from '../components/Primitives';
import { useArcState } from '../hooks/useArcState';
const ArcScene = lazy(() => import('../three/ArcScene'));

export function HeroSection() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero__texture" aria-hidden="true" />
    <div className="container hero__grid">
      <div className="hero__copy">
        <Eyebrow>THE 60-DAY RETURN TO RELIABILITY</Eyebrow>
        <h1 id="hero-title"><span className="hero__the">THE</span><span className="hero__name">ARISE<br />ARC</span></h1>
        <p className="hero__subtitle">THE 60 DAY COMEBACK SYSTEM</p>
        <p className="hero__attributes">STRENGTH <i /> DISCIPLINE <i /> FOCUS <i /> CONSISTENCY</p>
        <p className="hero__description">A structured 60-day system for rebuilding discipline, physical consistency, focus and momentum — one deliberate action at a time.</p>
        <div className="hero__actions"><Button href="/system">Enter the system</Button><a href="/#journey" className="hero__secondary">Explore the 60 days <ArrowDownRight size={15} /></a></div>
        <p className="hero__axiom"><span>THIS IS A SYSTEM.</span><br /><b>NOT JUST A BOOK.</b></p>
      </div>
      <div className="hero__visual"><Suspense fallback={<div className="arc-scene arc-scene--loading" aria-hidden="true"><div className="arc-scene__guide arc-scene__guide--one" /><div className="arc-scene__guide arc-scene__guide--two" /><div className="arc-scene__core-fallback" /></div>}><ArcScene /></Suspense><div className="hero__visual-note"><span>01—05</span><span>THE ARC IN MOTION</span></div></div>
    </div>
    <div className="container hero__bottom"><span>A PLAN, NOT A PROMISE</span><div><b>60</b><span>deliberate days</span></div><div><b>05</b><span>progression arcs</span></div><div><b>01</b><span>way back in</span></div></div>
  </section>;
}

export function WhatIsSection() {
  return <section className="section section--paper" id="about">
    <div className="container about-strip">
      <div><Eyebrow number="01">WHAT ARISE ARC IS</Eyebrow><h2 className="about-strip__title">A structure for the <em>ordinary day.</em></h2></div>
      <div><p className="about-strip__body">A premium interactive guide for a 60-day personal comeback: a structured operating system for rebuilding discipline, physical consistency, focus, routines, momentum and resilience.</p><div className="about-strip__quote">You are not reading about change.<br /><em>You are entering the system.</em><small>THE ARISE ARC / 60 DAYS</small></div></div>
    </div>
    <div className="container what-grid"><div className="what-grid__lead"><span className="what-grid__index">01 / PURPOSE</span><h3>Less restarting.<br />More returning.</h3></div><p>Movement, focus, discipline and recovery work together. Every day gives you a clear mission and a smaller Floor option, so your plan can meet the day you actually have.</p><div className="what-grid__mark"><span>NOT PERFECT.</span><strong>RELIABLE.</strong><span>ONE ACTION AT A TIME.</span></div></div>
  </section>;
}

export function PhilosophySection() {
  return <section className="section section--warm" id="philosophy">
    <div className="container philosophy-layout">
      <div><Eyebrow number="02">THE PHILOSOPHY</Eyebrow><h2>Consistency is built <em>without the mood.</em></h2><p className="philosophy-lead">You do not need another burst of motivation. You need a system that keeps moving when motivation disappears.</p><div className="philosophy-points"><span>Show up</span><span>Protect the minimum</span><span>Return after a setback</span><span>Recover with intention</span></div></div>
      <blockquote className="philosophy-quote"><span className="quote-mark">“</span><p>The goal is not to become perfect.<br /><em>The goal is to become reliable.</em></p><footer>THE STANDARD / NOT THE STREAK</footer></blockquote>
    </div>
  </section>;
}

export function AttributesSection() {
  const [active, setActive] = useState(0);
  const item = attributeProfiles[active];
  const { state } = useArcState();
  const loggedPromises = Object.keys(state.questLog).filter((id) => id.endsWith('-main') || id.endsWith('-side')).length;
  const recoverySignals = state.recoveryUpdatedOn ? [state.recovery.sleep >= 7, state.recovery.mobility >= 5, state.recovery.rest, state.recovery.windDown, state.recovery.energy >= 6].filter(Boolean).length * 2 : 0;
  const metrics = [
    { value: Math.min(10, state.trainingDone.length), label: 'EXERCISES LOGGED / 10' },
    { value: Math.min(10, loggedPromises + state.discipline), label: 'ACTIONS + BOSS REWARDS' },
    { value: Math.min(10, state.focusSessions.length), label: 'FOCUS SESSIONS / 10' },
    { value: state.recoveryUpdatedOn ? state.recovery.energy : 0, label: state.recoveryUpdatedOn ? 'LATEST CHECK-IN / 10' : 'NO ENERGY CHECK-IN YET' },
    { value: Math.min(10, recoverySignals), label: state.recoveryUpdatedOn ? 'RECOVERY SIGNALS / 10' : 'NO RECOVERY CHECK-IN YET' },
  ];
  const metric = metrics[active];
  const angle = (index: number) => (index * 72 - 90) * Math.PI / 180;
  return <section className="section" id="attributes">
    <div className="container"><SectionHeading number="03" kicker="THE FIVE ATTRIBUTES" title={<>A stronger system<br />has more than one measure.</>} copy="Five connected domains. No single number can tell the whole story." />
      <div className="attribute-layout">
        <div className="attribute-wheel" aria-label="Interactive map of five system attributes">
          {[0,1,2,3,4].map((index) => <span key={index} className="attribute-wheel__axis" style={{ transform: `rotate(${index * 72}deg)` }} />)}
          <div className="attribute-wheel__core"><span>ONE<br />SYSTEM</span></div>
          {attributeProfiles.map((profile, index) => {
            const point = angle(index);
            const x = 50 + Math.cos(point) * 43;
            const y = 50 + Math.sin(point) * 43;
            return <button key={profile.name} className="attribute-node" style={{ left: `${x}%`, top: `${y}%`, translate: '-50% -50%' }} aria-pressed={active === index} onClick={() => setActive(index)} aria-label={`Show ${profile.name} attribute`}>{profile.name}</button>;
          })}
        </div>
        <div className="attribute-detail" aria-live="polite"><span className="attribute-detail__index">FIELD / {item.code}</span><h3>{item.name}</h3><p className="attribute-detail__line">{item.line}</p><p>{item.detail}</p><div className="attribute-score"><div><span>{metric.label}</span><strong>{metric.value}<i> / 10</i></strong></div><div className="attribute-score__bar" role="progressbar" aria-label={`${item.name} participation metric`} aria-valuenow={metric.value} aria-valuemin={0} aria-valuemax={10}><span style={{ width: `${metric.value * 10}%` }} /></div><small>Recorded actions are a signal, not a grade.</small></div><div className="attribute-steps" role="group" aria-label="Choose attribute">{attributeProfiles.map((profile, index) => <button key={profile.name} aria-label={profile.name} aria-pressed={active === index} onClick={() => setActive(index)} />)}</div></div>
      </div>
    </div>
  </section>;
}

export function ArcsSection() {
  const [active, setActive] = useState(0);
  return <section className="section section--paper" id="arcs">
    <div className="container"><SectionHeading number="04" kicker="THE FIVE ARCS" title={<>A path with a<br />reason for each phase.</>} copy="The sequence changes with you. The standard stays practical." />
      <div className="arc-timeline arc-timeline--interactive" role="tablist" aria-label="Five progression arcs">
        {arcs.map((arc, index) => <button key={arc.id} className={`arc-stage${active === index ? ' is-selected' : ''}`} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
          <span className="arc-stage__n">ARC {arc.numeral}</span><h3>{arc.name}</h3><span className="arc-stage__days">DAYS {arc.start}—{arc.end}</span><p>{arc.aim}</p><span className="arc-stage__feeling">{arc.feeling}</span><span className="arc-stage__select">{active === index ? 'CURRENT VIEW' : 'EXPLORE'} <ArrowRight size={12} /></span>
        </button>)}
      </div>
      <div className="arc-reading" role="tabpanel"><span>ARC {arcs[active].numeral} / {String(arcs[active].start).padStart(2,'0')}—{String(arcs[active].end).padStart(2,'0')}</span><p>{arcs[active].aim} <em>{arcs[active].feeling}</em></p><a href="/system">See the full progression <ArrowRight size={14} /></a></div>
    </div>
  </section>;
}
