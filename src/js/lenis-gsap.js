// =========================
// INITIALIZE LENIS AND GSAP
// =========================



import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enables the ScrollTrigger plugin for use with GSAP
gsap.registerPlugin(ScrollTrigger);


import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Initialize Lenis with smooth scroll forced on touch devices
const lenis = new Lenis({
  smooth: true,
  syncTouch: true,
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Recalculate positions on resize to keep ScrollTrigger pinning smooth
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

// Configure ScrollTrigger to work with Lenis' custom scroll behavior
// Also resets scroll position to top on page refresh (intended behavior)
document.addEventListener('DOMContentLoaded', () => {
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length
        ? lenis.scrollTo(value, { immediate: true })
        : lenis.actualScroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.body.style.transform ? 'transform' : 'fixed'
  });

  ScrollTrigger.refresh(); // prevent any race conditions
});



// =========================
// SECTION-SPECIFIC TRIGGERS
// =========================



// *** ABOUT ME section ***
const aboutContainer = document.querySelector('.about-container'),
      sectionTitleContainer = document.querySelector('#about .section-title-container');

gsap.to(aboutContainer, {
  scrollTrigger: {
    trigger: '#about .about-wrapper',
    start: 'top top',
    endTrigger: '#about',
    end: 'bottom bottom',
    pin: true,
    pinSpacing: false,
  }
});

ScrollTrigger.create({
  trigger: '#about .about-wrapper',
  start: 'bottom bottom',
  endTrigger: '#about',
  end: () => `bottom+=${sectionTitleContainer.getBoundingClientRect().height} bottom`,
  onUpdate: self => {
    const bgProgress = self.progress * 100;
    aboutContainer.style.backgroundImage = `linear-gradient(to top, white ${bgProgress}%, transparent ${bgProgress}%)`;
  }
});

// *** COOPERATIONS section ***
document.addEventListener('DOMContentLoaded', () => {
  ScrollTrigger.create({
    trigger: '#cooperations',
    start: 'top top',
    end: () => {
      const artistContainer = document.querySelector('.artists-container');
      const frame = document.querySelector('.artist');
      const frameWidth = frame.getBoundingClientRect().width;
      return `+=${artistContainer.scrollWidth + frameWidth}`;
    },
    pin: true,
    pinSpacing: true,
    scrub: true,
    onUpdate: self => {
      const artistContainer = document.querySelector('.artists-container');
      const artistFrame = document.querySelector('.artist');
      const artistFrameWidth = artistFrame.getBoundingClientRect().width;
      const maxTranslate = artistContainer.scrollWidth - artistFrameWidth;

      const translateX = -self.progress * maxTranslate;

      artistContainer.style.transform = `translateX(${translateX}px)`;
    }
  });
});

// dorobiť scale, opacity, inak vyriešiť responzívny dizajn, sectionTitleContainer - zrušiť paddingy, tým pádom inak vyriešiť cely layout sekcie
