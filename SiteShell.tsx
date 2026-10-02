import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react';
import { ArcMark } from './Primitives';

const navItems = [
  { label: 'System', href: '/system' },
  { label: '60 Days', href: '/#journey' },
  { label: 'Training', href: '/#training' },
  { label: 'Book', href: '/#book' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return <>
    <div className="announcement">A practical system for the days motivation goes quiet</div>
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand-lockup" to="/" aria-label="The Arise Arc home">
          <ArcMark className="brand-lockup__mark" />
          <span><span className="brand-lockup__name">THE ARISE ARC</span><span className="brand-lockup__sub">THE 60 DAY COMEBACK SYSTEM</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <Link className="nav-cta" to="/system">Enter system <ArrowRight size={14} aria-hidden="true" /></Link>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>
        {navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowDownRight size={13} aria-hidden="true" /></a>)}
        <Link className="mobile-nav__cta" to="/system" onClick={() => setOpen(false)}>Enter system <ArrowRight size={14} aria-hidden="true" /></Link>
      </nav>
    </header>
  </>;
}

export function Footer() {
  return <footer className="footer">
    <div className="container footer__main">
      <div className="footer__brand">
        <Link className="brand-lockup" to="/">
          <ArcMark className="brand-lockup__mark" />
          <span><span className="brand-lockup__name">THE ARISE ARC</span><span className="brand-lockup__sub">THE 60 DAY COMEBACK SYSTEM</span></span>
        </Link>
        <p>Your arc does not end at Day 60. It becomes a standard you can carry forward.</p>
      </div>
      <div>
        <div className="footer__heading">Explore</div>
        <div className="footer__links">
          <Link to="/">Home</Link><Link to="/system">The system</Link><a href="/#journey">60 days</a><a href="/#training">Training</a><a href="/#book">Book</a><Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="footer__support">
        <div className="footer__heading">Guidance & support</div>
        <div className="footer__links"><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms & conditions</Link><Link to="/disclaimer">Disclaimer</Link></div>
        <p style={{ marginTop: 20 }}>Questions about access or the system?</p>
        <a href="mailto:dewifystores@gmail.com">dewifystores@gmail.com</a>
      </div>
    </div>
    <div className="container footer__bottom"><p>© 2026 THE ARISE ARC. ALL RIGHTS RESERVED.</p><p>Built for the return, not the streak.</p></div>
  </footer>;
}
