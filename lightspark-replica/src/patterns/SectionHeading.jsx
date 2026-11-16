import { React } from '../lib/runtime.js';

/**
 * A section heading with optional descriptive copy and trailing controls.
 * <SectionHeading title="What we do" description="Explore each product."
 *   actions={<ActionPair primary={{ label: 'Explore', href: '#products' }} />} />
 */
export function SectionHeading({
  title,
  children,
  description,
  actions,
  as = 'h2',
  id,
  className = '',
}) {
  const Heading = /^h[1-6]$/.test(as) ? as : 'h2';
  return (
    <div className={`lp-pattern lp-section-heading ${className}`.trim()}>
      <div className="lp-section-heading__copy">
        <Heading className="lp-section-heading__title" id={id}>{title || children}</Heading>
        {description && <p className="lp-section-heading__description">{description}</p>}
      </div>
      {actions && <div className="lp-section-heading__actions">{actions}</div>}
    </div>
  );
}
