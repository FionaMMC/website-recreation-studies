import { React } from '../lib/runtime.js';

function Arrow() {
  return (
    <svg className="lp-action-pair__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Action({ action, variant }) {
  if (!action?.label) return null;
  const { label, href, onClick, disabled = false, target, arrow = false, type = 'button' } = action;
  const className = `lp-action-pair__action lp-action-pair__action--${variant}`;
  const content = <>{label}{arrow && <Arrow />}</>;

  if (href && disabled) return <span className={className} aria-disabled="true">{content}</span>;
  if (href) {
    return (
      <a className={className} href={href} onClick={onClick} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
        {content}
      </a>
    );
  }
  return <button className={className} type={type} onClick={onClick} disabled={disabled}>{content}</button>;
}

/**
 * A clear primary action with a lower-emphasis alternative.
 * <ActionPair primary={{ label: 'Open study', href: '/study' }}
 *   secondary={{ label: 'View source', href: '#source', arrow: true }} />
 */
export function ActionPair({ primary, secondary, align = 'start', className = '', label }) {
  if (!primary?.label && !secondary?.label) return null;
  return (
    <div className={`lp-pattern lp-action-pair ${className}`.trim()} data-align={align} role="group" aria-label={label}>
      <Action action={primary} variant="primary" />
      <Action action={secondary} variant="secondary" />
    </div>
  );
}
