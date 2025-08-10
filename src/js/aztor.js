// SCROLL PROGRESS FROM LENIS-GSAP
let aztorProgress = 0;

document.addEventListener('aztor-progress', event => {
  aztorProgress = event.detail.progress;
});

// BLUR PROGRESS
const aztor = document.querySelector('#aztor h4');
const aztorWrapper = document.querySelector('.aztor-wrapper');

const blurProgress = () => {
  const blurRatio = (1 - aztorProgress) * 10;
  aztorWrapper.style.opacity = aztorProgress;
  aztor.style.opacity = aztorProgress;
  aztor.style.filter = `blur(${blurRatio}px)`;
};

window.addEventListener('scroll', () => {
  blurProgress();
});

window.addEventListener('resize', () => {
  blurProgress();
});

// FLICKER
let lightRadius = 200;
let flickerAmount = 0;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

const overlay = document.getElementById('light-overlay');

function updateFlicker() {
  flickerAmount = (Math.random() - 0.5) * 40;
  const radius = lightRadius + flickerAmount;
  const x = mouseX;
  const y = mouseY;
  overlay.style.background = `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(0,0,0,0.7) 0%, rgba(0,0,0,1) 100%)`;
  requestAnimationFrame(updateFlicker);
}

updateFlicker();

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('touchmove', (e) => {
  mouseX = e.touches[0].clientX;
  mouseY = e.touches[0].clientY;
});

// SOCIALS
const socialIcons = Array.from(document.querySelectorAll('.social svg')).slice(0, 3),
      instagram = socialIcons[0],
      twitter = socialIcons[1],
      facebook = socialIcons[2];
const answers = {
        first: "I don't have xy",
        second: "Don't have yz neither...",
        third: "You know what? Send me an email"
      }

let clickCount = 0;
let lastClickedIcon = null;
const platforms = ['Instagram', 'Twitter', 'Facebook'];
const social = document.querySelector('.social'),
      spanMessage = document.querySelector('.message'),
      mailIcon = document.querySelector('.social a');

socialIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    if (clickCount >= 3 || lastClickedIcon === icon) return;

    lastClickedIcon = icon;
    const keys = ['first', 'second', 'third'];
    const key = keys[clickCount];
    let message = answers[key];

    message = message.replace('xy', platforms[index]).replace('yz', platforms[index]);
    spanMessage.textContent = message;
    spanMessage.style.display = 'inline';
    clickCount++;
  });
});

document.addEventListener('click', (e) => {
  if (spanMessage.style.display === 'inline' && !social.contains(e.target)) {
    spanMessage.style.display = 'none';
  }
});

mailIcon.addEventListener('click', () => {
  spanMessage.style.display = 'none';
});