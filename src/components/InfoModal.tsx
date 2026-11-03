import { INFO } from '../store/info';
import { useShop } from '../store/ShopContext';
import { CloseBtn, Overlay } from './ui';

export default function InfoModal() {
  const { info, setInfo } = useShop();
  if (!info) return null;
  const c = INFO[info];
  return (
    <Overlay variant="modal" label={c.title} onClose={() => setInfo(null)}>
      <div className="info"><div className="detail__top"><p className="eyebrow">Demo placeholder</p><CloseBtn onClick={() => setInfo(null)} label="Close" /></div>
        <h2>{c.title}</h2>{c.body.map((t) => <p key={t}>{t}</p>)}</div>
    </Overlay>
  );
}
