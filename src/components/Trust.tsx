import { BadgeCheck, LifeBuoy, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import type { InfoKey } from '../store/info';
import { useShop } from '../store/ShopContext';
import { Reveal } from './ui';

const ITEMS: { key: InfoKey; icon: typeof Truck; title: string; copy: string }[] = [
  { key: 'security', icon: ShieldCheck, title: 'Secure demo checkout', copy: 'A simulated flow that never asks for payment details.' },
  { key: 'support', icon: LifeBuoy, title: 'Product information', copy: 'Illustrative specifications on every product.' },
  { key: 'shipping', icon: Truck, title: 'Shipping', copy: 'Placeholder policy — illustrative only.' },
  { key: 'returns', icon: RotateCcw, title: 'Returns', copy: 'Placeholder policy — illustrative only.' },
  { key: 'warranty', icon: BadgeCheck, title: 'Warranty', copy: 'Placeholder policy — illustrative only.' },
];

export default function Trust() {
  const { setInfo } = useShop();
  return (
    <section className="trust" aria-label="Support and policies">
      <div className="container trust__row">
        {ITEMS.map((t, i) => (
          <Reveal key={t.key} delay={i * 0.05}>
            <button type="button" className="trust__item" onClick={() => setInfo(t.key)}>
              <t.icon size={22} aria-hidden="true" /><strong>{t.title}</strong><span>{t.copy}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
