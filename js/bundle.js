/**
 * ==========================================================================
 * SALMA EL HADIDY — PORTFOLIO STANDALONE BUNDLE
 * Self-contained logic for zero-dependency execution across both file:// and http://
 * ==========================================================================
 */

(function () {
  'use strict';

  /* --- 1. PORTFOLIO DATA ARCHIVE --- */
  const siteData = {
    meta: {
      name: "Salma El Hadidy",
      role: "Creative Director",
      location: "Cairo, Egypt",
      coordinates: "30.0444° N, 31.2357° E",
      email: "salmaelhadidy10@gmail.com",
      instagram: "@salmaxelh",
      cvUrl: "assets/about/salma-cv.pdf"
    },
    chapters: [
      { id: "00", name: "Opening", label: "00 — OPENING", tag: "THE REEL" },
      { id: "01", name: "About Salma", label: "01 — ABOUT SALMA", tag: "PROFILE" },
      { id: "02", name: "Selected Work", label: "02 — SELECTED WORK", tag: "JOE'S VENTURE" },
      { id: "03", name: "Camera Roll", label: "03 — CAMERA ROLL", tag: "ARCHIVE" },
      { id: "04", name: "Direction", label: "04 — DIRECTION", tag: "CREATIVE POINT OF VIEW" },
      { id: "05", name: "Get In Touch", label: "05 — GET IN TOUCH", tag: "LET'S MAKE SOMETHING" }
    ],
    cameraRoll: [
      {
        id: 1,
        frame: "FRAME #04A",
        title: "Late Drive, City Reflections",
        location: "Cairo",
        date: "35MM",
        caption: "City lights bleeding through the car window. The magic in between scenes."
      },
      {
        id: 2,
        frame: "FRAME #11B",
        title: "Horizon & Cloud Break",
        location: "Alexandria",
        date: "35MM",
        caption: "Golden horizon breaking through dark storm clouds across calm waters."
      },
      {
        id: 3,
        frame: "FRAME #19A",
        title: "Inverted Portrait & Concrete",
        location: "Studio Archive",
        date: "B&W 35MM",
        caption: "Monochrome texture, botanical shadow, and inverted portraiture."
      },
      {
        id: 4,
        frame: "FRAME #22C",
        title: "Goggles & Street Couture",
        location: "Street Archive",
        date: "35MM",
        caption: "Peak street styling. You cannot art direct this level of confidence."
      },
      {
        id: 5,
        frame: "FRAME #35A",
        title: "Camp Canopy & Mischief",
        location: "Sinai",
        date: "35MM",
        caption: "Spontaneous candid mischief under the camp canopy."
      },
      {
        id: 6,
        frame: "FRAME #40B",
        title: "Open Water & Blue Horizon",
        location: "Red Sea",
        date: "35MM",
        caption: "Deep blue open water, glittering midday sun, and spontaneous motion."
      },
      {
        id: 7,
        frame: "FRAME #48A",
        title: "Sunlit Halo & Wild Branches",
        location: "Garden Archive",
        date: "35MM",
        caption: "Golden halo hair, wild twigs, and illuminated afternoon glow."
      },
      {
        id: 8,
        frame: "FRAME #54A",
        title: "Golden Passenger & Sun",
        location: "Road Archive",
        date: "35MM",
        caption: "Golden late-afternoon sun, wind in hair, and effortless warmth."
      },
      {
        id: 9,
        frame: "FRAME #62A",
        title: "Coastal Rocks & Dusk Tide",
        location: "Coastal Archive",
        date: "35MM",
        caption: "Coastal rocks, breaking tide, and quiet dusk reflections."
      },
      {
        id: 10,
        frame: "FRAME #70A",
        title: "Sketchbook & Twilight",
        location: "Summer Archive",
        date: "35MM",
        caption: "Field sketchbook, buzz cut, and twilight horizon."
      },
      {
        id: 11,
        frame: "FRAME #78A",
        title: "Smoke Mane & Amber Gaze",
        location: "Home Archive",
        date: "35MM",
        caption: "Golden eyes, smoke mane, and quiet domestic royalty."
      }
    ]
  };

  /* --- 2. CHAPTER OBSERVER & DYNAMIC PALETTES --- */
  class ChapterObserver {
    constructor() {
      this.chapters = document.querySelectorAll('.chapter-section');
      this.hudText = document.getElementById('chapterHudText');
      this.railItems = document.querySelectorAll('.chapter-rail-item');
      this.currentChapterId = '00';
      this.initObserver();
    }

    initObserver() {
      if (!this.chapters.length) return;

      const options = {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chapterId = entry.target.getAttribute('data-chapter');
            if (chapterId && chapterId !== this.currentChapterId) {
              this.setChapter(chapterId);
            }
          }
        });
      }, options);

      this.chapters.forEach((section) => observer.observe(section));
    }

    setChapter(chapterId) {
      this.currentChapterId = chapterId;

      // Update Root Theme Attribute for Fluid CSS Variable Transitions
      document.documentElement.setAttribute('data-chapter-theme', chapterId);
      document.body.setAttribute('data-chapter-theme', chapterId);

      // Lookup Chapter Data
      const chapterInfo = siteData.chapters.find((c) => c.id === chapterId);

      // Update Floating HUD Ticker
      if (this.hudText && chapterInfo) {
        this.hudText.textContent = `${chapterInfo.label} // ${chapterInfo.tag}`;
      }

      // Update Fixed Desktop Chapter Rail
      if (this.railItems.length) {
        this.railItems.forEach((item) => {
          const itemChapter = item.getAttribute('data-chapter-target');
          if (itemChapter === chapterId) {
            item.classList.add('is-active');
          } else {
            item.classList.remove('is-active');
          }
        });
      }

      // Gently update URL hash
      const activeSection = document.querySelector(`[data-chapter="${chapterId}"]`);
      if (activeSection && activeSection.id) {
        window.history.replaceState(null, '', `#${activeSection.id}`);
      }
    }
  }

  /* --- 3. LIGHTBOX & MEDIA INSPECTOR --- */
  class Lightbox {
    constructor() {
      this.modal = document.getElementById('lightboxModal');
      this.container = this.modal ? this.modal.querySelector('.lightbox-media-container') : null;
      this.caption = document.getElementById('lightboxCaption');
      this.counter = document.getElementById('lightboxCounter');
      this.closeBtn = document.getElementById('lightboxCloseBtn');
      this.prevBtn = document.getElementById('lightboxPrevBtn');
      this.nextBtn = document.getElementById('lightboxNextBtn');

      this.items = [];
      this.currentIndex = 0;

      this.initTriggers();
      this.bindEvents();
    }

    initTriggers() {
      const triggerElements = document.querySelectorAll('[data-lightbox-src]');
      this.items = Array.from(triggerElements).map((el) => ({
        src: el.getAttribute('data-lightbox-src') || el.querySelector('img, video')?.src,
        alt: el.getAttribute('data-lightbox-alt') || el.querySelector('img, video')?.alt || 'Visual Media',
        caption: el.getAttribute('data-lightbox-caption') || el.querySelector('.archive-caption-text')?.textContent || '',
        meta: el.getAttribute('data-lightbox-meta') || el.querySelector('.archive-frame-num')?.textContent || ''
      }));

      triggerElements.forEach((el, index) => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          this.open(index);
        });
      });
    }

    open(index) {
      if (!this.modal || !this.items[index]) return;
      this.currentIndex = index;
      this.updateContent();
      this.modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    close() {
      if (!this.modal) return;
      if (this.container) {
        const vid = this.container.querySelector('video');
        if (vid) vid.pause();
      }
      this.modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    next() {
      if (this.currentIndex < this.items.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.updateContent();
    }

    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.items.length - 1;
      }
      this.updateContent();
    }

    updateContent() {
      const item = this.items[this.currentIndex];
      if (!item) return;

      const isVideo = item.src && (item.src.endsWith('.mp4') || item.src.endsWith('.mov') || item.src.endsWith('.webm'));

      if (this.container) {
        if (isVideo) {
          this.container.innerHTML = `<video src="${item.src}" class="lightbox-video" controls autoplay playsinline></video>`;
        } else {
          this.container.innerHTML = `<img src="${item.src}" alt="${item.alt}" class="lightbox-image">`;
        }
      }

      if (this.caption) {
        const frameBadge = item.meta ? `<span class="lightbox-frame-badge">${item.meta}</span>` : '';
        this.caption.innerHTML = `${frameBadge}`;
      }

      if (this.counter) {
        const current = String(this.currentIndex + 1).padStart(2, '0');
        const total = String(this.items.length).padStart(2, '0');
        this.counter.textContent = `${current} / ${total}`;
      }
    }

    bindEvents() {
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.prev();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.next();
        });
      }

      if (this.modal) {
        this.modal.addEventListener('click', (e) => {
          if (e.target === this.modal || e.target.classList.contains('lightbox-stage')) {
            this.close();
          }
        });
      }

      window.addEventListener('keydown', (e) => {
        if (!this.modal || !this.modal.classList.contains('is-active')) return;
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowRight') this.next();
        if (e.key === 'ArrowLeft') this.prev();
      });
    }
  }

  /* --- 4. AUDIO CONTROLLER (SEAMLESS LOOPING TRACK & ZERO UNAUTHORIZED AUTOPLAY) --- */
  class AudioController {
    constructor() {
      this.isAmbientPlaying = false;
      this.ambientAudio = document.getElementById('ambientAudio') || new Audio('assets/audio/ambient.m4a');
      if (this.ambientAudio) {
        this.ambientAudio.loop = true;
      }
      this.fadeInterval = null;

      this.toggleBtn = document.getElementById('globalAudioToggle');
      this.btsTriggers = document.querySelectorAll('[data-bts-sound]');
      this.toast = document.getElementById('audioToast');
      this.toastText = document.getElementById('audioToastText');

      this.bindEvents();
      this.initVideoSoundToggles();
    }

    toggleAmbient() {
      if (this.isAmbientPlaying) {
        this.stopAmbient();
      } else {
        this.startAmbient();
      }
    }

    startAmbient() {
      if (!this.ambientAudio) return;

      clearInterval(this.fadeInterval);
      this.ambientAudio.volume = 0;
      this.ambientAudio.play().then(() => {
        this.isAmbientPlaying = true;
        let vol = 0;
        this.fadeInterval = setInterval(() => {
          vol += 0.08;
          if (vol >= 0.85) {
            this.ambientAudio.volume = 0.85;
            clearInterval(this.fadeInterval);
          } else {
            this.ambientAudio.volume = vol;
          }
        }, 40);

        if (this.toggleBtn) {
          this.toggleBtn.classList.add('is-playing');
          const textSpan = this.toggleBtn.querySelector('.audio-toggle-text');
          if (textSpan) textSpan.textContent = 'SOUND: ON';
        }
        this.showToast("Ambient Soundtrack: Playing");
      }).catch((e) => {
        console.warn("Audio playback notice:", e);
      });
    }

    stopAmbient() {
      if (!this.ambientAudio) return;

      clearInterval(this.fadeInterval);
      let vol = this.ambientAudio.volume;
      this.fadeInterval = setInterval(() => {
        vol -= 0.1;
        if (vol <= 0.05) {
          this.ambientAudio.volume = 0;
          this.ambientAudio.pause();
          clearInterval(this.fadeInterval);
        } else {
          this.ambientAudio.volume = vol;
        }
      }, 40);

      this.isAmbientPlaying = false;
      if (this.toggleBtn) {
        this.toggleBtn.classList.remove('is-playing');
        const textSpan = this.toggleBtn.querySelector('.audio-toggle-text');
        if (textSpan) textSpan.textContent = 'SOUND: OFF';
      }
      this.showToast("Ambient Soundtrack: Paused");
    }

    playBtsCue(soundType, cardElement) {
      this.ensureContext();
      if (!this.audioCtx) return;

      if (this.activeClip && this.activeClip !== cardElement) {
        this.activeClip.classList.remove('is-playing');
      }

      const isCurrentlyPlaying = cardElement.classList.contains('is-playing');
      if (isCurrentlyPlaying) {
        cardElement.classList.remove('is-playing');
        this.activeClip = null;
        this.showToast("BTS Audio stopped");
        return;
      }

      cardElement.classList.add('is-playing');
      this.activeClip = cardElement;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      if (soundType === 'clapper' || soundType === 'wind-laugh') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      }

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 1.3);

      this.showToast(`BTS Audio: ${soundType.replace('-', ' ').toUpperCase()} (Playing)`);

      setTimeout(() => {
        cardElement.classList.remove('is-playing');
        if (this.activeClip === cardElement) this.activeClip = null;
      }, 1400);
    }

    showToast(message) {
      if (!this.toast || !this.toastText) return;
      this.toastText.textContent = message;
      this.toast.classList.add('is-visible');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.toast.classList.remove('is-visible');
      }, 2800);
    }

    bindEvents() {
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', () => this.toggleAmbient());
      }

      this.btsTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const soundType = trigger.getAttribute('data-bts-sound') || 'clapper';
          this.playBtsCue(soundType, trigger);
        });
      });
    }

    initVideoSoundToggles() {
      // IntersectionObserver to auto-stop videos when they disappear from screen / scroll out of view
      const videoVisibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          const container = video.closest(
            '.work-hero-media-wrapper, .work-social-card, .work-bts-media-preview, .bts-media-viewport, .opening-visual-frame, .lightbox-media-container'
          ) || video.parentElement;
          const btn = container ? container.querySelector('.video-sound-toggle-btn') : null;
          const isOpening = video.classList.contains('opening-media-element') || video.closest('#opening');

          if (!entry.isIntersecting) {
            // Disappeared from screen: stop video immediately and mute
            video.pause();
            if (!video.muted) {
              video.muted = true;
              if (btn) {
                btn.classList.remove('is-unmuted');
                btn.setAttribute('aria-label', 'Unmute video sound');
              }
            }
          } else {
            // Re-entered screen: resume playing continuously
            if (isOpening || video.hasAttribute('autoplay') || video.loop) {
              video.play().catch(() => {});
            }
          }
        });
      }, {
        threshold: 0.15 // Triggers as soon as video scrolls out of the visible screen
      });

      const setupVideo = (video) => {
        if (video.dataset.soundToggleInitialized) return;
        video.dataset.soundToggleInitialized = 'true';

        // Ignore lightbox video so native player timeline scrubbing/skipping works 100% smoothly
        const isLightboxVideo = video.classList.contains('lightbox-video') || video.closest('.lightbox-modal, .lightbox-media-container');
        if (isLightboxVideo) {
          return;
        }

        // Default: ensure autoplay muted
        video.muted = true;

        // Observe video for automatic pause when scrolled out of screen
        videoVisibilityObserver.observe(video);

        const isOpening = video.classList.contains('opening-media-element') || video.closest('#opening');
        const isContinuous = isOpening || (video.hasAttribute('autoplay') && video.hasAttribute('loop') && !video.closest('.work-social-card'));

        if (isContinuous) {
          // Continuous hero / ambient video: always play continuously in view
          video.play().catch(() => {});
        }

        // Find nearest parent container
        const container = video.closest(
          '.work-hero-media-wrapper, .work-social-card, .work-bts-media-preview, .bts-media-viewport, .opening-visual-frame'
        ) || video.parentElement;

        if (!container) return;

        // For social/interactive cards: play from current position without resetting to beginning
        if (!isContinuous) {
          container.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
          });

          container.addEventListener('mouseleave', () => {
            video.pause();
          });
        }

        // Check if button already exists
        let btn = container.querySelector('.video-sound-toggle-btn');
        if (!btn) {
          btn = document.createElement('button');
          btn.className = 'video-sound-toggle-btn';
          btn.setAttribute('type', 'button');
          btn.setAttribute('aria-label', 'Unmute video sound');
          btn.innerHTML = `
            <svg class="video-sound-icon sound-muted-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="22" y1="9" x2="16" y2="15"></line>
              <line x1="16" y1="9" x2="22" y2="15"></line>
            </svg>
            <svg class="video-sound-icon sound-unmuted-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          `;
          container.appendChild(btn);
        }

        // Sync initial state
        if (!video.muted) {
          btn.classList.add('is-unmuted');
          btn.setAttribute('aria-label', 'Mute video sound');
        } else {
          btn.classList.remove('is-unmuted');
          btn.setAttribute('aria-label', 'Unmute video sound');
        }

        // Independent click handler - only toggles audio and stops all bubbling/navigation
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();

          if (video.muted) {
            video.muted = false;
            video.volume = 1.0;
            video.play().catch(() => {});
            btn.classList.add('is-unmuted');
            btn.setAttribute('aria-label', 'Mute video sound');
          } else {
            video.muted = true;
            btn.classList.remove('is-unmuted');
            btn.setAttribute('aria-label', 'Unmute video sound');
          }
        });
      };

      // Auto-pause all videos & ambient sound when user changes tab or minimizes window
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          document.querySelectorAll('video').forEach((v) => v.pause());
          if (this.isAmbientPlaying && this.ambientAudio) {
            this.ambientAudio.pause();
          }
        } else {
          if (this.isAmbientPlaying && this.ambientAudio) {
            this.ambientAudio.play().catch(() => {});
          }
        }
      });

      // Initialize all current videos
      document.querySelectorAll('video').forEach(setupVideo);

      // MutationObserver for any future dynamically added videos
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              if (node.tagName === 'VIDEO') {
                setupVideo(node);
              } else if (node.querySelectorAll) {
                node.querySelectorAll('video').forEach(setupVideo);
              }
            }
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  /* --- 5. MICRO-INTERACTIONS & CINEMATIC EFFECTS --- */
  class MicroInteractions {
    constructor() {
      this.initFilmGrain();
      this.initTimecode();
      this.initAspectSwitcher();
      this.initMenuModal();
      this.initSmoothScroll();
    }

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
        if (frameCount % 2 === 0) {
          const imgData = ctx.createImageData(width, height);
          const data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() * 255) | 0;
            data[i] = noise;
            data[i + 1] = noise;
            data[i + 2] = noise;
            data[i + 3] = 26;
          }
          ctx.putImageData(imgData, 0, 0);
        }
        requestAnimationFrame(loop);
      };
      loop();
    }

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

  /* --- 6. INITIALIZATION BOOTSTRAP --- */
  document.addEventListener('DOMContentLoaded', () => {
    new MicroInteractions();
    new ChapterObserver();
    new Lightbox();
    new AudioController();

    console.log(
      '%c Salma El Hadidy — Creative Director Portfolio %c // Ready ',
      'background: #143528; color: #F6EDD0; font-weight: bold; padding: 4px 8px;',
      'background: #F8D8DC; color: #4A121A; padding: 4px 8px;'
    );
  });
})();
