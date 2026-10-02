import { faqItems } from '../data/system';
import { Button, Eyebrow, SectionHeading } from '../components/Primitives';

export function PurchaseSection() {
  return <section className="section section--paper" id="purchase"><div className="container">
    <div className="offer-card"><div><Eyebrow number="15">THE SYSTEM GUIDE</Eyebrow><h2>THE ARISE ARC</h2><p className="offer-card__subtitle">THE COMPLETE 60-DAY COMEBACK SYSTEM</p><p>A considered framework for training, focus, recovery and consistency. Five arcs. Daily quests with a Floor option. Weekly checkpoints. A plan for returning after a setback.</p><div className="offer-includes"><span>60-DAY STRUCTURE</span><span>TRAINING FRAMEWORK</span><span>FOCUS + RECOVERY</span><span>XP + COMEBACK PROTOCOL</span><span>BOSS BATTLES</span><span>WEEKLY CHECKPOINTS</span></div></div>
      <aside className="offer-card__aside"><span className="offer-card__note">AN HONEST START</span><h3>Enter at your own pace.</h3><p>The interactive system preview is available now. This site does not yet have a payment or digital-delivery connection; we won’t imply that a purchase has been processed.</p><Button href="/system">Start your arc</Button></aside>
    </div>
  </div></section>;
}

export function FAQSection() {
  return <section className="section" id="faq"><div className="container faq-layout"><SectionHeading number="16" kicker="FAQ" title={<>A few useful<br />answers first.</>} copy="Plain language, without the promise that every week will go to plan." /><div className="faq-list">{faqItems.map((item) => <details key={item.q} className="faq-item"><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>;
}

export function ContactCallout() {
  return <section className="section section--warm section--compact" id="contact"><div className="container contact-callout"><div><Eyebrow number="17">CONTACT & SUPPORT</Eyebrow><h3>Need help?</h3><p>Questions about ARISE ARC, your purchase, access or the system?</p></div><div className="contact-callout__actions"><a className="contact-callout__email" href="mailto:dewifystores@gmail.com">dewifystores@gmail.com</a><Button href="/contact" variant="outline">Contact support</Button></div></div></section>;
}
