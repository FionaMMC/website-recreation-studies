import { loadRuntime, React, ReactDOM } from './lib/runtime.js';
await loadRuntime();
const { default: StudyPage } = await import('./pages/StudyPage.jsx');
ReactDOM.createRoot(document.getElementById('study-root')).render(<StudyPage />);
