import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { byId, defaultSelection, formatINR, unitPrice } from '../data/products';
import { useShop } from '../store/ShopContext';
import { Arrow, Img, Lines, MaskReveal, Reveal, LazyVideo } from './ui';

const PARTS = ['studio-desktop', 'view-27', 'view-32', 'mouse-m1', 'dock-8'];

export default function Workstation() {
  const { goShop, addToCart, setCartOpen } = useShop();
  const [on, setOn] = useState<string[]>(['studio-desktop', 'view-27']);
  const total = useMemo(() => on.reduce((s, id) => { const p = byId(id)!; return s + unitPrice(p, defaultSelection(p)); }, 0), [on]);
  const toggle = (id: string) => setOn((cur) => {
    if (cur.includes(id)) return cur.filter((x) => x !== id);
    // only one display at a time
    if (id === 'view-27') return [...cur.filter((x) => x !== 'view-32'), id];
    if (id === 'view-32') return [...cur.filter((x) => x !== 'view-27'), id];
    return [...cur, id];
  });
  return (
    <section className="section workstation" id="workstations" aria-labelledby="ws-title">
      <MaskReveal className="ws__hero">
        <LazyVideo src="/media/video/workstation.mp4" poster="/media/posters/workstation.jpg" alt="Desktop workstation with a monitor, keyboard and mouse on a dark desk with an orange light line" className="cover" />
        <div className="ws__shade" aria-hidden="true" />
        <div className="container ws__text">
          <Reveal><p className="eyebrow">Workstations</p></Reveal>
          <Lines id="ws-title" lines={['Your space.', 'Your system.']} className="h2 h2--xl" delay={0.1} />
          <Reveal delay={0.25}><p className="lead">Build a workspace that keeps your ideas moving.</p></Reveal>
          <Reveal delay={0.35}><button type="button" className="btn btn--primary" onClick={() => goShop('desktops')}>Explore Workstations <Arrow /></button></Reveal>
        </div>
      </MaskReveal>
      <div className="container ws__build">
        <Reveal><h3 className="h3">Build your setup</h3><p className="muted">Choose the pieces you need. Default configurations shown; adjust them on each product page.</p></Reveal>
        <div className="parts">
          {PARTS.map((id, i) => {
            const p = byId(id)!; const sel = on.includes(id);
            return (
              <Reveal key={id} delay={i * 0.06}>
                <button type="button" className={`part ${sel ? 'is-on' : ''}`} aria-pressed={sel} onClick={() => toggle(id)}>
                  <Img src={p.images[0].src} alt="" /><span className="part__txt"><strong>{p.name}</strong><small>{formatINR(unitPrice(p, defaultSelection(p)))}</small></span>
                  <span className="part__tick" aria-hidden="true"><Check size={14} /></span></button>
              </Reveal>
            );
          })}
        </div>
        <div className="ws__bar">
          <p><span className="muted">{on.length} {on.length === 1 ? 'item' : 'items'} selected</span><strong>{formatINR(total)}</strong></p>
          <button type="button" className="btn btn--primary" disabled={!on.length} onClick={() => { on.forEach((id) => addToCart(id)); setCartOpen(true); }}>Add setup to bag <Arrow /></button>
        </div>
      </div>
    </section>
  );
}
