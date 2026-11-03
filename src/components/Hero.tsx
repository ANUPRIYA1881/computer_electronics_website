import { motion, useReducedMotion } from 'framer-motion';
import { useShop, scrollToId } from '../store/ShopContext';
import { useSplashDone } from '../store/splash';
import { Arrow, EASE, Lines, LazyVideo } from './ui';

export default function Hero() {
  const { goShop } = useShop();
  const rm = useReducedMotion();
  const ready = useSplashDone();
  const fade = (delay: number) => ({ initial: { opacity: 0, y: rm ? 0 : 18 }, animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: rm ? 0 : 18 }, transition: { duration: 0.8, delay, ease: EASE } });
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <motion.div className="hero__media" initial={{ opacity: 0, scale: rm ? 1 : 1.04 }} animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: rm ? 1 : 1.04 }} transition={{ duration: 1.6, ease: EASE }}>
        <LazyVideo eager hold={!ready} loop={false} src="/media/video/hero.mp4" poster="/media/posters/hero.jpg" alt="NEXBYTE laptop opening on a dark plinth with warm edge light" className="hero__video" />
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="container hero__content">
        <motion.p className="eyebrow" {...fade(0.3)}>The next generation of technology</motion.p>
        <Lines id="hero-title" as="h1" className="hero__title" lines={['Power Meets', 'Precision.']} delay={0.45} onLoad hold={!ready} />
        <motion.p className="hero__lead" {...fade(0.95)}>Explore computers and electronics designed for performance, clarity, and everyday excellence.</motion.p>
        <motion.div className="hero__cta" {...fade(1.1)}>
          <button type="button" className="btn btn--primary" onClick={() => goShop('all', 'featured')}>Explore Collection <Arrow /></button>
          <button type="button" className="btn btn--ghost" onClick={() => scrollToId('discover')}>Discover NEXBYTE</button>
        </motion.div>
      </div>
      <p className="hero__note">Concept brand · demo products</p>
    </section>
  );
}
