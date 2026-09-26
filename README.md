# nerdpowered.tech

Maker site for Nerd Powered, served by GitHub Pages at https://nerdpowered.tech.
Plain static HTML and CSS, no build step.

## Structure

```
index.html              home: hero, featured product, projects
starship-ops/index.html Starship Ops Panel product page
404.html                not-found page
assets/css/site.css     all styles
assets/img/             logo.svg / favicon.svg, og.png (social preview), product screenshots
CNAME                   custom domain for GitHub Pages
```

## Going live on the Elgato Marketplace

When the Starship Ops Panel listing is published, update the two buttons in
`starship-ops/index.html` (`#marketplace-hero` and `#marketplace-cta`): set `href`
to the listing URL, remove `aria-disabled="true"`, and change the label to
"Get it on the Elgato Marketplace". Also update the "Coming soon" section heading.

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
