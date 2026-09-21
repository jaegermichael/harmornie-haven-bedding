import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { product } from '../data.js';

const Ctx = createContext(null);

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read('hhb.cart.v1', []));
  const [wishlist, setWishlist] = useState(() => read('hhb.wish.v1', []));

  useEffect(() => { try { localStorage.setItem('hhb.cart.v1', JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { try { localStorage.setItem('hhb.wish.v1', JSON.stringify(wishlist)); } catch {} }, [wishlist]);

  const addToCart = useCallback((id, opts = {}) => {
    setCart((prev) => {
      const p = product(id);
      if (!p) return prev;
      const color = opts.color || (p.colors ? p.colors[0] : null);
      const size = opts.size || (p.sizes ? p.sizes[0] : null);
      const qty = opts.qty || 1;
      const k = [id, color, size].join('|');
      const found = prev.find((it) => [it.id, it.color, it.size].join('|') === k);
      if (found) return prev.map((it) => (it === found ? { ...it, qty: it.qty + qty } : it));
      return [...prev, { id, color, size, qty }];
    });
  }, []);

  const setQty = useCallback((index, delta) => {
    setCart((prev) => {
      const it = prev[index];
      if (!it) return prev;
      const qty = it.qty + delta;
      if (qty <= 0) return prev.filter((_, i) => i !== index);
      return prev.map((x, i) => (i === index ? { ...x, qty } : x));
    });
  }, []);

  const removeItem = useCallback((index) => setCart((prev) => prev.filter((_, i) => i !== index)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWish = useCallback((id) => {
    const added = !wishlist.includes(id);
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    return added;
  }, [wishlist]);

  const inWish = useCallback((id) => wishlist.includes(id), [wishlist]);

  const value = useMemo(() => ({
    cart,
    wishlist,
    cartCount: cart.reduce((n, it) => n + it.qty, 0),
    subtotal: cart.reduce((n, it) => n + (product(it.id)?.price || 0) * it.qty, 0),
    addToCart, setQty, removeItem, clearCart, toggleWish, inWish
  }), [cart, wishlist, addToCart, setQty, removeItem, clearCart, toggleWish, inWish]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() { return useContext(Ctx); }
