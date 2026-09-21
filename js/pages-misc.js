/* ============================================================
   Hamornie Haven Bedding — wishlist, checkout, about, contact, 404
   ============================================================ */
window.HHB = window.HHB || {};
HHB.pages = HHB.pages || {};
HHB.enhancers = HHB.enhancers || {};

function $(s, el) { return (el || document).querySelector(s); }
function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }

/* ---------- Wishlist ---------- */
HHB.pages.wishlist = function () {
  var items = HHB.store.wishList().map(HHB.product).filter(Boolean);
  if (!items.length) {
    return '<section class="shell empty-state"><div class="empty empty--wide">' + HHB.icon("heart") +
      '<h1>Your wishlist is empty</h1><p>Tap the heart on anything you love to save it here.</p><a class="btn" href="#/shop">Explore bedding</a></div></section>';
  }
  return '<section class="shell sec"><div class="page-head"><p class="eyebrow">— Saved for later</p><h1>Wishlist</h1></div>' +
    '<div class="shop__grid wgrid">' + items.map(HHB.card).join("") + '</div></section>';
};

/* ---------- Checkout ---------- */
HHB.pages.checkout = function () {
  var items = HHB.store.cartItems();
  var sub = HHB.store.subtotal();
  if (!items.length) {
    return '<section class="shell empty-state"><div class="empty empty--wide">' + HHB.icon("bag") +
      '<h1>Nothing to check out</h1><p>Your cart is empty — add something soft first.</p><a class="btn" href="#/shop">Shop bedding</a></div></section>';
  }
  var rows = items.map(function (it) {
    var p = HHB.product(it.id);
    return '<div class="srow"><img src="' + p.img + '" alt=""><span>' + p.name + ' <i>× ' + it.qty + '</i></span><b>' + HHB.money(p.price * it.qty) + '</b></div>';
  }).join("");

  return '<section class="checkout shell">' +
    '<div class="page-head"><p class="eyebrow">— Almost yours</p><h1>Checkout</h1></div>' +
    '<ol class="steps"><li class="is-active">Information</li><li>Delivery</li><li>Payment</li></ol>' +
    '<div class="checkout__grid">' +
      '<form id="checkoutForm" novalidate>' +
        '<div class="fstep is-active" data-step><h2>Contact & address</h2>' +
          '<div class="frow"><input name="name" placeholder="Full name" required><input name="email" type="email" placeholder="Email" required></div>' +
          '<input name="address" placeholder="Street address" required>' +
          '<div class="frow"><input name="city" placeholder="City" required><input name="zip" placeholder="Postcode" required></div>' +
          '<button type="button" class="btn" data-next>Continue to delivery</button></div>' +
        '<div class="fstep" data-step><h2>Delivery method</h2>' +
          '<label class="dopt"><input type="radio" name="delivery" value="standard" checked><span><b>Standard</b><i>4–6 days</i></span><em data-cost="9">$9</em></label>' +
          '<label class="dopt"><input type="radio" name="delivery" value="express"><span><b>Express</b><i>1–2 days</i></span><em data-cost="19">$19</em></label>' +
          '<button type="button" class="btn" data-next>Continue to payment</button></div>' +
        '<div class="fstep" data-step><h2>Payment</h2>' +
          '<p class="fnote">Demo checkout — no card is charged.</p>' +
          '<input name="card" placeholder="Card number" inputmode="numeric" required>' +
          '<div class="frow"><input name="exp" placeholder="MM / YY" required><input name="cvc" placeholder="CVC" required></div>' +
          '<button type="submit" class="btn btn--wide">Place order — <span id="payTotal"></span></button></div>' +
      '</form>' +
      '<aside class="summary"><h2>Order summary</h2><div class="srows">' + rows + '</div>' +
        '<div class="sum-line"><span>Subtotal</span><b>' + HHB.money(sub) + '</b></div>' +
        '<div class="sum-line"><span>Shipping</span><b id="sumShip">—</b></div>' +
        '<div class="sum-line sum-line--total"><span>Total</span><b id="sumTotal">—</b></div>' +
        '<p class="summary__note">' + HHB.icon("shield") + '30-night trial · free returns</p></aside>' +
    '</div>' +
  '</section>';
};

HHB.pages.orderSuccess = function (num) {
  return '<section class="shell success"><div class="success__inner">' +
    '<span class="success__mark">' + HHB.icon("check") + '</span>' +
    '<h1>Thank you</h1><p>Order <b>' + num + '</b> is confirmed. A tracking link is on its way to your inbox.</p>' +
    '<div class="success__actions"><a class="btn" href="#/shop">Continue shopping</a><a class="textlink" href="#/">Back home</a></div>' +
  '</div></section>';
};
/* ---------- About ---------- */
HHB.pages.about = function () {
  var values = [
    ["leaf", "Honest materials", "Long-staple cotton, European linen and wool. We list every fibre on the label."],
    ["moon", "Built for rest", "Every piece is tested for breathability, loft and the 30-night trial."],
    ["shield", "Quiet service", "Real humans, same-day answers, and delivery that shows up when we say it will."]
  ].map(function (v) { return '<div class="value">' + HHB.icon(v[0]) + '<h3>' + v[1] + '</h3><p>' + v[2] + '</p></div>'; }).join("");

  return '<section class="about">' +
    '<div class="shell about__hero"><p class="eyebrow">— Since 2021</p><h1>We are<br>the <em>bed</em> people.</h1><p class="about__lede">Hamornie Haven started with one obsession: making the place where you spend a third of your life feel genuinely good.</p></div>' +
    '<div class="shell about__grid"><div class="about__copy"><p>We design bedding the way we would for our own bedrooms — nothing scratchy, nothing that pills after three washes, nothing you have to baby. Just textiles that soften with age and colours that hold.</p><p>Every set is finished in small batches, checked by hand and shipped from our studio.</p></div><div class="about__img"><img src="https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=900&q=80" alt="Our studio"></div></div>' +
    '<div class="shell about__values">' + values + '</div>' +
    '<div class="shell about__cta"><h2>Sleep like you mean it.</h2><a class="btn" href="#/shop">Shop the collection</a></div>' +
  '</section>';
};

/* ---------- Contact ---------- */
HHB.pages.contact = function () {
  var faqs = HHB.FAQS.map(function (f) {
    return '<div class="acc__item"><button class="acc__btn">' + f.q + ' ' + HHB.icon("arrow") + '</button><div class="acc__panel"><p>' + f.a + '</p></div></div>';
  }).join("");

  return '<section class="contact-page shell">' +
    '<div class="page-head"><p class="eyebrow">— Say hello</p><h1>Talk to a real human</h1></div>' +
    '<div class="contact-grid">' +
      '<form id="contactForm" class="contact-form">' +
        '<input name="name" placeholder="Your name" required><input name="email" type="email" placeholder="Email" required>' +
        '<textarea name="message" rows="4" placeholder="A few words about your project" required></textarea>' +
        '<button class="btn" type="submit">Send message</button><p class="form__note" id="formNote" role="status"></p>' +
      '</form>' +
      '<div class="contact-card"><h3>Hamornie Haven Studio</h3>' +
        '<p>12 Weaver\u2019s Lane, Studio 4<br>Open Mon–Sat, 10–18</p>' +
        '<p><a href="mailto:hello@hamorniehaven.com">hello@hamorniehaven.com</a><br>+1 (555) 019-2021</p>' +
        '<div class="acc">' + faqs + '</div></div>' +
    '</div>' +
  '</section>';
};

/* ---------- 404 ---------- */
HHB.pages.notFound = function () {
  return '<section class="shell empty-state"><div class="empty empty--wide">' +
    '<span class="nf">404</span><h1>This page slipped out of bed</h1><p>The address doesn\u2019t match anything in the haven.</p><a class="btn" href="#/">Back home</a></div></section>';
};

HHB.enhancers.checkout = function () {
  var form = $("#checkoutForm");
  if (!form) return;
  var steps = $$("[data-step]", form);
  var lis = $$(".steps li");
  var cur = 0;

  function shipCost(method) {
    var sub = HHB.store.subtotal();
    if (method === "express") return HHB.SHIPPING.express.price;
    return sub >= HHB.FREE_SHIP_AT ? 0 : HHB.SHIPPING.standard.price;
  }
  function calc() {
    var m = form.querySelector('input[name="delivery"]:checked').value;
    var s = shipCost(m);
    var sub = HHB.store.subtotal();
    $("#sumShip").textContent = s === 0 ? "Free" : HHB.money(s);
    $("#sumTotal").textContent = HHB.money(sub + s);
    $("#payTotal").textContent = HHB.money(sub + s);
  }
  function validate(step) {
    var ok = true;
    $$("input[required]", step).forEach(function (inp) {
      var bad = !inp.value.trim() || (inp.type === "email" && !/^\S+@\S+\.\S+$/.test(inp.value));
      inp.classList.toggle("is-error", bad);
      if (bad) ok = false;
    });
    return ok;
  }
  function show(i) {
    cur = i;
    steps.forEach(function (s, j) { s.classList.toggle("is-active", j === i); });
    lis.forEach(function (li, j) { li.classList.toggle("is-active", j <= i); });
  }

  form.addEventListener("click", function (e) {
    if (e.target.matches("[data-next]")) { if (validate(steps[cur])) show(cur + 1); }
  });
  form.addEventListener("change", function (e) { if (e.target.name === "delivery") calc(); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate(steps[cur])) return;
    var num = "HHB-" + Math.floor(10000 + Math.random() * 90000);
    HHB.store.clearCart();
    document.getElementById("app").innerHTML = HHB.pages.orderSuccess(num);
    window.scrollTo(0, 0);
    HHB.ui.toast("Order placed — thank you");
  });
  calc();
};

HHB.enhancers.contact = function () {
  var f = $("#contactForm"), note = $("#formNote");
  if (f) f.addEventListener("submit", function (e) {
    e.preventDefault();
    note.textContent = "✓ Thanks — we'll reply within 2 hours.";
    f.reset();
  });
  HHB.ui.bindAcc();
};

