# BIT Cyber Shield Club
**Securing the Digital Future.** Static website for the BIT (Baobab Institute of Tanzania) cybersecurity club. Pure HTML, CSS and JavaScript. No backend, no API keys, no build step.

## Structure
```
index.html about.html departments.html activities.html learning.html
events.html team.html join.html contact.html
css/style.css   js/script.js   assets/logo.svg   README.md
```

## Customize before launch
1. `js/script.js`: change `MAIL` to the official club email. Forms open the visitor's email app (mailto), so nothing is stored on a server.
2. `contact.html`: replace the placeholder email and social links.
3. `team.html`, `events.html`: add real names, photos and dates.

## Deploy on GitHub Pages
1. Create a GitHub account and click **New repository**. Name it, for example, `bit-cyber-shield`. Set it to Public.
2. Upload the project: **Add file > Upload files**, drag in everything (keep the `css`, `js`, `assets` folders and `index.html` at the repo root), then **Commit changes**. Or with git:
   `git init && git add . && git commit -m "Initial site" && git branch -M main && git remote add origin https://github.com/YOUR-USER/bit-cyber-shield.git && git push -u origin main`
3. Open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. Wait 1 to 2 minutes. Your site is live at `https://YOUR-USER.github.io/bit-cyber-shield/`.
5. To update later, edit or upload files and commit. Pages redeploys automatically.

## Security notes
Strict Content-Security-Policy on every page, no inline scripts, no third-party code, validated and length-limited form inputs, external links use `rel="noopener noreferrer"`. All practical activities must be authorized and legal.
