# Denmark-GA Project

This repository contains the Denmark-GA static wiki scaffold and project documentation. Pages currently contain placeholder text and placeholder image-buttons; final assets and content should be added by the team.

Scope
- Static wiki under `denmark-ga/wiki/` (HTML/CSS/JS). No build step required.
- Placeholder pages: Project, Team, Parts, Protocols, Notebook, Safety, Attributions.

Branding
- Fonts and palette were extracted from `denmark-ga/docs/Better.pdf` and wired into `wiki/static/denmark.css` using Google Fonts. Color tokens include:
  - `#a82828` (brand)
  - `#531a0a`, `#870b0b`, `#db2b2b`, `#e38080`
  - `#f2eee7`, `#f1efea`, `#c9b197`, `#8b867c`, `#808080`

How to preview
```bash
cd denmark-ga/wiki
python3 -m http.server 8000
# open http://localhost:8000
```

Next steps
- Replace placeholder images in `wiki/static/buttons/`.
- Add page content in `wiki/pages/`.
- Provide a GitLab repo URL so the project can be pushed and CI configured.
