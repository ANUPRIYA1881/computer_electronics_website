import { useShop } from '../store/ShopContext';
import type { CategoryFilter } from '../data/products';
import { Arrow, Lines, MaskReveal, Reveal, Img } from './ui';

const CATS: { id: CategoryFilter; name: string; copy: string; img: string; alt: string; cls: string; pos?: string }[] = [
  { id: 'laptops', name: 'Laptops', copy: 'Slim, powerful, made to travel.', img: '/media/products/air14.jpg', alt: 'NEXBYTE laptop open on a dark plinth', cls: 'cat--a' },
  { id: 'desktops', name: 'Desktop Computers', copy: 'Compact towers for focused work.', img: '/media/products/studio.jpg', alt: 'Desktop tower beside a monitor and keyboard', cls: 'cat--b' },
  { id: 'monitors', name: 'Monitors', copy: 'Clear, spacious displays.', img: '/media/products/view27.jpg', alt: 'Monitor on a desk with an orange wallpaper', cls: 'cat--c' },
  { id: 'mobile', name: 'Smartphones & Tablets', copy: 'Everyday devices, beautifully made.', img: '/media/cat-mobile.jpg', alt: 'Phones in white, orange and black before an orange light ring', cls: 'cat--d', pos: '55% 50%' },
  { id: 'audio', name: 'Audio', copy: 'Headphones and earbuds.', img: '/media/products/sound-one.jpg', alt: 'Black over-ear headphones with a copper ring', cls: 'cat--e' },
  { id: 'accessories', name: 'Accessories', copy: 'Power, hubs and everyday carry.', img: '/media/cat-accessories.jpg', alt: 'Laptop, tablet, headphones, hub and charging accessories on a dark surface', cls: 'cat--f', pos: '50% 60%' },
];

export default function Categories() {
  const { goShop } = useShop();
  return (
    <section className="section" id="categories" aria-labelledby="cat-title">
      <div className="container">
        <header className="section__head">
          <Reveal><p className="eyebrow">Shop by category</p></Reveal>
          <Lines id="cat-title" lines={['Find your next device.']} className="h2" />
        </header>
        <ul className="cats">
          {CATS.map((c, i) => (
            <li key={c.id} className={`cat ${c.cls}`}>
              <MaskReveal className="cat__reveal">
                <a href="#shop" className="cat__link" onClick={(e) => { e.preventDefault(); goShop(c.id); }} aria-label={`Shop ${c.name}`} style={{ transitionDelay: `${i * 0}ms` }}>
                  <Img src={c.img} alt={c.alt} className="cat__img" />
                  <span className="cat__shade" aria-hidden="true" />
                  <span className="cat__text"><strong>{c.name}</strong><span>{c.copy}</span></span>
                  <span className="cat__go" aria-hidden="true"><Arrow /></span>
                </a>
              </MaskReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
