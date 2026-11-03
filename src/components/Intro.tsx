import { Lines, MaskReveal, Reveal, Img } from './ui';

export default function Intro() {
  return (
    <section className="section intro" aria-labelledby="intro-title">
      <div className="container intro__grid">
        <div className="intro__text">
          <Reveal><p className="eyebrow">Designed with intention</p></Reveal>
          <Lines id="intro-title" lines={['Every detail', 'has a purpose.']} className="h2" delay={0.1} />
          <Reveal delay={0.3}><p className="lead">From precision-machined surfaces to thoughtful everyday interactions, NEXBYTE brings performance and design together in one considered collection.</p></Reveal>
        </div>
        <MaskReveal className="intro__media">
          <Img src="/media/products/air14-keys.jpg" alt="Close-up of a NEXBYTE laptop keyboard and metal deck under warm light" />
        </MaskReveal>
      </div>
    </section>
  );
}
