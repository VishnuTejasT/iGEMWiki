# Denmark-GA Wiki Specification

Purpose
- Provide a lightweight static wiki to capture project structure, team info, protocols, and resources. Pages intentionally contain placeholders until content is ready.

Page structure (each page under `wiki/pages/`)
- Title header (`<h2>`)
- One-line summary paragraph
- Sections for Overview, Methods, Results, and References (empty placeholders)

Branding and Assets
- Fonts loaded via Google Fonts in `wiki/static/denmark.css` (Poppins, Playfair Display, Noto Serif, Raleway, Crimson Pro, Space Mono).
- Color CSS variables defined in `wiki/static/denmark.css`.
- Image buttons are used for navigation; placeholders are in `wiki/static/buttons/placeholder.svg`.

Accessibility
- All image buttons must include `alt` and an `aria-label` on links.
- Pages should use semantic HTML (`<main>`, headings, lists).

Deployment
- The static site can be served directly or deployed via GitLab Pages by copying `wiki/` into the job's `public/` directory.
