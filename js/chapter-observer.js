/**
 * ==========================================================================
 * CHAPTER SCROLL OBSERVER & DYNAMIC COLOR WORLD MANAGER
 * Seamlessly transitions color palettes, HUD tickers, and chapter indicators.
 * ==========================================================================
 */

import { siteData } from './data.js';

export class ChapterObserver {
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

    // 1. Update Root Theme Attribute for Fluid CSS Variable Palette Transitions
    document.documentElement.setAttribute('data-chapter-theme', chapterId);
    document.body.setAttribute('data-chapter-theme', chapterId);

    // 2. Lookup Chapter Data
    const chapterInfo = siteData.chapters.find((c) => c.id === chapterId);

    // 3. Update Floating HUD Ticker
    if (this.hudText && chapterInfo) {
      this.hudText.textContent = `${chapterInfo.label} // ${chapterInfo.tag}`;
    }

    // 4. Update Fixed Desktop Chapter Rail
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

    // 5. Update History URL Hash gently without page jump
    const activeSection = document.querySelector(`[data-chapter="${chapterId}"]`);
    if (activeSection && activeSection.id) {
      window.history.replaceState(null, '', `#${activeSection.id}`);
    }
  }
}
