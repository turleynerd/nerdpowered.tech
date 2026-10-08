# nerdpowered.tech

Maker site for Nerd Powered, served by GitHub Pages at https://nerdpowered.tech.
Plain static HTML and CSS, no build step.

## Structure

```
index.html              home: hero, featured carousel (assets/js/carousel.js: each slide plays a clip of its demo.mp4, data-start/data-end), projects
starship-ops/index.html Starship Ops Panel product page
retroamp/index.html     RetroAmp product page (teal theme: .theme-retroamp on <main>)
feedback/index.html     feedback page (points to Discord)
404.html                not-found page
assets/css/site.css     all styles (bump the ?v= on its <link> in every page when it changes: browsers cache it)
assets/img/             logo.svg / favicon.svg, og.png (social preview), product screenshots
CNAME                   custom domain for GitHub Pages
```

## Elgato Marketplace

- Product: https://marketplace.elgato.com/product/starship-ops-panel-eb4aa49d-fa7f-4e74-9cfb-0752255a216e
- Maker profile: https://marketplace.elgato.com/@nerdpowered

- RetroAmp: https://marketplace.elgato.com/product/retroamp-184c20a8-0c1a-46a4-996f-77e4d6547e45

Product media on `/starship-ops/` and `/retroamp/` (`demo.mp4`, `gallery-*.jpg`, `thumbnail.jpg`) comes from each widget repo's `docs/marketplace/`, converted to JPG with ffmpeg for page weight.

## Discord

Community server: https://discord.gg/NjRN9gG9D (permanent invite, never expires). It is the only feedback channel: linked from the header nav (`.nav-discord`), every footer, the "Join the community" band on the home page, the `#feedback` band on each product page and `/feedback/`. If the invite is ever replaced, search the repo for `NjRN9gG9D`. The invite background is `assets/brand/discord-invite-splash.png` (1920×1080).

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
