const STAR = '<path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17l-5.9 3.2 1.3-6.6L2.5 9l6.6-.8z"/>';

export default function Stars({ rating }) {
  const unit = '<svg viewBox="0 0 24 24">' + STAR + '</svg>';
  const all = unit.repeat(5);
  return (
    <span className="stars">
      <span className="stars__bg" dangerouslySetInnerHTML={{ __html: all }} />
      <span className="stars__fg" style={{ width: (rating / 5 * 100) + "%" }} dangerouslySetInnerHTML={{ __html: all }} />
    </span>
  );
}
