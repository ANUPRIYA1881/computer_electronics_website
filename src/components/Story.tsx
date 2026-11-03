import { Lines, MaskReveal, Reveal, Img } from './ui';

export default function Story() {
  return (
    <section className="section story" aria-labelledby="story-title">
      <div className="container story__grid">
        <MaskReveal className="story__media"><Img src="/media/products/pro16.jpg" alt="NEXBYTE laptop with a glowing wallpaper on a dark reflective surface" /></MaskReveal>
        <div className="story__copy">
          <Reveal><p className="eyebrow">The NEXBYTE approach</p></Reveal>
          <Lines id="story-title" lines={['Technology should', 'feel effortless.']} className="h2" delay={0.1} />
          <Reveal delay={0.25}><p className="lead">We believe great technology brings together thoughtful design, dependable performance, and useful everyday experiences.</p></Reveal>
        </div>
      </div>
    </section>
  );
}
