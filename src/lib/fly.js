/* Fly an image clone to the cart button */
export default function flyToCart(img) {
  const cartBtn = document.getElementById('cartBtn');
  if (!img || !cartBtn) return;
  const a = img.getBoundingClientRect();
  const b = cartBtn.getBoundingClientRect();
  const ghost = img.cloneNode();
  ghost.style.cssText =
    "position:fixed;left:" + a.left + "px;top:" + a.top + "px;width:" + a.width + "px;height:" + a.height +
    "px;border-radius:12px;z-index:300;pointer-events:none;object-fit:cover;margin:0;";
  document.body.appendChild(ghost);
  ghost.animate([
    { transform: "translate(0,0) scale(1)", opacity: 0.9 },
    { transform: "translate(" + (b.left + b.width / 2 - (a.left + a.width / 2)) + "px," + (b.top + b.height / 2 - (a.top + a.height / 2)) + "px) scale(.06)", opacity: 0.4 }
  ], { duration: 640, easing: "cubic-bezier(.22,.61,.2,1)" }).onfinish = () => ghost.remove();
}
