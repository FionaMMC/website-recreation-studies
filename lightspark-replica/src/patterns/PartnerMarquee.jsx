import { React } from '../lib/runtime.js';

function LogoSet({ logos, hidden, setRef }) {
  return (
    <div className="lp-partner-marquee__set" aria-hidden={hidden || undefined} ref={setRef}>
      {logos.map((logo, index) => {
        const image = <img src={logo.src} alt={hidden ? '' : logo.alt || ''} width={logo.width || 120} height={logo.height || 32} loading="lazy" />;
        return logo.href ? (
          <a className="lp-partner-marquee__logo" href={logo.href} tabIndex={hidden ? -1 : undefined} key={logo.id || `${logo.src}-${index}`}>
            {image}
          </a>
        ) : <span className="lp-partner-marquee__logo" key={logo.id || `${logo.src}-${index}`}>{image}</span>;
      })}
    </div>
  );
}

/**
 * An infinite logo rail. Speed is pixels/second, so changing its width keeps
 * the same reading pace. Hover/focus pauses it; reduced motion makes it static.
 * <PartnerMarquee logos={[{ src: '/images/explore/logos/logo-sofi.svg', alt: 'SoFi' }]} />
 */
export function PartnerMarquee({ logos = [], label = 'Partner logos', speed = 42, className = '', style }) {
  const containerRef = React.useRef(null);
  const setRef = React.useRef(null);
  const [copies, setCopies] = React.useState(1);
  const [duration, setDuration] = React.useState(30);

  React.useEffect(() => {
    const container = containerRef.current;
    const set = setRef.current;
    if (!container || !set) return undefined;
    const measure = () => {
      const width = set.getBoundingClientRect().width;
      if (!width) return;
      const count = Math.max(1, Math.ceil(container.getBoundingClientRect().width / width));
      setCopies(count);
      setDuration(width * count / Math.max(1, Number(speed) || 42));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(set);
    return () => observer.disconnect();
  }, [logos.length, speed]);

  if (!logos.length) return null;

  return (
    <div className={`lp-pattern lp-partner-marquee ${className}`.trim()} ref={containerRef} aria-label={label} role="region" style={{ '--lp-marquee-duration': `${duration}s`, ...style }}>
      <div className="lp-partner-marquee__track">
        {[0, 1].map(group => (
          <div className="lp-partner-marquee__group" aria-hidden={group === 1 || undefined} key={group}>
            {Array.from({ length: copies }, (_, copy) => (
              <LogoSet logos={logos} hidden={group > 0 || copy > 0} setRef={group === 0 && copy === 0 ? setRef : undefined} key={copy} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
