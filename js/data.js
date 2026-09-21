/* ============================================================
   Hamornie Haven Bedding — app data
   Catalog, categories, colours, content blocks.
   ============================================================ */
window.HHB = window.HHB || {};

HHB.CATEGORIES = [
  { id:"sets",   name:"Bedding sets",      img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80" },
  { id:"duvets", name:"Duvets & pillows",  img:"https://images.unsplash.com/photo-1629947009686-92a4b120b4af?auto=format&fit=crop&w=900&q=80" },
  { id:"throws", name:"Throws & blankets", img:"https://images.unsplash.com/photo-1600369379583-39ef638dd4e0?auto=format&fit=crop&w=900&q=80" },
  { id:"kids",   name:"Kids",              img:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80" }
];

HHB.COLORS = {
  ivory:    { name:"Ivory",    hex:"#e8e2d6" },
  navy:     { name:"Navy",     hex:"#1e3a8a" },
  sage:     { name:"Sage",     hex:"#9caf88" },
  clay:     { name:"Clay",     hex:"#b07a5c" },
  charcoal: { name:"Charcoal", hex:"#2b2b2b" },
  blush:    { name:"Blush",    hex:"#d9a6a0" }
};

HHB.products = [
  { id:"cloud-nine", name:"Cloud Nine Set", cat:"sets", price:89, old:null, badge:"new", rating:4.8, reviews:214,
    colors:["ivory","navy","sage"], sizes:["Twin","Queen","King"],
    img:"https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80",
    desc:"Buttery 400-thread-count sateen with a soft drape — the set guests always ask about.",
    details:["400TC long-staple cotton sateen","Duvet cover + 2 pillowcases","OEKO-TEX certified dyes"] },

  { id:"loft-linen", name:"Loft Linen Sheets", cat:"sets", price:96, old:120, badge:"sale", rating:4.7, reviews:168,
    colors:["ivory","clay"], sizes:["Queen","King"],
    img:"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    desc:"Relaxed stonewashed linen that gets softer with every single wash.",
    details:["100% European flax linen","Breathable year-round weave","Pre-washed for zero shrinkage"] },

  { id:"sable-reserve", name:"Sable Reserve Duvet Cover", cat:"sets", price:129, old:null, badge:null, rating:4.9, reviews:96,
    colors:["charcoal","clay"], sizes:["Queen","King"],
    img:"https://images.unsplash.com/photo-1616594039964-ae9081e400c2?auto=format&fit=crop&w=900&q=80",
    desc:"Deep, velvety sateen from the Reserve collection — quiet luxury for slow mornings.",
    details:["500TC mercerised sateen","Naturally temperature-regulating","Limited Reserve run"] },

  { id:"umber-reserve", name:"Umber Reserve Set", cat:"sets", price:112, old:null, badge:null, rating:4.8, reviews:77,
    colors:["charcoal","ivory"], sizes:["Queen","King"],
    img:"https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=900&q=80",
    desc:"Warm earthy tones woven with a matte hand-feel for grounded bedrooms.",
    details:["480TC long-staple weave","Colour-locked eco dyeing","Limited Reserve run"] },

  { id:"blush-reserve", name:"Blush Reserve Set", cat:"sets", price:118, old:null, badge:null, rating:4.7, reviews:64,
    colors:["blush","ivory"], sizes:["Queen","King"],
    img:"https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
    desc:"A rosy neutral with a cloud-soft finish, made for effortless layering.",
    details:["480TC sateen, garment washed","Fade-resistant pigments","Limited Reserve run"] },

  { id:"hush-pillows", name:"Hush Pillow Pair", cat:"duvets", price:45, old:null, badge:"new", rating:4.6, reviews:302,
    colors:["ivory"], sizes:null,
    img:"https://images.unsplash.com/photo-1629947009686-92a4b120b4af?auto=format&fit=crop&w=900&q=80",
    desc:"Sink-in support with a cooling, kernel-free fill — sold as a pair.",
    details:["Adjustable loft inner core","Hypoallergenic microfibre","233TC cotton shell"] },

  { id:"cloudsupport", name:"Cloudsupport Pillow", cat:"duvets", price:58, old:null, badge:null, rating:4.5, reviews:189,
    colors:["ivory"], sizes:null,
    img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    desc:"A firmer profile for side sleepers who want proper neck alignment.",
    details:["Ergonomic contour core","Removable washable cover","Responsive supportive fill"] },
  { id:"aerelle-duvet", name:"Aerelle Cool Duvet", cat:"duvets", price:149, old:null, badge:"hot", rating:4.8, reviews:143,
    colors:["ivory","navy"], sizes:["Twin","Queen","King"],
    img:"https://images.unsplash.com/photo-1631049035182-249067d7618e?auto=format&fit=crop&w=900&q=80",
    desc:"Temperature-smart duvet that dumps heat before you wake up sweaty.",
    details:["Bounce-back cluster fill","Cool-touch cotton cover","Fully machine washable"] },

  { id:"winter-duvet", name:"Winter Weight Duvet", cat:"duvets", price:178, old:null, badge:null, rating:4.9, reviews:88,
    colors:["ivory"], sizes:["Queen","King"],
    img:"https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
    desc:"Heavyweight warmth without the weight — for serious blanket-fort builders.",
    details:["Wool-blend fill","Baffle-box construction","Naturally breathable"] },

  { id:"velours-throw", name:"Velours Throw", cat:"throws", price:62, old:null, badge:"hot", rating:4.7, reviews:256,
    colors:["clay","navy","sage"], sizes:null,
    img:"https://images.unsplash.com/photo-1600369379583-39ef638dd4e0?auto=format&fit=crop&w=900&q=80",
    desc:"A velvet-soft throw you'll fight over — couch approved.",
    details:["Plush velour face","Reversible sherpa back","140 × 180 cm"] },

  { id:"nordic-wool", name:"Nordic Wool Blanket", cat:"throws", price:84, old:null, badge:null, rating:4.8, reviews:121,
    colors:["sage","charcoal"], sizes:null,
    img:"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80",
    desc:"Chunky Scandinavian weave in undyed wool — instant cabin energy.",
    details:["100% undyed wool","Chunky basket weave","130 × 180 cm"] },

  { id:"stonewash-coverlet", name:"Stonewashed Coverlet", cat:"throws", price:88, old:null, badge:null, rating:4.6, reviews:74,
    colors:["ivory","sage"], sizes:null,
    img:"https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
    desc:"A light quilted layer for shoulder-season nights.",
    details:["Garment-washed cotton","Light-weight quilt fill","Fits up to King"] },

  { id:"little-haven", name:"Little Haven Set", cat:"kids", price:74, old:null, badge:"new", rating:4.9, reviews:132,
    colors:["sage","blush"], sizes:["Toddler","Twin"],
    img:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
    desc:"A kid-approved starter set in playful, washable colours.",
    details:["300TC soft percale","Duvet cover + pillowcase","Fun, washable prints"] },

  { id:"dream-pillow", name:"Dream Sprinkle Pillow", cat:"kids", price:32, old:null, badge:null, rating:4.6, reviews:98,
    colors:["blush","ivory"], sizes:null,
    img:"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=80",
    desc:"A first pillow sized for little heads and even bigger dreams.",
    details:["Toddler-safe low loft","Hypoallergenic fill","Soft cotton cover"] }
];

