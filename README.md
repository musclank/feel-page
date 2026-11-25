# FEEL PAGE

A no-code mini-site builder for creators, coin communities, and internet-native projects.

## MVP features

- Responsive creator workspace and page editor
- Editable community name, ticker, headline, description, accent color, banner label/image URL, Feel.cash destination, and social handle
- Configurable page sections: About, Token info, Community links, and Feel.cash CTA
- Reorder sections with accessible up/down controls; ordering is saved in drafts and shared previews
- Live design preview
- Draft autosave in this browser using local storage
- Shareable community preview URL (page content is encoded into the URL)
- Vite + React static frontend

## Local development

```bash
npm install
npm run dev
```

## Build and deploy

```bash
npm run build
```

Cloudflare Pages settings: connect `musclank/feel-page`, production branch `main`, build command `npm run build`, output directory `dist`, root directory `/`.

## Prototype boundaries

This is an early frontend MVP. Drafts persist only in the current browser/device. Share links carry the page data in the URL and are suitable for demos, not private information. Real publishing with clean custom slugs, user accounts, shared database storage, uploaded artwork, and production Feel.cash API integration still require backend work. The Feel.cash CTA currently opens the creator-provided destination; no undocumented API is assumed.
