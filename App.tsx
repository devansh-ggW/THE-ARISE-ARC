import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Header } from '../components/SiteShell';
import HomePage from '../pages/HomePage';
import SystemPage from '../pages/SystemPage';
import { ContactPage, DisclaimerPage, PrivacyPage, TermsPage } from '../pages/InformationPages';

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);
  return null;
}

function ScrollReveals() {
  const location = useLocation();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const elements = document.querySelectorAll<HTMLElement>('.section, .system-overview, .system-panel, .page-hero, .legal-copy');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -7% 0px' });
    elements.forEach((element) => { element.classList.add('scroll-reveal'); observer.observe(element); });
    return () => observer.disconnect();
  }, [location.pathname]);
  return null;
}

function NotFound() {
  return <section className="page-hero"><div className="container"><p className="system-kicker">404 / ROUTE NOT FOUND</p><h1>Find the next<br />useful page.</h1><a className="button button--solid" href="/">Return home</a></div></section>;
}

function SiteRoutes() {
  return <><ScrollManager /><ScrollReveals /><Header /><main className="site-main"><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/system" element={<SystemPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="/disclaimer" element={<DisclaimerPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes></main><Footer /></>;
}

export default function App() {
  return <BrowserRouter><div className="shell"><SiteRoutes /></div></BrowserRouter>;
}
