export function originalDestination(href) {
  const url = new URL(typeof href === 'string' ? href : href.pathname || '/', location.href);
  return url.origin === location.origin && url.pathname !== '/'
    ? 'https://www.lightspark.com' + url.pathname + url.search + url.hash
    : url.href;
}
export function installNavigation() {
  const onClick = event => {
    const anchor = event.target.closest?.('a[href]');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(anchor.getAttribute('href'), location.href);
    if (url.origin !== location.origin || url.pathname === '/' || url.hash) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(originalDestination(url.href));
  };
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
