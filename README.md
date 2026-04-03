# 507 Museum — Digital Art Landing Page

## Project Overview
A modern, premium English-only multi-page landing website for **507 Museum** — a digital art institution building a distributed satellite museum network across Korea and beyond. The design aesthetic is cinematic luxury: deep blacks, gold accents, elegant serif typography, and immersive full-viewport imagery.

---

## Completed Features

### ✅ Pages Implemented

| Page | File | Description |
|------|------|-------------|
| Landing (Home) | `index.html` | Full hero + all preview sections |
| About | `about.html` | Vision, business model, scalability |
| Network | `network.html` | Satellite museum concept, space solutions, tech trust |
| Content | `content.html` | Three collection types (Heritage, Global, AI) |
| Showcase | `showcase.html` | Festival 2026 full page |
| Partnership | `partnership.html` | Benefits, membership tiers, inquiry form |

### ✅ Design System
- **Typography**: Cormorant Garamond (serif/display) + Inter (body) + Space Grotesk (UI)
- **Color palette**: Near-black backgrounds (#080808–#1a1a1a), gold accents (#c9a96e)
- **Film grain overlay** via SVG filter on `body::before`
- **Responsive**: Mobile-first breakpoints at 480px, 768px, 1024px

### ✅ Interactive Features
- **Hero Canvas**: Animated particle network with gold & white particles + line connections
- **Scroll-reveal animations**: `IntersectionObserver`-based `.reveal-up` with stagger delays
- **Content slider**: 3-card horizontal carousel with prev/next navigation
- **Parallax images**: Subtle vertical shift on scroll for section backgrounds
- **Cursor glow**: Soft radial gradient follows mouse on desktop
- **Sticky nav**: Blurred backdrop + border appears after 60px scroll
- **Hamburger menu**: Full-screen mobile overlay
- **Form handling**: Simulated submit with success state feedback
- **Scroll line animation**: Pulsing vertical line in hero section
- **Number counter**: Intersection-triggered count-up for `data-count` elements

---

## URI Structure

```
/index.html              → Landing page (Home)
/about.html              → About 507 Museum — Vision & Philosophy
/network.html            → 507 Satellite Museum Network
/content.html            → Digital Masterpiece Collections
  #heritage              → Digital Heritage section
  #global                → Global Masterpiece section
  #ai                    → 新徒弟 AI System section
/showcase.html           → Sogong Digital Art Festival 2026
/partnership.html        → Partnership / Join
  #inquiry               → Contact form section
```

---

## File Structure

```
507-museum/
├── index.html           ← Main landing page
├── about.html           ← About page
├── network.html         ← Network / Satellite Museum page
├── content.html         ← Digital collections page
├── showcase.html        ← Festival 2026 page
├── partnership.html     ← Partnership & inquiry page
├── css/
│   └── style.css        ← Full design system (variables, components, responsive)
├── js/
│   └── main.js          ← All JavaScript (canvas, reveal, slider, parallax, form)
└── README.md
```

---

## Design Sections (index.html)

| # | Section | Layout |
|---|---------|--------|
| 1 | Hero | Full viewport, canvas animation background, left-aligned text |
| 2 | Vision Summary | 3-column icon grid |
| 3 | Network Preview | Full-width image + left text overlay |
| 4 | Content Preview | Horizontal 3-card slider |
| 5 | Showcase Preview | Full-height image hero with festival info |
| 6 | Footer | Brand + links + copyright |

---

## Features Not Yet Implemented
- [ ] Real video background option for hero (mp4 loop)
- [ ] Actual backend/email integration for partnership form
- [ ] Multi-language support (Korean version)
- [ ] Lightbox gallery for artwork collections
- [ ] Interactive network map showing satellite locations
- [ ] Blog / news section

## Recommended Next Steps
1. **Replace hero canvas** with a real digital art motion video (autoplay/muted/loop)
2. **Connect inquiry form** to a backend or email service (e.g., Formspree, EmailJS)
3. **Add artwork gallery** on the content page with lightbox viewer
4. **Create Korean language version** of all pages
5. **Add Google Analytics** or equivalent tracking
6. **SEO optimization**: Add structured data, Open Graph meta tags

---

## Tech Stack
- Pure HTML5 / CSS3 / Vanilla JavaScript (no framework)
- Google Fonts: Cormorant Garamond, Inter, Space Grotesk
- Font Awesome 6.4 (icons, CDN)
- Canvas 2D API (hero animation)
- IntersectionObserver API (scroll reveals)

---

*© 2026 507 Museum. Sogong, Seoul — The Origin of Digital Art*
