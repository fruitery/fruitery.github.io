# Fruitery

A responsive static menu website for Fruitery, ready for GitHub Pages.

## Personalize it

The menu is stored in `data/menu.json` and rendered automatically by `script.js`.

## Menu manager

1. Visit <https://fruitery.github.io/admin/>.
2. Select **Open Menu Manager** and sign in to Pages CMS with the `fruitery` GitHub account.
3. Choose the `fruitery/fruitery.github.io` repository and **Menu Items**.
4. Add or edit the title, category, emoji, ingredients, description, product photo, and availability.
5. Save. Pages CMS commits the menu and uploaded image to GitHub, and GitHub Pages publishes the update automatically.

Product images are stored in `images/menu/`. Turning off **Available** hides an item without deleting it.

## Preview locally

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish with GitHub Pages

Push this folder to a GitHub repository. In the repository, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
