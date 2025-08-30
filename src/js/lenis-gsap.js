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
  duration: isMobile ? 1 : 1.4,
  smoothWheel: true,
  wheelMultiplier: 0.8,
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Configure ScrollTrigger to work with Lenis' custom scroll behavior
// Also resets scroll position to top on page refresh (intended behavior)
function setupScrollTrigger() {
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
}



// =========================
// SECTION-SPECIFIC TRIGGERS
// =========================



// *** ABOUT ME section ***
const dynamicBg = document.querySelector('.dynamic-bg'),
      sectionTitleContainer = document.querySelector('#about .section-title-container');

function aboutMeScrollTrigger() {
  gsap.to(dynamicBg, {
    scrollTrigger: {
      trigger: '.about-wrapper',
      start: 'bottom bottom',
      endTrigger: '#about',
      end: 'bottom bottom',
      pin: true,
      pinSpacing: true
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
}

// *** COOPERATIONS section ***
let scrollAmount;
const artistContainer = document.querySelector('.artists-container');

function cooperationsScrollTrigger() {
  scrollAmount = artistContainer.scrollWidth - window.innerWidth;

  ScrollTrigger.create({
    trigger: '#cooperations',
    start: 'bottom bottom',
    end: `+=${scrollAmount}`,
    pin: true,
    pinSpacing: true,
    scrub: true,
    onUpdate: self => {
      const translateX = -self.progress * scrollAmount;
      artistContainer.style.transform = `translateX(${translateX}px)`;
    }
  });
}

// *** FROM NOWHERE section ***
const bigText = document.querySelector('#from-nowhere .big-text');
const actionPillars = document.querySelectorAll('.action-pillars');
const smallText = document.querySelector('#from-nowhere .small-text');
const lines = document.querySelectorAll('.line');

const initializeSmallText = () => {
  lines.forEach((line, index) => {
    const offset = (index ** 1.4) * 2;
    line.style.transform = `translateY(${offset}px)`;
  });
};

let clipPathAnims = [];

function createClipPathEffect() {
  // Cancel any previous animations if they were running
  clipPathAnims.forEach(anim => anim.kill());
  clipPathAnims = [];

  ScrollTrigger.create({
    trigger: isMobile ? lines[7] : lines[4],
    start: 'bottom bottom',
    onEnter: () => {
      lines.forEach((line, index) => {
        const anim = gsap.to(line, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          transform: 'translateY(0)',
          duration: 0.4 + index * 0.08,
          ease: 'power2.inOut',
          willChange: 'clip-path',
          onComplete: () => {
            line.style.willChange = 'auto';
          }
        });
        clipPathAnims.push(anim);
      });
    }
  });

  ScrollTrigger.create({
    trigger: smallText,
    start: 'top bottom+=100',
    onLeaveBack: () => {
      // Cancel all animations to avoid overlap
      clipPathAnims.forEach(anim => anim.kill());
      clipPathAnims = [];

      lines.forEach((line, index) => {
        const offset = (index ** 1.4) * 2;
        gsap.set(line, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          willChange: 'auto',
          y: offset,
        });
      });
    }
  });
}

function getStartOffsets() {
  return ['17vw', '28vw', '40vw', '57vw'];
}

function getEndOffsets() {
  return ['top+=8% center', 'top+=31% center', 'top+=50% center', 'top+=70% center'];
}

let actionPillarTriggers = [];

function createActionPillarsTrigger() {
  actionPillarTriggers.forEach(t => t.kill());
  actionPillarTriggers = [];

  const offsets = getStartOffsets();
  const endOffsets = getEndOffsets();

  actionPillars.forEach((item, i) => {
    gsap.set(item, { x: offsets[i] });

    const anim = gsap.to(item, {
      x: 0,
      ease: 'sine.out',
      scrollTrigger: {
        trigger: bigText,
        start: 'top bottom',
        end: endOffsets[i],
        scrub: true
      }
    });
    actionPillarTriggers.push(anim.scrollTrigger);
  });
}

function fromNowhereScrollTrigger() {
  initializeSmallText();
  createClipPathEffect();
  createActionPillarsTrigger();
}

// *** AS-PLAYER section ***
const asPlayerSection = document.getElementById('as-player');

function asPlayerScrollTrigger() {
  ScrollTrigger.create({
    trigger: asPlayerSection,
    start: 'top top',
    end: 'bottom bottom',
    pin: true,
    pinSpacing: false,
    onUpdate:  self => {
      const event = new CustomEvent('as-player-progress', {
        detail: {progress: self.progress * 100}
      });
      document.dispatchEvent(event);
    }
  });
}

// *** WHO NEEDS ME section ***
const whoNeedsMeSection = document.getElementById('who-needs-me');
const whoNeedsMeWrapper = document.querySelector('.who-needs-me-wrapper');

function whoNeedsMeScrollTrigger() {
  ScrollTrigger.create({
    trigger: whoNeedsMeWrapper,
    start: 'bottom bottom',
    endTrigger: whoNeedsMeSection,
    end: 'bottom bottom',
    pin: true,
    pinSpacing: false,
    onUpdate: self => {
      const event = new CustomEvent('who-needs-me-progress', {
        detail: {progress: self.progress * 100}
      });
      document.dispatchEvent(event);
    }
  });
}

// *** AZTOR section ***
const aztorSection = document.getElementById('aztor');
const aztorWrapper = document.querySelector('.aztor-wrapper');

function aztorScrollTrigger() {
  ScrollTrigger.create({
    trigger: aztorWrapper,
    start: 'bottom bottom',
    endTrigger: aztorSection,
    end: 'bottom bottom',
    pin: true,
    pinSpacing: false,
    onUpdate: self => {
      const event = new CustomEvent('aztor-progress', {
        detail: {progress: self.progress}
      });
      document.dispatchEvent(event);
    }
  });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  setupScrollTrigger();
  aboutMeScrollTrigger();
  cooperationsScrollTrigger();
  fromNowhereScrollTrigger();
  asPlayerScrollTrigger();
  whoNeedsMeScrollTrigger()
  aztorScrollTrigger();
});

// Unified resize handler
window.addEventListener('resize', () => {
  scrollAmount = artistContainer.scrollWidth - window.innerWidth;
  createActionPillarsTrigger();
  ScrollTrigger.refresh();
});