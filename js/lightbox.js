/**
 * ==========================================================================
 * LIGHTBOX & MEDIA INSPECTOR
 * Fullscreen high-taste image viewer with captions and keyboard navigation.
 * ==========================================================================
 */

export class Lightbox {
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
      this.caption.textContent = item.caption ? `“${item.caption}”` : item.alt;
    }

    if (this.counter) {
      const current = String(this.currentIndex + 1).padStart(2, '0');
      const total = String(this.items.length).padStart(2, '0');
      const meta = item.meta ? ` // ${item.meta}` : '';
      this.counter.textContent = `${current} / ${total}${meta}`;
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

    // Close on background click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal || e.target.classList.contains('lightbox-stage')) {
          this.close();
        }
      });
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (!this.modal || !this.modal.classList.contains('is-active')) return;

      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });
  }
}
