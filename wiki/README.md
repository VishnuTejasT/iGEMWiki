# Denmark-GA Wiki (static)

This directory contains a simple static wiki scaffold for the Denmark-GA project. Pages intentionally contain placeholder text and placeholder image-buttons so the team can add real assets and copy later.

How to preview:

Open `denmark-ga/wiki/index.html` in your browser (double-click or use a local static server).

Quick local server (Python 3):

```bash
cd denmark-ga/wiki
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Replace assets:
- Put final image buttons in `static/buttons/` and update `index.html` or `menu.html` links.
- Add font files and `@font-face` rules in `static/denmark.css`.
- Edit page content in `pages/*.html`.
