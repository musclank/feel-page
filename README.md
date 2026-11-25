# FEEL PAGE

A no-code mini-site builder for creators, coin communities, and internet-native projects.

## MVP included

- Responsive creator workspace and navigation
- Editable community name, ticker, tagline, description, accent color, Feel.cash URL, and social handle
- Live community page preview and larger preview mode
- Copy page-slug prototype
- Vite + React frontend, ready for static hosting

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Vite outputs the static site to `dist/`. Cloudflare Pages settings: build command `npm run build`, output directory `dist`, root directory `/`.

## Prototype limitations

This is the frontend MVP. Publish is currently a prototype action (copies the generated slug); page data is not yet stored in a database, and authentication, persistent profiles, dynamic slug routing, and production Feel.cash integration are not connected. The Feel.cash button uses the outbound URL entered by the creator. No undocumented API is assumed.
