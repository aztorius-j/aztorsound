const artistsWrapper = document.querySelector('.artists-wrapper');
const artistsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

artistsArray.forEach((artist) => {
    let artistFrame = document.createElement('div');
    artistFrame.classList.add('artist');
    artistFrame.innerText = artist;
    artistsWrapper.appendChild(artistFrame);
});


