# Salma El Hadidy — Creative Director Portfolio

A high-taste, cinematic, and responsive personal portfolio website for **Salma El Hadidy**, positioned as a Creative Director targeting recruiters, creative agencies, and fashion/lifestyle brands.

Built like a **film director’s treatment, fashion campaign archive, and editorial art book**—featuring chapter-based pacing, distinct color worlds per section, sophisticated typography, interactive sound controls (never autoplayed), modular case studies, and a personal camera roll archive.

---

## 🎬 Creative Direction & Structure

The website is structured into 6 distinct chapters:

- **`00 — OPENING`**: Fullscreen continuous 35mm film reel treatment, live 24fps timecode, CinemaScope letterbox switcher (`16:9` / `2.39:1`), staggered title reveals, and downloadable CV action.
- **`01 — ABOUT SALMA`**: Director bio, AUC Film Degree foundation, core focus capabilities, trilingual fluency (Arabic, English, French), and editorial portrait.
- **`02 — SELECTED WORK`**: **Joe’s Venture** modular case study (Weekly Shoot Direction, Media Buying Creative with *"Sell the world around the product"*, 7 artisan product stills, 3 video reels, and candid BTS).
- **`03 — CAMERA ROLL`**: Salma's personal observational visual archive (11 35mm film archive stills from Egypt, Mauritius, and France).
- **`04 — DIRECTION`**: Editorial manifesto (*“I’m interested in the world around the product.”*), cinema camera atmosphere, and director's commentary notes.
- **`05 — GET IN TOUCH`**: Direct collaboration dispatches: Email (`salmaelhadidy10@gmail.com`), Instagram (`@salmaxelh`), and downloadable PDF CV.

---

## 🎨 Color Worlds System

Each chapter seamlessly transitions into its own curated palette as you scroll:
- **00 Opening**: Cinematic Espresso & Gold (`#141110` / `#FAF8F5`)
- **01 About Salma**: Soft Cream & Sage Accent (`#F4EFE6` / `#1F251E`)
- **02 Selected Work**: Butter Yellow & Deep Emerald (`#F7F1DE` / `#143528`)
- **03 Camera Roll**: Warm Off-White & Slate Charcoal (`#FAF8F5` / `#1C1917`)
- **04 Direction**: Sage Green & Forest (`#E8ECE7` / `#1A2319`)
- **05 Get In Touch**: Deep Film Credits Charcoal & Cream (`#161213` / `#FAF8F5`)

---

## 📁 File Structure & Replacing Assets

All placeholder assets are clearly labeled in the code with exact file names. You can drop your real photography and video files directly into the corresponding folders:

```
Portfolio WB/
├── index.html                     # Main semantic HTML structure
├── package.json                   # Metadata & preview scripts
├── README.md                      # This documentation
├── css/
│   ├── variables.css              # Color tokens, typography scales, easing
│   ├── reset.css                  # Modern CSS reset
│   ├── typography.css             # Google Fonts & editorial classes
│   ├── navigation.css             # Floating Chapter HUD & Treatment Menu
│   ├── chapters/                  # Chapter-specific styling (00 to 06)
│   ├── components/                # Lightbox, Audio Player, Microcopy
│   └── responsive.css             # Tablet & mobile optimizations
├── js/
│   ├── data.js                    # Content data archive (Edit text & links easily)
│   ├── chapter-observer.js        # Dynamic color transitions & scroll tracking
│   ├── lightbox.js                # Fullscreen image viewer & keyboard nav
│   ├── audio-controller.js        # User-activated BTS & ambient audio (Web Audio API)
│   ├── micro-interactions.js      # 35mm film grain canvas, 24fps timecode, aspect switcher
│   └── main.js                    # Initialization bootstrap
└── assets/
    └── placeholders/
        ├── hero-cinematic.svg     # -> Replace with Salma's showreel video or hero image
        ├── direction-manifesto.svg# -> Replace with direction mood still
        ├── salma-portrait.svg     # -> Replace with Salma's portrait photo
        ├── joes/
        │   ├── hero.svg           # -> /assets/work/joes/hero.jpg
        │   ├── mb-01.svg          # -> /assets/work/joes/mb-01.jpg
        │   ├── mb-02.svg          # -> /assets/work/joes/mb-02.jpg
        │   ├── social-01.svg      # -> /assets/work/joes/reel-01.mp4
        │   ├── social-02.svg      # -> /assets/work/joes/social-02.jpg
        │   ├── social-03.svg      # -> /assets/work/joes/reel-02.mp4
        │   └── bts-01.svg         # -> /assets/work/joes/bts-01.mp4
        ├── camera-roll/
        │   └── roll-01.svg - roll-07.svg # -> /assets/camera-roll/roll-01.jpg etc.
        └── bts/
            └── bts-clip-01.svg - bts-clip-04.svg # -> /assets/bts/bts-clip-01.mp4 etc.
```

---

## ⚡ How to Run & Preview Locally

### Option 1: Direct Browser Open (Zero Install)
Simply double-click `index.html` or open it with Safari, Chrome, Firefox, or Edge.

### Option 2: Local HTTP Server (Recommended for local modules)
If you have Python or Node available on any machine:
```bash
# Using Python 3:
python3 -m http.server 3000

# Or using npx / Node:
npx serve .
```
Then visit `http://localhost:3000`.

### Option 3: Deploy to the Web (1-Click)
Deploy seamlessly to **Vercel**, **Netlify**, **GitHub Pages**, or **Cloudflare Pages** by connecting the repository or dragging and dropping this folder.

---

## 🔊 Audio Experience Notice
In strict accordance with modern web design standards:
- **Audio NEVER autoplays.**
- Ambient film reel hum and BTS sound clips are triggered exclusively when the user clicks the sound button or clip cards.
