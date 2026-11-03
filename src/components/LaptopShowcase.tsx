import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Layers, Feather } from 'lucide-react';
import { useShop } from '../store/ShopContext';
import { Arrow, Lines, MaskReveal, Reveal, LazyVideo, useIsDesktop } from './ui';

const FEATURES = [
  { icon: Layers, title: 'Precision-crafted body', copy: 'A machined metal shell with clean edges, a tight hinge and a keyboard deck that feels solid.' },
  { icon: Cpu, title: 'Responsive performance', copy: 'Configurable memory and storage so your system fits the way you work.' },
  { icon: Feather, title: 'Portable design', copy: 'A slim profile that slides into a bag and stays out of the way.' },
];

export default function LaptopShowcase() {
  const { goShop } = useShop();
  const ref = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  const parallax = desktop && !rm;
  return (
    <section className="section showcase" aria-labelledby="showcase-title" ref={ref}>
      <div className="container showcase__grid">
        <div className="showcase__media">
          <MaskReveal className="showcase__frame">
            <motion.div className="showcase__parallax" style={parallax ? { y, scale: 1.1 } : undefined}>
              <LazyVideo src="/media/video/engineering.mp4" poster="/media/posters/engineering.jpg" alt="Close-up sequence of the laptop hinge, keyboard, trackpad and ventilation" className="cover" />
            </motion.div>
          </MaskReveal>
          <p className="caption">Hinge · keyboard · trackpad · ventilation</p>
        </div>
        <div className="showcase__copy">
          <Reveal><p className="eyebrow">Performance in profile</p></Reveal>
          <Lines id="showcase-title" lines={['Designed to do more.', 'Built to carry less.']} className="h2" delay={0.1} />
          <Reveal delay={0.25}><p className="lead">Thoughtful engineering, refined materials, and the performance to move with your ideas.</p></Reveal>
          <div className="features">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={0.1 * i}>
                <div className="feature"><f.icon size={22} aria-hidden="true" /><div><h3>{f.title}</h3><p>{f.copy}</p></div></div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}><button type="button" className="btn btn--primary" onClick={() => goShop('laptops')}>Explore Laptops <Arrow /></button></Reveal>
        </div>
      </div>
    </section>
  );
}
