import { useState } from 'react';
import { ArrowRight, Mail, Shield, TriangleAlert } from 'lucide-react';
import { Eyebrow } from '../components/Primitives';

function LegalLayout({ kicker, title, intro, children }: { kicker: string; title: string; intro: string; children: React.ReactNode }) {
  return <><section className="page-hero"><div className="container"><Eyebrow>{kicker}</Eyebrow><h1>{title}</h1><p>{intro}</p></div></section><div className="container"><article className="legal-copy">{children}</article></div></>;
}

export function PrivacyPage() {
  return <LegalLayout kicker="THE ARISE ARC / PRIVACY" title="Privacy, plainly." intro="This page describes what this version of the ARISE ARC website actually does. It does not create an account or send your personal system progress to us.">
    <p><strong>Last updated: October 2, 2026.</strong> The website is operated as a digital guide and browser-based system. Questions about privacy can be sent to <a href="mailto:dewifystores@gmail.com">dewifystores@gmail.com</a>.</p>
    <h2>What you enter</h2><p>The interactive system stores day and quest completion, XP events, focus-session history, recovery entries, training completion and weekly reflection notes in this browser's local storage. These entries remain on the device/browser profile you use; this site does not have an account or progress-sync service. We do not receive those entries through the app. Avoid entering sensitive or confidential information in reflection fields. Browser local storage is not a secure vault.</p>
    <h2>Contact messages</h2><p>The support form validates your fields in the page and prepares a message for your own email application. The website does not submit or store form entries. Your email application or provider will handle the message after you choose to send it. You can also email <a href="mailto:dewifystores@gmail.com">dewifystores@gmail.com</a> directly.</p>
    <h2>Technical information, cookies and analytics</h2><p>This application does not create an account, use advertising cookies or add an analytics tool. The site's hosting infrastructure necessarily receives technical request information needed to deliver and protect the website; the hosting operator's own policies govern its infrastructure-level processing. No sensitive progress or reflection data is intentionally transmitted by the application.</p>
    <h2>Storage, security and retention</h2><p>System data remains in local browser storage until you clear it through your browser's site-data controls or the data is otherwise removed by your browser or device. The system does not currently provide remote backup. Protect access to your device and do not rely on the site for secure or permanent storage.</p>
    <h2>Your choices</h2><p>You can choose not to enter information, edit your reflections, or clear this site's local data through your browser settings. Clearing browser storage also removes the progress stored here. No account is required, and this version does not offer a server-side export or account deletion request.</p>
    <h2>Children and changes</h2><p>This site is intended for a general adult audience and is not designed to collect information from children. We will update this notice if the implemented data practices change. The “last updated” date above identifies the current version.</p>
    <h2>Privacy contact</h2><p><a href="mailto:dewifystores@gmail.com">dewifystores@gmail.com</a></p>
  </LegalLayout>;
}

export function TermsPage() {
  return <LegalLayout kicker="THE ARISE ARC / TERMS" title="Use the system with care." intro="These terms describe this website and the current ARISE ARC browser experience in straightforward language.">
    <p><strong>Last updated: October 2, 2026.</strong> By using this website, you agree to use it responsibly and in line with these terms. If you do not agree, please stop using it. Questions: <a href="mailto:dewifystores@gmail.com">dewifystores@gmail.com</a>.</p>
    <h2>Website and system access</h2><p>The site presents general educational material and a browser-based preview of a 60-day personal system. We may change, pause or remove parts of the site to maintain or improve it. Availability and local browser storage are not guaranteed. This version does not provide account-based access, device synchronization, a connected payment checkout or automatic digital-product delivery.</p>
    <h2>Purchases and digital access</h2><p>No price or checkout destination is configured on this website. A “Start Your Arc” button opens the interactive system and is not a purchase, payment or delivery confirmation. Any future sale will be subject to the terms presented at its actual checkout or purchase point.</p>
    <h2>Your account and content</h2><p>No site account is required. Reflection text and personal progress you enter are stored in your browser, not submitted to us by the application. Keep a separate copy of anything important; clearing your browser data can remove it. You are responsible for the content you choose to store on your device and for maintaining access to your device.</p>
    <h2>Intellectual property and permitted use</h2><p>ARISE ARC branding, editorial copy and site materials belong to their respective rights holder unless otherwise stated. You may use the site for personal, non-commercial purposes. Do not copy, resell, republish or distribute the guide or site materials as your own; do not interfere with site operation, attempt unauthorized access or use the content unlawfully.</p>
    <h2>Third parties and availability</h2><p>Links to email or other sites may take you to services with their own terms and privacy practices. We do not control those services. The site and its browser-stored content may be changed or temporarily unavailable, and no backup is provided by this version.</p>
    <h2>Responsibility and limitations</h2><p>Use the educational material at your own judgment and consider your circumstances. To the extent permitted by applicable law, the website is provided as available and without a promise of uninterrupted operation or a particular result. Nothing here removes a right that cannot legally be excluded or limits responsibility where local law does not allow it.</p>
    <h2>Changes and termination</h2><p>We may revise these terms when the service changes. Continued use after an update means you accept the revised terms where permitted. Access may be restricted if the site is misused or must be withdrawn.</p>
    <h2>Contact</h2><p><a href="mailto:dewifystores@gmail.com">dewifystores@gmail.com</a></p>
  </LegalLayout>;
}

export function DisclaimerPage() {
  return <LegalLayout kicker="THE ARISE ARC / HEALTH" title="Training is general guidance." intro="A clear boundary between a useful structure and advice that must come from a qualified professional.">
    <div className="disclaimer-callout"><TriangleAlert size={19} /><p>ARISE ARC provides general educational guidance. It is not medical diagnosis, medical treatment or individualized clinical advice.</p></div>
    <h2>Your circumstances come first</h2><p>People differ. Consider your health, fitness, experience, environment and any limitations before choosing an action. You may wish to consult a qualified health professional before changing your activity, especially if you have a concern or condition that affects exercise.</p>
    <h2>Move within a comfortable range</h2><p>Use an appropriate level and technique for you. Stop exercising if you experience concerning symptoms such as chest pain, faintness, severe shortness of breath or sharp pain, and seek appropriate professional care. Do not use the Floor Rule to push through symptoms.</p>
    <h2>No guaranteed outcomes</h2><p>The system does not guarantee physique changes, fitness improvements or any specific physical, medical or psychological outcome. Results and experiences vary.</p>
    <p>For questions about the website, contact <a href="mailto:dewifystores@gmail.com">dewifystores@gmail.com</a>.</p>
  </LegalLayout>;
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus('error');
      setError('Please complete each field before preparing your message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setError('Enter an email address in a format like name@example.com.');
      return;
    }
    setStatus('loading');
    window.setTimeout(() => {
      try {
        const body = `Name: ${name.trim()}\nReply to: ${email.trim()}\n\n${message.trim()}`;
        setDraft(`mailto:dewifystores@gmail.com?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`);
        setStatus('success');
      } catch {
        setStatus('error');
        setError('We could not prepare the email draft. Please email us directly.');
      }
    }, 250);
  };

  return <>
    <section className="page-hero"><div className="container"><Eyebrow>THE ARISE ARC / SUPPORT</Eyebrow><h1>NEED HELP?</h1><p>Have a question about ARISE ARC, your purchase, access, or the system? Get in touch.</p></div></section>
    <section className="section contact-page"><div className="container contact-page__layout"><aside className="contact-details"><span className="contact-details__seal"><Mail size={22} /></span><span className="system-kicker">DIRECT SUPPORT</span><a href="mailto:dewifystores@gmail.com">dewifystores@gmail.com</a><p>The form prepares an email on your device. It does not send the message from this website.</p><div className="contact-details__privacy"><Shield size={15} /> Your contact form content is not stored by this site.</div></aside>
      <div className="contact-form-wrap"><h2>Start a conversation.</h2><p className="contact-form-wrap__lead">Share only what we need to understand your question.</p>
        {status === 'success' ? <div className="contact-success" role="status"><span><Mail size={19} /></span><div><h3>Your draft is ready.</h3><p>The website has not sent it. Open your email application, review the message and send it there.</p><a className="button button--solid" href={draft}>Open email app <ArrowRight size={15} /></a><button className="text-link contact-success__edit" type="button" onClick={() => setStatus('idle')}>Edit message</button></div></div> : <form className="contact-form" onSubmit={submit} noValidate>
          <div className="contact-form__row"><label>NAME<input autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label><label>EMAIL<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label></div>
          <label>SUBJECT<input required value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="What can we help with?" /></label>
          <label>MESSAGE<textarea required rows={6} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="A little context helps us respond." /></label>
          {status === 'error' && <p className="contact-form__error" role="alert">{error}</p>}
          <button className="button button--solid contact-form__submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'PREPARING DRAFT…' : 'SEND MESSAGE'} <ArrowRight size={15} /></button>
          <p className="contact-form__note">Choose “Open email app” after validation to review and send your message. Nothing leaves this page until you choose a mail application.</p>
        </form>}
      </div></div></section>
  </>;
}
