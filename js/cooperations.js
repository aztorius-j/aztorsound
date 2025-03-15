const   cooperationsSection = document.getElementById('cooperations'),   
        cooperationsWrapper = document.querySelector('.cooperations-wrapper'),
        fakeElement = Array.from(document.querySelectorAll('.fake-element')),
        artistContainer = document.querySelector('.artists-container'),
        artistsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

let     startingPoint,
        totalProgress = cooperationsSection.clientHeight;

artistsArray.forEach((artist) => {
    let artistFrame = document.createElement('div');
    artistFrame.classList.add('artist');
    artistFrame.innerText = artist;
    artistContainer.appendChild(artistFrame);
});

const updateValues = () => {
    startingPoint = cooperationsSection.getBoundingClientRect().top + window.scrollY;
    const fakeOffset = (window.innerWidth - 400) / 2;

fakeElement.forEach((element, index) => {
        element.style.width = `${fakeOffset}px`;
});

    artistScroll();
};

const artistScroll = () => {
    if (window.scrollY >= startingPoint) {
        let progress = window.scrollY - startingPoint;
        let progressPercentage = Math.min(progress / totalProgress, 0.87);

        const translateX = -progressPercentage * totalProgress;
        cooperationsWrapper.style.transform = `translateX(${translateX}px)`;
    }

    requestAnimationFrame(artistScroll);
};

window.addEventListener("resize", updateValues);
updateValues();
artistScroll();