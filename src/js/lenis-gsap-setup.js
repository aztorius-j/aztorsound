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

// Scroll to top on refresh
requestAnimationFrame(() => {
  lenis.scrollTo(0, { immediate: true });
});

// Recalculate positions on resize to keep ScrollTrigger pinning smooth
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

// Configure ScrollTrigger to work with Lenis' custom scroll behavior
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
      sectionTitleContainer = document.querySelector('#about .section-title-container'),
      sctOffset = sectionTitleContainer.clientHeight;

gsap.to(aboutContainer, {
  scrollTrigger: {
    trigger: '#about .sticky-element',
    start: 'top top',
    endTrigger: '#about',
    end: 'bottom bottom',
    pin: true,
    pinSpacing: false,
  }
});

ScrollTrigger.create({
  trigger: '#about .sticky-element',
  start: 'bottom bottom',
  endTrigger: '#about',
  end: `bottom+=${sctOffset} bottom`,
  onUpdate: self => {
    const bgProgress = self.progress * 100;
    aboutContainer.style.backgroundImage = `linear-gradient(to top, white ${bgProgress}%, transparent ${bgProgress}%)`;
  }
});