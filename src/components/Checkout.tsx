import { useState, type FormEvent } from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { byId, formatINR, unitPrice } from '../data/products';
import { useShop } from '../store/ShopContext';
import { CloseBtn, Overlay } from './ui';

type F = { name: string; email: string; phone: string; address: string; city: string; state: string; pin: string; ship: 'standard' | 'express' };
const EMPTY: F = { name: '', email: '', phone: '', address: '', city: '', state: '', pin: '', ship: 'standard' };
const SHIP = { standard: { label: 'Standard delivery', note: 'Illustrative · 4–6 days', cost: 0 }, express: { label: 'Express delivery', note: 'Illustrative · 1–2 days', cost: 349 } };

function validate(f: F) {
  const e: Partial<Record<keyof F, string>> = {};
  if (f.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = 'Enter a valid email address.';
  if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit mobile number.';
  if (f.address.trim().length < 6) e.address = 'Enter your street address.';
  if (f.city.trim().length < 2) e.city = 'Enter your city.';
  if (f.state.trim().length < 2) e.state = 'Enter your state.';
  if (!/^\d{6}$/.test(f.pin)) e.pin = 'Enter a 6-digit PIN code.';
  return e;
}

export default function Checkout() {
  const { cart, subtotal, setCheckoutOpen, clearCart, goShop } = useShop();
  const [f, setF] = useState<F>(EMPTY);
  const [errs, setErrs] = useState<ReturnType<typeof validate>>({});
  const [done, setDone] = useState<{ id: string; total: number; email: string } | null>(null);
  const ship = SHIP[f.ship].cost;
  const total = subtotal + ship;
  const close = () => { if (done) clearCart(); setCheckoutOpen(false); };
  const set = (k: keyof F) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = validate(f); setErrs(v);
    if (Object.keys(v).length) { document.getElementById(`co-${Object.keys(v)[0]}`)?.focus(); return; }
    setDone({ id: `DEMO-${Math.floor(10000 + Math.random() * 89999)}`, total, email: f.email });
  };

  const field = (k: keyof F, label: string, props: Record<string, string> = {}) => (
    <div className={`field ${errs[k] ? 'has-err' : ''}`}>
      <label htmlFor={`co-${k}`}>{label}</label>
      <input id={`co-${k}`} value={f[k]} onChange={set(k)} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `co-${k}-e` : undefined} {...props} />
      {errs[k] && <p className="err" id={`co-${k}-e`} role="alert">{errs[k]}</p>}
    </div>
  );

  return (
    <Overlay variant="modal" label="Demo checkout" onClose={close}>
      <div className="checkout">
        <div className="detail__top"><p className="eyebrow">Demo checkout</p><CloseBtn onClick={close} label="Close checkout" /></div>
        {done ? (
          <div className="done">
            <CheckCircle2 size={44} aria-hidden="true" />
            <h2>Demo order confirmed</h2>
            <p>Reference <strong>{done.id}</strong> · {formatINR(done.total)}</p>
            <p className="muted">This was a simulation. No order was placed, no payment was taken and nothing was sent to {done.email}.</p>
            <button type="button" className="btn btn--primary" onClick={() => { clearCart(); setCheckoutOpen(false); goShop('all', 'featured'); }}>Back to the collection</button>
          </div>
        ) : cart.length === 0 ? (
          <div className="done"><h2>Your bag is empty</h2><button type="button" className="btn btn--primary" onClick={() => { setCheckoutOpen(false); goShop('all', 'featured'); }}>Browse products</button></div>
        ) : (
          <div className="checkout__grid">
            <form onSubmit={submit} noValidate className="form">
              <p className="banner"><ShieldCheck size={16} aria-hidden="true" /> Demo only — no payment details are requested and nothing is sent.</p>
              <h2 className="detail__h">Contact</h2>
              {field('name', 'Full name', { autoComplete: 'name' })}
              <div className="two">{field('email', 'Email', { type: 'email', autoComplete: 'email' })}{field('phone', 'Mobile number', { type: 'tel', autoComplete: 'tel-national', inputMode: 'numeric' })}</div>
              <h2 className="detail__h">Shipping address</h2>
              {field('address', 'Address', { autoComplete: 'street-address' })}
              <div className="three">{field('city', 'City', { autoComplete: 'address-level2' })}{field('state', 'State', { autoComplete: 'address-level1' })}{field('pin', 'PIN code', { inputMode: 'numeric', maxLength: '6', autoComplete: 'postal-code' })}</div>
              <fieldset className="ship"><legend className="detail__h">Delivery</legend>
                {(Object.keys(SHIP) as (keyof typeof SHIP)[]).map((k) => (
                  <label key={k} className={`ship__opt ${f.ship === k ? 'is-on' : ''}`}>
                    <input type="radio" name="ship" checked={f.ship === k} onChange={() => setF({ ...f, ship: k })} />
                    <span><strong>{SHIP[k].label}</strong><small>{SHIP[k].note}</small></span><b>{SHIP[k].cost ? formatINR(SHIP[k].cost) : 'Free'}</b>
                  </label>))}
              </fieldset>
              <button type="submit" className="btn btn--primary btn--block">Place demo order · {formatINR(total)}</button>
            </form>
            <aside className="summary" aria-label="Order summary">
              <h2 className="detail__h">Order summary</h2>
              <ul>{cart.map((l) => { const p = byId(l.productId); if (!p) return null;
                return <li key={l.key}><span>{p.name} × {l.qty}<small>{[l.selection.color, ...Object.values(l.selection.configs)].filter(Boolean).join(' · ')}</small></span><b>{formatINR(unitPrice(p, l.selection) * l.qty)}</b></li>; })}</ul>
              <p className="sum"><span>Subtotal</span><b>{formatINR(subtotal)}</b></p>
              <p className="sum"><span>Shipping ({SHIP[f.ship].label})</span><b>{ship ? formatINR(ship) : 'Free'}</b></p>
              <p className="sum sum--total"><span>Total</span><b>{formatINR(total)}</b></p>
            </aside>
          </div>
        )}
      </div>
    </Overlay>
  );
}
