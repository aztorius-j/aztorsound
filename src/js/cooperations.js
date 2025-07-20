const cooperationsSection = document.getElementById('cooperations'),
      cooperationsWrapper = document.querySelector('.cooperations-wrapper'),
      artistContainer = document.querySelector('.artists-container');

import { artistsArray } from './artists.js';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

shuffleArray(artistsArray);

let startingPoint, totalProgress, sectionHeight;

artistsArray.forEach((artist) => {
    let artistFrame = document.createElement('div');
    artistFrame.classList.add('artist');
    artistFrame.style.background = `url(${artist.poster}) 50% 50% / contain no-repeat`;

    let artistDescription = document.createElement('div');
    artistDescription.classList.add('artist-description');
    artistDescription.innerHTML = `<h5>${artist.name} <small>/${artist.type}/</small></h5>`;

    artistFrame.appendChild(artistDescription);
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
    // WRAPPER MOVEMENT
    let progress = Math.max(0, window.scrollY - startingPoint);
    let progressPercentage = Math.min(progress / totalProgress, 1);
    const translateX = -progressPercentage * totalProgress;
    cooperationsWrapper.style.transform = `translateX(${translateX}px)`;

    const viewportCenter = window.innerWidth / 2;
    const artistElements = Array.from(document.querySelectorAll('.artist'));

    // SCALE LOGIC
    artistElements.forEach(artist => {
        const artistRect = artist.getBoundingClientRect();
        const artistCenter = artistRect.left + artistRect.width / 2;
        const distanceFromCenter = Math.abs(viewportCenter - artistCenter);
        const maxDistance = viewportCenter;
        const scale = Math.max(0.8, 1 - (distanceFromCenter / maxDistance) * 0.1);
        artist.style.transform = `scale(${scale})`;

        // OPACITY LOGIC
        const opacity = Math.max(0, 1 - (distanceFromCenter / maxDistance));
        const description = artist.querySelector('.artist-description');
        description.style.opacity = opacity;
    });
};

window.addEventListener("scroll", artistScroll);
window.addEventListener("resize", () => {
    updateValues();
    artistScroll();
});

updateValues();
artistScroll();