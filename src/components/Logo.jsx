export default function Logo({ light = false }) {
  return (
    <svg className="logo__svg" viewBox="0 0 120 120" role="img" aria-label="Hamornie Haven Bedding logo">
      <defs><path id="arch" d="M14,78 A50,50 0 0 1 106,78" /></defs>
      <text className={"logo__arch" + (light ? " logo__arch--light" : "")}>
        <textPath href="#arch" startOffset="50%" textAnchor="middle">HAMORNIE HAVEN BEDDING</textPath>
      </text>
      <g fill="none" stroke="#2b2b2b" strokeWidth="4" strokeLinejoin="round">
        <path d="M28 78V62a6 6 0 016-6h52a6 6 0 016 6v16" />
        <path d="M28 66h64" />
        <path d="M24 78v10m72-10v10" strokeLinecap="round" />
        <rect x="46" y="58" width="28" height="8" rx="4" fill="#2b2b2b" stroke="none" />
      </g>
      <path className="logo__wave" d="M22 96c8-8 16 6 24-2s16 6 24-2 16 6 26-4" fill="none" stroke="#1e3a8a" strokeWidth="3.5" strokeLinecap="round" />
      <text x="16" y="112" className="logo__est">Est</text>
      <text x="86" y="112" className="logo__est">2021</text>
    </svg>
  );
}
