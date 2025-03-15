const cooperationsSection = document.getElementById('cooperations'),
      cooperationsWrapper = document.querySelector('.cooperations-wrapper'),
      artistContainer = document.querySelector('.artists-container'),
      artistsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

let startingPoint, totalProgress, sectionHeight;

artistsArray.forEach((artist) => {
    let artistFrame = document.createElement('div');
    artistFrame.classList.add('artist');
    artistFrame.innerText = artist;
    artistContainer.appendChild(artistFrame);
});

const updateValues = () => {
    const wrapperWidth = cooperationsWrapper.scrollWidth;
    const viewportHeight = window.innerHeight;

    startingPoint = cooperationsSection.getBoundingClientRect().top + window.scrollY;
    totalProgress = wrapperWidth - window.innerWidth;

    sectionHeight = viewportHeight + totalProgress;
    cooperationsSection.style.height = `${sectionHeight}px`;
};

const artistScroll = () => {
    let progress = Math.max(0, window.scrollY - startingPoint);
    let progressPercentage = Math.min(progress / totalProgress, 1);
    const translateX = -progressPercentage * totalProgress;
    cooperationsWrapper.style.transform = `translateX(${translateX}px)`;
};

window.addEventListener("scroll", artistScroll);
window.addEventListener("resize", updateValues);

updateValues();
artistScroll();