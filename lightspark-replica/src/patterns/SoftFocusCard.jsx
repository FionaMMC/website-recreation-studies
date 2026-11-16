import { React } from '../lib/runtime.js';

/**
 * A reusable image tile with soft edges and a quiet hover/focus treatment.
 * <SoftFocusCard src="/images/hero-v2-blur/hero-img-wallet.webp"
 *   alt="Wallet interface" href="/study#cards" title="Wallet" />
 */
export function SoftFocusCard({
  src,
  alt,
  href,
  title,
  description,
  children,
  aspectRatio = '1 / 1',
  className = '',
  style,
  target,
  onClick,
  loading = 'lazy',
}) {
  const Tag = href ? 'a' : 'figure';
  const interaction = href
    ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : undefined, onClick }
    : {};

  return (
    <Tag
      className={`lp-pattern lp-soft-focus-card ${className}`.trim()}
      style={{ '--lp-card-ratio': aspectRatio, ...style }}
      {...interaction}
    >
      <span className="lp-soft-focus-card__visual">
        <img className="lp-soft-focus-card__halo" src={src} alt="" aria-hidden="true" loading={loading} />
        <img className="lp-soft-focus-card__image" src={src} alt={alt || ''} loading={loading} />
        {children && <span className="lp-soft-focus-card__overlay">{children}</span>}
      </span>
      {(title || description) && (
        <span className="lp-soft-focus-card__caption">
          {title && <span className="lp-soft-focus-card__title">{title}</span>}
          {description && <span className="lp-soft-focus-card__description">{description}</span>}
        </span>
      )}
    </Tag>
  );
}
