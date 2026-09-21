import { useEffect, useRef } from 'react';

/* Self-observing scroll-reveal: attach ref to an element already carrying the "reveal" class. */
export default function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.transitionDelay = delay + "ms";
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}
