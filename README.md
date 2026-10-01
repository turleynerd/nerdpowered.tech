# nerdpowered.tech

Maker site for Nerd Powered, served by GitHub Pages at https://nerdpowered.tech.
Plain static HTML and CSS, no build step.

## Structure

```
index.html              home: hero, featured product, projects
starship-ops/index.html Starship Ops Panel product page
retroamp/index.html     RetroAmp product page (teal theme: .theme-retroamp on <main>)
feedback/index.html     general feedback page (giscus)
404.html                not-found page
giscus.json             origins allowed to embed the Discussions threads
assets/css/site.css     all styles (bump the ?v= on its <link> in every page when it changes: browsers cache it)
assets/img/             logo.svg / favicon.svg, og.png (social preview), product screenshots
CNAME                   custom domain for GitHub Pages
```

## Elgato Marketplace

- Product: https://marketplace.elgato.com/product/starship-ops-panel-eb4aa49d-fa7f-4e74-9cfb-0752255a216e
- Maker profile: https://marketplace.elgato.com/@nerdpowered

- RetroAmp: not listed yet; `/retroamp/` buttons point at the maker profile until release (search for `TODO at release`).

Product media on `/starship-ops/` and `/retroamp/` (`demo.mp4`, `gallery-*.jpg`, `thumbnail.jpg`) comes from each widget repo's `docs/marketplace/`, converted to JPG with ffmpeg for page weight.

## Feedback (giscus)

Comments are GitHub Discussions in this repo, category **Feedback** (Announcement format, so only the maintainer and giscus start threads). Threads use fixed names via `data-mapping="specific"`: **Starship Ops Panel** (`/starship-ops/#feedback`), **RetroAmp** (`/retroamp/#feedback`) and **General feedback** (`/feedback/`). To restyle, change `data-theme` in the giscus `<script>` tags. Get notified with Watch → Custom → Discussions.

## Private feedback (Google Forms)

The "Send a private message" card on `/feedback/` and `/starship-ops/#feedback` posts (no-cors) into the Google Form **Nerd Powered Feedback** (owner: Chris's Google account). Field IDs and the form address live in `assets/js/feedback-form.js`; the page sets Topic via `data-topic`. Responses and email notifications are in Google Forms. If you add or rebuild questions, get fresh IDs from the form's ⋮ → Pre-fill form → Get link.

## DNS

At the domain registrar for nerdpowered.tech:

| Type  | Host | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| AAAA  | @    | 2606:50c0:8000::153 |
| AAAA  | @    | 2606:50c0:8001::153 |
| AAAA  | @    | 2606:50c0:8002::153 |
| AAAA  | @    | 2606:50c0:8003::153 |
| CNAME | www  | turleynerd.github.io |

Once the certificate is issued, turn on **Enforce HTTPS** in the repo's Pages settings.

## Local preview

Any static server from the repo root works, for example:

```bash
npx serve .
```

© 2026 Nerd Powered. Site content and images are not licensed for reuse.
