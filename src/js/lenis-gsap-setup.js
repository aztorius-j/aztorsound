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
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Scroll to top on refresh
requestAnimationFrame(() => {
  lenis.scrollTo(0, { immediate: true });
});