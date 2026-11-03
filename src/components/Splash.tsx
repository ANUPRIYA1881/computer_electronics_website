import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, animate, motion, useReducedMotion } from 'framer-motion';
import { EASE } from './ui';
import { setSplashDone } from '../store/splash';

const LETTERS = 'NEXBYTE'.split('');

export default function Splash() {
  const rm = useReducedMotion();
  const [open, setOpen] = useState(true);
  const [pct, setPct] = useState(0);

  const finish = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.documentElement.classList.add('is-splash');
    const controls = animate(0, 100, {
      duration: rm ? 1.1 : 2.5,
      ease: 'easeInOut',
      onUpdate: (v) => setPct(Math.round(v)),
      onComplete: finish,
    });
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish(); };
    window.addEventListener('keydown', onKey);
    return () => { controls.stop(); window.removeEventListener('keydown', onKey); document.documentElement.classList.remove('is-splash'); };
  }, [rm, finish]);

  useEffect(() => {
    if (!open) { document.documentElement.classList.remove('is-splash'); setSplashDone(); }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="splash"
          className="splash"
          role="status"
          aria-label="Loading NEXBYTE"
          onClick={finish}
          initial={false}
          style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={rm ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: rm ? 0.5 : 1, ease: EASE }}
        >
          <div className="splash__glow" aria-hidden="true" />
          <div className="splash__center">
            <p className="splash__brand" aria-hidden="true">
              {LETTERS.map((l, i) => (
                <span className="splash__mask" key={i}>
                  <motion.span
                    className={i < 3 ? 'splash__l' : 'splash__l splash__l--thin'}
                    initial={rm ? { opacity: 0 } : { y: '110%' }}
                    animate={rm ? { opacity: 1 } : { y: 0 }}
                    transition={{ duration: rm ? 0.6 : 0.9, delay: rm ? 0 : 0.25 + i * 0.07, ease: EASE }}
                  >{l}</motion.span>
                </span>
              ))}
            </p>
            <motion.p
              className="splash__tag"
              initial={{ opacity: 0, y: rm ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: rm ? 0.2 : 1.0, ease: EASE }}
            >Technology, in its finest form.</motion.p>
          </div>
          <div className="splash__foot" aria-hidden="true">
            <span className="splash__count">{String(pct).padStart(3, '0')}</span>
            <span className="splash__bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
