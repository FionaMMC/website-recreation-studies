/**
 * Compatibility boundary for the original public React component graph.
 * Reuse its React singleton so original hooks, motion and contexts stay identical.
 * App code remains standard JSX, built by Vite; Next's automatic startup is disabled.
 */
import pageData from '../data/page-data.json';
export let React;
export let ReactDOM;
let runtime;
const chunks = [
  'polyfills-42372ed130431b0a.js',
  'webpack-2a00a1e438307362.js',
  'framework-5991737ec854c1b5.js',
  'main-41a1ac46906224cf.js',
  'pages/_app-44817acd33900988.js',
  '7acfccf4-f85fb9e47eae2939.js',
  '3136-6a191d37e191cb18.js',
  '6021-e8e756e0fac2c265.js',
  '73-23b5bc0cfe7f5548.js',
  '7022-5fca8e0d2745e007.js',
  '1895-602760327ca954ad.js',
  'pages/index-5b50cd8771dcf0ea.js',
];
function loadScript(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/_next/static/chunks/' + path;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Could not load local UI module: ${path}`));
    document.head.append(script);
  });
}
export async function loadRuntime() {
  if (runtime) return runtime;
  window.__NEXT_DATA__ = pageData;
  for (const chunk of chunks) await loadScript(chunk);
  const require = window.__lightsparkRequire;
  if (!require) throw new Error('The original UI module graph did not initialize.');
  React = require(14232);
  ReactDOM = require(24279);
  runtime = {
    require,
    Home: require(39604).default,
    SiteProviders: require(94343).default,
    pageProps: pageData.props.pageProps,
  };
  return runtime;
}
export function getRuntime() {
  if (!runtime) throw new Error('Call loadRuntime before rendering.');
  return runtime;
}
