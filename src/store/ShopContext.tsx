import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react';
import { byId, defaultSelection, unitPrice, type CategoryFilter, type Selection } from '../data/products';
import type { InfoKey } from './info';

export type Collection = 'all' | 'featured' | 'bestsellers' | 'new';
export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';
export type PriceKey = 'any' | 'u10' | '10-50' | '50-100' | 'o100';

export interface Filters {
  collection: Collection; category: CategoryFilter; price: PriceKey; color: string;
  inStock: boolean; onOffer: boolean; sort: SortKey; query: string;
}
export const DEFAULT_FILTERS: Filters = { collection: 'featured', category: 'all', price: 'any', color: 'any', inStock: false, onOffer: false, sort: 'featured', query: '' };

export interface CartLine { key: string; productId: string; qty: number; selection: Selection }
type Action =
  | { type: 'add'; productId: string; selection: Selection; qty: number }
  | { type: 'qty'; key: string; qty: number }
  | { type: 'remove'; key: string }
  | { type: 'clear' };

export const lineKey = (id: string, s: Selection) => `${id}|${s.color}|${Object.entries(s.configs).sort().map(([k, v]) => `${k}:${v}`).join(',')}`;
const MAX_QTY = 10;

function reducer(state: CartLine[], a: Action): CartLine[] {
  switch (a.type) {
    case 'add': {
      const key = lineKey(a.productId, a.selection);
      const ex = state.find((l) => l.key === key);
      if (ex) return state.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + a.qty) } : l));
      return [...state, { key, productId: a.productId, selection: a.selection, qty: Math.min(MAX_QTY, a.qty) }];
    }
    case 'qty': return state.map((l) => (l.key === a.key ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, a.qty)) } : l));
    case 'remove': return state.filter((l) => l.key !== a.key);
    case 'clear': return [];
  }
}

const STORE_KEY = 'nexbyte-cart-v1';
function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed.filter((l) => byId(l.productId) && l.qty > 0) : [];
  } catch { return []; }
}

export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
};

interface Ctx {
  cart: CartLine[]; count: number; subtotal: number;
  addToCart: (id: string, sel?: Selection, qty?: number) => void;
  setQty: (key: string, qty: number) => void; removeLine: (key: string) => void; clearCart: () => void;
  filters: Filters; setFilters: (f: Partial<Filters>) => void; resetFilters: () => void;
  goShop: (category?: CategoryFilter, collection?: Collection) => void;
  cartOpen: boolean; setCartOpen: (b: boolean) => void;
  searchOpen: boolean; setSearchOpen: (b: boolean) => void;
  checkoutOpen: boolean; setCheckoutOpen: (b: boolean) => void;
  info: InfoKey | null; setInfo: (k: InfoKey | null) => void;
  detailId: string | null; openProduct: (id: string) => void; closeProduct: () => void;
  toast: string; maxQty: number;
}
const ShopCtx = createContext<Ctx | null>(null);
export const useShop = () => { const c = useContext(ShopCtx); if (!c) throw new Error('ShopProvider missing'); return c; };

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(reducer, undefined, loadCart);
  const [filters, setF] = useState<Filters>(DEFAULT_FILTERS);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [info, setInfo] = useState<InfoKey | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<number>();

  useEffect(() => { try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch { /* storage unavailable */ } }, [cart]);

  const { count, subtotal } = useMemo(() => {
    let c = 0, s = 0;
    for (const l of cart) { const p = byId(l.productId); if (!p) continue; c += l.qty; s += unitPrice(p, l.selection) * l.qty; }
    return { count: c, subtotal: s };
  }, [cart]);

  const say = useCallback((m: string) => {
    setToast(m); window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2600);
  }, []);

  const addToCart = useCallback((id: string, sel?: Selection, qty = 1) => {
    const p = byId(id); if (!p) return;
    dispatch({ type: 'add', productId: id, selection: sel ?? defaultSelection(p), qty });
    say(`${p.name} added to your bag`);
  }, [say]);

  const setFilters = useCallback((f: Partial<Filters>) => setF((prev) => ({ ...prev, ...f })), []);
  const resetFilters = useCallback(() => setF({ ...DEFAULT_FILTERS, collection: 'all' }), []);

  const closeProduct = useCallback(() => {
    if (window.location.hash.startsWith('#/p/')) window.history.back(); else setDetailId(null);
  }, []);
  const openProduct = useCallback((id: string) => {
    window.history.pushState(null, '', `#/p/${id}`); setDetailId(id);
  }, []);

  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#\/p\/(.+)$/);
      setDetailId(m && byId(m[1]) ? m[1] : null);
    };
    sync(); window.addEventListener('popstate', sync); window.addEventListener('hashchange', sync);
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync); };
  }, []);

  const goShop = useCallback((category: CategoryFilter = 'all', collection: Collection = 'all') => {
    setF({ ...DEFAULT_FILTERS, category, collection });
    setCartOpen(false); setSearchOpen(false);
    if (window.location.hash.startsWith('#/p/')) { window.history.replaceState(null, '', window.location.pathname); setDetailId(null); }
    window.setTimeout(() => scrollToId('shop'), 60);
  }, []);

  const value: Ctx = {
    cart, count, subtotal, addToCart,
    setQty: (key, qty) => dispatch({ type: 'qty', key, qty }),
    removeLine: (key) => dispatch({ type: 'remove', key }),
    clearCart: () => dispatch({ type: 'clear' }),
    filters, setFilters, resetFilters, goShop,
    cartOpen, setCartOpen, searchOpen, setSearchOpen, checkoutOpen, setCheckoutOpen,
    info, setInfo, detailId, openProduct, closeProduct, toast, maxQty: MAX_QTY,
  };
  return <ShopCtx.Provider value={value}>{children}</ShopCtx.Provider>;
}
