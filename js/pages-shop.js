/* ============================================================
   Hamornie Haven Bedding — shop (listing + filters)
   ============================================================ */
window.HHB = window.HHB || {};
HHB.pages = HHB.pages || {};
HHB.enhancers = HHB.enhancers || {};

function $(s, el) { return (el || document).querySelector(s); }
function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }

HHB.shopGrid = function (st) {
  var list = HHB.products.slice();
  if (st.cat) list = list.filter(function (p) { return p.cat === st.cat; });
  if (st.q) list = list.filter(function (p) { return (p.name + " " + p.desc).toLowerCase().indexOf(st.q) >= 0; });
  if (st.color) list = list.filter(function (p) { return p.colors.indexOf(st.color) >= 0; });
  if (st.max != null) list = list.filter(function (p) { return p.price <= st.max; });

  if (st.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
  else if (st.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
  else if (st.sort === "rating") list.sort(function (a, b) { return b.rating - a.rating; });
  else list.sort(function (a, b) { return ((b.badge ? 1 : 0) - (a.badge ? 1 : 0)) || (b.rating - a.rating); });

  if (!list.length) {
    return '<div class="empty empty--wide">' + HHB.icon("search") + '<p>No bedding matches those filters.</p><button class="btn" id="clearFilters">Clear filters</button></div>';
  }
  return list.map(HHB.card).join("");
};

HHB.pages.shop = function (st) {
  st = st || {};
  var q = st.q || "";
  var colorDots = Object.keys(HHB.COLORS).map(function (k) {
    var c = HHB.COLORS[k];
    return '<button class="dot' + (st.color === k ? ' is-active' : '') + '" data-color="' + k + '" title="' + c.name + '" aria-label="' + c.name + '"><i style="background:' + c.hex + '"></i></button>';
  }).join("");

  return '<section class="shop-page shell">' +
    '<header class="page-head"><p class="eyebrow">— The shop</p><h1>Every layer of rest</h1></header>' +
    '<div class="shop-layout">' +
      '<aside class="filters">' +
        '<div class="fblock"><h3>Category</h3>' +
          '<a class="fcat' + (!st.cat ? ' is-active' : '') + '" href="#/shop">All bedding</a>' +
          HHB.CATEGORIES.map(function (c) {
            return '<a class="fcat' + (st.cat === c.id ? ' is-active' : '') + '" href="#/shop?cat=' + c.id + '">' + c.name + '<i>' + HHB.products.filter(function (p) { return p.cat === c.id; }).length + '</i></a>';
          }).join("") +
        '</div>' +
        '<div class="fblock"><h3>Max price</h3><input type="range" id="priceRange" min="30" max="180" step="2" value="' + (st.max || 180) + '"><output id="priceOut">up to ' + HHB.money(st.max || 180) + '</output></div>' +
        '<div class="fblock"><h3>Colour</h3><div class="dots">' + colorDots + '</div></div>' +
        '<div class="fblock"><h3>Search</h3><input id="shopSearch" class="finput" placeholder="Search products…" value="' + q + '"></div>' +
      '</aside>' +
      '<div class="shop-main">' +
        '<div class="toolbar"><span id="shopCount"></span><label>Sort <select id="sortSel"><option value="featured">Featured</option><option value="price-asc">Price ↑</option><option value="price-desc">Price ↓</option><option value="rating">Top rated</option></select></label></div>' +
        '<div class="shop__grid" id="shopGrid"></div>' +
      '</div>' +
    '</div>' +
  '</section>';
};

HHB.enhancers.shop = function (st) {
  var state = Object.assign({}, st);
  if (!state.max) state.max = 180;
  var grid = $("#shopGrid"), count = $("#shopCount"), range = $("#priceRange"), out = $("#priceOut"), sort = $("#sortSel"), search = $("#shopSearch");
  if (sort) sort.value = state.sort || "featured";

  function draw() {
    grid.innerHTML = HHB.shopGrid(state);
    var n = grid.querySelectorAll(".pcard").length;
    count.textContent = n + " product" + (n === 1 ? "" : "s");
    var cf = $("#clearFilters");
    if (cf) cf.addEventListener("click", function () { location.hash = "#/shop"; });
    if (HHB.refreshReveal) HHB.refreshReveal();
  }

  if (range) range.addEventListener("input", function () { state.max = +range.value; out.textContent = "up to " + HHB.money(state.max); draw(); });
  if (sort) sort.addEventListener("change", function () { state.sort = sort.value; draw(); });
  var deb;
  if (search) search.addEventListener("input", function (e) { clearTimeout(deb); deb = setTimeout(function () { state.q = e.target.value.trim().toLowerCase(); draw(); }, 200); });
  $$(".dot").forEach(function (d) {
    d.addEventListener("click", function () {
      state.color = state.color === d.dataset.color ? null : d.dataset.color;
      $$(".dot").forEach(function (x) { x.classList.toggle("is-active", x.dataset.color === state.color); });
      draw();
    });
  });
  draw();
};
