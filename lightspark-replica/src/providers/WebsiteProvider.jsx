import { React, getRuntime } from '../lib/runtime.js';
import { originalDestination } from '../lib/navigation.js';

/** Next-compatible contexts needed by the retained original React UI components. */
export default function WebsiteProvider({ children }) {
  const { require } = getRuntime();
  const contexts = React.useMemo(() => {
    const routerModule = require(16296);
    const navigate = (href, as) => {
      location.assign(originalDestination(as || href));
      return Promise.resolve(true);
    };
    const router = {
      pathname: '/', route: '/', asPath: '/', query: {}, basePath: '',
      locale: 'en', locales: ['en'], defaultLocale: 'en',
      isReady: true, isFallback: false, isPreview: false, isSsr: false,
      push: navigate, replace: navigate, prefetch: () => Promise.resolve(),
      beforePopState: () => {}, back: () => history.back(), reload: () => location.reload(),
      events: routerModule.Router.events,
    };
    routerModule.default.router = router;
    const head = require(11677).default();
    head.getIsSsr = () => false;
    return {router, head};
  }, []);
  const { RouterContext } = require(242);
  const { HeadManagerContext } = require(7965);
  const { PathnameContext, SearchParamsContext, PathParamsContext } = require(88797);
  const { ImageConfigContext } = require(9263);
  const imageConfig = { ...require(89161).imageConfigDefault, qualities: [75, 100], unoptimized: true };
  return (
    <RouterContext.Provider value={contexts.router}>
      <HeadManagerContext.Provider value={contexts.head}>
        <PathnameContext.Provider value="/">
          <SearchParamsContext.Provider value={new URLSearchParams(location.search)}>
            <PathParamsContext.Provider value={{}}>
              <ImageConfigContext.Provider value={imageConfig}>
                {children}
              </ImageConfigContext.Provider>
            </PathParamsContext.Provider>
          </SearchParamsContext.Provider>
        </PathnameContext.Provider>
      </HeadManagerContext.Provider>
    </RouterContext.Provider>
  );
}
