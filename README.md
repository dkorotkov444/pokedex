# Pokedex

A small static front-end web app that fetches Pokémon data from the public PokéAPI and
displays it in a simple list with a details modal.

This repository is a lightweight HTML/CSS/JavaScript project (no build system). The
app is implemented with vanilla JavaScript and uses Bootstrap for styling. A couple of
polyfills are provided for broader browser compatibility.

## Quick start

You can open the app directly in a browser by opening `index.html`, but some browsers
may restrict fetch requests when using the `file://` protocol. It's recommended to run
a simple HTTP server during development.

Using Python 3 (PowerShell):

```powershell
python -m http.server 8000
# then open http://localhost:8000 in your browser
Start-Process 'http://localhost:8000'
```

Or with Node.js (if you have `http-server` installed):

```powershell
npx http-server -p 8000
Start-Process 'http://localhost:8000'
```

## Files of interest

- `index.html` — main page (references `dist/styles.min.css` and `dist/scripts.min.js`)
- `css/styles.css` — unminified stylesheet (edit this for changes)
- `js/scripts.js` — unminified JavaScript source (edit this for changes)
- `dist/styles.min.css` and `dist/scripts.min.js` — minified production assets used by `index.html`
- `js/promise-polyfill.js` and `js/fetch.umd.js` — included polyfills for Promise and fetch
- `img/` — images and favicons

Note: there is no automated build script included. If you edit the source files in
`css/` and `js/`, either serve the unminified files by editing `index.html` to point
to them, or manually regenerate the files in `dist/` with your preferred minifier.

## Browser support

The app is intended to work in modern browsers (Chrome, Firefox, Edge, Safari).
Polyfills for `fetch` and `Promise` are included for older environments. However,
because the project uses Bootstrap 5 (from CDN) and modern JS features, full
compatibility with Internet Explorer 11 is not guaranteed.

## How the app works (short)

- On load the app fetches a page of Pokémon from the PokéAPI (`/pokemon?limit=&offset=`).
- A list of Pokémon names is rendered. Clicking a Pokémon opens a Bootstrap modal
    and shows details fetched from the Pokémon details endpoint.
- Pagination is implemented via Next / Previous buttons.

## Notes and credits

- Data comes from the PokéAPI — https://pokeapi.co/
- Bootstrap is loaded from JSDelivr CDN in `index.html`.

If you want me to add a small build step (for example, a `package.json` + npm scripts
to minify and produce files into `dist/`), I can add that next.

---
Updated README to reflect repository layout and how to run the app locally.

## Techniques applied

### Libraries
- Bootstrap UI (loaded from CDN in `index.html`)
- Promise polyfill (`js/promise-polyfill.js`)
- Fetch polyfill (`js/fetch.umd.js`)

### Performance
- Minified production assets present in `dist/` (`dist/styles.min.css`, `dist/scripts.min.js`)

### UI elements used
- List group
- Modal
- Navigation bar
- Pagination