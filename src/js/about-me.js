const aboutContainer = document.querySelector('.about-container'),
      sectionTitleContainer = document.querySelector('#about .section-title-container'),
      aboutSection = document.getElementById('about');

let backgroundStart, backgroundTotal;

const updateDimensions = () => {
    backgroundStart = aboutSection.getBoundingClientRect().top + window.scrollY + sectionTitleContainer.clientHeight;
    backgroundTotal = aboutSection.clientHeight - window.innerHeight;
};

const updateBackgroundProgress = () => {
    const backgroundProgress = Math.max(0, window.scrollY - backgroundStart);
    const backgroundPercentage = Math.min(100, (backgroundProgress * 100) / backgroundTotal);

    aboutContainer.style.backgroundImage = `linear-gradient(to top, white ${backgroundPercentage}%, transparent ${backgroundPercentage}%)`;
};

window.addEventListener("scroll", updateBackgroundProgress);
window.addEventListener("resize", () => {
    updateDimensions();
    updateBackgroundProgress();
});

updateDimensions();
updateBackgroundProgress();
