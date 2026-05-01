export type Product = {
  id: number;
  name: string;
  cat: "Electronics" | "Fashion" | "Home" | "Books" | "Sports";
  price: number;
  emoji: string;
  desc: string;
  badge: string | null;
};

export const PRODUCTS: Product[] = [
  { id: 1, name: "Wireless Earbuds Pro", cat: "Electronics", price: 2499, emoji: "🎧", desc: "Premium sound quality with active noise cancellation. 30hr battery life, IPX5 water resistance.", badge: "Best seller" },
  { id: 2, name: "Running Shoes Ultra", cat: "Sports", price: 3299, emoji: "👟", desc: "Lightweight mesh upper with responsive cushioning. Perfect for daily runs and training.", badge: "New" },
  { id: 3, name: "Linen Shirt", cat: "Fashion", price: 899, emoji: "👔", desc: "Breathable 100% linen fabric. Classic relaxed fit, perfect for warm weather.", badge: null },
  { id: 4, name: "Smart Watch Series 5", cat: "Electronics", price: 8999, emoji: "⌚", desc: "AMOLED display, heart rate monitor, GPS, 7-day battery. Calls and notifications on your wrist.", badge: "Popular" },
  { id: 5, name: "Ceramic Plant Pot", cat: "Home", price: 449, emoji: "🪴", desc: "Hand-crafted ceramic with drainage hole. Comes with bamboo tray. Available in 3 sizes.", badge: null },
  { id: 6, name: "Fiction Bestseller Box", cat: "Books", price: 699, emoji: "📚", desc: "Curated set of 3 bestselling fiction novels. Perfect for avid readers. New titles every month.", badge: "Sale" },
  { id: 7, name: "Yoga Mat Pro", cat: "Sports", price: 1299, emoji: "🧘", desc: "6mm thick non-slip natural rubber. Eco-friendly, includes carry strap. 183cm × 61cm.", badge: null },
  { id: 8, name: "Bluetooth Speaker", cat: "Electronics", price: 1799, emoji: "🔊", desc: "360° surround sound, 20hr battery, waterproof. Connect two for stereo. Built-in mic.", badge: "Deal" },
  { id: 9, name: "Scented Candle Set", cat: "Home", price: 599, emoji: "🕯️", desc: "Set of 4 soy wax candles. Fragrances: Sandalwood, Lavender, Citrus, Vanilla. 40hr burn each.", badge: null },
  { id: 10, name: "Cotton Tote Bag", cat: "Fashion", price: 349, emoji: "👜", desc: "Heavy-duty 12oz canvas. Reinforced handles, inner zip pocket. Fits a 15\" laptop easily.", badge: null },
  { id: 11, name: "Mechanical Keyboard", cat: "Electronics", price: 4599, emoji: "⌨️", desc: "TKL layout with tactile switches. Per-key RGB, USB-C, N-key rollover. PBT keycaps.", badge: "New" },
  { id: 12, name: "Stainless Steel Bottle", cat: "Home", price: 799, emoji: "🍶", desc: "1L double-wall vacuum insulated. Keeps cold 24hr, hot 12hr. Leak-proof lid, BPA-free.", badge: null },
];

export const CATEGORIES = [
  { key: "Electronics", label: "Electronics", icon: "📱", tint: "#fdf0ed" },
  { key: "Fashion", label: "Fashion", icon: "👗", tint: "#edf7f2" },
  { key: "Home", label: "Home & Living", icon: "🏠", tint: "#f0f0ff" },
  { key: "Books", label: "Books", icon: "📚", tint: "#fffbea" },
  { key: "Sports", label: "Sports", icon: "⚽", tint: "#fef0f0" },
] as const;

export function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function getProduct(id: number) {
  return PRODUCTS.find((p) => p.id === id);
}
