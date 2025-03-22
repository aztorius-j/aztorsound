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

    console.log(backgroundPercentage);
    aboutContainer.style.backgroundImage = `linear-gradient(to top, white ${backgroundPercentage}%, black ${backgroundPercentage}%)`;
};

window.addEventListener("resize", updateDimensions);
window.addEventListener("scroll", updateBackgroundProgress);

updateDimensions();
updateBackgroundProgress();
