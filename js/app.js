/* ============================================================
   Hamornie Haven Bedding — router + boot + animations
   ============================================================ */
window.HHB = window.HHB || {};

(function () {
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }

  function parseHash() {
    var raw = (location.hash || "#/").slice(1);
    var parts = raw.split("?");
    var params = {};
    new URLSearchParams(parts[1] || "").forEach(function (v, k) { params[k] = v; });
    return { path: parts[0] || "/", params: params };
  }

  function setActiveNav(seg) {
    $$(".nav a").forEach(function (a) {
      var href = a.getAttribute("href").slice(1).split("?")[0];
      a.classList.toggle("is-active", href === ("/" + seg));
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var io;
  function reveal() {
    if (!io) {
      io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
    }
    var sel = ".trust__item,.cat,.pcard,.sproduct,.stat,.value,.faq,.secret__media,.secret__body,.pdp__gallery,.pdp__info,.about__hero,.about__grid,.about__values,.about__cta,.contact-grid,.newsletter__inner,.wgrid .pcard";
    $$(sel).forEach(function (el, i) {
      if (el._rv) return;
      el._rv = 1;
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 6) * 55 + "ms";
      io.observe(el);
    });
  }

  /* ---------- Count-up ---------- */
  function countUp() {
    $$("[data-count]").forEach(function (el) {
      if (el._done) return;
      el._done = true;
      var target = parseFloat(el.dataset.count);
      var o = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (!en.isIntersecting) return;
          o.disconnect();
          var t0 = performance.now(), dur = 1400;
          (function tick(t) {
            var k = Math.min(1, (t - t0) / dur);
            var e = 1 - Math.pow(1 - k, 3);
            el.textContent = Math.round(target * e);
            if (k < 1) requestAnimationFrame(tick);
          })(t0);
        });
      }, { threshold: 0.5 });
      o.observe(el);
    });
  }

  HHB.refreshReveal = function () { reveal(); countUp(); };

  /* ---------- Router ---------- */
  function router() {
    var r = parseHash();
    var seg = r.path.split("/").filter(Boolean);
    HHB.ui.closeAll();
    var nav = $("#navLinks"), burger = $("#burger");
    if (nav) nav.classList.remove("is-open");
    if (burger) burger.classList.remove("is-open");

    var html = "", enhance = null, title = "Hamornie Haven Bedding";

    if (!seg.length) { html = HHB.pages.home(); enhance = HHB.enhancers.home; }
    else if (seg[0] === "shop") { title = "Shop"; html = HHB.pages.shop(r.params); enhance = function () { HHB.enhancers.shop(r.params); }; }
    else if (seg[0] === "product" && seg[1]) { var p = HHB.product(seg[1]); title = p ? p.name : "Not found"; html = HHB.pages.product(seg[1]); enhance = function () { HHB.enhancers.product(seg[1]); }; }
    else if (seg[0] === "wishlist") { title = "Wishlist"; html = HHB.pages.wishlist(); }
    else if (seg[0] === "checkout") { title = "Checkout"; html = HHB.pages.checkout(); enhance = HHB.enhancers.checkout; }
    else if (seg[0] === "about") { title = "Our Story"; html = HHB.pages.about(); }
    else if (seg[0] === "contact") { title = "Contact"; html = HHB.pages.contact(); enhance = HHB.enhancers.contact; }
    else { title = "Not found"; html = HHB.pages.notFound(); }

    document.title = title + " — Hamornie Haven Bedding";
    var out = $("#app");
    out.innerHTML = html;
    out.classList.remove("page-enter");
    void out.offsetWidth;
    out.classList.add("page-enter");

    setActiveNav(seg[0] || "");
    window.scrollTo(0, 0);
    if (enhance) enhance();
    reveal();
    countUp();
  }
  /* ---------- Delegated interactions ---------- */
  document.addEventListener("click", function (e) {
    var add = e.target.closest("[data-add]");
    if (add && !add.dataset.busy) {
      var id = add.dataset.add, p = HHB.product(id);
      add.dataset.busy = "1";
      HHB.store.addToCart(id);
      HHB.ui.toast(p.name + " added to your cart");
      var img = add.closest("article,a") && add.closest("article,a").querySelector("img");
      HHB.ui.flyToCart(img || document.querySelector(".pdp__main img"));
      if (add.classList.contains("add")) {
        var o = add.textContent;
        add.textContent = "Added ✓"; add.classList.add("is-added");
        setTimeout(function () { add.textContent = o; add.classList.remove("is-added"); delete add.dataset.busy; }, 1200);
      } else delete add.dataset.busy;
      return;
    }
    var w = e.target.closest("[data-wish]");
    if (w) {
      var wid = w.dataset.wish;
      var on = HHB.store.toggleWish(wid);
      w.classList.toggle("is-active", on);
      HHB.ui.toast(on ? "Saved to wishlist" : "Removed from wishlist");
      if ((location.hash || "#/").slice(1).split("?")[0] === "/wishlist") router();
      return;
    }
    var ci = e.target.closest("[data-ci]");
    if (ci) {
      var i = +ci.dataset.ci, act = ci.dataset.act;
      if (act === "inc") HHB.store.setQty(i, 1);
      else if (act === "dec") HHB.store.setQty(i, -1);
      else if (act === "rm") HHB.store.removeItem(i);
    }
  });

  /* ---------- Hero parallax ---------- */
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var img = document.querySelector(".hero__img");
      if (img) img.style.transform = "translateY(" + window.scrollY * 0.12 + "px) scale(1.06)";
      ticking = false;
    });
  }, { passive: true });

  /* ---------- Image fallback ---------- */
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && !t.dataset.fbk) {
      t.dataset.fbk = "1";
      t.src = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><rect width="4" height="3" fill="#e3ddd3"/></svg>');
    }
  }, true);

  /* ---------- Boot ---------- */
  function boot() {
    HHB.ui.init();
    router();
  }
  window.addEventListener("hashchange", router);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

