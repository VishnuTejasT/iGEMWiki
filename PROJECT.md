# Denmark-GA iGEM 2025

Static wiki for the Denmark-GA iGEM 2025 team. Pages intentionally contain placeholder text and image-button placeholders until the team provides final content and designed assets.

## Scope

- Static wiki under `wiki/` (plain HTML, CSS, and JavaScript — no build step required).
- 17 pages covering: Description, Contribution, Engineering, Implementation, Wet Lab, Parts, Protocols, Notebook, Hardware, Software, Model, Human Practices, Education, Entrepreneurship, Safety, Team, and Attributions.
- Dropdown navigation, scroll progress bar, back-to-top button, and mobile hamburger menu.

## Branding

Fonts and color palette defined in `wiki/static/denmark.css`:

**Fonts:** Poppins (body), Playfair Display (headings), Noto Serif / Crimson Pro (serif body), Raleway, Space Mono (code).

**Colors:**
- `#a82828` — brand
- `#531a0a`, `#870b0b`, `#db2b2b`, `#e38080` — brand shades
- `#f2eee7`, `#f1efea` — background cream
- `#c9b197` — beige accent
- `#8b867c`, `#808080` — muted tones

## How to Preview

```bash
cd wiki
python3 -m http.server 8000
# open http://localhost:8000
```

## Next Steps

- Replace placeholder images in `wiki/static/buttons/` with team-designed button images.
- Add final page content in `wiki/pages/*.html` as the project progresses.
- Update contact info and GitLab repo link in `wiki/footer.html`.
- Push to the GitLab remote using `scripts/push.sh <remote-url>` or `git push -u origin main`.
