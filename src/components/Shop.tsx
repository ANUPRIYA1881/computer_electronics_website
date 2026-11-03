import { useMemo } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { SearchX, X } from 'lucide-react';
import { CATEGORY_LABELS, matchesCategory, matchesQuery, products, type Category, type CategoryFilter } from '../data/products';
import { useShop, type Collection, type PriceKey, type SortKey } from '../store/ShopContext';
import ProductCard from './ProductCard';
import { Lines, Reveal } from './ui';

const TABS: { id: Collection | 'accessories'; label: string }[] = [
  { id: 'featured', label: 'Featured' }, { id: 'bestsellers', label: 'Bestsellers' }, { id: 'new', label: 'New Arrivals' },
  { id: 'accessories', label: 'Accessories' }, { id: 'all', label: 'All products' },
];
const CATS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' }, { id: 'computers', label: 'Computers' }, { id: 'components', label: 'Components' },
  ...(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => ({ id: c as CategoryFilter, label: CATEGORY_LABELS[c] })),
];
const PRICES: { id: PriceKey; label: string; test: (n: number) => boolean }[] = [
  { id: 'any', label: 'Any price', test: () => true },
  { id: 'u10', label: 'Under ₹10,000', test: (n) => n < 10000 },
  { id: '10-50', label: '₹10,000 – ₹50,000', test: (n) => n >= 10000 && n < 50000 },
  { id: '50-100', label: '₹50,000 – ₹1,00,000', test: (n) => n >= 50000 && n < 100000 },
  { id: 'o100', label: 'Above ₹1,00,000', test: (n) => n >= 100000 },
];
const COLOR_NAMES = Array.from(new Set(products.flatMap((p) => p.colors.map((c) => c.name)))).sort();

export default function Shop() {
  const { filters, setFilters, resetFilters } = useShop();
  const f = filters;

  const list = useMemo(() => {
    const price = PRICES.find((p) => p.id === f.price)!;
    let out = products.filter((p) => {
      if (f.collection === 'featured' && !p.featured) return false;
      if (f.collection === 'bestsellers' && !p.bestseller) return false;
      if (f.collection === 'new' && !p.isNew) return false;
      if (!matchesCategory(p, f.category)) return false;
      if (!price.test(p.price)) return false;
      if (f.color !== 'any' && !p.colors.some((c) => c.name === f.color)) return false;
      if (f.inStock && p.stock !== 'in') return false;
      if (f.onOffer && !p.originalPrice) return false;
      if (f.query.trim() && !matchesQuery(p, f.query)) return false;
      return true;
    });
    const s = [...out];
    if (f.sort === 'price-asc') s.sort((a, b) => a.price - b.price);
    else if (f.sort === 'price-desc') s.sort((a, b) => b.price - a.price);
    else if (f.sort === 'name') s.sort((a, b) => a.name.localeCompare(b.name));
    else s.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return s;
  }, [f]);

  const tabActive = (id: string) => (id === 'accessories' ? f.category === 'accessories' && f.collection === 'all' : id === f.collection && f.category !== 'accessories' || (id === 'all' && f.collection === 'all' && f.category !== 'accessories'));
  const pickTab = (id: string) => {
    if (id === 'accessories') setFilters({ category: 'accessories', collection: 'all' });
    else setFilters({ collection: id as Collection, category: f.category === 'accessories' ? 'all' : f.category });
  };
  const dirty = f.price !== 'any' || f.color !== 'any' || f.inStock || f.onOffer || f.query || f.category !== 'all' || f.collection !== 'all';

  return (
    <section className="section shop" id="shop" aria-labelledby="shop-title">
      <div className="container">
        <header className="section__head section__head--row">
          <div>
            <Reveal><p className="eyebrow">The collection</p></Reveal>
            <Lines id="shop-title" lines={['Made to work together.']} className="h2" />
          </div>
          <Reveal><p className="note">All products, prices and ratings are illustrative demo data.</p></Reveal>
        </header>

        <div className="tabs" role="tablist" aria-label="Collections">
          {TABS.map((t) => (
            <button key={t.id} role="tab" type="button" aria-selected={tabActive(t.id)} className={`tab ${tabActive(t.id) ? 'is-on' : ''}`} onClick={() => pickTab(t.id)}>{t.label}</button>
          ))}
        </div>

        <div className="chips" role="group" aria-label="Filter by category">
          {CATS.map((c) => (
            <button key={c.id} type="button" className={`chip ${f.category === c.id ? 'is-on' : ''}`} aria-pressed={f.category === c.id} onClick={() => setFilters({ category: c.id })}>{c.label}</button>
          ))}
        </div>

        <div className="toolbar">
          <label className="field field--inline"><span>Price</span>
            <select value={f.price} onChange={(e) => setFilters({ price: e.target.value as PriceKey })}>{PRICES.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}</select></label>
          <label className="field field--inline"><span>Colour</span>
            <select value={f.color} onChange={(e) => setFilters({ color: e.target.value })}><option value="any">Any colour</option>{COLOR_NAMES.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="check"><input type="checkbox" checked={f.inStock} onChange={(e) => setFilters({ inStock: e.target.checked })} /> In stock</label>
          <label className="check"><input type="checkbox" checked={f.onOffer} onChange={(e) => setFilters({ onOffer: e.target.checked })} /> On offer</label>
          <label className="field field--inline toolbar__sort"><span>Sort</span>
            <select value={f.sort} onChange={(e) => setFilters({ sort: e.target.value as SortKey })}>
              <option value="featured">Featured</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="name">Name</option>
            </select></label>
        </div>

        <div className="results" aria-live="polite">
          <p>{list.length} {list.length === 1 ? 'product' : 'products'}{f.query && <> for “{f.query}” <button type="button" className="link" onClick={() => setFilters({ query: '' })}><X size={13} aria-hidden="true" /> Clear search</button></>}</p>
          {dirty && <button type="button" className="link" onClick={resetFilters}>Reset all filters</button>}
        </div>

        {list.length === 0 ? (
          <div className="empty"><SearchX size={32} aria-hidden="true" /><h3>No products match</h3><p>Try removing a filter or searching for something else.</p>
            <button type="button" className="btn btn--ghost" onClick={resetFilters}>Reset search &amp; filters</button></div>
        ) : (
          <LayoutGroup><ul className="grid"><AnimatePresence mode="popLayout">{list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}</AnimatePresence></ul></LayoutGroup>
        )}
      </div>
    </section>
  );
}
