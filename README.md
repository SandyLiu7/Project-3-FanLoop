# FanLoop V1 Prototype

This is a mobile-first local fan exchange web app prototype built with only HTML, CSS, and JavaScript.

## Files

- `index.html`
- `styles.css`
- `app.js`
- `assets/logo-placeholder.svg`

## Logo replacement

Replace `assets/logo-placeholder.svg` with your own logo file, or add your own file:

```html
<img src="assets/logo.png" alt="FanLoop logo" class="brand-logo">
```

The logo appears:
- in the left toolbar on desktop
- in the top header on mobile

## Prototype login

Username: `Yuza`  
Password: `611225abc`

This is not a secure real login system. It is only for class presentation.

## Local data system

The prototype uses `localStorage`.
It can remember:
- selected region
- selected board theme
- posted items
- custom tags
- saved folders
- orders
- notifications
- profile edits

To reset demo data, press:

`Alt + R`

## Main features included

- Mobile-first layout
- Left toolbar / mobile bottom toolbar
- Three boards:
  - Freebie Distribution
  - Freebie Exchange
  - Merchandise Exchange
- Board color theme switching
- Manual country / city local board selection
- Search and advanced filters
- Custom tag creation during posting
- Post item form
- Online claim demo for freebie distribution
- Message / notice center
- Exchange order creation from chat
- Inventory reserved / released demo
- Order status and review flow demo
- Saved folders
- Profile and trust record
- Personal tag board customization


## Replacing sample item images

The current sample items use placeholder images in:

- `assets/items/cyrene-card-cover.svg`
- `assets/items/cyrene-card-detail.svg`
- `assets/items/flins-figure-cover.svg`
- `assets/items/flins-figure-detail.svg`
- `assets/items/haikaveh-acrylic-cover.svg`
- `assets/items/haikaveh-acrylic-detail.svg`
- `assets/items/phaidei-stick-cover.svg`
- `assets/items/phaidei-stick-detail.svg`

Fastest method:
1. Put your real images into `assets/items/`.
2. Keep the same filenames, or edit the `cover` and `details` paths in `app.js`.
3. If you use `.jpg` or `.png`, update paths like:
   `cover: "assets/items/cyrene-card-cover.jpg"`

After changing sample items, press `Alt + R` in the browser to reset old localStorage demo data.
