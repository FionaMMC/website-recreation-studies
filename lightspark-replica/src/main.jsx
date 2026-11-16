import { loadRuntime, React, ReactDOM } from './lib/runtime.js';
import { installNavigation } from './lib/navigation.js';

installNavigation();
await loadRuntime();
const { default: App } = await import('./App.jsx');
ReactDOM.hydrateRoot(document.getElementById('__next'), <App />);
