/* ============================================================
   Hamornie Haven Bedding — state (cart + wishlist, persisted)
   ============================================================ */
window.HHB = window.HHB || {};

HHB.store = (function () {
  var CART_KEY = "hhb.cart.v1";
  var WISH_KEY = "hhb.wish.v1";

  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
  }

  var cart = read(CART_KEY, []);
  var wish = read(WISH_KEY, []);
  var subs = [];

  function persist() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      localStorage.setItem(WISH_KEY, JSON.stringify(wish));
    } catch (e) { /* storage may be unavailable */ }
  }
  function emit() { subs.forEach(function (fn) { fn(); }); }
  function itemKey(it) { return [it.id, it.color, it.size].join("|"); }

  return {
    onChange: function (fn) { subs.push(fn); },

    cartItems: function () { return cart; },
    cartCount: function () { return cart.reduce(function (n, it) { return n + it.qty; }, 0); },
    subtotal: function () {
      return cart.reduce(function (n, it) {
        var p = HHB.product(it.id);
        return n + (p ? p.price * it.qty : 0);
      }, 0);
    },

    addToCart: function (id, opts) {
      opts = opts || {};
      var p = HHB.product(id);
      if (!p) return;
      var color = opts.color || (p.colors ? p.colors[0] : null);
      var size = opts.size || (p.sizes ? p.sizes[0] : null);
      var qty = opts.qty || 1;
      var found = cart.find(function (it) { return itemKey(it) === itemKey({ id: id, color: color, size: size }); });
      if (found) found.qty += qty;
      else cart.push({ id: id, color: color, size: size, qty: qty });
      persist(); emit();
    },

    setQty: function (index, delta) {
      var it = cart[index];
      if (!it) return;
      it.qty += delta;
      if (it.qty <= 0) cart.splice(index, 1);
      persist(); emit();
    },

    removeItem: function (index) {
      cart.splice(index, 1);
      persist(); emit();
    },

    clearCart: function () {
      cart = [];
      persist(); emit();
    },

    toggleWish: function (id) {
      var i = wish.indexOf(id);
      if (i >= 0) wish.splice(i, 1);
      else wish.push(id);
      persist(); emit();
      return i < 0;
    },
    wishList: function () { return wish; },
    inWish: function (id) { return wish.indexOf(id) >= 0; }
  };
})();

HHB.product = function (id) { return HHB.products.find(function (p) { return p.id === id; }); };
HHB.catName = function (id) { var c = HHB.CATEGORIES.find(function (x) { return x.id === id; }); return c ? c.name : id; };
HHB.money = function (n) { return "$" + Number(n).toFixed(2).replace(/\.00$/, ""); };

HHB.stars = function (rating) {
  var star = '<path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17l-5.9 3.2 1.3-6.6L2.5 9l6.6-.8z"/>';
  var unit = '<svg viewBox="0 0 24 24">' + star + '</svg>';
  return '<span class="stars"><span class="stars__bg">' + unit.repeat(5) +
    '</span><span class="stars__fg" style="width:' + ((rating / 5) * 100) + '%">' + unit.repeat(5) + '</span></span>';
};

HHB.SHIPPING = {
  standard: { label: "Standard", days: "4–6 days", price: 9 },
  express:  { label: "Express",  days: "1–2 days", price: 19 }
};
HHB.FREE_SHIP_AT = 120;

HHB.TESTIMONIALS = [
  { text: "The Cloud Nine set ruined every other bedsheet for me. I genuinely look forward to bedtime now.", name: "Maya R.", meta: "Verified buyer" },
  { text: "Ordered the Reserve duvet on a whim. The colour is even richer in person and delivery took three days.", name: "Daniel K.", meta: "Verified buyer" },
  { text: "My daughter's room finally feels like a haven. It's survived twenty washes and still looks brand new.", name: "Priya S.", meta: "Parent" }
];

HHB.FAQS = [
  { q: "How fast is delivery?", a: "Standard delivery takes 4–6 days and is free over $120. Express arrives in 1–2 days for $19." },
  { q: "What if I don't love it?", a: "Every order comes with a 30-night rest trial. Return it for a full refund, no questions asked." },
  { q: "What are your materials?", a: "Long-staple cotton, European flax linen and OEKO-TEX certified dyes only. Nothing else." },
  { q: "How do I care for linen?", a: "Wash cool, tumble low and skip the softener — linen softens naturally with age." }
];
