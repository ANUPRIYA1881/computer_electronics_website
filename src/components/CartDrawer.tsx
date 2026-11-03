import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { byId, formatINR, unitPrice } from '../data/products';
import { useShop } from '../store/ShopContext';
import { Arrow, CloseBtn, Img, Overlay } from './ui';

export default function CartDrawer() {
  const { cart, count, subtotal, setQty, removeLine, clearCart, setCartOpen, setCheckoutOpen, goShop, maxQty, openProduct } = useShop();
  const close = () => setCartOpen(false);
  return (
    <Overlay variant="drawer" label="Shopping bag" onClose={close}>
      <div className="cart">
        <div className="cart__head"><h2>Your bag <span>({count})</span></h2><CloseBtn onClick={close} label="Close bag" /></div>
        {cart.length === 0 ? (
          <div className="cart__empty"><ShoppingBag size={34} aria-hidden="true" /><h3>Your bag is empty</h3><p>Add something from the collection to get started.</p>
            <button type="button" className="btn btn--primary" onClick={() => goShop('all', 'featured')}>Browse products <Arrow /></button></div>
        ) : (
          <>
            <ul className="cart__list">
              {cart.map((l) => {
                const p = byId(l.productId); if (!p) return null;
                const cfg = [l.selection.color, ...Object.values(l.selection.configs)].filter(Boolean).join(' · ');
                return (
                  <li key={l.key} className="line-item">
                    <button type="button" className="line-item__img" onClick={() => { close(); openProduct(p.id); }} aria-label={`View ${p.name}`}><Img src={p.images[0].src} alt="" /></button>
                    <div className="line-item__info">
                      <h3>{p.name}</h3><p className="muted">{cfg}</p>
                      <div className="line-item__row">
                        <div className="qty qty--small" role="group" aria-label={`Quantity for ${p.name}`}>
                          <button type="button" aria-label={`Decrease quantity of ${p.name}`} onClick={() => (l.qty > 1 ? setQty(l.key, l.qty - 1) : removeLine(l.key))}><Minus size={14} aria-hidden="true" /></button>
                          <output>{l.qty}</output>
                          <button type="button" aria-label={`Increase quantity of ${p.name}`} disabled={l.qty >= maxQty} onClick={() => setQty(l.key, l.qty + 1)}><Plus size={14} aria-hidden="true" /></button>
                        </div>
                        <strong>{formatINR(unitPrice(p, l.selection) * l.qty)}</strong>
                      </div>
                    </div>
                    <button type="button" className="icon-btn line-item__rm" aria-label={`Remove ${p.name}`} onClick={() => removeLine(l.key)}><Trash2 size={17} aria-hidden="true" /></button>
                  </li>
                );
              })}
            </ul>
            <div className="cart__foot">
              <p className="cart__sub"><span>Subtotal</span><strong>{formatINR(subtotal)}</strong></p>
              <p className="muted">Shipping is calculated at the demo checkout.</p>
              <button type="button" className="btn btn--primary btn--block" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Checkout (demo) <Arrow /></button>
              <button type="button" className="link" onClick={clearCart}>Clear bag</button>
            </div>
          </>
        )}
      </div>
    </Overlay>
  );
}
