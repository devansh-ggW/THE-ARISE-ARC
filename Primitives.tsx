import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';

export function ArcMark({ className = '' }: { className?: string }) {
  return <svg className={className} aria-hidden="true" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="23" r="13.5" stroke="currentColor" strokeWidth="1.25" strokeDasharray="72 14" transform="rotate(-44 22 23)"/><circle cx="22" cy="23" r="8.5" stroke="currentColor" strokeOpacity=".35" strokeWidth=".8"/><path d="m21.8 4.5 1.8 6.1 6.1 1.8-6.1 1.8-1.8 6.1-1.8-6.1-6.1-1.8 6.1-1.8 1.8-6.1Z" fill="currentColor"/><circle cx="22" cy="23" r="2" fill="currentColor"/></svg>;
}

export function Eyebrow({ children, number, light = false }: { children: ReactNode; number?: string; light?: boolean }) {
  return <div className={`eyebrow${light ? ' eyebrow--light' : ''}`}><span className="eyebrow__line" />{number && <span className="eyebrow__number">{number}</span>}<span>{children}</span></div>;
}

export function SectionHeading({ kicker, title, copy, align = 'left', number }: { kicker: string; title: ReactNode; copy?: ReactNode; align?: 'left' | 'center'; number?: string }) {
  return <div className={`section-heading section-heading--${align}`}><Eyebrow number={number}>{kicker}</Eyebrow><h2>{title}</h2>{copy && <p className="section-heading__copy">{copy}</p>}</div>;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'solid' | 'outline' | 'text'; icon?: 'right' | 'down' | 'up'; href?: string; children: ReactNode };
export function Button({ variant = 'solid', icon = 'right', href, className = '', children, ...props }: ButtonProps) {
  const Icon = icon === 'down' ? ArrowDownRight : icon === 'up' ? ArrowUpRight : ArrowRight;
  const classes = `button button--${variant} ${className}`.trim();
  if (href) return <a className={classes} href={href}>{children}<Icon size={15} strokeWidth={1.6} aria-hidden="true" /></a>;
  return <button className={classes} {...props}>{children}<Icon size={15} strokeWidth={1.6} aria-hidden="true" /></button>;
}

export function ProgressRing({ value, max = 100, size = 84, label, sublabel }: { value: number; max?: number; size?: number; label: string; sublabel?: string }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return <div className="progress-ring-wrap" role="img" aria-label={`${label}: ${Math.round(value)} of ${max}${sublabel ? `, ${sublabel}` : ''}`}>
    <div className="progress-ring" style={{ width: size, height: size, '--progress': `${percent}%` } as React.CSSProperties}>
      <div className="progress-ring__center"><strong>{Math.round(value)}</strong><span>{sublabel ?? 'OF ' + max}</span></div>
    </div>
    <span className="progress-ring__label">{label}</span>
  </div>;
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export function ThinArrow({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`thin-arrow ${className}`}><span /></span>;
}
