# WED5020-ASSIGNMENT-PART-3
# Isinkwa Bakery Website (WEDE5020 - Part 3 POE)

Student: ST10485117 | Module: WEDE5020
Live site: https://your-ST10485117.github.io/isinkwa-bakery/ 
Repository: https://github.com/ST10485117/isinkwa-bakery

## Pages
index.html (Home), about.html, menu.html, enquiry.html, contact.html

## Changelog

### Part 2 feedback corrections
| # | File | Issue found in Part 2 | Change made |
|---|------|-----------------------|-------------|
| 1 | All pages | Several `<img>` tags were broken (written as `<alt="...">` / `<src="...">`) so no images displayed | Rewrote as valid `<img src alt width height>` tags with real files in `/images` |
| 2 | Project | `index.html` was missing although every nav link pointed to it | Created `index.html` with hero, gallery and FAQ |
| 3 | All pages | Two different stylesheets (`style.css` and `CSS/style.css/style.css`); pages loaded the incomplete one | Merged into one `css/style.css`; all pages link to it |
| 4 | All pages | Missing `<meta charset>`, viewport tag and `lang` on some pages | Added to every page head |
| 5 | menu.html | Menu content hard-coded and un-searchable | Menu now rendered by JavaScript from a data array |
| 6 | contact.html | Maps used placeholder embed URLs that did not point to the real stores | Replaced with an interactive Leaflet/OpenStreetMap map with accurate markers |
| 7 | Forms | Forms had no `action`, no validation messages and no processing | Added validation, error messages, processed responses and AJAX |
| 8 | Navigation | Mobile menu icon did nothing (no script) | Added `js/script.js` toggle |
| 9 | Accessibility | Missing skip link, aria labels, focus styles | Added all three |
| 10 | Navigation | Social links pointed to `#` | Linked to the social platforms with `rel="noopener noreferrer"` |

### New Part 3 features
- **Interactive elements:** FAQ accordion (index), category tabs (menu), animated menu cards (CSS transitions + keyframes).
- **Interactive map:** Leaflet map with a marker and popup per store and "fly to" buttons (contact).
- **Gallery + lightbox:** Click-to-enlarge images with next/previous, keyboard (Esc, arrows) and caption (index).
- **Dynamic content and search:** Menu rendered with JavaScript; live search, category filter and sort by price/name (menu).
- **Enquiry form:** Validated; returns an estimated cost and availability based on type, quantity and date; submitted asynchronously with `fetch`.
- **Contact form:** Name, email, phone, message type and message; validated; compiles the details into a `mailto:` email the user can send.
- **Form validation:** Required, email format, SA phone format, minimum lengths, future dates and number range, with inline error messages.

### SEO
- Unique title tag and meta description per page; meta keywords added.
- One H1 per page with H2/H3 hierarchy.
- Descriptive image file names (e.g. `artisan-sourdough-loaf.svg`) and descriptive alt text.
- Clean URLs, canonical tags, Open Graph tags, internal links between pages.
- `robots.txt` and `sitemap.xml` added. Mobile-friendly responsive layout.
- Page speed: lazy-loaded images, small SVG images, one CSS and one JS file, no large libraries except Leaflet on the contact page.
- Security: `rel="noopener noreferrer"` on external links, `nosniff` and referrer meta tags, client and server-side validation recommended, HTTPS via the hosting platform.

### Off-page SEO plan
Backlinks from local Cape Town food blogs and directories (Google Business Profile, Yelp), social media promotion on Instagram/Facebook, and local SEO using "Woodstock, Cape Town" in content.

## References
- Leaflet. (2023). Leaflet - an open-source JavaScript library for interactive maps. https://leafletjs.com
- OpenStreetMap contributors. (2026). OpenStreetMap. https://www.openstreetmap.org
- Font Awesome. (2023). Font Awesome icons. https://fontawesome.com
- Mozilla. (2026). MDN Web Docs: Client-side form validation. https://developer.mozilla.org
- Google. (2026). Search Central: SEO starter guide. https://developers.google.com/search
- W3C. (2026). Web Content Accessibility Guidelines. https://www.w3.org/WAI/standards-guidelines/wcag/
