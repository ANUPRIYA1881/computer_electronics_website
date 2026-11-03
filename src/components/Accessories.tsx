import { useState } from 'react';
import { products, type Product } from '../data/products';
import { useShop } from '../store/ShopContext';
import ProductCard from './ProductCard';
import { Arrow, Img, Lines, MaskReveal, Reveal } from './ui';

const SUBS: { id: 'all' | NonNullable<Product['sub']>; label: string }[] = [
  { id: 'all', label: 'All' }, { id: 'hub', label: 'Hubs' }, { id: 'power', label: 'Power & charging' }, { id: 'mouse', label: 'Mice' }, { id: 'wearable', label: 'Wearables' },
];

export default function Accessories() {
  const { goShop } = useShop();
  const [sub, setSub] = useState<(typeof SUBS)[number]['id']>('all');
  const list = products.filter((p) => p.category === 'accessories' && (sub === 'all' || p.sub === sub));
  return (
    <section className="section acc" id="accessories" aria-labelledby="acc-title">
      <div className="container">
        <div className="acc__top">
          <div>
            <Reveal><p className="eyebrow">Accessories</p></Reveal>
            <Lines id="acc-title" lines={['Made for your', 'next move.']} className="h2" delay={0.1} />
            <Reveal delay={0.25}><p className="lead">Mice, hubs, chargers and wearables with the same restrained detailing — and a single orange signal light.</p></Reveal>
            <Reveal delay={0.35}><button type="button" className="btn btn--ghost" onClick={() => goShop('accessories')}>Shop all accessories <Arrow /></button></Reveal>
          </div>
          <MaskReveal className="acc__media"><Img src="/media/cat-accessories.jpg" alt="Laptop, tablet, headphones, hub, power bank, chargers and mouse arranged on a dark surface" /></MaskReveal>
        </div>
        <div className="chips" role="group" aria-label="Filter accessories">
          {SUBS.map((s) => <button key={s.id} type="button" className={`chip ${sub === s.id ? 'is-on' : ''}`} aria-pressed={sub === s.id} onClick={() => setSub(s.id)}>{s.label}</button>)}
        </div>
        <ul className="grid grid--4">{list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}</ul>
      </div>
    </section>
  );
}
