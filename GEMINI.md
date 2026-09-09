# GEMINI CODER CONTEXT & INSTRUCTION SYSTEM
## Salma El Hadidy — Creative Director Portfolio

Whenever the user says **"Hey, I want something for [placeholder]"** or **"add this to [placeholder]"** (or mentions any frame ID, case study slot, or section), use this document as your primary context and execution standard.

---

### 1. Project Personality & Creative Voice
- **Identity**: Salma El Hadidy — Creative Director (Cairo-based, AUC Film background, fashion & lifestyle focus).
- **Tone**: Cinematic, editorial, alive, playful, bold, warm, stylishly weird, sarcastic, curious, and visually controlled.
- **Microcopy Guidelines**: Use high-taste film references, frame numbers (`FRAME #04A`), timestamps (`TC 00:00:00:00`), 35mm film notes, and witty/sarcastic micro-captions. Avoid corporate buzzwords or generic AI templates.

---

### 2. Placeholder Registry & Mapping

When a user mentions any placeholder below, map it to the corresponding asset path and section:

#### 🎬 00 — OPENING SEQUENCE
- **`[hero showreel]`** or **`[opening video]`**:
  - Target Path: `/assets/hero/hero-reel.mp4` or `/assets/hero/hero-cinematic.jpg`
  - HTML Target: `#opening .opening-media-element`

#### 👁️ 01 — DIRECTION (MANIFESTO)
- **`[direction still]`** or **`[manifesto visual]`**:
  - Target Path: `/assets/direction/direction-manifesto.jpg`
  - HTML Target: `#direction .direction-image-frame`

#### 💼 02 — SELECTED WORK (JOE'S VENTURE)
- **`[joes hero]`** / **`[weekly shoots hero]`**:
  - Target Path: `/assets/work/joes/hero.jpg`
  - HTML Target: `.work-hero-media-wrapper`
- **`[media buying 01]`** / **`[mb-01]`** / **`[lifestyle 01]`**:
  - Target Path: `/assets/work/joes/mb-01.jpg` (Handcrafted Leather Bag & Books)
- **`[media buying 02]`** / **`[mb-02]`** / **`[architecture 02]`**:
  - Target Path: `/assets/work/joes/mb-02.jpg` (Midnight Blue Leather Sleeve)
- **`[media buying 03]`** / **`[mb-03]`** / **`[mood 03]`**:
  - Target Path: `/assets/work/joes/mb-03.jpg` (Cognac Leather Portfolio Envelope)
- **`[media buying 04]`** / **`[mb-04]`** / **`[details 04]`**:
  - Target Path: `/assets/work/joes/mb-04.jpg` (Pebbled Leather Texture Bags)
- **`[media buying 05]`** / **`[mb-05]`** / **`[form 05]`**:
  - Target Path: `/assets/work/joes/mb-05.jpg` (Caramel Leather Briefcase on Raw Hide Rolls)
- **`[social 01]`** / **`[reel 01]`**:
  - Target Path: `/assets/work/joes/reel-01.mp4` or `/assets/work/joes/social-01.jpg`
- **`[social 02]`** / **`[grid 02]`**:
  - Target Path: `/assets/work/joes/social-02.jpg`
- **`[social 03]`** / **`[reel 03]`**:
  - Target Path: `/assets/work/joes/reel-02.mp4` or `/assets/work/joes/social-03.jpg`
- **`[social 04]`** / **`[reel 04]`**:
  - Target Path: `/assets/work/joes/social-04.mp4` or `/assets/work/joes/social-04.jpg`
- **`[social 05]`** / **`[reel 05]`**:
  - Target Path: `/assets/work/joes/social-05.mp4` or `/assets/work/joes/social-05.jpg`
- **`[social 06]`** / **`[reel 06]`**:
  - Target Path: `/assets/work/joes/social-06.mp4` or `/assets/work/joes/social-06.jpg`
- **`[joes bts]`**:
  - Target Path: `/assets/work/joes/bts-01.mp4` or `/assets/work/joes/bts-01.jpg`

#### 📷 03 — SALMA'S CAMERA ROLL (PERSONAL ARCHIVE)
- **`[frame 04a]`** $\rightarrow$ `/assets/camera-roll/roll-01.jpg` (*Late Drive, City Reflections* · Cairo · 35MM)
- **`[frame 11b]`** $\rightarrow$ `/assets/camera-roll/roll-02.jpg` (*Horizon & Cloud Break* · Alexandria · 35MM)
- **`[frame 19a]`** $\rightarrow$ `/assets/camera-roll/roll-03.jpg` (*Inverted Portrait & Concrete* · Studio · B&W 35MM)
- **`[frame 22c]`** $\rightarrow$ `/assets/camera-roll/roll-04.jpg` (*Goggles & Street Couture* · Street · 35MM)
- **`[frame 35a]`** $\rightarrow$ `/assets/camera-roll/roll-05.jpg` (*Camp Canopy & Mischief* · Sinai · 35MM)
- **`[frame 40b]`** $\rightarrow$ `/assets/camera-roll/roll-06.jpg` (*Open Water & Blue Horizon* · Red Sea · 35MM)
- **`[frame 54a]`** $\rightarrow$ `/assets/camera-roll/roll-07.jpg` (*Golden Passenger & Sun* · Road · 35MM)
- **`[frame 62a]`** $\rightarrow$ `/assets/camera-roll/roll-08.jpg` (*Coastal Rocks & Dusk Tide* · Coastal · 35MM)
- **`[frame 70a]`** $\rightarrow$ `/assets/camera-roll/roll-09.jpg` (*Sketchbook & Twilight* · Summer · 35MM)
- **`[new frame]`** (Horizontal or Vertical) $\rightarrow$ `/assets/camera-roll/roll-10.jpg`, `roll-11.jpg`, etc.

#### 🎥 04 — BEHIND THE SCENES
- **`[bts clip 01]`** / **`[take 03]`**: `/assets/bts/bts-clip-01.mp4` (Wind Machine Outtake)
- **`[bts clip 02]`** / **`[take 08]`**: `/assets/bts/bts-clip-02.mp4` (Vintage Cup Prop Hunt)
- **`[bts clip 03]`** / **`[take 14]`**: `/assets/bts/bts-clip-03.mp4` (Rooftop Golden Run)
- **`[bts clip 04]`** / **`[take 21]`**: `/assets/bts/bts-clip-04.mp4` (Koshary in Haute Couture)

#### 👤 05 — ABOUT SALMA
- **`[salma portrait]`** / **`[about photo]`**:
  - Target Path: `/assets/about/salma-portrait.jpg`
  - HTML Target: `#about .about-portrait-frame img`

---

### 3. Step-by-Step Update Protocol
When a new asset is provided:
1. **Copy/Save the Asset**: Save the uploaded image/video to the exact folder path under `/assets/`.
2. **Update `index.html`**:
   - Update `src` attribute on the `<img>` or `<video>`.
   - Update `data-lightbox-src` and `data-lightbox-caption`.
   - Update the caption text and date/location tags in `.archive-caption-row` or card labels.
3. **Update `js/data.js` and `js/bundle.js`**:
   - Update the corresponding entry in the data archive so full-screen lightbox and dynamic tickers match.
4. **Preserve Design Standards**:
   - Maintain aspect ratios (`aspect-landscape`, `aspect-portrait`, `aspect-cinematic`).
   - Keep the floating director's dock and color world themes intact.
   - Strictly adhere to zero-autoplay audio standards.
