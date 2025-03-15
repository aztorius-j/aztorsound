const   cooperationsSection = document.getElementById('cooperations'),   
        cooperationsWrapper = document.querySelector('.cooperations-wrapper'),
        artistContainer = document.querySelector('.artists-container'),
        artistsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

let     startingPoint,
        totalProgress;

artistsArray.forEach((artist) => {
    let artistFrame = document.createElement('div');
    artistFrame.classList.add('artist');
    artistFrame.innerText = artist;
    artistContainer.appendChild(artistFrame);
});

const updateValues = () => {
    startingPoint = cooperationsSection.getBoundingClientRect().top + window.scrollY;
    totalProgress = cooperationsWrapper.scrollWidth - window.innerWidth;
    artistScroll();
};

const artistScroll = () => {
    if (window.scrollY >= startingPoint) {
        let progress = window.scrollY - startingPoint;
        let progressPercentage = Math.min(progress / totalProgress, 1);
        const translateX = -progressPercentage * totalProgress;
        cooperationsWrapper.style.transform = `translateX(${translateX}px)`;
    }

    requestAnimationFrame(artistScroll);
};

window.addEventListener("resize", updateValues);
updateValues();
artistScroll();