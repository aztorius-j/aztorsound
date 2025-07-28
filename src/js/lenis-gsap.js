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
const isMobile = window.innerWidth < 768;

const lenis = new Lenis({
  smooth: true,
  syncTouch: true,
  duration: isMobile ? 1.2 : 1.8,
  smoothWheel: true,
  wheelMultiplier: 0.5,
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
      return arguments.length ? lenis.scrollTo(value, {immediate: true}) : lenis.actualScroll;
    },
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.body.style.transform ? 'transform' : 'fixed'
  });

  ScrollTrigger.refresh(); // prevent any race conditions
});



// =========================
// SECTION-SPECIFIC TRIGGERS
// =========================



// *** ABOUT ME section ***
const dynamicBg = document.querySelector('.dynamic-bg'),
      sectionTitleContainer = document.querySelector('#about .section-title-container');

gsap.to(dynamicBg, {
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
    dynamicBg.style.backgroundImage = `linear-gradient(to top, white ${bgProgress}%, transparent ${bgProgress}%)`;
  }
});

// *** COOPERATIONS section ***
document.addEventListener('DOMContentLoaded', () => {
  ScrollTrigger.create({
    trigger: '#cooperations',
    start: 'bottom bottom',
    end: () => {
      const artistContainer = document.querySelector('.artists-container');
      return `+=${artistContainer.scrollWidth - window.innerWidth}`;
    },
    pin: true,
    pinSpacing: true,
    scrub: true,
    onUpdate: self => {
      const artistContainer = document.querySelector('.artists-container');
      const translateX = -self.progress * (artistContainer.scrollWidth - window.innerWidth);
      artistContainer.style.transform = `translateX(${translateX}px)`;
    }
  });
});

// *** FROM NOWHERE section ***
const actionPillars = document.querySelectorAll('.action-pillars');
const bigText = document.querySelector('#from-nowhere .big-text');

function getStartOffsets() {
  return ['17vw', '28vw', '40vw', '57vw'];
}

function getEndOffsets() {
  return ['top+=8% center', 'top+=31% center', 'top+=50% center', 'top+=70% center'];
}

function createActionPillarsTrigger() {
  const offsets = getStartOffsets();
  const endOffsets = getEndOffsets();

  ScrollTrigger.getAll().forEach(t => t.trigger === bigText && t.kill());

  actionPillars.forEach((item, i) => {
    gsap.set(item, { x: offsets[i] });

    gsap.to(item, {
      x: 0,
      ease: 'sine.out',
      scrollTrigger: {
        trigger: bigText,
        start: 'top bottom',
        end: endOffsets[i],
        scrub: true
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', createActionPillarsTrigger);
window.addEventListener('resize', createActionPillarsTrigger);
