import { React, getRuntime } from './lib/runtime.js';
import WebsiteProvider from './providers/WebsiteProvider.jsx';
import HomePage from './pages/HomePage.jsx';

export default function App() {
  const { SiteProviders, pageProps } = getRuntime();
  return (
    <WebsiteProvider>
      <SiteProviders Component={HomePage} pageProps={pageProps} />
    </WebsiteProvider>
  );
}
