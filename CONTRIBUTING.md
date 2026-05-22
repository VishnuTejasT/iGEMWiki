# Contributing

Guidelines for editing the Denmark-GA wiki:

- Edit page files under `wiki/pages/` — they are plain HTML.
- Update nav links in `wiki/menu.html` when adding/removing pages.
- Replace placeholder images in `wiki/static/buttons/` with your designed image-buttons.
- Update fonts or host them locally by editing `wiki/static/denmark.css`.

Local preview

```bash
cd denmark-ga/wiki
python3 -m http.server 8000
# edit files and refresh browser
```

Committing and pushing
- This repo includes `scripts/push.sh` to help push to a GitLab remote.
- To push, either add a remote and run the script, or run `git push -u origin main`.

Code of conduct / license
- Add your preferred license and code of conduct in the repository root when ready.
