# Fabio Zoccolan — Academic website

A ready-to-publish personal academic website for **GitHub Pages**, with a cobalt-blue sidebar, near-black editorial layout, upright sans-serif typography, and all six sections agreed on: Home (with contact), Research, Publications, Talks, Teaching, and Academic Activities.

**No programming or installation is required to publish this static site.** It uses only HTML, CSS, and a tiny JavaScript file. The original photograph, scientific figures, and GIF are included in `assets/images/` without being edited or cropped.

## Before publishing

1. **GitHub profile link:** This was not provided in the CV. The Home page currently shows `GitHub — link to add` as **non-clickable text**, instead of inventing a profile URL. To activate it, edit `index.html` and find:

   ```html
   <span class="profile-link pending-link" title="Add your personal GitHub profile URL to activate this link">GitHub <small>link to add</small></span>
   ```

   Replace it with the following, changing `YOUR_GITHUB_USERNAME` to your real GitHub username:

   ```html
   <a class="profile-link" href="https://github.com/YOUR_GITHUB_USERNAME" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
   ```

2. **Check your academic status:** The homepage says the public PhD defence is scheduled for December 2026, following your instructions. Update this wording after the defence.
3. **Verify the public CV:** The included `assets/cv/Fabio_Zoccolan_CV.pdf` was generated from your uploaded LaTeX CV, with the private phone number, residence/citizenship line, and references' private contact details removed. It retains academic contact details and your academic history. Read it before making it public.
4. **Check scheduled events:** The two 2027 talks and two 2027 minisymposia are marked as scheduled and should be updated after they occur.

## Publish on GitHub Pages (without using the terminal)

1. Log in at [github.com](https://github.com).
2. Create a **new public repository**, named exactly **`YOUR_GITHUB_USERNAME.github.io`**. Replace the uppercase placeholder with your real username. For a personal homepage, this precise repository name is important.
3. Unzip the website download on your computer.
4. Open the new repository in GitHub and select **Add file → Upload files**. Drag the **contents of the extracted `fabio-github-pages` folder** into the upload area, keeping the `assets` directory intact. The `index.html` file must end up in the repository root, not inside a second folder. If your browser cannot upload folders, GitHub Desktop can commit the extracted folder instead.
5. Click **Commit changes**.
6. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**. Select `main` and `/(root)`, and then **Save**.
7. Your website will be available at **`https://YOUR_GITHUB_USERNAME.github.io/`** after deployment finishes.

Official guide: [GitHub Pages — configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Preview before publishing

Open `index.html` in a web browser. All photographs and figures are local and should display without an internet connection. External paper, Google Scholar, Zenodo, and other links will require an internet connection.

## Editing the website later

Every paragraph and list entry is **plain text inside `index.html`**. You can edit it directly on GitHub by opening `index.html`, clicking the pencil (Edit), and committing your change. GitHub Pages publishes the update automatically.

| To change | Where to edit |
|---|---|
| About me / Contact / biography | `index.html`, find `<!-- HOME` |
| Research themes, captions, related papers | `index.html`, find `<!-- RESEARCH` |
| Journal articles and preprints | `index.html`, find `<!-- PUBLICATIONS` |
| Talks and 2027 scheduled events | `index.html`, find `<!-- TALKS` |
| Teaching assistantships / student supervision | `index.html`, find `<!-- TEACHING` |
| Academic activities | `index.html`, find `<!-- ACADEMIC ACTIVITIES` |
| Design, colors, layout, fonts | `styles.css` (main cobalt color: `#2451f4`) |
| Menus and image enlargement | `script.js` |
| Original photo and plots | `assets/images/` |
| Downloadable public CV | `assets/cv/Fabio_Zoccolan_CV.pdf` |
| Downloadable BibTeX (nine public papers only) | `assets/publications.bib` |

### Replacing figures

You can replace a figure by uploading a new file with the **same filename** under `assets/images/`. The site intentionally uses `object-fit: contain` (not `cover`), so the complete scientific plots and the full portrait remain visible. On desktop, the data-assimilation contour comparison is a 1×4 row; smaller screens reorganize it for readability.

### Links and research code

Paper and code links in the Publications section came from your supplied BibTeX file. Four preprints have Zenodo code links. GitHub links for specific publications were **not invented** where no matching URL was supplied. You can add them later next to each relevant paper. The homepage's Zenodo button points to the selected-code search listed in the CV.

### Important privacy reminder

A GitHub Pages website is **publicly accessible**. Do not upload your original private LaTeX CV or other documents containing personal phone numbers, residential addresses, or the personal contact information of referees. Only the sanitized, public-facing CV PDF is included in this package.

## Files and folders

```text
fabio-github-pages/
├── index.html
├── styles.css
├── script.js
├── .nojekyll
├── README.md
└── assets/
    ├── favicon.svg
    ├── publications.bib
    ├── cv/
    │   └── Fabio_Zoccolan_CV.pdf
    └── images/
        ├── fabio-original-photo.jpeg
        ├── sde-convergence-error.png
        ├── sde-relative-averaged-mean-error.png
        ├── qg-reference.png
        ├── qg-standard-pf.png
        ├── qg-ef-sde.png
        ├── qg-dlr.png
        ├── lorenz63-particle-clouds.gif
        ├── supg-offline-only.png
        └── supg-offline-online.png
```

This is a first working version intended to be refined together, not a website already posted to GitHub.
