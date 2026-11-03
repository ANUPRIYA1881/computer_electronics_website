export type InfoKey = 'contact' | 'shipping' | 'returns' | 'warranty' | 'faq' | 'about' | 'journal' | 'privacy' | 'terms' | 'support' | 'account' | 'security';

export const INFO: Record<InfoKey, { title: string; body: string[] }> = {
  contact: { title: 'Contact', body: ['NEXBYTE is a fictional concept brand, so there is no live support desk.', 'In a real store, this panel would list support email, phone hours and a contact form.'] },
  shipping: { title: 'Shipping information', body: ['Placeholder policy — illustrative only.', 'This demo offers Standard (free) and Express (₹349) delivery options at checkout. No parcel is ever shipped.'] },
  returns: { title: 'Returns information', body: ['Placeholder policy — illustrative only.', 'A real return window, condition rules and refund timelines would be configured here.'] },
  warranty: { title: 'Warranty information', body: ['Placeholder policy — illustrative only.', 'No warranty is offered because these are concept products with demo data.'] },
  faq: { title: 'FAQs', body: ['Is this a real store? No. NEXBYTE is a concept ecommerce showcase.', 'Do prices and specifications reflect real products? No. All prices, ratings and specifications are illustrative demo data.', 'Is my order real? No. Checkout is a simulation and takes no payment.'] },
  about: { title: 'About NEXBYTE', body: ['NEXBYTE is a fictional brand created to showcase a motion-first electronics storefront.', 'Technology, in its finest form.'] },
  journal: { title: 'Journal', body: ['Placeholder — the NEXBYTE journal is not published in this demo.'] },
  privacy: { title: 'Privacy', body: ['Placeholder policy — illustrative only.', 'This demo stores your cart in your own browser (localStorage). Newsletter and checkout forms are not sent anywhere.'] },
  terms: { title: 'Terms', body: ['Placeholder terms — illustrative only.', 'This website is a design and engineering showcase and does not sell products.'] },
  support: { title: 'Product information & support', body: ['Placeholder — in a live store, guides, manuals and a support centre would live here.', 'Every product page in this demo shows illustrative specifications.'] },
  account: { title: 'Demo account', body: ['Sign-in is not configured in this demo.', 'In a real store this would open your orders, saved addresses and wishlist.'] },
  security: { title: 'Secure demo checkout', body: ['The checkout is a clearly labelled simulation. It never asks for card or bank details and no payment is taken.', 'Form data stays in your browser and is discarded when the confirmation closes.'] },
};
