/* ============================================================
   Hamornie Haven Bedding — home page
   ============================================================ */
window.HHB = window.HHB || {};
HHB.pages = HHB.pages || {};
HHB.enhancers = HHB.enhancers || {};

function $(s, el) { return (el || document).querySelector(s); }
function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }

/* Shared product card */
HHB.card = function (p) {
  return '<article class="pcard">' +
    '<div class="pcard__img">' +
      '<a href="#/product/' + p.id + '" aria-label="' + p.name + '"></a>' +
      '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
      (p.badge ? '<span class="badge badge--' + p.badge + '">' + p.badge + '</span>' : '') +
      '<button class="wish' + (HHB.store.inWish(p.id) ? ' is-active' : '') + '" data-wish="' + p.id + '" aria-label="Toggle wishlist">' + HHB.icon("heart") + '</button>' +
    '</div>' +
    '<div class="pcard__row">' +
      '<div><h3><a href="#/product/' + p.id + '">' + p.name + '</a></h3>' +
      '<span class="pcard__price">' + HHB.money(p.price) + (p.old ? ' <s>' + HHB.money(p.old) + '</s>' : '') + '</span>' +
      '<span class="pcard__rate">' + HHB.stars(p.rating) + '</span></div>' +
      '<button class="add" data-add="' + p.id + '">Add</button>' +
    '</div>' +
  '</article>';
};

HHB.pages.home = function () {
  var news = HHB.products.filter(function (p) { return p.badge === "new"; }).slice(0, 3);
  var featured = HHB.products.filter(function (p) { return p.badge && p.badge !== "sale"; }).slice(0, 4);
  var reserve = HHB.products.filter(function (p) { return /reserve/.test(p.id); });

  var trust = [
    ["truck", "Free delivery over $120"],
    ["leaf", "100% long-staple cotton"],
    ["moon", "30-night rest trial"],
    ["shield", "OEKO-TEX certified"]
  ].map(function (t) { return '<div class="trust__item">' + HHB.icon(t[0]) + '<span>' + t[1] + '</span></div>'; }).join("");

  var html = '<section class="hero">' +
    '<div class="hero__stage">' +
      '<img class="hero__img" src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=80" alt="Layered bedding in deep navy tones">' +
      '<div class="hero__scrim"></div>' +
      '<div class="hero__wordmark"><span class="hero__big">haven</span><span class="hero__sub">bedding</span></div>' +
      '<p class="hero__tag">Soft bedding<br>for soft living</p>' +
      '<div class="hero__cta-row"><a class="hero__cta" href="#/shop">Shop the collection</a><a class="hero__cta hero__cta--ghost" href="#/about">Our story</a></div>' +
    '</div>' +
    '<aside class="rail" aria-label="New arrivals">' +
      news.map(function (p) {
        return '<a class="rail-card" href="#/product/' + p.id + '"><span class="badge badge--new">NEW</span><img src="' + p.img + '" alt="' + p.name + '"><span class="rail-card__name">' + p.name + '</span><span class="rail-card__price">' + HHB.money(p.price) + '</span></a>';
      }).join("") +
      '<a class="rail-more" href="#/shop">More positions</a>' +
    '</aside>' +
  '</section>' +

  '<section class="trust"><div class="shell trust__grid">' + trust + '</div></section>' +

  '<section class="intro shell">' +
    '<div class="intro__head"><h2>Softening sleep<br>with generous comfort</h2>' +
    '<div class="intro__copy"><p>We make more than bedding. We make bedding that will make your evenings softer, calmer and more comfortable — long-staple cotton, washed linen and wool you will want to sink into.</p><a class="textlink" href="#/about">Read our story →</a></div></div>' +
    '<p class="intro__sub">Shop by category</p>' +
    '<div class="cats">' + HHB.CATEGORIES.map(function (c) {
      var n = HHB.products.filter(function (p) { return p.cat === c.id; }).length;
      return '<a class="cat" href="#/shop?cat=' + c.id + '"><div class="cat__img"><img src="' + c.img + '" alt="' + c.name + '" loading="lazy"><span class="cat__count">' + n + ' items</span></div><div class="cat__row"><span class="cat__name">' + c.name + '</span><span class="cat__shop">Shop <i>→</i></span></div></a>';
    }).join("") + '</div>' +
  '</section>' +

  '<section class="shell sec" id="bestsellers">' +
    '<div class="sec__head"><div><p class="eyebrow">— Most loved</p><h2>Bestsellers</h2></div><a class="textlink" href="#/shop">View all products →</a></div>' +
    '<div class="shop__grid home-grid">' + featured.map(HHB.card).join("") + '</div>' +
  '</section>';
  html += '<section class="secret">' +
    '<div class="marquee" aria-hidden="true"><div class="marquee__track">' +
      '<span>Secret collection. Quantity limited&nbsp;//&nbsp;</span><span>Secret collection. Quantity limited&nbsp;//&nbsp;</span><span>Secret collection. Quantity limited&nbsp;//&nbsp;</span><span>Secret collection. Quantity limited&nbsp;//&nbsp;</span>' +
    '</div></div>' +
    '<div class="shell secret__grid">' +
      '<div class="secret__media"><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80" alt="The Reserve collection"></div>' +
      '<div class="secret__body"><h2 class="secret__title">Sink in. Lie down. Rest now. <em>The Reserve — a limited collection</em></h2>' +
      '<p class="secret__copy">A collaboration with independent weavers. Three pieces, produced in small batches — available only while they last.</p>' +
      '<div class="secret__products">' + reserve.map(function (p) {
        return '<a class="sproduct" href="#/product/' + p.id + '"><img src="' + p.img + '" alt="' + p.name + '"><span class="sproduct__name">' + p.name.split(" ")[0] + '</span><span class="sproduct__price">' + HHB.money(p.price) + '</span></a>';
      }).join("") + '</div>' +
    '</div>' +
  '</section>' +

  '<section class="stats"><div class="shell stats__grid">' +
    '<div class="stat"><b><span data-count="30">0</span></b><span>night rest trial</span></div>' +
    '<div class="stat"><b><span data-count="400">0</span>+</b><span>thread count sateen</span></div>' +
    '<div class="stat"><b><span data-count="12">0</span>k</b><span>sleepers tucked in</span></div>' +
    '<div class="stat"><b><span data-count="98">0</span>%</b><span>would recommend</span></div>' +
  '</div></section>' +

  '<section class="tsec"><div class="shell">' +
    '<p class="eyebrow eyebrow--light">— Word of mouth</p>' +
    '<div class="t-slider" id="tSlider"><div class="t-slides" id="tSlides">' +
      HHB.TESTIMONIALS.map(function (t) { return '<figure class="t-card"><blockquote>' + t.text + '</blockquote><figcaption><b>' + t.name + '</b><span>' + t.meta + '</span></figcaption></figure>'; }).join("") +
    '</div><div class="t-dots" id="tDots">' + HHB.TESTIMONIALS.map(function (_, i) { return '<button aria-label="Testimonial ' + (i + 1) + '"></button>'; }).join("") + '</div></div>' +
  '</div></section>' +

  '<section class="shell newsletter"><div class="newsletter__inner">' +
    '<div><h2>Slow mornings, <em>first.</em></h2><p>New arrivals, restocks and members-only prices. No noise — just comfort.</p></div>' +
    '<form id="newsForm"><input type="email" required placeholder="you@example.com" aria-label="Email"><button class="btn">Subscribe</button></form>' +
  '</div></section>';

  return html;
};

HHB.enhancers.home = function () {
  /* testimonials slider */
  var wrap = $("#tSlides");
  if (wrap) {
    var slides = $$("figure", wrap), dots = $$("#tDots button");
    var cur = 0, timer;
    var go = function (i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) { s.classList.toggle("is-active", j === cur); });
      dots.forEach(function (d, j) { d.classList.toggle("is-active", j === cur); });
    };
    var restart = function () { clearInterval(timer); timer = setInterval(function () { go(cur + 1); }, 5200); };
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); restart(); }); });
    $("#tSlider").addEventListener("pointerenter", function () { clearInterval(timer); });
    $("#tSlider").addEventListener("pointerleave", restart);
    go(0); restart();
  }
  /* newsletter */
  var nf = $("#newsForm");
  if (nf) nf.addEventListener("submit", function (e) { e.preventDefault(); HHB.ui.toast("Welcome to the haven — check your inbox"); nf.reset(); });
};

