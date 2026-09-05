/**
 * ==========================================================================
 * MICRO-INTERACTIONS & CINEMATIC EFFECTS
 * Procedural 35mm film grain, 24fps timecode, aspect switcher & menu modal.
 * ==========================================================================
 */

export class MicroInteractions {
  constructor() {
    this.initFilmGrain();
    this.initTimecode();
    this.initAspectSwitcher();
    this.initMenuModal();
    this.initSmoothScroll();
  }

  /* 1. PROCEDURAL 35MM GRAIN GENERATOR */
  initFilmGrain() {
    const canvas = document.getElementById('filmGrainCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth / 2);
    let height = (canvas.height = window.innerHeight / 2);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth / 2;
      height = canvas.height = window.innerHeight / 2;
    });

    let frameCount = 0;
    const loop = () => {
      frameCount++;
      // Run every 2nd frame (~30fps) for optimal performance and authentic film flutter
      if (frameCount % 2 === 0) {
        const imgData = ctx.createImageData(width, height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() * 255) | 0;
          data[i] = noise;
          data[i + 1] = noise;
          data[i + 2] = noise;
          data[i + 3] = 26; // subtle opacity
        }
        ctx.putImageData(imgData, 0, 0);
      }
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* 2. 24FPS CINEMA TIMECODE CLOCK */
  initTimecode() {
    const timecodeEl = document.getElementById('openingTimecode');
    if (!timecodeEl) return;

    let frames = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    setInterval(() => {
      frames++;
      if (frames >= 24) {
        frames = 0;
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
        }
      }

      const hh = String(hours).padStart(2, '0');
      const mm = String(minutes).padStart(2, '0');
      const ss = String(seconds).padStart(2, '0');
      const ff = String(frames).padStart(2, '0');

      timecodeEl.textContent = `TC ${hh}:${mm}:${ss}:${ff}`;
    }, 1000 / 24);
  }

  /* 3. ASPECT RATIO TOGGLE (16:9 / 2.39:1 CINEMASCOPE) */
  initAspectSwitcher() {
    const aspectBtn = document.getElementById('aspectRatioBtn');
    const visualFrame = document.querySelector('.opening-visual-frame');
    if (!aspectBtn || !visualFrame) return;

    let isScope = false;
    aspectBtn.addEventListener('click', () => {
      isScope = !isScope;
      if (isScope) {
        visualFrame.classList.add('aspect-scope');
        aspectBtn.textContent = 'SCOPE: 2.39:1';
      } else {
        visualFrame.classList.remove('aspect-scope');
        aspectBtn.textContent = 'ASPECT: 16:9';
      }
    });
  }

  /* 4. FULLSCREEN TREATMENT NAVIGATION MODAL */
  initMenuModal() {
    const menuBtn = document.getElementById('menuToggleBtn');
    const closeBtn = document.getElementById('treatmentNavCloseBtn');
    const navModal = document.getElementById('treatmentNavModal');
    const navLinks = document.querySelectorAll('.treatment-chapter-link');

    if (!menuBtn || !navModal) return;

    const openMenu = () => {
      navModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      navModal.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navModal.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* 5. SMOOTH CHAPTER ANCHOR SCROLLING */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}
