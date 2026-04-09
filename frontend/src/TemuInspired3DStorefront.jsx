import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  BadgePercent,
  Heart,
  Menu,
  Sparkles,
  ChevronLeft,
  Plus,
  Minus,
  CreditCard,
  MapPin,
  User,
  Package,
  Store,
  Wallet,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "GlowPods Pro",
    price: 19.99,
    oldPrice: 39.99,
    rating: 4.8,
    tag: "Hot Deal",
    emoji: "🎧",
    color: "linear-gradient(135deg, #fb923c 0%, #ef4444 100%)",
    category: "Electronics",
    description: "Wireless earbuds with deep bass, low-latency audio, and sleek pocket charging.",
  },
  {
    id: 2,
    name: "CloudStep Sneakers",
    price: 24.5,
    oldPrice: 59.0,
    rating: 4.7,
    tag: "Best Seller",
    emoji: "👟",
    color: "linear-gradient(135deg, #60a5fa 0%, #06b6d4 100%)",
    category: "Fashion",
    description: "Soft everyday sneakers designed for comfort, street style, and light running.",
  },
  {
    id: 3,
    name: "Luma Desk Lamp",
    price: 14.99,
    oldPrice: 29.99,
    rating: 4.6,
    tag: "New",
    emoji: "💡",
    color: "linear-gradient(135deg, #facc15 0%, #f97316 100%)",
    category: "Home",
    description: "Warm ambient desk lamp with adjustable tilt and a cozy glow for workspaces.",
  },
  {
    id: 4,
    name: "SnapGrip Bottle",
    price: 9.99,
    oldPrice: 19.99,
    rating: 4.9,
    tag: "Top Rated",
    emoji: "🍼",
    color: "linear-gradient(135deg, #34d399 0%, #22c55e 100%)",
    category: "Accessories",
    description: "Portable grip bottle with leakproof lid and a travel-friendly silhouette.",
  },
  {
    id: 5,
    name: "PixelMat Keyboard",
    price: 27.99,
    oldPrice: 74.99,
    rating: 4.8,
    tag: "Flash Sale",
    emoji: "⌨️",
    color: "linear-gradient(135deg, #e879f9 0%, #ec4899 100%)",
    category: "Electronics",
    description: "Compact mechanical keyboard with responsive keys and colorful creator vibes.",
  },
  {
    id: 6,
    name: "Nova Sling Bag",
    price: 17.99,
    oldPrice: 42.99,
    rating: 4.5,
    tag: "Limited",
    emoji: "👜",
    color: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
    category: "Fashion",
    description: "Minimal sling bag with urban styling, smart pockets, and everyday versatility.",
  },
];

const categories = ["Trending", "Electronics", "Fashion", "Home", "Beauty", "Accessories", "Gadgets"];
const navItems = ["Home", "Product", "Cart", "Checkout", "Profile"];
const paymentProviders = [
  { id: "myfatoorah", name: "MyFatoorah", subtitle: "Popular in Kuwait & GCC" },
  { id: "tap", name: "Tap Payments", subtitle: "Cards, Apple Pay, mada, KNET" },
  { id: "stripe", name: "Stripe", subtitle: "Global cards and wallets" },
];

async function createCheckoutSession({ provider, items, customer, totals }) {
  const response = await fetch("/api/payments/create-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, items, customer, totals }),
  });

  if (!response.ok) {
    throw new Error("Unable to create payment session");
  }

  return response.json();
}

function ui() {
  return {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #fff7ed 0%, #ffffff 25%, #f8fafc 100%)",
      color: "#0f172a",
    },
    shell: { maxWidth: 1200, margin: "0 auto", padding: "0 16px" },
    header: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      borderBottom: "1px solid rgba(255,255,255,0.5)",
      background: "rgba(255,255,255,0.8)",
      backdropFilter: "blur(14px)",
    },
    row: { display: "flex", alignItems: "center", gap: 16 },
    between: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 },
    logo: {
      borderRadius: 16,
      background: "#f97316",
      padding: "10px 14px",
      color: "white",
      fontWeight: 900,
      fontSize: 18,
      border: 0,
      cursor: "pointer",
      boxShadow: "0 10px 24px rgba(251,146,60,0.3)",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      background: "#ffedd5",
      color: "#c2410c",
      padding: "6px 10px",
      fontSize: 12,
      fontWeight: 700,
    },
    whiteBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      background: "rgba(255,255,255,0.2)",
      color: "white",
      padding: "6px 10px",
      fontSize: 12,
      fontWeight: 700,
      backdropFilter: "blur(8px)",
    },
    inputWrap: { position: "relative", flex: 1, maxWidth: 500, marginLeft: "auto" },
    input: {
      width: "100%",
      height: 48,
      borderRadius: 999,
      border: "1px solid #e2e8f0",
      background: "white",
      padding: "0 16px 0 42px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      fontSize: 14,
    },
    iconLeft: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" },
    navBtn: (active) => ({
      borderRadius: 999,
      padding: "10px 16px",
      fontSize: 14,
      fontWeight: 700,
      border: active ? "1px solid #0f172a" : "1px solid #e2e8f0",
      background: active ? "#0f172a" : "white",
      color: active ? "white" : "#475569",
      cursor: "pointer",
    }),
    actionBtn: (primary = false) => ({
      borderRadius: 16,
      padding: "12px 16px",
      fontWeight: 700,
      border: primary ? "1px solid #f97316" : "1px solid #e2e8f0",
      background: primary ? "#f97316" : "white",
      color: primary ? "white" : "#0f172a",
      cursor: "pointer",
    }),
    hero: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 32,
      background: "linear-gradient(135deg, #f97316 0%, #fb923c 45%, #fbbf24 100%)",
      color: "white",
      padding: 32,
      boxShadow: "0 25px 80px rgba(251,146,60,0.35)",
      minHeight: 280,
    },
    card: {
      borderRadius: 28,
      background: "rgba(255,255,255,0.92)",
      boxShadow: "0 16px 50px rgba(15,23,42,0.08)",
      border: 0,
      overflow: "hidden",
    },
    smallCard: {
      borderRadius: 28,
      background: "rgba(255,255,255,0.85)",
      boxShadow: "0 18px 60px rgba(0,0,0,0.10)",
      overflow: "hidden",
    },
    sectionTitle: { fontSize: 32, fontWeight: 900, margin: 0 },
    muted: { color: "#64748b" },
  };
}

function ProductCard({ product, onOpen, onAdd }) {
  const s = ui();
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 6, rotateY: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      <div style={s.smallCard}>
        <div style={{ position: "relative", height: 190, background: product.color }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.45), transparent 30%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.22), transparent 25%)" }} />
          <div style={{ ...s.badge, position: "absolute", left: 16, top: 16, background: "white" }}>{product.tag}</div>
          <button style={{ position: "absolute", right: 16, top: 16, borderRadius: 999, border: 0, background: "rgba(255,255,255,0.9)", padding: 8, cursor: "pointer" }}>
            <Heart size={16} />
          </button>
          <button onClick={() => onOpen(product)} style={{ width: "100%", height: "100%", border: 0, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, cursor: "pointer" }}>
            {product.emoji}
          </button>
        </div>

        <div style={{ padding: 20, display: "grid", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
            <button onClick={() => onOpen(product)} style={{ border: 0, background: "transparent", textAlign: "left", fontSize: 16, fontWeight: 700, color: "#0f172a", cursor: "pointer" }}>
              {product.name}
            </button>
            <div style={{ borderRadius: 999, background: "#fff7ed", color: "#ea580c", padding: "4px 8px", fontSize: 12, fontWeight: 700 }}>-{discount}%</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            <Star size={16} fill="currentColor" color="#f59e0b" />
            <span style={{ fontWeight: 600 }}>{product.rating}</span>
            <span style={{ color: "#94a3b8" }}>(2.1k+)</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#ea580c" }}>${product.price.toFixed(2)}</span>
            <span style={{ color: "#94a3b8", textDecoration: "line-through" }}>${product.oldPrice.toFixed(2)}</span>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onOpen(product)} style={{ ...s.actionBtn(false), flex: 1, background: "#0f172a", color: "white", borderColor: "#0f172a" }}>View</button>
            <button onClick={() => onAdd(product)} style={s.actionBtn(false)}>
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NavButton({ label, active, onClick }) {
  return <button onClick={onClick} style={ui().navBtn(active)}>{label}</button>;
}

function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 999, background: "#f1f5f9", padding: "6px 10px" }}>
      <button onClick={onDecrease} style={{ borderRadius: 999, border: 0, background: "white", padding: 6, cursor: "pointer" }}><Minus size={16} /></button>
      <span style={{ minWidth: 24, textAlign: "center", fontSize: 14, fontWeight: 700 }}>{quantity}</span>
      <button onClick={onIncrease} style={{ borderRadius: 999, border: 0, background: "white", padding: 6, cursor: "pointer" }}><Plus size={16} /></button>
    </div>
  );
}

export default function TemuInspired3DStorefront() {
  const s = ui();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Trending");
  const [page, setPage] = useState("Home");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [cart, setCart] = useState([
    { productId: 1, quantity: 1 },
    { productId: 5, quantity: 1 },
  ]);
  const [selectedProvider, setSelectedProvider] = useState("myfatoorah");
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [customer, setCustomer] = useState({
    firstName: "Alex",
    lastName: "Morgan",
    address: "21 Market Street",
    city: "Kuwait City",
    postalCode: "15463",
    email: "alex@example.com",
    phone: "+965 50000000",
  });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "Trending" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 40 ? 0 : 4.99;
  const total = subtotal + shipping;

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) return prev.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { productId: product.id, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) => prev.map((item) => item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setPage("Product");
  };

  const handleCustomerChange = (field, value) => setCustomer((prev) => ({ ...prev, [field]: value }));

  const handlePlaceOrder = async () => {
    try {
      setPaymentStatus("loading");
      setPaymentMessage("Connecting to payment gateway...");
      const payload = {
        provider: selectedProvider,
        items: cartItems.map((item) => ({ productId: item.product.id, name: item.product.name, quantity: item.quantity, unitPrice: item.product.price })),
        customer,
        totals: { subtotal, shipping, total, currency: "KWD" },
      };
      const data = await createCheckoutSession(payload);
      if (data?.checkoutUrl) {
        setPaymentStatus("success");
        setPaymentMessage(`Redirecting to ${selectedProvider}...`);
        window.location.href = data.checkoutUrl;
        return;
      }
      setPaymentStatus("success");
      setPaymentMessage("Payment session created successfully.");
    } catch (error) {
      setPaymentStatus("error");
      setPaymentMessage(error?.message || "Payment connection failed.");
    }
  };

  const pageTitle = {
    Home: "Discover today’s top deals",
    Product: "Product details",
    Cart: "Your cart",
    Checkout: "Secure checkout",
    Profile: "Your account",
  }[page];

  const inputStyle = { width: "100%", height: 48, borderRadius: 16, border: "1px solid #e2e8f0", padding: "0 14px", fontSize: 14 };

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={{ ...s.shell, paddingTop: 12, paddingBottom: 12 }}>
          <div style={s.row}>
            <button style={{ borderRadius: 16, border: "1px solid #e2e8f0", padding: 8, background: "white" }}><Menu size={20} /></button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => setPage("Home")} style={s.logo}>ZOORA</button>
              <div style={s.badge}>3D Shop</div>
            </div>
            <div style={s.inputWrap}>
              <Search size={16} style={s.iconLeft} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search crazy deals, gadgets, fashion..." style={s.input} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {navItems.map((item) => <NavButton key={item} label={item} active={page === item} onClick={() => setPage(item)} />)}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={s.actionBtn(false)}>Sign in</button>
              <button onClick={() => setPage("Cart")} style={s.actionBtn(true)}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><ShoppingCart size={16} /> Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span></button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginTop: 12 }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setPage("Home"); }}
                style={activeCategory === category ? s.navBtn(true) : s.navBtn(false)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ ...s.shell, paddingTop: 32, paddingBottom: 32 }}>
        <div style={{ ...s.between, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f97316" }}>Marketplace demo</div>
            <h1 style={{ fontSize: 40, fontWeight: 900, margin: "8px 0 0 0" }}>{pageTitle}</h1>
          </div>
          {page !== "Home" && <button onClick={() => setPage("Home")} style={s.actionBtn(false)}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><ChevronLeft size={16} /> Back to home</span></button>}
        </div>

        <AnimatePresence mode="wait">
          {page === "Home" && (
            <motion.div key="home" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <section style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24 }}>
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={s.hero}>
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(255,255,255,0.35), transparent 25%), radial-gradient(circle at bottom left, rgba(255,255,255,0.20), transparent 25%)" }} />
                  <div style={{ position: "relative", zIndex: 1, maxWidth: 620 }}>
                    <div style={s.whiteBadge}><Sparkles size={14} /> Mega spring event</div>
                    <h2 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1, margin: "16px 0 0 0" }}>Shop bold deals in a playful 3D marketplace.</h2>
                    <p style={{ marginTop: 16, color: "#ffedd5", fontSize: 18, maxWidth: 560 }}>
                      Now expanded into a multi-screen store demo with product, cart, checkout, and profile views.
                    </p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                      <button onClick={() => setPage("Product")} style={{ ...s.actionBtn(false), background: "#0f172a", color: "white", borderColor: "#0f172a" }}>Open product page</button>
                      <button onClick={() => setPage("Checkout")} style={{ ...s.actionBtn(false), background: "rgba(255,255,255,0.1)", color: "white", borderColor: "rgba(255,255,255,0.35)" }}>Go to checkout</button>
                    </div>
                  </div>
                  <motion.div animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} style={{ position: "absolute", right: 16, bottom: -8, fontSize: 140 }}>
                    📦
                  </motion.div>
                </motion.div>

                <div style={{ display: "grid", gap: 16 }}>
                  {[
                    { icon: Truck, title: "Free shipping", text: "On orders over $10" },
                    { icon: BadgePercent, title: "Daily discounts", text: "Up to 90% off" },
                    { icon: ShieldCheck, title: "Secure checkout", text: "Protected payments" },
                  ].map((item, index) => (
                    <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }}>
                      <div style={s.card}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 20 }}>
                          <div style={{ borderRadius: 16, background: "#ffedd5", padding: 12, color: "#ea580c" }}><item.icon size={20} /></div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{item.title}</div>
                            <div style={s.muted}>{item.text}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section style={{ marginTop: 40 }}>
                <div style={{ ...s.between, marginBottom: 20 }}>
                  <div>
                    <h2 style={s.sectionTitle}>Trending deals</h2>
                    <p style={s.muted}>Browse and click any product to open its dedicated page.</p>
                  </div>
                  <button onClick={() => setPage("Cart")} style={s.actionBtn(false)}>View cart</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
                  {filtered.map((product) => <ProductCard key={product.id} product={product} onOpen={openProduct} onAdd={addToCart} />)}
                </div>
              </section>
            </motion.div>
          )}

          {page === "Product" && (
            <motion.div key="product" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 24 }}>
              <div style={s.card}>
                <div style={{ padding: 32 }}>
                  <div style={{ position: "relative", height: 420, borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", background: selectedProduct.color }}>
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.45), transparent 30%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.22), transparent 25%)" }} />
                    <div style={{ fontSize: 160, zIndex: 1 }}>{selectedProduct.emoji}</div>
                  </div>
                  <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12 }}>
                    {products.slice(0, 4).map((p) => (
                      <button key={p.id} onClick={() => setSelectedProduct(p)} style={{ borderRadius: 24, padding: 16, fontSize: 40, border: selectedProduct.id === p.id ? "1px solid #fdba74" : "1px solid #e2e8f0", background: selectedProduct.id === p.id ? "#fff7ed" : "#f8fafc", cursor: "pointer" }}>
                        {p.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={s.card}>
                <div style={{ padding: 32 }}>
                  <div style={s.badge}>{selectedProduct.tag}</div>
                  <h2 style={{ fontSize: 44, fontWeight: 900, margin: "16px 0 0 0" }}>{selectedProduct.name}</h2>
                  <p style={{ marginTop: 12, color: "#475569", fontSize: 16 }}>{selectedProduct.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}><Star size={16} fill="currentColor" color="#f59e0b" /><span style={{ fontWeight: 700 }}>{selectedProduct.rating}</span><span style={{ color: "#94a3b8" }}>4,200 reviews</span></div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 40, fontWeight: 900, color: "#ea580c" }}>${selectedProduct.price.toFixed(2)}</span>
                    <span style={{ fontSize: 18, color: "#94a3b8", textDecoration: "line-through" }}>${selectedProduct.oldPrice.toFixed(2)}</span>
                    <div style={{ borderRadius: 999, background: "#fee2e2", color: "#dc2626", padding: "6px 10px", fontSize: 12, fontWeight: 700 }}>Limited stock</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 12, marginTop: 28 }}>
                    {["Fast dispatch", "14-day returns", "Buyer protection"].map((item) => <div key={item} style={{ borderRadius: 16, background: "#f8fafc", padding: 16, fontSize: 14, fontWeight: 700 }}>{item}</div>)}
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
                    <button onClick={() => addToCart(selectedProduct)} style={s.actionBtn(true)}>Add to cart</button>
                    <button onClick={() => { addToCart(selectedProduct); setPage("Checkout"); }} style={s.actionBtn(false)}>Buy now</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {page === "Cart" && (
            <motion.div key="cart" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24 }}>
              <div style={{ display: "grid", gap: 16 }}>
                {cartItems.map((item) => (
                  <div key={item.productId} style={s.card}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: 20, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 80, height: 80, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, background: item.product.color }}>
                          {item.product.emoji}
                        </div>
                        <div>
                          <button onClick={() => openProduct(item.product)} style={{ border: 0, background: "transparent", padding: 0, fontSize: 20, fontWeight: 800, cursor: "pointer" }}>{item.product.name}</button>
                          <div style={{ marginTop: 4, color: "#64748b", fontSize: 14 }}>Express eligible • Free return</div>
                          <div style={{ marginTop: 8, fontSize: 24, fontWeight: 900, color: "#ea580c" }}>${item.product.price.toFixed(2)}</div>
                        </div>
                      </div>
                      <QuantityControl quantity={item.quantity} onDecrease={() => updateQuantity(item.productId, -1)} onIncrease={() => updateQuantity(item.productId, 1)} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ ...s.card, background: "#0f172a", color: "white", height: "fit-content" }}>
                <div style={{ padding: 32 }}>
                  <h3 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Order summary</h3>
                  <div style={{ marginTop: 24, display: "grid", gap: 16, fontSize: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1" }}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1" }}><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 18, fontWeight: 800 }}><span>Total</span><span>${total.toFixed(2)}</span></div>
                  </div>
                  <button onClick={() => setPage("Checkout")} style={{ ...s.actionBtn(true), width: "100%", marginTop: 24 }}>Proceed to checkout</button>
                </div>
              </div>
            </motion.div>
          )}

          {page === "Checkout" && (
            <motion.div key="checkout" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 24 }}>
              <div style={{ display: "grid", gap: 24 }}>
                <div style={s.card}>
                  <div style={{ padding: 32 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><MapPin size={20} color="#f97316" /><h3 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>Shipping address</h3></div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 16 }}>
                      <input style={inputStyle} placeholder="First name" value={customer.firstName} onChange={(e) => handleCustomerChange("firstName", e.target.value)} />
                      <input style={inputStyle} placeholder="Last name" value={customer.lastName} onChange={(e) => handleCustomerChange("lastName", e.target.value)} />
                      <input style={{ ...inputStyle, gridColumn: "1 / -1" }} placeholder="Street address" value={customer.address} onChange={(e) => handleCustomerChange("address", e.target.value)} />
                      <input style={inputStyle} placeholder="City" value={customer.city} onChange={(e) => handleCustomerChange("city", e.target.value)} />
                      <input style={inputStyle} placeholder="Postal code" value={customer.postalCode} onChange={(e) => handleCustomerChange("postalCode", e.target.value)} />
                      <input style={{ ...inputStyle, gridColumn: "1 / -1" }} placeholder="Email" value={customer.email} onChange={(e) => handleCustomerChange("email", e.target.value)} />
                      <input style={{ ...inputStyle, gridColumn: "1 / -1" }} placeholder="Phone" value={customer.phone} onChange={(e) => handleCustomerChange("phone", e.target.value)} />
                    </div>
                  </div>
                </div>
                <div style={s.card}>
                  <div style={{ padding: 32 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><Wallet size={20} color="#f97316" /><h3 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>Payment gateway</h3></div>
                    <div style={{ display: "grid", gap: 16 }}>
                      {paymentProviders.map((provider) => (
                        <button key={provider.id} type="button" onClick={() => setSelectedProvider(provider.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 16, border: selectedProvider === provider.id ? "1px solid #fb923c" : "1px solid #e2e8f0", padding: 16, textAlign: "left", background: selectedProvider === provider.id ? "#fff7ed" : "white", cursor: "pointer" }}>
                          <div>
                            <div style={{ fontWeight: 800 }}>{provider.name}</div>
                            <div style={{ fontSize: 14, color: "#64748b" }}>{provider.subtitle}</div>
                          </div>
                          {selectedProvider === provider.id ? <CheckCircle2 size={20} color="#f97316" /> : <CreditCard size={20} color="#94a3b8" />}
                        </button>
                      ))}
                    </div>
                    <div style={{ marginTop: 16, borderRadius: 16, background: "#f8fafc", padding: 16, fontSize: 14, color: "#475569" }}>
                      The card fields are handled by the PSP checkout page. This frontend creates a secure payment session and redirects the customer to the provider.
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ ...s.card, height: "fit-content" }}>
                <div style={{ padding: 32 }}>
                  <div style={{ ...s.badge, background: "#dcfce7", color: "#15803d" }}>Protected checkout</div>
                  <h3 style={{ fontSize: 32, fontWeight: 900, margin: "16px 0 0 0" }}>Review order</h3>
                  <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
                    {cartItems.map((item) => (
                      <div key={item.productId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 16, background: "#f8fafc", padding: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ fontSize: 32 }}>{item.product.emoji}</div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{item.product.name}</div>
                            <div style={{ fontSize: 14, color: "#64748b" }}>Qty {item.quantity}</div>
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, color: "#ea580c" }}>${(item.product.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 24, display: "grid", gap: 12, fontSize: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span style={s.muted}>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span style={s.muted}>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: 12, fontSize: 18, fontWeight: 900 }}><span>Total</span><span>${total.toFixed(2)}</span></div>
                  </div>
                  {paymentStatus !== "idle" && (
                    <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, borderRadius: 16, padding: 14, fontSize: 14, background: paymentStatus === "error" ? "#fef2f2" : paymentStatus === "success" ? "#ecfdf5" : "#fffbeb", color: paymentStatus === "error" ? "#b91c1c" : paymentStatus === "success" ? "#047857" : "#b45309" }}>
                      {paymentStatus === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                      <span>{paymentMessage}</span>
                    </div>
                  )}
                  <button onClick={handlePlaceOrder} style={{ ...s.actionBtn(true), width: "100%", marginTop: 24 }}>Pay with {paymentProviders.find((p) => p.id === selectedProvider)?.name}</button>
                  <div style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>Backend endpoint required: <code>/api/payments/create-session</code></div>
                </div>
              </div>
            </motion.div>
          )}

          {page === "Profile" && (
            <motion.div key="profile" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 24 }}>
              <div style={{ ...s.card, background: "#0f172a", color: "white" }}>
                <div style={{ padding: 32 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 999, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}><User size={28} /></div>
                  <h3 style={{ fontSize: 40, fontWeight: 900, margin: "20px 0 0 0" }}>Alex Morgan</h3>
                  <p style={{ marginTop: 8, color: "#cbd5e1" }}>Gold member • Loves fast shipping and tech deals</p>
                  <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
                    {[
                      { icon: Package, label: "12 orders delivered" },
                      { icon: Heart, label: "28 wishlist items" },
                      { icon: Store, label: "3 saved sellers" },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 16, background: "rgba(255,255,255,0.05)", padding: 16, fontSize: 14, fontWeight: 700 }}>
                        <item.icon size={16} />
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gap: 24 }}>
                <div style={s.card}>
                  <div style={{ padding: 32 }}>
                    <h3 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Recent orders</h3>
                    <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
                      {[
                        { name: "GlowPods Pro", status: "Delivered", date: "Apr 6" },
                        { name: "CloudStep Sneakers", status: "In transit", date: "Apr 8" },
                        { name: "Nova Sling Bag", status: "Packed", date: "Apr 9" },
                      ].map((order) => (
                        <div key={order.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 16, background: "#f8fafc", padding: 16 }}>
                          <div>
                            <div style={{ fontWeight: 800 }}>{order.name}</div>
                            <div style={{ fontSize: 14, color: "#64748b" }}>Order update • {order.date}</div>
                          </div>
                          <div style={{ borderRadius: 999, background: "#ffedd5", color: "#c2410c", padding: "6px 10px", fontSize: 12, fontWeight: 700 }}>{order.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={s.card}>
                  <div style={{ padding: 32 }}>
                    <h3 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Recommended for you</h3>
                    <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 16 }}>
                      {products.slice(2, 6).map((product) => (
                        <button key={product.id} onClick={() => openProduct(product)} style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 16, background: "#f8fafc", padding: 16, border: 0, textAlign: "left", cursor: "pointer" }}>
                          <div style={{ width: 64, height: 64, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, background: product.color }}>{product.emoji}</div>
                          <div>
                            <div style={{ fontWeight: 800 }}>{product.name}</div>
                            <div style={{ fontSize: 14, color: "#64748b" }}>${product.price.toFixed(2)}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
