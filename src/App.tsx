import { AnimatePresence } from 'framer-motion';
import { ShopProvider, useShop } from './store/ShopContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Categories from './components/Categories';
import LaptopShowcase from './components/LaptopShowcase';
import Shop from './components/Shop';
import Workstation from './components/Workstation';
import Audio from './components/Audio';
import Accessories from './components/Accessories';
import Discover from './components/Discover';
import Story from './components/Story';
import Trust from './components/Trust';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import SearchOverlay from './components/SearchOverlay';
import ProductDetail from './components/ProductDetail';
import InfoModal from './components/InfoModal';
import Splash from './components/Splash';
import { SectionFx } from './components/ui';

function Layers() {
  const { cartOpen, searchOpen, checkoutOpen, info, detailId, toast } = useShop();
  return (
    <>
      <AnimatePresence>{detailId && <ProductDetail key="detail" />}</AnimatePresence>
      <AnimatePresence>{cartOpen && <CartDrawer key="cart" />}</AnimatePresence>
      <AnimatePresence>{searchOpen && <SearchOverlay key="search" />}</AnimatePresence>
      <AnimatePresence>{checkoutOpen && <Checkout key="checkout" />}</AnimatePresence>
      <AnimatePresence>{info && <InfoModal key="info" />}</AnimatePresence>
      <div className="toast" role="status" aria-live="polite">{toast && <span>{toast}</span>}</div>
    </>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Splash />
      <a className="skip" href="#shop">Skip to products</a>
      <Nav />
      <main>
        <SectionFx fx="hero"><Hero /></SectionFx>
        <SectionFx fx="rise" parallax><Intro /></SectionFx>
        <SectionFx fx="rise"><Categories /></SectionFx>
        <SectionFx fx="zoom"><LaptopShowcase /></SectionFx>
        <SectionFx fx="rise"><Shop /></SectionFx>
        <SectionFx fx="zoom" parallax><Workstation /></SectionFx>
        <SectionFx fx="left" parallax><Audio /></SectionFx>
        <SectionFx fx="right" parallax><Accessories /></SectionFx>
        <SectionFx fx="zoom" parallax><Discover /></SectionFx>
        <SectionFx fx="left" parallax><Story /></SectionFx>
        <SectionFx fx="fade"><Trust /></SectionFx>
        <SectionFx fx="rise"><Newsletter /></SectionFx>
      </main>
      <SectionFx fx="rise"><Footer /></SectionFx>
      <Layers />
    </ShopProvider>
  );
}
