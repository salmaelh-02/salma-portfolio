/**
 * ==========================================================================
 * SALMA EL HADIDY — PORTFOLIO MAIN ENTRY POINT
 * Initializes ChapterObserver, Lightbox, AudioController, and MicroInteractions.
 * ==========================================================================
 */

import { ChapterObserver } from './chapter-observer.js';
import { Lightbox } from './lightbox.js';
import { AudioController } from './audio-controller.js';
import { MicroInteractions } from './micro-interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Cinematic Interactions & Procedural Film Grain
  const interactions = new MicroInteractions();

  // 2. Initialize Dynamic Chapter Observer & Color Palettes
  const chapterObserver = new ChapterObserver();

  // 3. Initialize Lightbox Media Inspector
  const lightbox = new Lightbox();

  // 4. Initialize Audio Controller (Zero autoplay - explicit user trigger only)
  const audioController = new AudioController();

  console.log(
    '%c Salma El Hadidy — Creative Director Portfolio %c // Ready ',
    'background: #143528; color: #F6EDD0; font-weight: bold; padding: 4px 8px;',
    'background: #F8D8DC; color: #4A121A; padding: 4px 8px;'
  );
});
