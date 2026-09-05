/**
 * ==========================================================================
 * AUDIO CONTROLLER & INTERACTIVE SOUNDSCAPE
 * Web Audio API ambient film texture and BTS audio triggers.
 * STRICT RULE: ZERO AUTOPLAY. Activated solely on explicit user click.
 * ==========================================================================
 */

export class AudioController {
  constructor() {
    this.audioCtx = null;
    this.ambientGain = null;
    this.ambientOsc = null;
    this.isAmbientPlaying = false;
    this.activeClip = null;

    this.toggleBtn = document.getElementById('globalAudioToggle');
    this.btsTriggers = document.querySelectorAll('[data-bts-sound]');
    this.toast = document.getElementById('audioToast');
    this.toastText = document.getElementById('audioToastText');

    this.bindEvents();
    this.initVideoSoundToggles();
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleAmbient() {
    this.ensureContext();
    if (!this.audioCtx) return;

    if (this.isAmbientPlaying) {
      this.stopAmbient();
      this.showToast("Ambient sound paused");
    } else {
      this.startAmbient();
      this.showToast("35mm Film Projector Ambient: Playing");
    }
  }

  startAmbient() {
    try {
      // Synthesize a warm, vintage 35mm projector hum & tape warmth
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      // Low warm drone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(65, this.audioCtx.currentTime); // Low warm 65Hz hum

      // Low pass filter for soft analog warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      this.ambientOsc = osc;
      this.ambientGain = gain;
      this.isAmbientPlaying = true;

      if (this.toggleBtn) {
        this.toggleBtn.classList.add('is-playing');
        const textSpan = this.toggleBtn.querySelector('.audio-toggle-text');
        if (textSpan) textSpan.textContent = 'SOUND: ON';
      }
    } catch (e) {
      console.warn("Audio initialization notice:", e);
    }
  }

  stopAmbient() {
    if (this.ambientGain && this.audioCtx) {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.5);
      setTimeout(() => {
        if (this.ambientOsc) {
          this.ambientOsc.stop();
          this.ambientOsc.disconnect();
          this.ambientOsc = null;
        }
      }, 500);
    }
    this.isAmbientPlaying = false;

    if (this.toggleBtn) {
      this.toggleBtn.classList.remove('is-playing');
      const textSpan = this.toggleBtn.querySelector('.audio-toggle-text');
      if (textSpan) textSpan.textContent = 'SOUND: OFF';
    }
  }

  playBtsCue(soundType, cardElement) {
    this.ensureContext();
    if (!this.audioCtx) return;

    // Reset previous card state
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

    // Synthesize tailored cinema cue (clapperboard snap, camera motor, set dialogue tone)
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    if (soundType === 'clapper' || soundType === 'wind-laugh') {
      // Clapper snap sound
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    } else {
      // Warm chord acoustic texture
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

    // Auto-pause all videos when user changes tab or minimizes window
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.querySelectorAll('video').forEach((v) => v.pause());
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
