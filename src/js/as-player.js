// VARIABLES, CONSTANTS
const video = document.getElementById('video'),
      player = document.querySelector('.player'),
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

let   activeIndex = 0,
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
    visualInitialize(true);
    manualChange(true);
    return true;
  } catch (error) {
    visualInitialize(false);
    manualChange(false);
    player.style.backdropFilter = 'none';
    player.style.webkitBackdropFilter = 'none';
    return false;
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
  const success = await videoDataPromise;

  let newY = -newCategoryIndex * categoryWrapper.getBoundingClientRect().height;
  categoryWrapper.style.transform = `translateY(${newY}px)`;

  previousCategoryIndex = newCategoryIndex;
  video.pause();
  activeIndex = 0;

  if (!success) return;
  headingOne.textContent = videoData[previousCategoryIndex].category.split(" ")[0];
  headingTwo.textContent = videoData[previousCategoryIndex].category.split(" ")[1] || "";

  changeContent(previousCategoryIndex);
  startSlider();
}

// CHANGE CONTENT
function changeContent(previousCategoryIndex) {
  const movies = videoData[previousCategoryIndex].videos;

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
function visualInitialize(success) {
  if (!success) {
    posters.forEach((poster, index) => {
      let errorImage;
      if (index < 3) {
        errorImage = "/img/error1.webp";
      } else if (index < 6) {
        errorImage = "/img/error2.webp";
      } else {
        errorImage = "/img/error3.webp";
      }
      poster.style.background = `url('${errorImage}') 50% 50% / cover no-repeat`;
      poster.style.opacity = 1;
    });
    return;
  }
  const allVideos = videoData.flatMap(category => category.videos || []);
  posters.forEach((poster, index) => {
    poster.style.background = 'url(' + allVideos[index].poster + ') 50% 50% / cover no-repeat';
  });
}

// MANUAL CHANGE
function manualChange(success) {
  if (!success) return;
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

// PLAYER BUTTONS
playButton.addEventListener('click', () => {
  if (!video.src) return;
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

muteButton.addEventListener('click', () => {
  video.muted = !video.muted;
  
  if (video.muted) {
    muted();
  } else {
    soundOn();
  }
});

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

paused();
soundOn();