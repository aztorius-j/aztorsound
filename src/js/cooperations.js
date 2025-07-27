const artistList = document.querySelector('#cooperations .artists-list');

import { artistsArray } from './artists.js';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

shuffleArray(artistsArray);

artistsArray.forEach((artist) => {
  let artistFrame = document.createElement('div');
  artistFrame.classList.add('artist');
  artistFrame.style.background = `url(${artist.poster}) 50% 50% / contain no-repeat`;

  let artistDescription = document.createElement('div');
  artistDescription.classList.add('artist-description');
  artistDescription.innerHTML = `<h5>${artist.name} <small>/${artist.type}/</small></h5>`;

  artistFrame.appendChild(artistDescription);
  artistList.appendChild(artistFrame);
});

// SCALE AND OPACITY LOGIC
const artistScroll = () => {
    const viewportCenter = window.innerWidth / 2;
    const artistElements = Array.from(document.querySelectorAll('.artist'));

    artistElements.forEach(artist => {
        const artistRect = artist.getBoundingClientRect();
        const artistCenter = artistRect.left + artistRect.width / 2;
        const distanceFromCenter = Math.abs(viewportCenter - artistCenter);
        const maxDistance = viewportCenter;
        const scale = Math.max(1, 1.04 - (distanceFromCenter / maxDistance) * 0.05);
        artist.style.transform = `scale(${scale})`;

        const opacity = Math.max(0, 1 - (distanceFromCenter / maxDistance));
        const description = artist.querySelector('.artist-description');
        description.style.opacity = opacity;
    });
};

window.addEventListener('scroll', artistScroll);