import type { CategoryFilter } from '../data/products';
import type { InfoKey } from '../store/info';
import { useShop } from '../store/ShopContext';
import { Wordmark } from './Nav';

export default function Footer() {
  const { goShop, setInfo } = useShop();
  const shop = (label: string, c: CategoryFilter) => <li key={label}><button type="button" onClick={() => goShop(c)}>{label}</button></li>;
  const info = (label: string, k: InfoKey) => <li key={label}><button type="button" onClick={() => setInfo(k)}>{label}</button></li>;
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand"><Wordmark /><p>Technology, in its finest form. A concept brand showcase with illustrative products.</p></div>
        <nav aria-label="Shop"><h2>Shop</h2><ul>{[shop('Computers', 'computers'), shop('Monitors', 'monitors'), shop('Audio', 'audio'), shop('Accessories', 'accessories')]}</ul></nav>
        <nav aria-label="Support"><h2>Support</h2><ul>{[info('Contact', 'contact'), info('Shipping information', 'shipping'), info('Returns information', 'returns'), info('FAQs', 'faq')]}</ul></nav>
        <nav aria-label="Company"><h2>Company</h2><ul>{[info('About NEXBYTE', 'about'), info('Journal', 'journal')]}</ul></nav>
      </div>
      <div className="container footer__base">
        <p>© {new Date().getFullYear()} NEXBYTE — fictional concept brand. Demo only.</p>
        <ul>{[info('Privacy', 'privacy'), info('Terms', 'terms')]}</ul>
      </div>
    </footer>
  );
}
