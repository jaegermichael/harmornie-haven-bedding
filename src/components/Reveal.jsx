import useReveal from '../lib/useReveal.js';

export default function Reveal({ className = "", delay = 0, children }) {
  const ref = useReveal(delay);
  return <div ref={ref} className={"reveal " + className}>{children}</div>;
}
