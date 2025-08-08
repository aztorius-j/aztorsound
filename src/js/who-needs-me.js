const clientsWrapper = document.querySelector('.clients-wrapper'),
      clientLines = Array.from(document.querySelectorAll('.clients-line')),
      clients = Array.from(document.querySelectorAll('.client')),
      secondLine = clientLines[1],
      thirdLine = clientLines[2],
      fourthLine = clientLines[3];

let   secondPadding = 0,
      thirdPadding = 0;

// SCROLL PROGRESS FROM LENIS-GSAP
let whoNeedsMeScrollProgress = 0;

document.addEventListener('who-needs-me-progress', event => {
  whoNeedsMeScrollProgress = event.detail.progress;
});

// BREAKPOINTS
const breakPoints = [1, 10, 19, 28, 37, 46, 55, 64, 73, 82, 91];

// UPDATE LINES PADDING
function updateLinesPadding() {
  if (window.innerWidth <= 624) {
    secondLine.style.paddingLeft = '0px';
    thirdLine.style.paddingLeft = '0px';
    return;
  }

  const fourthLineChildren = Array.from(fourthLine.children);
  const totalChildrenWidth = fourthLineChildren.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
  const totalPadding = clientsWrapper.getBoundingClientRect().width - totalChildrenWidth - 32;

  secondPadding = totalPadding / 3;
  thirdPadding = totalPadding / 3 * 2;

  secondLine.style.paddingLeft = `${secondPadding}px`;
  thirdLine.style.paddingLeft = `${thirdPadding}px`;
}

// HANDLE RESIZE AND POSITIONING
function handleResizeAndPositioning() {
  updateLinesPadding();
  clients.forEach(client => {
    client.style.transform = `translateX(${window.innerWidth}px)`;
  });
  clientAppear();
}

clients.forEach(client => {
  client.style.transform = `translateX(${window.innerWidth}px)`;
});

// CLIENT APPEAR
const clientAppear = () => {
  breakPoints.forEach((breakPoint, index) => {
    if (whoNeedsMeScrollProgress >= breakPoint && clients[index]) {
      clients[index].style.transform = 'translateX(0)';
      clients[index].style.opacity = '1';
    } else if (whoNeedsMeScrollProgress < breakPoint && clients[index]) {
      clients[index].style.transform = `translateX(${window.innerWidth}px)`;
      clients[index].style.opacity = '0';
    }
  });
}

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', handleResizeAndPositioning);
window.addEventListener('resize', handleResizeAndPositioning);
window.addEventListener('orientationchange', handleResizeAndPositioning);
window.addEventListener('scroll', clientAppear);