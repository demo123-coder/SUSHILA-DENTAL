# Sushila Dental Clinic Website

A premium, modern, and branded single-page marketing website built for **Sushila Dental Clinic** (Kasia, Kushinagar, Uttar Pradesh), operated by **Dr. Shailendra Kumar (BDS)**.

This website is styled directly using the clinic's official branding assets (Navy Blue & Vibrant Orange palette) to project a trustworthy, hygienic, and highly professional local healthcare image.

---

## 🌟 Key Features

1. **Official Clinic Branding**:
   - Palette extracted directly from the logo: **Navy Blue** (`hsl(210, 63%, 15%)`) representing trust and professionalism, and **Vibrant Orange** (`hsl(24, 100%, 50%)`) indicating energy, warmth, and care.
   - Branded logo integrated directly into the sticky navigation bar and footer elements with hover scale effects.

2. **Advanced UI/UX Aesthetics**:
   - **Glassmorphic Accents**: Floating safety and review badges in the Hero section with dynamic hover transformations and floating keyframe animation states.
   - **Interactive Services Grid**: Fully responsive service cards showing key procedures (RCT, Orthodontics, Bridges). Cards lift and glow with the brand orange color on hover.
   - **Smooth Scroll & Navigation**: Navigation highlights links dynamically as sections scroll into view using an `IntersectionObserver`.

3. **Interactive Features**:
   - **Dynamic Reviews Carousel**: Custom patient review slider featuring horizontal translation, touch-friendly indicators, dot navigation, and auto-rotation features.
   - **Appointment Booking Request**: Interactive validation form checking for a valid name, 10-digit mobile number format, and a secure future date (prevents selecting past slots). Displays a frosted-glass confirmation modal on success.

4. **SEO & Local Search Alignment**:
   - **Meta Tags**: Optimized description and local keywords configured to boost search visibility in the Kushinagar region.
   - **JSON-LD Schema Markup**: Integrated a structured `Dentist` schema directly into the head element. This helps search engines (Google, Bing) index opening hours, address coordinates, telephone details, and clinic ratings automatically.

---

## 🛠️ Tech Stack
- **Structure**: Semantic HTML5 markup
- **Styling**: Vanilla CSS3 Custom Variables (Tokens), CSS Grid, Flexbox, Keyframe Animations
- **Interactivity**: Vanilla JavaScript (ES6+, zero external libraries for maximum speed)
- **Asset Formats**: PNG / WebP

---

## 📂 Project Structure
```text
Sushila dental clinic/
├── assets/
│   ├── logo.png       # Branded clinic logo (Navy & Orange roundel)
│   ├── hero-bg.png    # Premium clinic interior hero background
│   ├── doctor.png     # Professional portrait of Dr. Shailendra Kumar
│   └── gallery1-8.png # 8 high-resolution clinic gallery photos
├── index.html         # Main entry point (HTML structure, schema & 6-photo grid)
├── gallery.html       # Standalone gallery subpage (displaying all 8 photos)
├── style.css          # Design System stylesheet (Variables, grids, responsive layouts)
├── main.js           # Scroll triggers, Carousel slider, and Form validation
└── README.md          # Project documentation
```

---

## 🚀 Running Locally

Because this project is built entirely using standard web standards, it has **zero build dependencies** and runs instantly.

### Option 1: Direct File Launch
Double-click `index.html` in your file explorer to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Local Dev Server (Recommended)
Running through a local HTTP server ensures smooth asset rendering and prevents CORS warnings in older browsers:
```bash
# Using Node.js npx:
npx serve .

# Using Python:
python -m http.server 8000
```
Then, navigate to `http://localhost:5000` (or `http://localhost:8000`) in your browser.
