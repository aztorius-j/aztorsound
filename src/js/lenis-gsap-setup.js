import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis with smooth scroll forced on touch devices
const lenis = new Lenis({
  smooth: true,
  syncTouch: true,
});

// Sync ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Scroll to top on refresh
requestAnimationFrame(() => {
  lenis.scrollTo(0, { immediate: true });
});

lenis.on('scroll', (e) => {
  console.log('scrolling', e);
});