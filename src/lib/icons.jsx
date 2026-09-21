/* ============================================================
   Hamornie Haven Bedding — icons + small utilities
   ============================================================ */
const ICONS = {
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

export default function Icon({ name, className = "" }) {
  return (
    <svg
      className={"icon " + className}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[name] || "" }}
    />
  );
}
