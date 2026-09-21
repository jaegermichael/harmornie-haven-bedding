/* ============================================================
   Hamornie Haven Bedding — global UI
   Icons, toasts, cart drawer, search overlay, header wiring.
   ============================================================ */
window.HHB = window.HHB || {};

(function () {
  var ICONS = {
    truck:  '<path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="17" r="1.6"/><circle cx="17.5" cy="17" r="1.6"/>',
    leaf:   '<path d="M6 18C6 10 12 5 20 4c-1 8-6 14-14 14z"/><path d="M6 18c3-4 7-7 10-8"/>',
    moon:   '<path d="M20 13A8 8 0 1111 4a7 7 0 109 9z"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    heart:  '<path d="M12 21s-7.5-4.6-7.5-10.2A4.5 4.5 0 0112 8a4.5 4.5 0 017.5 2.8C19.5 16.4 12 21 12 21z"/>',
    bag:    '<path d="M6 7h12l-1.2 12a2 2 0 01-2 1.8H9.2a2 2 0 01-2-1.8L6 7z"/><path d="M9 9V6a3 3 0 016 0v3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    check:  '<path d="M20 6L9 17l-5-5"/>',
    arrow:  '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };

  HHB.icon = function (name, cls) {
    return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + '</svg>';
  };

  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }

  HHB.ui = {};

  /* ---------- Toasts ---------- */
  HHB.ui.toast = function (msg) {
    var wrap = $("#toasts");
    if (!wrap) return;
    var t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = HHB.icon("check") + "<span></span>";
    t.lastElementChild.textContent = msg;
    wrap.appendChild(t);
    setTimeout(function () { t.classList.add("out"); }, 2400);
    setTimeout(function () { t.remove(); }, 2850);
  };

  /* ---------- Cart drawer ---------- */
  HHB.ui.openDrawer = function () {
    var d = $("#cartDrawer"), sc = $("#scrim");
    d.classList.add("is-open"); d.setAttribute("aria-hidden", "false");
    sc.hidden = false;
    requestAnimationFrame(function () { sc.classList.add("is-on"); });
    document.body.style.overflow = "hidden";
    HHB.ui.renderCart();
  };
  HHB.ui.closeDrawer = function () {
    var d = $("#cartDrawer"), sc = $("#scrim");
    d.classList.remove("is-open"); d.setAttribute("aria-hidden", "true");
    sc.classList.remove("is-on");
    setTimeout(function () { sc.hidden = true; }, 260);
    document.body.style.overflow = "";
  };

  HHB.ui.renderCart = function () {
    var box = $("#cartItems"), total = $("#cartTotal"), foot = $("#cartFoot"), prog = $("#shipProgress");
    if (!box) return;
    var items = HHB.store.cartItems();
    var sub = HHB.store.subtotal();
    var at = HHB.FREE_SHIP_AT;

    if (prog) {
      if (sub >= at) {
        prog.innerHTML = '<div class="ship ship--done">' + HHB.icon("check") + '<span>Free delivery unlocked</span></div>';
      } else {
        prog.innerHTML = '<div class="ship"><span>Add ' + HHB.money(at - sub) + ' more for free delivery</span>' +
          '<div class="ship__bar"><i style="width:' + Math.min(100, (sub / at) * 100) + '%"></i></div></div>';
      }
    }

    if (!items.length) {
      box.innerHTML = '<div class="empty">' + HHB.icon("bag") + '<p>Your cart is empty.</p><a class="btn" href="#/shop">Shop bedding</a></div>';
      if (foot) foot.classList.add("is-off");
    } else {
      box.innerHTML = items.map(function (it, i) {
        var p = HHB.product(it.id);
        var meta = [it.color && HHB.COLORS[it.color] ? HHB.COLORS[it.color].name : null, it.size].filter(Boolean).join(" · ") || "—";
        return '<div class="citem">' +
          '<img src="' + p.img + '" alt="' + p.name + '">' +
          '<div class="citem__mid"><h4>' + p.name + '</h4><span class="citem__meta">' + meta + '</span>' +
          '<div class="citem__qty"><button data-ci="' + i + '" data-act="dec" aria-label="Decrease">−</button><b>' + it.qty + '</b><button data-ci="' + i + '" data-act="inc" aria-label="Increase">+</button></div></div>' +
          '<div class="citem__end"><span class="citem__price">' + HHB.money(p.price * it.qty) + '</span><button class="citem__rm" data-ci="' + i + '" data-act="rm">Remove</button></div>' +
          '</div>';
      }).join("");
      if (foot) foot.classList.remove("is-off");
    }
    if (total) total.textContent = HHB.money(sub);
  };
  /* ---------- Search ---------- */
  HHB.ui.openSearch = function () {
    var o = $("#searchOverlay");
    o.hidden = false;
    requestAnimationFrame(function () { o.classList.add("is-on"); });
    $("#searchInput").focus();
    document.body.style.overflow = "hidden";
  };
  HHB.ui.closeSearch = function () {
    var o = $("#searchOverlay");
    o.classList.remove("is-on");
    setTimeout(function () { o.hidden = true; }, 240);
    document.body.style.overflow = "";
  };
  HHB.ui.closeAll = function () { HHB.ui.closeDrawer(); HHB.ui.closeSearch(); };

  function runSearch(q) {
    var box = $("#searchResults");
    q = (q || "").trim().toLowerCase();
    if (!q) { box.innerHTML = '<p class="search__hint">Popular: bedding sets, duvets, throws, kids</p>'; return; }
    var res = HHB.products.filter(function (p) {
      return (p.name + " " + HHB.catName(p.cat) + " " + p.desc).toLowerCase().indexOf(q) >= 0;
    }).slice(0, 6);
    box.innerHTML = res.length
      ? res.map(function (p) {
          return '<a class="sres" href="#/product/' + p.id + '"><img src="' + p.img + '" alt=""><span>' + p.name + '</span><b>' + HHB.money(p.price) + '</b></a>';
        }).join("")
      : '<p class="search__hint">Nothing found — try “linen” or “throw”.</p>';
  }

  /* ---------- Fly-to-cart animation ---------- */
  HHB.ui.flyToCart = function (img) {
    var cartBtn = $("#cartBtn");
    if (!img || !cartBtn) return;
    var a = img.getBoundingClientRect();
    var b = cartBtn.getBoundingClientRect();
    var ghost = img.cloneNode();
    ghost.style.cssText = "position:fixed;left:" + a.left + "px;top:" + a.top + "px;width:" + a.width + "px;height:" + a.height + "px;border-radius:12px;z-index:300;pointer-events:none;object-fit:cover;margin:0;";
    document.body.appendChild(ghost);
    ghost.animate([
      { transform: "translate(0,0) scale(1)", opacity: 0.9 },
      { transform: "translate(" + (b.left + b.width / 2 - (a.left + a.width / 2)) + "px," + (b.top + b.height / 2 - (a.top + a.height / 2)) + "px) scale(.06)", opacity: 0.4 }
    ], { duration: 640, easing: "cubic-bezier(.22,.61,.2,1)" }).onfinish = function () { ghost.remove(); };
  };

  /* ---------- Counts ---------- */
  HHB.ui.updateCounts = function () {
    var c = $("#cartCount"), w = $("#wishCount");
    var cn = HHB.store.cartCount(), wn = HHB.store.wishList().length;
    if (c) { c.textContent = cn; c.classList.toggle("is-visible", cn > 0); }
    if (w) { w.textContent = wn; w.classList.toggle("is-visible", wn > 0); }
  };

  /* ---------- Accordion ---------- */
  HHB.ui.bindAcc = function (root) {
    $$(".acc__btn", root).forEach(function (b) {
      b.addEventListener("click", function () {
        b.closest(".acc__item").classList.toggle("is-open");
      });
    });
  };

  /* ---------- Init ---------- */
  HHB.ui.init = function () {
    $("#cartBtn").addEventListener("click", HHB.ui.openDrawer);
    $("#drawerClose").addEventListener("click", HHB.ui.closeDrawer);
    $("#continueShop").addEventListener("click", HHB.ui.closeDrawer);
    $("#searchBtn").addEventListener("click", HHB.ui.openSearch);
    $("#searchClose").addEventListener("click", HHB.ui.closeSearch);
    $("#scrim").addEventListener("click", HHB.ui.closeAll);
    $("#searchInput").addEventListener("input", function (e) { runSearch(e.target.value); });

    var burger = $("#burger");
    burger.addEventListener("click", function () {
      var open = $("#navLinks").classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        HHB.ui.closeAll();
        $("#navLinks").classList.remove("is-open");
        burger.classList.remove("is-open");
      }
    });

    HHB.store.onChange(HHB.ui.renderCart);
    HHB.store.onChange(HHB.ui.updateCounts);
    HHB.ui.updateCounts();
    HHB.ui.renderCart();
  };
})();

