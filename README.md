# Old Monk Interactive Clone

An immersive Old Monk brand experience inspired by the premium motion language of Scepter & Sword. The project is built with React, Vite, and a small Node/Express production server. It focuses on cinematic scroll scenes, custom cursor behavior, animated navigation, responsive product storytelling, and optimized media loading.

## Project Overview

This website rebrands the original visual workflow into an Old Monk themed interactive experience. The goal is to create a smooth, premium, animation-heavy landing page with product showcase sections, custom hover states, scroll-driven scene transitions, and responsive layouts for desktop, tablet, and mobile.

The project includes:

- A cinematic first-screen hero experience.
- Scepter-style left rail navigation on desktop.
- Scepter-style top navigation on tablet and mobile.
- Animated menu open and close transitions.
- Custom cursor with scroll-to-navigate text.
- Cursor shrink behavior on hoverable text, buttons, menu icons, and links.
- Product showcase section with Old Monk bottles, pricing, and shop buttons.
- Story, craft, reel, and final call-to-action sections.
- Responsive design refinements across desktop, tablet, and mobile.
- Optimized WebP image variants for faster loading.
- Node/Express server for serving the production build.

## Tech Stack

- React 18
- Vite 5
- Node.js
- Express
- CSS3 animations and transitions
- Local image optimization using WebP assets
- Browser localStorage for age gate, newsletter dismissal, and cart count

## Key Features

### Cinematic Hero

The first section uses a dark luxury Old Monk visual direction with large editorial typography, a layered background image, premium button hover effects, and a custom scroll cursor.

Hero details:

- Large headline: `POUR THE LEGEND`
- Eyebrow text: `AGED DARK RUM FOR AFTER-HOURS LEGENDS`
- CTA button: `EXPLORE THE RESERVE`
- Signature text: `Made by Abhishek`
- Responsive background handling for desktop, tablet, and mobile

### Custom Cursor

Desktop users see a custom circular cursor instead of the system pointer.

Cursor behavior:

- Large transparent circle with white border.
- Default text: `SCROLL TO NAVIGATE`
- Shrinks smoothly on hover over buttons, links, nav items, and important text.
- Uses a 700ms hover transition for smoother movement.
- Press state adds a subtle scale animation.

### Navigation

Desktop navigation follows a Scepter & Sword inspired rail layout.

Desktop navigation includes:

- Old Monk logo at the top.
- Magnetic menu icon in the middle.
- Instagram icon at the bottom.
- Thin vertical separator line.

Responsive navigation includes:

- Logo on the left.
- Menu icon centered.
- Cart/bag on the right.
- Thin bottom border line.
- Instagram hidden on small screens for cleaner spacing.

The Instagram icon links to:

```text
https://www.instagram.com/abhi_71404
```

### Top Right Actions

The top-right desktop chrome matches the reference style:

- `SIGN IN`
- Thin vertical divider
- Shopping bag icon
- Cart count as `(0)`

### Animated Menu Overlay

The menu overlay opens and closes with staggered motion inspired by Scepter & Sword.

Menu features:

- Smooth blur/dark overlay.
- Menu icon changes from hamburger to cancel icon.
- Menu items reveal from top to bottom.
- Menu items exit smoothly on close.
- Hover messages appear beside menu items.
- Mobile/tablet menu layout adjusts text size and spacing.

### Age Gate

The site includes an age gate before entering the experience.

Age gate behavior:

- Uses localStorage to remember accepted users.
- Uses an Old Monk themed background.
- Fades out smoothly after confirmation.

### Product Showcase

The product section presents Old Monk themed bottles with names, prices, and shop actions.

Featured products:

- Gold Reserve
- Solan Black
- White Rum

Product behavior:

- Large moving `OLD MONK` background wordmark.
- Bottle positioning inspired by the Scepter product section.
- Desktop composition uses dramatic bottle alignment.
- Mobile/tablet composition stacks products for readability.
- Product buttons use right-to-left white fill hover animation.

### Product Detail Experience

Clicking product CTAs opens a product view.

Product detail features:

- Route support with `/products?variant=...`
- Product-specific title, price, badge, and image.
- Left/right product navigation arrows.
- Add-to-cart interaction.
- Cart count stored in localStorage.

### Story Section

The second section introduces the Old Monk brand mood.

Content includes:

- Large serif title: `CULT STATUS. WINTER NIGHTS. SLOW POURS.`
- Editorial paragraph copy.
- CTA: `DISCOVER THE CELLAR`
- Responsive image treatment.
- Text hover cursor behavior.

### Craft Section

The craft section explains the bottle lineup and flavor profile.

Content includes:

- Title: `AGED IN OAK`
- Caption: `BUILT FOR SLOW POURS`
- Supporting paragraph.
- CTA: `EXPLORE THE BOTTLES`

Animation behavior:

- Text loads like the menu items when the section reaches around 20% from the top.
- The animation resets when scrolling back above the section and replays when entering again.

### Media/Reel Section

The reel section cycles through styled bottle and still-life frames.

Features:

- Large dark reel frame.
- Bottle images shown fully inside the reel.
- Play/pause reel button.
- Collector case CTA.
- Frame switching controlled in React state.

### Final CTA Section

The last section closes the experience with a strong conversion prompt.

Content includes:

- `READY FOR AFTER HOURS?`
- `SHOP THE RESERVE`
- Old Monk product meta text.
- Footer details:

```text
2026©OLD MONK
ABHISHEK-FULL STACK DEVELOPER
PANDEYA71404@GMAIL.COM
+91 9106657309
```

The email and phone number are clickable:

- `mailto:pandeya71404@gmail.com`
- `tel:+919106657309`

## Performance Work

The project includes image and rendering optimizations:

- Optimized WebP versions inside `public/media/optimized`.
- `MediaImage` component automatically serves WebP when available.
- Lazy loading for non-critical media.
- Eager loading for important product images.
- `decoding="async"` for images.
- `fetchPriority="high"` for eager assets.
- Scene rendering optimization on desktop to avoid mounting distant scenes.
- Pointer movement throttled with `requestAnimationFrame`.
- Reduced-motion support through `prefers-reduced-motion`.

## Responsiveness

The UI is tuned for multiple device sizes:

- Desktop: horizontal scroll-like scene navigation.
- Tablet: stacked vertical flow with adjusted hero and product layouts.
- Mobile: top navbar, simplified spacing, readable text sizes, responsive image behavior.

Responsive breakpoints are mainly handled in:

- `@media (max-width: 979px)`
- `@media (min-width: 980px) and (max-width: 1180px)`
- `@media (max-width: 640px)`
- Additional small-device tuning under `480px` and `380px`

## Folder Structure

```text
cloneapp/
  public/
    fonts/
      ParfumerieScriptOldStyle.otf
      ParfumerieScriptOldStyle.woff2
    media/
      optimized/
      1-2560x1152.jpg
      1xs.jpg
      newsoon.jpg
      SS-home-2-1.jpg
      SS-home-2-1-mobile.jpg
      SS-ithequeen-chardonnay.png
      SS-ithequeen-redblend.png
      SS-ithequeen-redblend-table.jpg
      SS-ithequeen-redblend-table-mobile.jpg
      SS-ithequeen-rose.png
    favicon.svg
    old-monk-logo.png
    scepter-mark.svg
  src/
    components/
      AgeGate.jsx
      HomeExperience.jsx
      MediaImage.jsx
      MenuOverlay.jsx
      NewsletterModal.jsx
      OutlineButton.jsx
      ProductExperience.jsx
      SiteChrome.jsx
    data/
      siteData.js
    App.jsx
    main.jsx
    styles.css
  index.html
  package.json
  server.js
  vite.config.js
  webflow.md
  webflow.txt
  webflow.docx
```

## Important Files

### `src/App.jsx`

Main app controller. Handles:

- Age gate state.
- Screen routing between home and product pages.
- Menu overlay state.
- Newsletter modal state.
- Product variant state.
- Cart count state.
- Custom cursor state.
- Page transition curtain.

### `src/components/HomeExperience.jsx`

Main home page experience. Contains:

- Hero scene.
- Story scene.
- Product collection scene.
- Craft scene.
- Reel/media scene.
- Final CTA scene.
- Desktop scene progress logic.
- Mobile stacked scene layout.

### `src/components/SiteChrome.jsx`

Global navigation/chrome. Contains:

- Logo.
- Menu button.
- Instagram link.
- Sign in text.
- Shopping bag/cart action.
- Magnetic hover movement for desktop icons.

### `src/components/MenuOverlay.jsx`

Animated full-screen menu overlay. Contains:

- Open/close animation phases.
- Staggered item reveal.
- Hover hints.
- Navigation actions.

### `src/components/ProductExperience.jsx`

Product detail screen. Contains:

- Product image display.
- Product details.
- Product navigation arrows.
- Add-to-cart action.

### `src/components/MediaImage.jsx`

Image helper component. Handles:

- WebP optimized image lookup.
- `<picture>` rendering.
- Lazy/eager loading.
- Fetch priority.
- CSS `image-set()` helper.

### `src/data/siteData.js`

Central data file for:

- Menu items.
- Home scene IDs.
- Media reel frames.
- Product variants.
- Featured cards.

### `src/styles.css`

Main stylesheet. Contains:

- Typography setup.
- Parfumerie font setup.
- Layouts.
- Animations.
- Cursor styling.
- Navbar styling.
- Menu overlay styling.
- Product styling.
- Responsive breakpoints.

### `server.js`

Small Express server for production.

It serves the Vite `dist` folder and falls back to `index.html` for client-side routes.

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

Default development URL:

```text
http://localhost:5173
```

## Production Build

Create a production build:

```bash
npm run build
```

The output is generated in:

```text
dist/
```

## Preview Production Build

Preview the built app with Vite:

```bash
npm run preview
```

Default preview URL:

```text
http://localhost:4173
```

## Run With Node/Express

After building the project, run the production server:

```bash
npm start
```

Default Express URL:

```text
http://localhost:3000
```

## Deployment

### Vercel

Recommended settings:

```text
Framework: Vite
Root Directory: cloneapp
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Netlify

Recommended settings:

```text
Base directory: cloneapp
Build command: npm run build
Publish directory: cloneapp/dist
```

### Render/Railway/Node Hosting

Use the Express server:

```text
Build Command: npm install && npm run build
Start Command: npm start
```

The server uses:

```text
process.env.PORT || 3000
```

## Available Scripts

```bash
npm run dev
```

Runs the Vite development server.

```bash
npm run build
```

Builds the app for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm start
```

Serves the built `dist` folder using Express.

## Routes

Home route:

```text
/
```

Product route:

```text
/products?variant=gold-reserve
/products?variant=solan-black
/products?variant=white-rum
/products?variant=midnight-trio
```

## Local Storage Keys

The app uses localStorage for small UI states:

```text
scepter_age
scepter_news
cloneapp_cart
```

These store:

- Age gate acceptance.
- Newsletter dismissal.
- Cart count.

## Branding Notes

This project is an Old Monk themed portfolio/demo experience inspired by the motion and interaction style of Scepter & Sword. It is intended as a frontend showcase project for layout, animation, responsive UI, and interaction design practice.

## Accessibility Notes

Current accessibility considerations:

- Buttons include semantic `button` elements.
- Instagram uses a real external `a` link.
- Product images include alt text.
- Reduced-motion media query is included.
- Cursor behavior is disabled on smaller screens by relying on native touch behavior.

Future improvements:

- Add stronger keyboard focus styles.
- Add ARIA labels for more product controls.
- Improve age gate accessibility text.
- Add automated accessibility checks.

## Future Improvements

Possible next steps:

- Add real product cart page.
- Add checkout mock flow.
- Add CMS-backed product data.
- Add route-level code splitting.
- Add image CDN support.
- Add Lighthouse performance testing.
- Add Playwright visual regression tests.
- Add full accessibility audit.

## Credits

Designed and developed by:

```text
Abhishek - Full Stack Developer
```

Contact:

```text
Email: pandeya71404@gmail.com
Phone: +91 9106657309
Instagram: https://www.instagram.com/abhi_71404
```

## License

This project is currently for personal portfolio and educational demonstration purposes.
