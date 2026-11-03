import { useShop } from '../store/ShopContext';
import { Arrow, Lines, Reveal, LazyVideo } from './ui';

export default function Discover() {
  const { goShop } = useShop();
  return (
    <section className="discover" id="discover" aria-labelledby="discover-title">
      <LazyVideo src="/media/video/collection.mp4" poster="/media/posters/collection.jpg" alt="Laptop, tablet, phone, earbuds and watch displayed together on dark plinths" className="discover__video" />
      <div className="discover__shade" aria-hidden="true" />
      <div className="container discover__text">
        <Reveal><p className="eyebrow">Discover</p></Reveal>
        <Lines id="discover-title" lines={['Everything works', 'better together.']} className="h2 h2--xl" delay={0.1} />
        <Reveal delay={0.25}><p className="lead">Discover a considered collection of computers, personal electronics, and accessories designed to fit the way you work and create.</p></Reveal>
        <Reveal delay={0.35}><button type="button" className="btn btn--primary" onClick={() => goShop('all', 'all')}>Shop All Products <Arrow /></button></Reveal>
      </div>
    </section>
  );
}
