import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent as RKE } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

export const EASE = [0.22, 1, 0.36, 1] as const;

export function useIsDesktop() {
  const [d, setD] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches);
  useEffect(() => {
    const m = window.matchMedia('(min-width: 1024px)');
    const h = () => setD(m.matches);
    m.addEventListener('change', h); return () => m.removeEventListener('change', h);
  }, []);
  return d;
}

export function Reveal({ children, delay = 0, y = 26, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const rm = useReducedMotion();
  return (
    <motion.div className={className} initial={rm ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.8, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export function Lines({ lines, as = 'h2', className, delay = 0, onLoad, id, hold }: { lines: string[]; as?: 'h1' | 'h2' | 'h3'; className?: string; delay?: number; onLoad?: boolean; id?: string; hold?: boolean }) {
  const rm = useReducedMotion();
  const Tag = as;
  return (
    <Tag className={className} id={id}>
      {lines.map((l, i) => (
        <span className="line" key={l}>
          <motion.span className="line__inner" initial={rm ? false : { y: '108%' }}
            {...(onLoad ? { animate: { y: hold ? '108%' : 0 } } : { whileInView: { y: 0 }, viewport: { once: true, margin: '0px 0px -8% 0px' } })}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: EASE }}>{l}</motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Image/video frame revealed with a soft mask as it enters the viewport. */
export function MaskReveal({ children, className }: { children: ReactNode; className?: string }) {
  const rm = useReducedMotion();
  return (
    <motion.div className={className} initial={rm ? false : { clipPath: 'inset(8% 8% 8% 8% round 6px)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, ease: EASE }}>
      {children}
    </motion.div>
  );
}

interface VideoProps { src: string; poster: string; alt: string; className?: string; loop?: boolean; eager?: boolean; hold?: boolean }
/** Lazy, viewport-aware muted video with poster fallback and reduced-motion support. */
export function LazyVideo({ src, poster, alt, className, loop = true, eager = false, hold = false }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager);
  const [failed, setFailed] = useState(false);
  const rm = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || rm || failed || hold) return;
    if (eager) v.play().catch(() => undefined);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); v.play().catch(() => undefined); } else if (loop) v.pause();
    }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, [rm, failed, loop, hold, eager]);

  if (rm || failed) return <img className={className} src={poster} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
  return (
    <video ref={ref} className={className} muted playsInline loop={loop} preload={eager ? 'auto' : 'none'} poster={poster}
      autoPlay={eager && !hold} aria-label={alt} disablePictureInPicture onError={() => setFailed(true)} src={active ? src : undefined} />
  );
}

export function Arrow() { return <ArrowRight className="arrow" size={16} aria-hidden="true" />; }

export function Img({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return <img className={className} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

let lockCount = 0;
export function Overlay({ onClose, label, variant, children }: { onClose: () => void; label: string; variant: 'drawer' | 'modal' | 'top' | 'menu'; children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    lockCount++; document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => panel.current?.focus(), 30);
    return () => { window.clearTimeout(t); if (--lockCount === 0) document.body.style.overflow = ''; prev?.focus?.(); };
  }, []);
  const onKey = (e: RKE<HTMLDivElement>) => {
    if (e.key === 'Escape') { e.stopPropagation(); onClose(); return; }
    if (e.key !== 'Tab' || !panel.current) return;
    const f = Array.from(panel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea,[tabindex]:not([tabindex="-1"])')).filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  const d = rm ? 0 : 0.45;
  const panelAnim = {
    drawer: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
    modal: { initial: { opacity: 0, y: 28, scale: 0.985 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 16 } },
    top: { initial: { opacity: 0, y: -24 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } },
    menu: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  }[variant];
  return (
    <div className={`overlay overlay--${variant}`} onKeyDown={onKey}>
      <motion.div className="overlay__scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: d }} />
      <motion.div ref={panel} className="overlay__panel" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}
        {...panelAnim} transition={{ duration: d, ease: EASE }}>
        {children}
      </motion.div>
    </div>
  );
}
export function CloseBtn({ onClick, label = 'Close' }: { onClick: () => void; label?: string }) {
  return <button type="button" className="icon-btn" onClick={onClick} aria-label={label}><X size={20} aria-hidden="true" /></button>;
}
export { AnimatePresence };

type Fx = 'rise' | 'zoom' | 'left' | 'right' | 'fade' | 'hero';

/**
 * Scroll-linked motion for a whole page section. Vertical position is never shifted
 * (scale uses a top origin), so in-page anchor jumps always land exactly on the heading.
 * `parallax` also drifts the section's image/video via the --p CSS variable.
 */
export function SectionFx({ children, fx = 'rise', parallax = false }: { children: ReactNode; fx?: Fx; parallax?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start 0.5'] });
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: fx === 'hero' ? ['start start', 'end start'] : ['start end', 'end start'] });

  const opacity = useTransform(enter, [0, 1], [0.15, 1]);
  const scaleEnter = useTransform(enter, [0, 1], [fx === 'zoom' ? 0.92 : 0.97, 1]);
  const x = useTransform(enter, [0, 1], [fx === 'left' ? -64 : fx === 'right' ? 64 : 0, 0]);
  const heroOpacity = useTransform(pass, [0, 0.75, 1], [1, 0.6, 0.15]);
  const heroScale = useTransform(pass, [0, 1], [1, 0.94]);

  if (rm) return <div>{children}</div>;
  const style = fx === 'hero'
    ? { opacity: heroOpacity, scale: heroScale, transformOrigin: '50% 0%', '--p': pass }
    : fx === 'fade'
      ? { opacity, '--p': pass }
      : { opacity, scale: scaleEnter, x, transformOrigin: '50% 0%', '--p': pass };
  return (
    <motion.div ref={ref} className="sfx" data-parallax={parallax || fx === 'hero' ? '' : undefined} style={style as never}>
      {children}
    </motion.div>
  );
}
