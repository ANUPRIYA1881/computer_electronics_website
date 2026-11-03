import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { useShop, scrollToId } from '../store/ShopContext';
import type { CategoryFilter } from '../data/products';
import { AnimatePresence, CloseBtn, Overlay } from './ui';

const LINKS: { label: string; action: () => void; key: string }[] = [];

export function Wordmark() {
  return <span className="wordmark" aria-label="NEXBYTE">NEX<span>BYTE</span></span>;
}

export default function Nav() {
  const { count, setCartOpen, setSearchOpen, setInfo, goShop } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h(); window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const home = () => { if (window.location.hash.startsWith('#/p/')) window.history.replaceState(null, '', window.location.pathname); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const shop = (c: CategoryFilter) => () => goShop(c);
  const links = LINKS.length ? LINKS : [
    { key: 'home', label: 'Home', action: home },
    { key: 'computers', label: 'Computers', action: shop('computers') },
    { key: 'components', label: 'Components', action: shop('components') },
    { key: 'accessories', label: 'Accessories', action: shop('accessories') },
    { key: 'discover', label: 'Discover', action: () => scrollToId('discover') },
  ];

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
        <div className="nav__inner">
          <a href="#top" className="nav__brand" onClick={(e) => { e.preventDefault(); home(); }} aria-label="NEXBYTE home"><Wordmark /></a>
          <nav className="nav__links" aria-label="Primary">
            {links.map((l) => (<button key={l.key} type="button" className="nav__link" onClick={l.action}>{l.label}</button>))}
          </nav>
          <div className="nav__tools">
            <button type="button" className="icon-btn" aria-label="Search products" onClick={() => setSearchOpen(true)}><Search size={20} aria-hidden="true" /></button>
            <button type="button" className="icon-btn nav__account" aria-label="Demo account" onClick={() => setInfo('account')}><User size={20} aria-hidden="true" /></button>
            <button type="button" className="icon-btn nav__bag" aria-label={`Shopping bag, ${count} ${count === 1 ? 'item' : 'items'}`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} aria-hidden="true" />
              {count > 0 && <motion.span key={count} className="badge" initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ duration: 0.25 }}>{count}</motion.span>}
            </button>
            <button type="button" className="icon-btn nav__menu" aria-label="Open menu" onClick={() => setMenu(true)}><Menu size={22} aria-hidden="true" /></button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <Overlay variant="menu" label="Site menu" onClose={() => setMenu(false)}>
            <div className="menu">
              <div className="menu__head"><Wordmark /><CloseBtn onClick={() => setMenu(false)} label="Close menu" /></div>
              <ul className="menu__list">
                {links.map((l, i) => (
                  <motion.li key={l.key} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}>
                    <button type="button" onClick={() => { setMenu(false); window.setTimeout(l.action, 50); }}>{l.label}</button>
                  </motion.li>
                ))}
              </ul>
              <button type="button" className="menu__sub" onClick={() => { setMenu(false); setInfo('account'); }}>Demo account</button>
            </div>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}
