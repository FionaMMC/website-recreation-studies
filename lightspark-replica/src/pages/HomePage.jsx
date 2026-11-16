import { React, getRuntime } from '../lib/runtime.js';
import CookiePreferences from '../components/CookiePreferences.jsx';

/** The original homepage's React composition preserves exact visuals and physics. */
export default function HomePage(props) {
  const { Home } = getRuntime();
  return <><Home {...props} /><CookiePreferences /></>;
}
