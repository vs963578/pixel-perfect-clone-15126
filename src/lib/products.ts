export type Product = {
  id: number;
  name: string;
  cat: "Electronics" | "Fashion" | "Home" | "Books" | "Sports";
  price: number;
  emoji: string;
  image: string;
  desc: string;
  badge: string | null;
};

function productImage(prompt: string, imageSize = "square_hd") {
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${imageSize}`;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    cat: "Electronics",
    price: 2499,
    emoji: "🎧",
    image: productImage(
      "premium wireless earbuds in matte black charging case, clean e-commerce product photography, soft studio lighting, neutral warm background, realistic details, high end retail",
    ),
    desc: "Premium sound quality with active noise cancellation. 30hr battery life, IPX5 water resistance.",
    badge: "Best seller",
  },
  {
    id: 2,
    name: "Running Shoes Ultra",
    cat: "Sports",
    price: 3299,
    emoji: "👟",
    image: productImage(
      "modern performance running shoes in sand and white tones, dynamic e-commerce product photography, soft shadows, premium retail styling, realistic mesh texture",
    ),
    desc: "Lightweight mesh upper with responsive cushioning. Perfect for daily runs and training.",
    badge: "New",
  },
  {
    id: 3,
    name: "Linen Shirt",
    cat: "Fashion",
    price: 899,
    emoji: "👔",
    image: productImage(
      "minimal beige linen shirt neatly folded, elevated fashion e-commerce product photography, warm editorial lighting, realistic natural fabric texture",
    ),
    desc: "Breathable 100% linen fabric. Classic relaxed fit, perfect for warm weather.",
    badge: null,
  },
  {
    id: 4,
    name: "Smart Watch Series 5",
    cat: "Electronics",
    price: 8999,
    emoji: "⌚",
    image: productImage(
      "sleek premium smartwatch with black strap and illuminated display, luxury tech product photography, soft reflections, modern neutral backdrop, realistic details",
    ),
    desc: "AMOLED display, heart rate monitor, GPS, 7-day battery. Calls and notifications on your wrist.",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Ceramic Plant Pot",
    cat: "Home",
    price: 449,
    emoji: "🪴",
    image: productImage(
      "handcrafted ceramic plant pot with small green plant, calm home decor product photography, natural daylight, warm minimalist interior background",
    ),
    desc: "Hand-crafted ceramic with drainage hole. Comes with bamboo tray. Available in 3 sizes.",
    badge: null,
  },
  {
    id: 6,
    name: "Fiction Bestseller Box",
    cat: "Books",
    price: 699,
    emoji: "📚",
    image: productImage(
      "stack of beautifully designed fiction books tied as a gift set, bookstore style product photography, warm cozy lighting, realistic paper textures",
    ),
    desc: "Curated set of 3 bestselling fiction novels. Perfect for avid readers. New titles every month.",
    badge: "Sale",
  },
  {
    id: 7,
    name: "Yoga Mat Pro",
    cat: "Sports",
    price: 1299,
    emoji: "🧘",
    image: productImage(
      "premium rolled yoga mat with carry strap, clean wellness product photography, soft natural lighting, muted studio backdrop, realistic rubber texture",
    ),
    desc: "6mm thick non-slip natural rubber. Eco-friendly, includes carry strap. 183cm x 61cm.",
    badge: null,
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    cat: "Electronics",
    price: 1799,
    emoji: "🔊",
    image: productImage(
      "compact portable bluetooth speaker in charcoal finish, premium tech product photo, soft studio light, neutral background, realistic fabric grille texture",
    ),
    desc: "360-degree surround sound, 20hr battery, waterproof. Connect two for stereo. Built-in mic.",
    badge: "Deal",
  },
  {
    id: 9,
    name: "Scented Candle Set",
    cat: "Home",
    price: 599,
    emoji: "🕯️",
    image: productImage(
      "set of four scented candles in elegant glass jars, premium home fragrance product photography, warm glow, soft natural shadows, upscale styling",
    ),
    desc: "Set of 4 soy wax candles. Fragrances: Sandalwood, Lavender, Citrus, Vanilla. 40hr burn each.",
    badge: null,
  },
  {
    id: 10,
    name: "Cotton Tote Bag",
    cat: "Fashion",
    price: 349,
    emoji: "👜",
    image: productImage(
      "heavy cotton tote bag in natural canvas color, fashion accessory product photography, clean studio backdrop, realistic material texture, premium retail look",
    ),
    desc: "Heavy-duty 12oz canvas. Reinforced handles, inner zip pocket. Fits a 15 inch laptop easily.",
    badge: null,
  },
  {
    id: 11,
    name: "Mechanical Keyboard",
    cat: "Electronics",
    price: 4599,
    emoji: "⌨️",
    image: productImage(
      "compact mechanical keyboard with warm backlight, premium desk setup product photography, realistic keycaps, soft shadows, minimalist studio background",
    ),
    desc: "TKL layout with tactile switches. Per-key RGB, USB-C, N-key rollover. PBT keycaps.",
    badge: "New",
  },
  {
    id: 12,
    name: "Stainless Steel Bottle",
    cat: "Home",
    price: 799,
    emoji: "🍶",
    image: productImage(
      "sleek stainless steel insulated water bottle in brushed metal finish, modern lifestyle product photography, crisp studio lighting, realistic reflections",
    ),
    desc: "1L double-wall vacuum insulated. Keeps cold 24hr, hot 12hr. Leak-proof lid, BPA-free.",
    badge: null,
  },
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
