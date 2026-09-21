/* ============================================================
   Hamornie Haven Bedding — product detail page
   ============================================================ */
window.HHB = window.HHB || {};
HHB.pages = HHB.pages || {};
HHB.enhancers = HHB.enhancers || {};

function $(s, el) { return (el || document).querySelector(s); }
function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }

HHB.pages.product = function (id) {
  var p = HHB.product(id);
  if (!p) return HHB.pages.notFound();
  var cat = HHB.catName(p.cat);
  var rel = HHB.products.filter(function (x) { return x.cat === p.cat && x.id !== p.id; });
  var fill = HHB.products.filter(function (x) { return x.id !== p.id && x.rating >= 4.7; });
  var related = rel.concat(fill).filter(function (v, i, a) { return a.findIndex(function (x) { return x.id === v.id; }) === i; }).slice(0, 4);
  var gallery = [p.img,
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1631049035182-249067d7618e?auto=format&fit=crop&w=900&q=80"];
  var save = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;

  var perks = [["truck", "Free delivery over $120"], ["moon", "30-night trial"], ["shield", "OEKO-TEX"]]
    .map(function (t) { return '<span>' + HHB.icon(t[0]) + t[1] + '</span>'; }).join("");

  return '<section class="pdp shell">' +
    '<nav class="crumbs"><a href="#/">Home</a><span>/</span><a href="#/shop?cat=' + p.cat + '">' + cat + '</a><span>/</span><b>' + p.name + '</b></nav>' +
    '<div class="pdp__grid">' +
      '<div class="pdp__gallery">' +
        '<div class="pdp__main">' + (p.badge ? '<span class="badge badge--' + p.badge + '">' + p.badge + '</span>' : '') + '<img id="pdpImg" src="' + p.img + '" alt="' + p.name + '"></div>' +
        '<div class="pdp__thumbs">' + gallery.map(function (g, i) { return '<button class="pdp__thumb' + (i === 0 ? ' is-active' : '') + '" data-src="' + g + '"><img src="' + g + '" alt=""></button>'; }).join("") + '</div>' +
      '</div>' +
      '<div class="pdp__info">' +
        '<h1>' + p.name + '</h1>' +
        '<div class="pdp__rate">' + HHB.stars(p.rating) + '<span>' + p.rating + ' · ' + p.reviews + ' reviews</span></div>' +
        '<div class="pdp__price">' + HHB.money(p.price) + (p.old ? ' <s>' + HHB.money(p.old) + '</s><em class="save">−' + save + '%</em>' : '') + '</div>' +
        '<p class="pdp__desc">' + p.desc + '</p>' +
        (p.colors ? '<div class="opt"><h3>Colour — <span id="colName">' + HHB.COLORS[p.colors[0]].name + '</span></h3><div class="swatches" id="swatches">' +
          p.colors.map(function (c, i) { return '<button class="swatch' + (i === 0 ? ' is-active' : '') + '" data-c="' + c + '" style="--c:' + HHB.COLORS[c].hex + '" aria-label="' + HHB.COLORS[c].name + '"></button>'; }).join("") +
        '</div></div>' : '') +
        (p.sizes ? '<div class="opt"><h3>Size</h3><div class="sizes" id="sizes">' +
          p.sizes.map(function (s, i) { return '<button class="size' + (i === 0 ? ' is-active' : '') + '" data-s="' + s + '">' + s + '</button>'; }).join("") +
        '</div></div>' : '') +
        '<div class="pdp__buy">' +
          '<div class="qty"><button id="qDec" aria-label="Decrease">−</button><b id="qVal">1</b><button id="qInc" aria-label="Increase">+</button></div>' +
          '<button class="btn btn--wide" id="pdpAdd">Add to cart — <span id="pdpTotal">' + HHB.money(p.price) + '</span></button>' +
          '<button class="icon-btn icon-btn--lg' + (HHB.store.inWish(p.id) ? ' is-active' : '') + '" id="pdpWish" aria-label="Toggle wishlist">' + HHB.icon("heart") + '</button>' +
        '</div>' +
        '<div class="pdp__perks">' + perks + '</div>' +
        '<div class="acc" id="acc">' +
          '<div class="acc__item"><button class="acc__btn">Details ' + HHB.icon("arrow") + '</button><div class="acc__panel"><ul>' + p.details.map(function (d) { return '<li>' + d + '</li>'; }).join("") + '</ul></div></div>' +
          '<div class="acc__item"><button class="acc__btn">Care ' + HHB.icon("arrow") + '</button><div class="acc__panel"><p>' + (p.care || "Machine wash cold on gentle. Tumble dry low. Do not bleach.") + '</p></div></div>' +
          '<div class="acc__item"><button class="acc__btn">Shipping & returns ' + HHB.icon("arrow") + '</button><div class="acc__panel"><p>Standard delivery in 4–6 days — free over $120. Express 1–2 days for $19. Sleep on it for 30 nights; full refund if it is not the one.</p></div></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="sec__head rel"><h2>You may also love</h2><a class="textlink" href="#/shop?cat=' + p.cat + '">More ' + cat.toLowerCase() + ' →</a></div>' +
    '<div class="shop__grid">' + related.map(HHB.card).join("") + '</div>' +
  '</section>';
};
HHB.enhancers.product = function (id) {
  var p = HHB.product(id);
  if (!p) return;
  var color = p.colors ? p.colors[0] : null;
  var size = p.sizes ? p.sizes[0] : null;
  var qty = 1;

  function upd() {
    $("#pdpTotal").textContent = HHB.money(p.price * qty);
    $("#qVal").textContent = qty;
  }

  $$("#swatches .swatch").forEach(function (b) {
    b.addEventListener("click", function () {
      color = b.dataset.c;
      $$("#swatches .swatch").forEach(function (x) { x.classList.toggle("is-active", x === b); });
      $("#colName").textContent = HHB.COLORS[color].name;
    });
  });
  $$("#sizes .size").forEach(function (b) {
    b.addEventListener("click", function () {
      size = b.dataset.s;
      $$("#sizes .size").forEach(function (x) { x.classList.toggle("is-active", x === b); });
    });
  });
  $("#qDec").addEventListener("click", function () { if (qty > 1) { qty--; upd(); } });
  $("#qInc").addEventListener("click", function () { if (qty < 9) { qty++; upd(); } });
  $("#pdpAdd").addEventListener("click", function () {
    HHB.store.addToCart(p.id, { color: color, size: size, qty: qty });
    HHB.ui.toast(p.name + " added to your cart");
    HHB.ui.flyToCart($("#pdpImg"));
  });
  $("#pdpWish").addEventListener("click", function () {
    var on = HHB.store.toggleWish(p.id);
    $("#pdpWish").classList.toggle("is-active", on);
    HHB.ui.toast(on ? "Saved to wishlist" : "Removed from wishlist");
  });
  $$(".pdp__thumb").forEach(function (t) {
    t.addEventListener("click", function () {
      $("#pdpImg").src = t.dataset.src;
      $$(".pdp__thumb").forEach(function (x) { x.classList.toggle("is-active", x === t); });
    });
  });
  HHB.ui.bindAcc();
};

