# Denmark-GA Wiki

Static HTML/CSS/JS wiki for the Denmark-GA iGEM 2025 team.

All pages are in `wiki/pages/` and currently contain placeholder text and placeholder image buttons. Team members will replace placeholders with final content and designed button images before the wiki freeze.

## Local Preview

```bash
cd wiki
python3 -m http.server 8000
# open http://localhost:8000
```

Or simply open `wiki/index.html` directly in a browser.

## File Structure

```
wiki/
├── index.html              Home page
├── menu.html               Navigation bar (injected into all pages)
├── footer.html             Footer (injected into all pages)
├── static/
│   ├── style.css           Layout and component styles
│   ├── denmark.css         Brand fonts and color tokens
│   ├── include.js          Menu/footer injection, scroll bar, back-to-top
│   └── buttons/
│       └── placeholder.svg  Placeholder image button (replace with real designs)
└── pages/
    ├── project.html         Project Description
    ├── contribution.html    Contribution
    ├── engineering.html     Engineering
    ├── implementation.html  Implementation
    ├── wetlab.html          Wet Lab Experiments
    ├── parts.html           Parts
    ├── protocols.html       Protocols
    ├── notebook.html        Lab Notebook
    ├── hardware.html        Hardware
    ├── software.html        Software & AI Model
    ├── model.html           Computational Model
    ├── human-practices.html Integrated Human Practices
    ├── education.html       Education
    ├── entrepreneurship.html Entrepreneurship
    ├── safety.html          Safety
    ├── team.html            Team Roster
    └── attributions.html    Attributions
```

## Replacing Placeholder Content

- **Image buttons** — Add final button images to `static/buttons/` and update `src` attributes in `index.html`.
- **Page content** — Edit files in `pages/` and replace `placeholder-block` sections.
- **Footer contact** — Update the contact address in `footer.html`.
- **Footer repo link** — Update the GitLab URL in `footer.html` once finalized.
- **Fonts / local hosting** — Replace the Google Fonts `@import` in `static/denmark.css` with `@font-face` rules pointing to locally hosted WOFF2 files.

## Deploying

The `.gitlab-ci.yml` in the repository root copies the `wiki/` directory to `public/` for GitLab Pages.  Push to `main` to trigger a deploy.
