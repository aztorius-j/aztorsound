import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sticky náhrada
gsap.to(".sticky-element", {
  scrollTrigger: {
    trigger: "#about",
    start: "top top",
    end: "bottom bottom",
    pin: true,
    pinSpacing: false,
  }
});

const aboutContainer = document.querySelector('.about-container');
const sectionTitleContainer = document.querySelector('#about .section-title-container');

let currentOffset = sectionTitleContainer.clientHeight;

ScrollTrigger.create({
  trigger: '.sticky-element',
  start: 'bottom bottom',
  endTrigger: '#about',
  end: `bottom+=${currentOffset} bottom`,
  scrub: true,
  onUpdate: self => {
    const progress = self.progress;
    const percentage = progress * 100;
    aboutContainer.style.backgroundImage = `linear-gradient(to top, white ${percentage}%, transparent ${percentage}%)`;
  }
});

// Prepočítaj pozície pri resize, aby scrollTrigger pin ostalo plynulé
window.addEventListener('resize', () => {
  currentOffset = sectionTitleContainer.clientHeight;
  ScrollTrigger.refresh();
});