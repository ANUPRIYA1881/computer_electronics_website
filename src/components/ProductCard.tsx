import { motion, useReducedMotion } from 'framer-motion';
import { Eye, Plus, Star } from 'lucide-react';
import { CATEGORY_LABELS, formatINR, type Product } from '../data/products';
import { useShop } from '../store/ShopContext';
import { EASE, Img } from './ui';

export function Rating({ p }: { p: Product }) {
  if (!p.rating) return null;
  return <span className="rating" title="Illustrative demo rating"><Star size={13} fill="currentColor" aria-hidden="true" /> {p.rating.value.toFixed(1)} <span className="rating__n">({p.rating.count}) · demo</span></span>;
}

export default function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { addToCart, openProduct } = useShop();
  const rm = useReducedMotion();
  const off = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  return (
    <motion.li className="card" layout={!rm} initial={rm ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }} transition={{ duration: 0.7, delay: Math.min(index % 4, 3) * 0.07, ease: EASE }}>
      <div className="card__media">
        <button type="button" className="card__open" onClick={() => openProduct(p.id)} aria-label={`View details for ${p.name}`}>
          <Img src={p.images[0].src} alt={p.images[0].alt} className="card__img" />
        </button>
        <div className="card__flags">
          {p.isNew && <span className="flag flag--accent">New</span>}
          {off > 0 && <span className="flag">−{off}%</span>}
          {p.stock === 'low' && <span className="flag">Few left</span>}
        </div>
        <button type="button" className="card__quick" onClick={() => openProduct(p.id)} aria-label={`Quick view ${p.name}`}><Eye size={16} aria-hidden="true" /> Quick view</button>
      </div>
      <div className="card__body">
        <p className="card__cat">{CATEGORY_LABELS[p.category]}</p>
        <h3 className="card__name"><button type="button" onClick={() => openProduct(p.id)}>{p.name}</button></h3>
        <p className="card__short">{p.short}</p>
        {p.colors.length > 0 && (
          <ul className="swatches" aria-label="Available colours">
            {p.colors.map((c) => <li key={c.name} title={c.name} className="swatch" style={{ background: c.hex }}><span className="sr">{c.name}</span></li>)}
          </ul>
        )}
        <Rating p={p} />
        <div className="card__foot">
          <p className="price"><strong>{p.configs.length ? 'From ' : ''}{formatINR(p.price)}</strong>{p.originalPrice && <s>{formatINR(p.originalPrice)}</s>}</p>
          <button type="button" className="btn btn--small btn--primary" onClick={() => addToCart(p.id)} aria-label={`Add ${p.name} to cart`}><Plus size={15} aria-hidden="true" /> Add</button>
        </div>
      </div>
    </motion.li>
  );
}
