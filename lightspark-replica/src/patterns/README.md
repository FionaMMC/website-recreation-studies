# Lightspark patterns

These small React components extract reusable composition ideas from the reference. They do not import the bundled homepage internals. React is shared through `src/lib/runtime.js`; import components from `src/patterns/index.js` to load their scoped stylesheet too.

To use them in another React project, copy this folder and replace each `import { React } from '../lib/runtime.js'` with `import React from 'react'`. Copy the Suisse font to `/fonts/SuisseIntlVF.woff2`, or replace the `@font-face` declaration with your own typeface. The CSS has no dependency on the homepage stylesheet.

```jsx
import { ActionPair, HairlineGrid, PartnerMarquee, SectionHeading, SoftFocusCard } from './patterns/index.js';

<SectionHeading title="Components" description="Explore the implementation and adapt the composition." />
<HairlineGrid columns={3} mobileColumns={1} label="Image examples">
  <SoftFocusCard src="/images/hero-v2-blur/hero-img-wallet.webp" alt="Wallet interface" title="Soft edges" />
</HairlineGrid>
<ActionPair primary={{ label: 'View study', href: '/study' }} secondary={{ label: 'View source', href: '#source' }} />
<PartnerMarquee logos={[{ src: '/images/explore/logos/logo-sofi.svg', alt: 'SoFi' }]} />
```

Set `--lp-ink`, `--lp-muted`, `--lp-paper`, and `--lp-line` on a component to change its palette. `SoftFocusCard` accepts `aspectRatio` and overlay children. `SectionHeading` accepts `as`, `id`, and trailing `actions`. `PartnerMarquee` takes `{src, alt, width?, height?, href?, id?}` entries and a `speed` in pixels per second. Repeated logos are hidden from assistive technology; hovering or focusing pauses motion, and reduced-motion preference shows a static scrollable rail.

Stable IDs and source locations live in `registry.json` for a future multi-site study gallery. Images remain the original brand's reference assets.
