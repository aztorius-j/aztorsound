// VARIABLES, CONSTANTS
const video = document.getElementById('video'),
      headingOne = document.querySelector('.heading-one'),
      headingTwo = document.querySelector('.heading-two'),
      title = document.querySelector('h2'),
      muteButton = document.querySelector('.mute-button'),
      playButton = document.querySelector('.play-button'),
      volumeOn = Array.from(document.querySelectorAll('.volume')),
      volumeOff = document.querySelector('.volume-mute'),
      forward = document.querySelector('.forward'),
      backward = document.querySelector('.backward'),
      youtubeLink = document.querySelector('.ytb-link a'),
      posters = Array.from(document.querySelectorAll('.poster')),
      sliderButtons = Array.from(document.querySelectorAll('.circle')),
      playIcon = document.querySelector('.play-icon'),
      pauseIcon = document.querySelector('.pause-icon'),
      categoryWrapper = document.querySelector('.category-wrapper');

let   firstMovie, secondMovie, thirdMovie,
      activeIndex = 0,
      previousCategoryIndex = -1,
      sliderTimeout,
      videoData = [];

// FETCH MOVIES
let videoDataPromise = fetchMovies();

async function fetchMovies() {
  try {
    const response = await fetch('/portfolio.json');
    const data = await response.json();
    videoData = data;
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
}

// SCROLL PROGRESS FROM LENIS-GSAP
let categoryScrollProgress = 0;

document.addEventListener('as-player-progress', event => {
  categoryScrollProgress = event.detail.progress;
});

// PROGRESS BAR UPDATE
document.addEventListener('DOMContentLoaded', () => {
  const scrollbars = document.querySelectorAll('.scrollbar');

  const updateProgressBar = () => {
    let newCategoryIndex = 0;

    if (categoryScrollProgress > 33.33 && categoryScrollProgress <= 66.66) {
      newCategoryIndex = 1;
    } else if (categoryScrollProgress > 66.66) {
      newCategoryIndex = 2;
    }

    updateScrollbars();
    changeCategory(newCategoryIndex);
  };

  const updateScrollbars = () => {
    scrollbars.forEach((scrollbar, index) => {
      let start = index * 33.33;
      let end = (index + 1) * 33.33;

      if (categoryScrollProgress >= end) {
        scrollbar.style.backgroundSize = "100% 100%";
      } else if (categoryScrollProgress > start) {
        let fillAmount = ((categoryScrollProgress - start) / (end - start)) * 100;
        scrollbar.style.backgroundSize = `${fillAmount}% 100%`;
      } else {
        scrollbar.style.backgroundSize = "0% 100%";
      }
    });
  };

  window.addEventListener("scroll", () => {
    updateProgressBar();
  });
});

// CHANGE CATEGORY
async function changeCategory(newCategoryIndex) {
  if (newCategoryIndex === previousCategoryIndex) return;

  await videoDataPromise;

  let newY = -newCategoryIndex * categoryWrapper.getBoundingClientRect().height;
  categoryWrapper.style.transform = `translateY(${newY}px)`;

  previousCategoryIndex = newCategoryIndex;
  video.pause();
  activeIndex = 0;

  firstMovie = videoData[previousCategoryIndex].videos[0];
  secondMovie = videoData[previousCategoryIndex].videos[1];
  thirdMovie = videoData[previousCategoryIndex].videos[2];

  headingOne.innerText = videoData[previousCategoryIndex].category.split(" ")[0];
  headingTwo.innerText = videoData[previousCategoryIndex].category.split(" ")[1] || "";

  changeContent(previousCategoryIndex);
  startSlider();
}

// CHANGE CONTENT
function changeContent(previousCategoryIndex) {
  const movies = [firstMovie, secondMovie, thirdMovie];

  posters.forEach((poster, index) => {
    const categoryStartIndex = previousCategoryIndex * 3;
    const localIndex = index - categoryStartIndex;
    const isInCurrentCategory = index >= categoryStartIndex && index < categoryStartIndex + 3;
    const isActive = index >= categoryStartIndex && index < categoryStartIndex + 3 && localIndex === activeIndex;

    poster.style.opacity = isActive ? 1 : (isInCurrentCategory ? 0 : 1);
    poster.style.zIndex = isActive ? 2 : (isInCurrentCategory ? 1 : poster.style.zIndex);
  });

  video.style.visibility = 'hidden';
  paused();
  video.pause();
  video.src = movies[activeIndex].source;
  video.load();
  title.textContent = movies[activeIndex].title;

  sliderButtons.forEach(slide => slide.classList.remove('full'));
  sliderButtons[activeIndex].classList.add('full');

  youtubeLink.setAttribute('href', movies[activeIndex].youtube);
}

// START SLIDER
function startSlider() {
  clearTimeout(sliderTimeout);
  function slide() {
    activeIndex = (activeIndex + 1) % 3;
    changeContent(previousCategoryIndex);
    sliderTimeout = setTimeout(slide, 4000);
  }
  sliderTimeout = setTimeout(slide, 4000);
}

// DEBOUNCE
function debounce(func, delay) {
  let debounceTimer;
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}

// ADJUST CATEGORY POSITION
const adjustCategoryPosition = debounce(() => {
  if (previousCategoryIndex === -1) return;
  let newY = -previousCategoryIndex * categoryWrapper.getBoundingClientRect().height;
  categoryWrapper.style.transform = `translateY(${newY}px)`;
}, 200);

window.addEventListener("resize", adjustCategoryPosition);

// VISUAL INITIALIZE
async function visualInitialize() {
  await videoDataPromise;
  const allVideos = videoData.flatMap(category => category.videos);
  posters.forEach((poster, index) => {
    poster.style.background = `url(${allVideos[index].poster}) 50% 50% / cover no-repeat`;
  });
}

// MANUAL CHANGE
function manualChange() {
  sliderButtons.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      if (index !== activeIndex) {               
        activeIndex = index;
        changeContent(previousCategoryIndex);
        startSlider();
      }
    });
  });
  forward.addEventListener('click', () => {     
    activeIndex = activeIndex < 2 ? activeIndex + 1 : 0;
    changeContent(previousCategoryIndex);
    startSlider();
  });
  backward.addEventListener('click', () => {      
    activeIndex = activeIndex === 0 ? 2 : activeIndex - 1;
    changeContent(previousCategoryIndex);
    startSlider();
  });
}

// PLAY
playButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playing();
    clearTimeout(sliderTimeout);
    video.style.visibility = 'visible';
  }
  else {
    video.pause();
    paused();
  }
});

youtubeLink.addEventListener('click', () => {
  if (!video.paused && !video.ended) {
    video.pause();
    paused();
  }
});

video.addEventListener('ended', () => {
  paused();
  startSlider();
});

// MUTE
muteButton.addEventListener('click', () => {
  video.muted = !video.muted;
  
  if (video.muted) {
    muted();
  } else {
    soundOn();
  }
});

// PLAYER ICONS CHANGE
function playing() {
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline';
}

function paused() {
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
}

function muted() {
  volumeOn.forEach((volume) => {
    volume.style.display = 'none';
  });
  volumeOff.style.display = 'inline';
}

function soundOn() {
  volumeOn.forEach((volume) => {
    volume.style.display = 'inline';
  });
  volumeOff.style.display = 'none';
}

// FUNCTION CALLS
visualInitialize();
manualChange();
paused();
soundOn();