import { useMemo, useState } from 'react';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import { byId, CATEGORY_LABELS, defaultSelection, formatINR, products, unitOriginal, unitPrice, type Product, type Selection } from '../data/products';
import { useShop } from '../store/ShopContext';
import { Rating } from './ProductCard';
import { CloseBtn, Img, Overlay } from './ui';

function Detail({ p }: { p: Product }) {
  const { addToCart, closeProduct, openProduct, setCartOpen, maxQty } = useShop();
  const [sel, setSel] = useState<Selection>(() => defaultSelection(p));
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const price = unitPrice(p, sel);
  const orig = unitOriginal(p, sel);
  const related = useMemo(() => {
    const same = products.filter((x) => x.id !== p.id && x.category === p.category);
    const rest = products.filter((x) => x.id !== p.id && x.category !== p.category);
    return [...same, ...rest].slice(0, 3);
  }, [p]);

  const pickColor = (name: string, image?: number) => { setSel({ ...sel, color: name }); if (image !== undefined && image < p.images.length) setImg(image); };
  const add = (open: boolean) => { addToCart(p.id, sel, qty); if (open) { closeProduct(); setCartOpen(true); } };

  return (
    <div className="detail">
      <div className="detail__top"><p className="eyebrow">{CATEGORY_LABELS[p.category]}</p><CloseBtn onClick={closeProduct} label="Close product details" /></div>
      <div className="detail__grid">
        <div className="gallery">
          <div className="gallery__main"><Img key={img} src={p.images[img].src} alt={p.images[img].alt} className="gallery__img" eager /></div>
          {p.images.length > 1 && (
            <ul className="gallery__thumbs" aria-label="Product images">
              {p.images.map((im, i) => (
                <li key={im.src}><button type="button" className={i === img ? 'is-on' : ''} aria-label={`Show image ${i + 1}: ${im.alt}`} aria-current={i === img} onClick={() => setImg(i)}><Img src={im.src} alt="" /></button></li>
              ))}
            </ul>
          )}
        </div>
        <div className="detail__info">
          <h2 className="detail__name">{p.name}</h2>
          <Rating p={p} />
          <p className="detail__price"><strong>{formatINR(price)}</strong>{orig && <s>{formatINR(orig)}</s>}</p>
          <p className="muted">Inclusive of demo pricing. Illustrative only.</p>
          <p className="detail__desc">{p.description}</p>

          {p.colors.length > 0 && (
            <fieldset className="opt"><legend>Colour: <span>{sel.color}</span></legend>
              <div className="opt__row">{p.colors.map((c) => (
                <button key={c.name} type="button" className={`dot ${sel.color === c.name ? 'is-on' : ''}`} style={{ background: c.hex }} aria-label={c.name} aria-pressed={sel.color === c.name} onClick={() => pickColor(c.name, c.image)} />
              ))}</div>
            </fieldset>
          )}
          {p.configs.map((g) => (
            <fieldset className="opt" key={g.id}><legend>{g.label}</legend>
              <div className="opt__row">{g.options.map((o) => (
                <button key={o.value} type="button" className={`pill ${sel.configs[g.id] === o.value ? 'is-on' : ''}`} aria-pressed={sel.configs[g.id] === o.value}
                  onClick={() => setSel({ ...sel, configs: { ...sel.configs, [g.id]: o.value } })}>
                  {o.value}{o.delta > 0 && <small>+{formatINR(o.delta)}</small>}
                </button>
              ))}</div>
            </fieldset>
          ))}

          <p className={`stock stock--${p.stock}`}><Check size={15} aria-hidden="true" /> {p.stock === 'in' ? 'In stock (demo)' : 'Only a few left (demo)'}</p>

          <div className="buy">
            <div className="qty" role="group" aria-label="Quantity">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}><Minus size={16} aria-hidden="true" /></button>
              <output aria-live="polite">{qty}</output>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty(Math.min(maxQty, qty + 1))} disabled={qty >= maxQty}><Plus size={16} aria-hidden="true" /></button>
            </div>
            <button type="button" className="btn btn--primary btn--grow" onClick={() => add(false)}><ShoppingBag size={17} aria-hidden="true" /> Add to cart · {formatINR(price * qty)}</button>
          </div>
          <button type="button" className="btn btn--ghost btn--block" onClick={() => add(true)}>Add &amp; view bag</button>

          <h3 className="detail__h">Specifications <span className="muted">(illustrative)</span></h3>
          <dl className="specs">{p.specs.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
            {p.configs.map((g) => (<div key={g.id}><dt>{g.label}</dt><dd>{sel.configs[g.id]}</dd></div>))}</dl>
        </div>
      </div>
      <h3 className="detail__h detail__h--rel">You may also like</h3>
      <ul className="related">
        {related.map((r) => (
          <li key={r.id}><button type="button" onClick={() => { setSel(defaultSelection(byId(r.id)!)); openProduct(r.id); }}>
            <Img src={r.images[0].src} alt="" /><span>{r.name}</span><small>{formatINR(r.price)}</small></button></li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductDetail() {
  const { detailId, closeProduct } = useShop();
  const p = detailId ? byId(detailId) : undefined;
  if (!p) return null;
  return <Overlay variant="modal" label={`${p.name} details`} onClose={closeProduct}><Detail key={p.id} p={p} /></Overlay>;
}
