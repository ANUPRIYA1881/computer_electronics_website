export type Category = 'laptops' | 'desktops' | 'monitors' | 'mobile' | 'audio' | 'accessories';
export type CategoryFilter = 'all' | Category | 'computers' | 'components';

export interface ConfigOption { value: string; delta: number }
export interface ConfigGroup { id: string; label: string; options: ConfigOption[] }
export interface ColorOption { name: string; hex: string; image?: number }
export interface ProductImage { src: string; alt: string }

export interface Product {
  id: string;
  name: string;
  category: Category;
  sub?: 'laptop' | 'hub' | 'power' | 'mouse' | 'wearable';
  tags: string[];
  price: number;
  originalPrice?: number;
  short: string;
  description: string;
  images: ProductImage[];
  specs: [string, string][];
  colors: ColorOption[];
  configs: ConfigGroup[];
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  stock: 'in' | 'low';
  rating?: { value: number; count: number };
}

export const CATEGORY_LABELS: Record<Category, string> = {
  laptops: 'Laptops',
  desktops: 'Desktop Computers',
  monitors: 'Monitors',
  mobile: 'Smartphones & Tablets',
  audio: 'Audio',
  accessories: 'Accessories',
};

const opt = (value: string, delta = 0): ConfigOption => ({ value, delta });
const M = '/media/products/';

export const products: Product[] = [
  {
    id: 'air-14', name: 'NEXBYTE AIR 14', category: 'laptops', sub: 'laptop', tags: ['laptop', 'portable', 'thin', 'aluminium'],
    price: 94900, originalPrice: 104900, featured: true, bestseller: true, isNew: true, stock: 'in', rating: { value: 4.7, count: 212 },
    short: 'Ultra-thin 14-inch laptop with a machined metal body.',
    description: 'A slim, light everyday laptop built around a precision-machined metal shell, a crisp 14-inch display and a keyboard made for long sessions.',
    images: [
      { src: M + 'air14.jpg', alt: 'NEXBYTE AIR 14 laptop open on a dark plinth with warm edge lighting' },
      { src: M + 'air14-hinge.jpg', alt: 'Close-up of the AIR 14 hinge and side port' },
      { src: M + 'air14-keys.jpg', alt: 'Close-up of the AIR 14 backlit keyboard' },
      { src: M + 'air14-ports.jpg', alt: 'Side profile of the AIR 14 ventilation and edge detail' },
    ],
    specs: [['Display', '14-inch'], ['Body', 'Machined metal'], ['Keyboard', 'Backlit, full-size'], ['Ports', 'USB-C, headphone jack'], ['Wireless', 'Wi-Fi and Bluetooth']],
    colors: [{ name: 'Titanium Silver', hex: '#C9CECF' }, { name: 'Graphite', hex: '#4A4D4F' }],
    configs: [
      { id: 'memory', label: 'Memory', options: [opt('16 GB'), opt('24 GB', 16000)] },
      { id: 'storage', label: 'Storage', options: [opt('512 GB'), opt('1 TB', 14000), opt('2 TB', 32000)] },
    ],
  },
  {
    id: 'pro-16', name: 'NEXBYTE PRO 16', category: 'laptops', sub: 'laptop', tags: ['laptop', 'creator', 'large display'],
    price: 184900, featured: true, bestseller: true, stock: 'in', rating: { value: 4.8, count: 134 },
    short: 'Large 16-inch canvas for demanding creative work.',
    description: 'A roomy 16-inch display, a refined keyboard deck and the headroom for heavier projects, wrapped in the same machined shell as the rest of the family.',
    images: [
      { src: M + 'pro16.jpg', alt: 'NEXBYTE PRO 16 laptop glowing against a dark background' },
      { src: M + 'air14-keys.jpg', alt: 'Close-up of the backlit keyboard' },
      { src: M + 'air14-ports.jpg', alt: 'Side profile showing ventilation detail' },
    ],
    specs: [['Display', '16-inch'], ['Body', 'Machined metal'], ['Keyboard', 'Backlit, full-size'], ['Trackpad', 'Large glass-style surface'], ['Wireless', 'Wi-Fi and Bluetooth']],
    colors: [{ name: 'Graphite', hex: '#4A4D4F' }, { name: 'Silver', hex: '#C9CECF' }],
    configs: [
      { id: 'memory', label: 'Memory', options: [opt('32 GB'), opt('64 GB', 38000)] },
      { id: 'storage', label: 'Storage', options: [opt('1 TB'), opt('2 TB', 28000), opt('4 TB', 72000)] },
    ],
  },
  {
    id: 'studio-desktop', name: 'NEXBYTE STUDIO DESKTOP', category: 'desktops', tags: ['desktop', 'workstation', 'compact'],
    price: 129900, featured: true, bestseller: true, stock: 'in', rating: { value: 4.6, count: 88 },
    short: 'Compact desktop tower for focused, all-day work.',
    description: 'A quiet, compact desktop designed to sit beside your display and stay out of the way while your ideas get the room.',
    images: [
      { src: M + 'studio.jpg', alt: 'STUDIO DESKTOP beside a display, keyboard and mouse on a dark desk' },
      { src: M + 'studio-side.jpg', alt: 'Angled view of the workstation setup' },
    ],
    specs: [['Form factor', 'Compact tower'], ['Finish', 'Brushed metal'], ['Connectivity', 'Wi-Fi, Bluetooth, USB-C'], ['Pairs with', 'VIEW displays']],
    colors: [{ name: 'Silver', hex: '#C9CECF' }],
    configs: [
      { id: 'memory', label: 'Memory', options: [opt('32 GB'), opt('64 GB', 30000)] },
      { id: 'storage', label: 'Storage', options: [opt('1 TB'), opt('2 TB', 26000), opt('4 TB', 60000)] },
    ],
  },
  {
    id: 'view-27', name: 'NEXBYTE VIEW 27', category: 'monitors', tags: ['monitor', 'display', '27-inch'],
    price: 44900, originalPrice: 49900, featured: true, stock: 'in', rating: { value: 4.5, count: 301 },
    short: '27-inch display with slim bezels and a clean stand.',
    description: 'A clear 27-inch display with slim bezels and a minimal stand, tuned for long days of reading, editing and building.',
    images: [
      { src: M + 'view27.jpg', alt: 'VIEW 27 display on a desk showing an orange wallpaper' },
      { src: M + 'studio.jpg', alt: 'VIEW display paired with the STUDIO DESKTOP' },
    ],
    specs: [['Size', '27-inch'], ['Bezel', 'Slim'], ['Stand', 'Minimal metal stand'], ['Input', 'USB-C and HDMI']],
    colors: [{ name: 'Silver', hex: '#C9CECF' }],
    configs: [{ id: 'stand', label: 'Stand', options: [opt('Standard stand'), opt('Height-adjust stand', 6000)] }],
  },
  {
    id: 'view-32', name: 'NEXBYTE VIEW 32', category: 'monitors', tags: ['monitor', 'display', '32-inch', 'large'],
    price: 74900, isNew: true, stock: 'low', rating: { value: 4.6, count: 57 },
    short: 'A larger 32-inch canvas for multitasking and creative work.',
    description: 'More room for timelines, spreadsheets and side-by-side windows, with the same slim bezel and quiet industrial design.',
    images: [
      { src: M + 'view32.jpg', alt: 'VIEW 32 display showing a soft gold wallpaper' },
      { src: M + 'studio-side.jpg', alt: 'VIEW display in a desktop workstation' },
    ],
    specs: [['Size', '32-inch'], ['Bezel', 'Slim'], ['Stand', 'Minimal metal stand'], ['Input', 'USB-C and HDMI']],
    colors: [{ name: 'Graphite', hex: '#4A4D4F' }],
    configs: [{ id: 'stand', label: 'Stand', options: [opt('Standard stand'), opt('Height-adjust stand', 6000)] }],
  },
  {
    id: 'phone-one', name: 'NEXBYTE PHONE ONE', category: 'mobile', tags: ['phone', 'smartphone', 'mobile'],
    price: 79900, isNew: true, featured: true, stock: 'in', rating: { value: 4.4, count: 176 },
    short: 'A refined smartphone with a metal frame and edge-to-edge display.',
    description: 'A slim, balanced smartphone with a metal frame and a bright edge-to-edge display. Pick your finish; the gallery shows each colour.',
    images: [
      { src: M + 'phone.jpg', alt: 'PHONE ONE standing on a dark plinth' },
      { src: M + 'phone-colors.jpg', alt: 'PHONE ONE in white, orange and black finishes in front of an orange light ring' },
    ],
    specs: [['Frame', 'Metal'], ['Display', 'Edge-to-edge'], ['Camera', 'Multi-lens rear system'], ['Finishes', 'Three colours']],
    colors: [{ name: 'Titanium Black', hex: '#3A3A3C', image: 0 }, { name: 'Ember Orange', hex: '#E87532', image: 1 }, { name: 'Silver White', hex: '#E8E8E6', image: 1 }],
    configs: [{ id: 'storage', label: 'Storage', options: [opt('256 GB'), opt('512 GB', 10000), opt('1 TB', 30000)] }],
  },
  {
    id: 'tab-11', name: 'NEXBYTE TAB 11', category: 'mobile', tags: ['tablet', 'mobile', 'portable'],
    price: 54900, stock: 'in', rating: { value: 4.5, count: 99 },
    short: 'A bright 11-inch tablet for sketching, reading and notes.',
    description: 'A light, bright tablet that works as a reading screen, a notebook or a second display at your desk.',
    images: [{ src: M + 'tab.jpg', alt: 'TAB 11 tablet standing on a dark plinth with warm backlight' }],
    specs: [['Display', '11-inch'], ['Body', 'Slim metal'], ['Wireless', 'Wi-Fi and Bluetooth']],
    colors: [{ name: 'Silver', hex: '#C9CECF' }],
    configs: [{ id: 'storage', label: 'Storage', options: [opt('128 GB'), opt('256 GB', 8000), opt('512 GB', 20000)] }],
  },
  {
    id: 'watch-s', name: 'NEXBYTE WATCH S', category: 'accessories', sub: 'wearable', tags: ['watch', 'wearable'],
    price: 29900, isNew: true, stock: 'low', rating: { value: 4.3, count: 64 },
    short: 'A round smartwatch with a metal case and soft strap.',
    description: 'A round metal watch with a clear dial and a comfortable strap, designed to sit quietly alongside your other NEXBYTE devices.',
    images: [{ src: M + 'watch.jpg', alt: 'WATCH S smartwatch on a round dark plinth' }],
    specs: [['Case', 'Metal'], ['Strap', 'Soft sport band'], ['Wireless', 'Bluetooth']],
    colors: [{ name: 'Titanium', hex: '#9EA3A4' }],
    configs: [{ id: 'size', label: 'Case size', options: [opt('42 mm'), opt('46 mm', 2000)] }],
  },
  {
    id: 'sound-one', name: 'NEXBYTE SOUND ONE', category: 'audio', tags: ['headphones', 'over-ear', 'wireless'],
    price: 32900, originalPrice: 36900, featured: true, bestseller: true, stock: 'in', rating: { value: 4.7, count: 248 },
    short: 'Over-ear wireless headphones with soft leather-style cushions.',
    description: 'Over-ear headphones with deep cushions, a metal-accented frame and a copper-ringed earcup detail.',
    images: [{ src: M + 'sound-one.jpg', alt: 'SOUND ONE over-ear headphones in black with a copper ring on the earcup' }],
    specs: [['Style', 'Over-ear'], ['Cushions', 'Soft leather-style'], ['Accent', 'Copper earcup ring'], ['Wireless', 'Bluetooth']],
    colors: [{ name: 'Onyx', hex: '#16181A' }],
    configs: [],
  },
  {
    id: 'buds-pro', name: 'NEXBYTE BUDS PRO', category: 'audio', tags: ['earbuds', 'wireless', 'charging case'],
    price: 14900, isNew: true, featured: true, bestseller: true, stock: 'in', rating: { value: 4.6, count: 389 },
    short: 'Wireless earbuds in a compact metal-trimmed charging case.',
    description: 'Small, comfortable earbuds that live in a pocket-sized charging case with a soft status light.',
    images: [
      { src: M + 'buds.jpg', alt: 'BUDS PRO earbuds resting in their open charging case' },
      { src: M + 'buds-open.jpg', alt: 'Close-up of BUDS PRO earbuds in the case' },
    ],
    specs: [['Style', 'In-ear'], ['Case', 'Charging case'], ['Wireless', 'Bluetooth']],
    colors: [{ name: 'Graphite', hex: '#2B2D2F' }],
    configs: [],
  },
  {
    id: 'dock-8', name: 'NEXBYTE DOCK 8', category: 'accessories', sub: 'hub', tags: ['hub', 'dock', 'usb-c', 'component'],
    price: 7900, stock: 'in', rating: { value: 4.4, count: 120 },
    short: 'Slim multi-port hub for laptops and tablets.',
    description: 'One slim hub to bring your display, storage and accessories together through a single cable.',
    images: [{ src: M + 'dock.jpg', alt: 'DOCK 8 hub with braided cables connected' }],
    specs: [['Type', 'Multi-port hub'], ['Cables', 'Braided'], ['Host connection', 'USB-C']],
    colors: [{ name: 'Black', hex: '#16181A' }],
    configs: [],
  },
  {
    id: 'power-20k', name: 'NEXBYTE POWER 20K', category: 'accessories', sub: 'power', tags: ['power bank', 'charging', 'component'],
    price: 4900, stock: 'in', rating: { value: 4.5, count: 203 },
    short: 'Slim power bank with an orange status light.',
    description: 'A slim, matte power bank that keeps phones, tablets and earbuds topped up on the move.',
    images: [{ src: M + 'power.jpg', alt: 'POWER 20K slim black power bank with an orange indicator light' }],
    specs: [['Type', 'Power bank'], ['Finish', 'Matte black'], ['Indicator', 'Orange status light']],
    colors: [{ name: 'Black', hex: '#16181A' }],
    configs: [],
  },
  {
    id: 'charge-65', name: 'NEXBYTE CHARGE 65', category: 'accessories', sub: 'power', tags: ['charger', 'wall charger', 'component'],
    price: 3490, originalPrice: 3990, stock: 'in', rating: { value: 4.5, count: 276 },
    short: 'Compact wall charger with dual USB ports.',
    description: 'A compact wall charger that keeps a laptop and a phone powered from a single outlet.',
    images: [{ src: M + 'charger.jpg', alt: 'CHARGE 65 compact white wall charger' }],
    specs: [['Type', 'Wall charger'], ['Ports', 'Dual USB'], ['Finish', 'Matte white']],
    colors: [{ name: 'White', hex: '#F2F2EE' }],
    configs: [],
  },
  {
    id: 'mouse-m1', name: 'NEXBYTE MOUSE M1', category: 'accessories', sub: 'mouse', tags: ['mouse', 'wireless', 'productivity'],
    price: 2990, stock: 'in', rating: { value: 4.3, count: 342 },
    short: 'Low-profile wireless mouse with a soft matte shell.',
    description: 'A comfortable, low-profile wireless mouse that keeps your hand relaxed through long working days.',
    images: [{ src: M + 'mouse.jpg', alt: 'MOUSE M1 black wireless mouse with a USB receiver' }],
    specs: [['Type', 'Wireless mouse'], ['Finish', 'Matte black'], ['Connection', 'USB receiver']],
    colors: [{ name: 'Onyx', hex: '#16181A' }],
    configs: [],
  },
];

export interface Selection { color: string; configs: Record<string, string> }

export const byId = (id: string) => products.find((p) => p.id === id);

export const defaultSelection = (p: Product): Selection => ({
  color: p.colors[0]?.name ?? '',
  configs: Object.fromEntries(p.configs.map((c) => [c.id, c.options[0].value])),
});

export const unitPrice = (p: Product, s: Selection) =>
  p.price + p.configs.reduce((sum, g) => sum + (g.options.find((o) => o.value === s.configs[g.id])?.delta ?? 0), 0);

export const unitOriginal = (p: Product, s: Selection) =>
  p.originalPrice ? p.originalPrice + (unitPrice(p, s) - p.price) : undefined;

export const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export const matchesCategory = (p: Product, c: CategoryFilter) => {
  if (c === 'all') return true;
  if (c === 'computers') return p.category === 'laptops' || p.category === 'desktops';
  if (c === 'components') return p.category === 'monitors' || p.tags.includes('component');
  return p.category === c;
};

export const matchesQuery = (p: Product, q: string) => {
  const hay = [p.name, CATEGORY_LABELS[p.category], p.short, p.description, ...p.tags, ...p.colors.map((c) => c.name), ...p.specs.map((s) => s[1])]
    .join(' ').toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
};
