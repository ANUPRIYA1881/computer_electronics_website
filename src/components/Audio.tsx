import { useShop } from '../store/ShopContext';
import { Arrow, Lines, MaskReveal, Reveal, LazyVideo } from './ui';

const POINTS = ['Wireless earbuds', 'Over-ear headphones', 'Charging cases and power accessories'];

export default function Audio() {
  const { goShop } = useShop();
  return (
    <section className="section audio" id="audio" aria-labelledby="audio-title">
      <div className="container audio__grid">
        <MaskReveal className="audio__media">
          <LazyVideo src="/media/video/audio.mp4" poster="/media/posters/audio.jpg" alt="Wireless earbuds in their charging case, shown in a slow close-up" className="cover" />
        </MaskReveal>
        <div className="audio__copy">
          <Reveal><p className="eyebrow">Audio</p></Reveal>
          <Lines id="audio-title" lines={['Small details.', 'A better experience.']} className="h2" delay={0.1} />
          <Reveal delay={0.25}><p className="lead">Close-up craft in every case, cushion and curve — made to disappear while you listen.</p></Reveal>
          <div className="ticks">{POINTS.map((t, i) => <Reveal key={t} delay={0.08 * i}><p>{t}</p></Reveal>)}</div>
          <Reveal delay={0.3}><button type="button" className="btn btn--primary" onClick={() => goShop('audio')}>Shop Audio <Arrow /></button></Reveal>
        </div>
      </div>
    </section>
  );
}
