import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom'
import Showroom, { ProductCard } from './Showroom'
import { CATEGORIES, products, product as getProduct, money } from './data'

const Arrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
const Bag = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2" /></svg>

function Logo() { return <Link className="brand" to="/" aria-label="Harmornie Haven Bedding home"><img src="/images/logo.jpg" alt="Harmornie Haven Bedding" /><span>Harmornie Haven <small>BEDDING</small></span></Link> }

function App() {
  const [bag, setBag] = useState(() => {
    try {
      const ids = JSON.parse(localStorage.getItem('hhb.saved-beds.v1'))
      return Array.isArray(ids) ? [...new Set(ids)].map(getProduct).filter(Boolean) : []
    } catch { return [] }
  })
  const [bagOpen, setBagOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dialog = useRef(null)
  const header = useRef(null)
  const menuButton = useRef(null)
  const location = useLocation()
  useEffect(() => { try { localStorage.setItem('hhb.saved-beds.v1', JSON.stringify(bag.map((item) => item.id))) } catch { /* Storage may be unavailable. */ } }, [bag])
  useEffect(() => {
    if (bagOpen && !dialog.current.open) dialog.current.showModal()
    if (!bagOpen && dialog.current.open) dialog.current.close()
  }, [bagOpen])
  useEffect(() => {
    const outside = (event) => { if (!header.current?.contains(event.target)) setMenuOpen(false) }
    const desktop = matchMedia('(min-width: 801px)')
    const close = () => { if (desktop.matches) setMenuOpen(false) }
    window.addEventListener('pointerdown', outside)
    desktop.addEventListener('change', close)
    return () => { window.removeEventListener('pointerdown', outside); desktop.removeEventListener('change', close) }
  }, [])
  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0) }, [location.pathname])
  useEffect(() => { document.body.classList.toggle('no-scroll', bagOpen); return () => document.body.classList.remove('no-scroll') }, [bagOpen])
  useEffect(() => { const onKey = (event) => { if (event.key === 'Escape') { setBagOpen(false); setMenuOpen((open) => { if (open) menuButton.current?.focus(); return false }) } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [])
  const add = (item) => { setBag((current) => current.some((saved) => saved.id === item.id) ? current : [...current, item]); setMenuOpen(false); setBagOpen(true) }
  const total = bag.reduce((sum, item) => sum + item.price, 0)
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="announcement">A little more comfort. A place to call your own.</div>
    <header className="site-header" ref={header}><div className="header-inner"><Logo /><nav id="main-navigation" onClick={() => setMenuOpen(false)} className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation"><NavLink to="/shop">The collection</NavLink><NavLink to="/about">Our story</NavLink><NavLink to="/contact">Ordering info</NavLink></nav><div className="header-actions"><button className="bag-toggle" onClick={() => { setMenuOpen(false); setBagOpen(true) }} aria-label={`Open saved beds, ${bag.length} ${bag.length === 1 ? 'item' : 'items'}`}><Bag /><span>{bag.length}</span></button><button ref={menuButton} aria-controls="main-navigation" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? 'Close' : 'Menu'}</button></div></div></header>
    <main id="main-content" tabIndex="-1"><Routes><Route path="/" element={<Showroom add={add} />} /><Route path="/shop" element={<Shop add={add} />} /><Route path="/product/:id" element={<Product add={add} />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></main>
    <Footer />
    <dialog ref={dialog} className="bag-panel" aria-labelledby="saved-title" onCancel={() => setBagOpen(false)} onClose={() => setBagOpen(false)} onClick={(event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      if (event.target === event.currentTarget && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) setBagOpen(false)
    }}><div className="bag-head"><div><span className="eyebrow">YOUR SELECTION</span><h2 id="saved-title">Your saved beds.</h2></div><button onClick={() => setBagOpen(false)} aria-label="Close saved beds">×</button></div><div className="bag-items">{bag.length ? bag.map((item, index) => <div className="bag-row" key={`${item.id}-${index}`}><img src={item.img} alt="" /><div><b>{item.name}</b><span>{money(item.price)}</span><button onClick={() => setBag((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${item.name}`}>Remove</button></div></div>) : <div className="bag-empty"><p>No beds saved yet.</p><Link className="button dark" to="/shop" onClick={() => setBagOpen(false)}>Explore the collection <Arrow /></Link></div>}</div>{bag.length > 0 && <div className="bag-foot"><div><span>Combined listed price</span><b>{money(total)}</b></div><p>This selection is for browsing. Online checkout is not available yet.</p><Link to="/contact" onClick={() => setBagOpen(false)} className="button dark">View ordering information <Arrow /></Link></div>}</dialog>
  </>
}

function Shop({ add }) { const [params, setParams] = useSearchParams(); const [sort, setSort] = useState('featured'); const requested = params.get('cat') || 'all'; const category = CATEGORIES.some((item) => item.id === requested) ? requested : 'all'; const items = useMemo(() => { const filtered = products.filter((item) => category === 'all' || (category === 'spring' && item.construction === 'Spring') || (category === 'foam' && item.construction === 'Compressed foam') || (category === 'pillowtop' && item.finish === 'Pillowtop')); if (sort === 'low') filtered.sort((a,b) => a.price-b.price); if (sort === 'high') filtered.sort((a,b) => b.price-a.price); return filtered }, [category, sort]); return <section className="shop-page section-shell page-pad"><div className="page-intro"><h1>Explore the <em>beds.</em></h1><p>Eight beds. Two sizes. Spring or compressed foam, with standard and pillowtop finishes.</p></div><div className="shop-toolbar"><div className="chips" role="group" aria-label="Filter beds">{CATEGORIES.map((item) => <button key={item.id} className={category === item.id ? 'active' : ''} aria-pressed={category === item.id} onClick={() => setParams(item.id === 'all' ? {} : { cat: item.id })}>{item.name}</button>)}</div><label>Sort <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div><p className="result-count" aria-live="polite">Showing {items.length} {items.length === 1 ? 'bed' : 'beds'}</p><div className="product-grid">{items.map((item) => <ProductCard key={item.id} item={item} add={add} />)}</div></section> }

function Product({ add }) { const { id } = useParams(); const item = getProduct(id); if (!item) return <NotFound />; return <section className="pdp section-shell page-pad"><div className="pdp-photo"><img src={item.img} alt={item.name} /></div><div className="pdp-copy"><Link className="back-link" to="/shop">← All beds</Link><h1>{item.name}</h1><strong className="pdp-price">{money(item.price)}</strong><p>A {item.size.toLowerCase()}-size {item.construction.toLowerCase()} bed with a {item.finish.toLowerCase()} finish, shown in an original Harmornie Haven product photo.</p><dl><div><dt>Size</dt><dd>{item.size}</dd></div><div><dt>Construction</dt><dd>{item.construction}</dd></div><div><dt>Finish</dt><dd>{item.finish}</dd></div></dl><button className="button dark" onClick={() => add(item)}>Save this bed <Bag /></button><small>Contact details and ordering options will be added when confirmed by Harmornie Haven.</small></div></section> }

function About() { return <section className="about-page section-shell page-pad"><div><h1>About Harmornie <em>Haven.</em></h1><p>Established in 2021, Harmornie Haven Bedding focuses on beds. This site shows the real spring and compressed foam models provided by the company, in double and queen sizes.</p><Link className="button dark" to="/shop">Browse the beds <Arrow /></Link></div><img src="/images/double-compressed-standard.jpg" alt="Double compressed foam standard bed" /></section> }
function Contact() { return <section className="contact-page section-shell page-pad"><h1>Ordering <em>information.</em></h1><p>Save any bed that interests you to compare its name, details and listed price. Contact information and ordering options will appear here once confirmed by Harmornie Haven. This catalogue does not currently accept orders or payments.</p><Link className="button dark" to="/shop">Back to the collection <Arrow /></Link></section> }
function NotFound() { return <section className="not-found section-shell page-pad"><h1>That page isn’t here.</h1><p>Find your way back to the beds.</p><Link className="button dark" to="/shop">Shop beds <Arrow /></Link></section> }
function Footer() { return <footer className="footer"><div className="section-shell footer-main"><div><Logo /><p>Beds made for better rest.</p></div><nav aria-label="Footer navigation"><Link to="/shop">Shop beds</Link><Link to="/about">Our story</Link><Link to="/contact">Ordering info</Link></nav></div><div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} Harmornie Haven Bedding</span><span>Est. 2021</span></div></footer> }
export default App
