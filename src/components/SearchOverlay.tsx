import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CATEGORY_LABELS, formatINR, matchesQuery, products } from '../data/products';
import { useShop } from '../store/ShopContext';
import { CloseBtn, Img, Overlay } from './ui';

const SUGGEST = ['laptop', 'headphones', 'monitor', 'charger', 'orange'];

export default function SearchOverlay() {
  const { setSearchOpen, setFilters, goShop, openProduct } = useShop();
  const [q, setQ] = useState('');
  const results = useMemo(() => (q.trim() ? products.filter((p) => matchesQuery(p, q)) : []), [q]);
  const close = () => setSearchOpen(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); if (!q.trim()) return;
    goShop('all', 'all'); setFilters({ query: q.trim() }); close();
  };
  return (
    <Overlay variant="top" label="Search products" onClose={close}>
      <div className="search">
        <form onSubmit={submit} role="search" className="search__form">
          <Search size={22} aria-hidden="true" />
          <label htmlFor="q" className="sr">Search products</label>
          <input id="q" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search laptops, audio, accessories…" autoComplete="off" />
          <CloseBtn onClick={close} label="Close search" />
        </form>
        {!q.trim() ? (
          <div className="search__hint"><p className="muted">Try</p>{SUGGEST.map((s) => <button key={s} type="button" className="chip" onClick={() => setQ(s)}>{s}</button>)}</div>
        ) : results.length === 0 ? (
          <div className="search__empty"><p>No products match “{q}”.</p><button type="button" className="link" onClick={() => setQ('')}>Reset search</button></div>
        ) : (
          <>
            <ul className="search__list" aria-live="polite">
              {results.slice(0, 5).map((p) => (
                <li key={p.id}><button type="button" onClick={() => { close(); openProduct(p.id); }}>
                  <Img src={p.images[0].src} alt="" /><span><strong>{p.name}</strong><small>{CATEGORY_LABELS[p.category]}</small></span><b>{formatINR(p.price)}</b></button></li>
              ))}
            </ul>
            <button type="button" className="btn btn--ghost" onClick={submit}>See all {results.length} in the collection</button>
          </>
        )}
      </div>
    </Overlay>
  );
}
