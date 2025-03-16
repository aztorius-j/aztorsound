const cooperationsSection = document.getElementById('cooperations'),
      cooperationsWrapper = document.querySelector('.cooperations-wrapper'),
      artistContainer = document.querySelector('.artists-container');

const artistsArray = [
    {
        name: 'NEFKUS',
        type: 'Creative Agency',
        poster: 'img/cooperations/nefkus.png'
    },
    {
        name: 'CUBE to CUBE',
        type: 'Creative Agency',
        poster: 'img/cooperations/cube.png'
    },
    {
        name: 'Anna Kvasnovska',
        type: 'Voice Actress',
        poster: 'img/cooperations/anna-kvasnovska.png'
    },
    {
        name: 'Bystrik',
        type: 'Singer, Band Leader',
        poster: 'img/cooperations/bystrik.jpg'
    },
    {
        name: 'Stolen Street',
        type: 'Indie Band',
        poster: 'img/cooperations/stolen-street.jpg'
    },
    {
        name: 'Ivan Zadrabaj',
        type: 'Pianist, Composer',
        poster: 'img/cooperations/ivan-zadrabaj.jpg'
    },
    {
        name: 'Ychabods',
        type: "Rock'n'roll Band",
        poster: 'img/cooperations/ychabods.jpeg'
    },
    {
        name: 'The Nosebleeds',
        type: 'Garage Rock Band',
        poster: 'img/cooperations/nosebleeds.jpeg'
    },
    {
        name: 'Lukas Pista',
        type: 'Singer, Actor',
        poster: 'img/cooperations/lukas-pista.jpeg'
    },
    {
        name: 'Triple Jump',
        type: 'Jazz Band',
        poster: 'img/cooperations/triple-jump.jpg'
    },
    {
        name: 'Hurooonky',
        type: 'Podcasters',
        poster: 'img/cooperations/hurooonky.jpeg'
    }
];

let startingPoint, totalProgress, sectionHeight;

artistsArray.forEach((artist) => {
    let artistFrame = document.createElement('div');
    artistFrame.classList.add('artist');
    artistFrame.style.background = `url(${artist.poster})50% 50% / contain no-repeat`;
    artistContainer.appendChild(artistFrame);
    let artistDescription = document.createElement('div');
    artistDescription.classList.add('artist-description');
    artistDescription.innerHTML = `<h5>${artist.name}</h5><h6>${artist.type}</h6>`;
    artistFrame.appendChild(artistDescription);
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

    const viewportCenter = window.innerWidth / 2;

    document.querySelectorAll('.artist').forEach(artist => {
        const artistRect = artist.getBoundingClientRect();
        const artistCenter = artistRect.left + artistRect.width / 2;
        const distanceFromCenter = Math.abs(viewportCenter - artistCenter);
        const maxDistance = viewportCenter;
        const scale = Math.max(0.8, 1 - (distanceFromCenter / maxDistance) * 0.2);
        artist.style.transform = `scale(${scale})`;

        const artistDescription = artist.querySelector('.artist-description');
        if (artistDescription) {
            artistDescription.style.opacity = Math.max(0, 1 - (distanceFromCenter / (viewportCenter * 0.5)));
        }
    });
};

window.addEventListener("scroll", artistScroll);
window.addEventListener("resize", () => {
    updateValues();
    artistScroll();
});

updateValues();
artistScroll();