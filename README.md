# InsightHub

**Smart Insights. Better Buying Decisions.**

A production-ready, modern affiliate marketing website focused on honest product reviews, comparisons, and buying guides. Built with pure HTML5, CSS3, and Vanilla JavaScript — no frameworks, no build step. Deploys directly to GitHub Pages.

## Features

- Premium dark mode design with glassmorphism
- Sticky navigation + mobile hamburger menu
- Client-side product search (Ctrl/Cmd + K)
- Filterable review cards with pros, cons, ratings, verdicts
- Responsive comparison tables
- Category grid (Tech, Gaming, Home, Fitness, Office, Mobile, Audio, Lifestyle)
- Newsletter signup
- Pinterest share buttons
- SEO: meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt
- Accessibility best practices
- Lazy-loaded images
- Smooth animations and hover effects

## Quick Start — Deploy to GitHub Pages

### 1. Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repository `InsightHub` (or any name you prefer)
3. Leave it empty (no README, no .gitignore)
4. Click **Create repository**

### 2. Upload the project

**Option A — Git command line**

```bash
cd InsightHub
git init
git add .
git commit -m "Initial commit: InsightHub website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/InsightHub.git
git push -u origin main
```

**Option B — GitHub web UI**

1. Open your new empty repository on GitHub
2. Click **uploading an existing file**
3. Drag and drop all files and folders from the `InsightHub` folder
4. Commit the changes

### 3. Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose branch **main** and folder **/ (root)**
4. Click **Save**
5. Your site will be live at:  
   `https://YOUR_USERNAME.github.io/InsightHub/`

### 4. Update canonical URLs

Replace every occurrence of `yourusername` in the HTML files, `sitemap.xml`, and `robots.txt` with your actual GitHub username.

## How to Replace Affiliate Links

Every “Check Latest Price” and “Check Price” button uses a placeholder `href="#"`.

1. Open the relevant HTML file (`reviews.html`, `comparison.html`, `index.html`, `trending.html`)
2. Find buttons with `rel="nofollow sponsored"`
3. Replace `href="#"` with your affiliate URL, for example:

```html
<a href="https://www.amazon.com/dp/B0XXXXX?tag=yourtag-20" class="btn btn-accent btn-sm" rel="nofollow sponsored">Check Latest Price</a>
```

Keep the `rel="nofollow sponsored"` attribute for compliance and SEO.

## How to Add New Reviews

1. Open `reviews.html`
2. Copy an existing `<article class="review-card" ...>` block
3. Update:
   - `data-category` (tech, gaming, home, fitness, office, mobile, audio, lifestyle)
   - Image `src` and `alt`
   - Rating score and stars
   - Title, excerpt, pros, cons, verdict, price
   - Affiliate link `href`
4. Optionally add the product to the search data array in `js/script.js` (the `products` array inside `setupSearch`)

## How to Customize Colors

Open `css/style.css` and edit the CSS variables at the top of the file:

```css
:root {
  --primary: #7C3AED;   /* Main purple */
  --accent: #22D3EE;    /* Cyan accent */
  --bg: #0B1020;        /* Page background */
  --card: #161B2E;      /* Card background */
  /* ... */
}
```

Change these values and the entire theme updates automatically.

## How to Replace the Logo

The logo is a text + icon combination in the navigation:

```html
<a href="index.html" class="logo">
  <div class="logo-icon">IH</div>
  <span>InsightHub</span>
</a>
```

To use an image logo:

1. Place your logo file in `/images/logo.png` (or `.svg`)
2. Replace the logo HTML with:

```html
<a href="index.html" class="logo">
  <img src="images/logo.png" alt="InsightHub" width="140" height="36">
</a>
```

## Folder Structure

```
InsightHub/
├── index.html
├── reviews.html
├── categories.html
├── comparison.html
├── trending.html
├── about.html
├── contact.html
├── privacy.html
├── disclosure.html
├── robots.txt
├── sitemap.xml
├── README.md
├── favicon.ico
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
└── icons/
```

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses CSS custom properties, backdrop-filter, and Intersection Observer with graceful fallbacks.

## License

You are free to use and modify this project for personal or commercial affiliate sites. Attribution is appreciated but not required.

---

Built for performance, clarity, and conversion.
