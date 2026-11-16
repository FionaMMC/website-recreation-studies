import { React } from '../lib/runtime.js';

/**
 * Divides related content with a single-pixel grid rather than separate cards.
 * <HairlineGrid columns={4} mobileColumns={2} label="Platform overview">
 *   {items.map(item => <div key={item.id}>{item.content}</div>)}
 * </HairlineGrid>
 */
export function HairlineGrid({
  children,
  columns = 4,
  mobileColumns = 1,
  label,
  className = '',
  style,
}) {
  const desktopCount = Math.max(1, Math.min(6, Math.floor(Number(columns) || 4)));
  const mobileCount = Math.max(1, Math.min(desktopCount, Math.floor(Number(mobileColumns) || 1)));

  return (
    <div
      className={`lp-pattern lp-hairline-grid ${className}`.trim()}
      style={{ '--lp-grid-columns': desktopCount, '--lp-grid-mobile-columns': mobileCount, ...style }}
      role="list"
      aria-label={label}
    >
      {React.Children.toArray(children).map((child, index) => (
        <div className="lp-hairline-grid__cell" role="listitem" key={child.key ?? index}>
          {child}
        </div>
      ))}
    </div>
  );
}
