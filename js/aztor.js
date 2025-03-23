const   aztorSection = document.getElementById('aztor'),
        aztor = document.querySelector('#aztor h4');

let blurStart, blurTotal;

const updateBlurPoints = () => {
    blurStart = aztorSection.offsetTop;
    blurTotal = aztorSection.clientHeight - window.innerHeight;
};

const blurProgress = () => {
    const currentBlur = Math.max(0, window.scrollY - blurStart);
    const blurPercentage = Math.min(100, (currentBlur * 100) / blurTotal);
    const opacityRatio = blurPercentage / 100;
    const blurRatio = (1 - (blurPercentage / 100)) * 10;

    aztor.style.opacity = opacityRatio;
    aztor.style.filter = `blur(${blurRatio}px)`;
};

updateBlurPoints();

window.addEventListener('scroll', () => {
    blurProgress();
});

window.addEventListener('resize', () => {
    updateBlurPoints();
    blurProgress();
});


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