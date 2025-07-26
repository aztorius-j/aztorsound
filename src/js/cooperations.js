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