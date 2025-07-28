const fromNowhereSection = document.getElementById('from-nowhere'),
      smallText = document.querySelector('.small-text'),
      lines = Array.from(document.querySelectorAll('.line')),
      serviceItems = Array.from(document.querySelectorAll('.service-item'));

let scrollPointOne, scrollPointTwo, scrollPointThree, animationTriggered = false;
let endingOffsets = [];
let startingOffsets = [];

const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

const updateScrollPoints = () => {
    scrollPointOne = fromNowhereSection.previousElementSibling.offsetTop + fromNowhereSection.previousElementSibling.offsetHeight;
    scrollPointTwo = scrollPointOne + smallText.offsetTop + smallText.clientHeight * 0.8;
    scrollPointThree = scrollPointOne + fromNowhereSection.clientHeight;

    endingOffsets = [
        scrollPointThree - 250,
        scrollPointThree - 175,
        scrollPointThree - 100,
        scrollPointThree - 30
    ];

    startingOffsets = [
        window.innerWidth / 4 + 50,
        window.innerWidth / 4 + 150,
        window.innerWidth / 4 + 250,
        window.innerWidth / 4 + 370
    ];

    initializeServiceItems();
};

const initializeServiceItems = () => {
    const scrollBottom = window.scrollY + window.innerHeight;

    serviceItems.forEach((item, index) => {
        let progress = (scrollBottom - scrollPointOne) / (endingOffsets[index] - scrollPointOne);
        progress = Math.min(Math.max(progress, 0), 1);
        let easedProgress = easeInOutQuad(progress);
        let currentOffset = startingOffsets[index] * (1 - easedProgress);
        item.style.transform = `translateX(${currentOffset}px)`;
    });
};

const initializeSmallText = () => {
    lines.forEach((line, index) => {
        const offset = (index ** 1.4) * 2;
        line.style.transform = `translateY(${offset}px)`;
    });
};

window.addEventListener("resize", updateScrollPoints);
updateScrollPoints();
initializeServiceItems();
initializeSmallText();

const triggerAnimation = () => {
    const scrollBottom = window.scrollY + window.innerHeight;

    if (scrollBottom >= scrollPointTwo && !animationTriggered) {
        animationTriggered = true;
        document.documentElement.style.setProperty("--scale-value", 0);

        lines.forEach((line, i) => {
            setTimeout(() => {
                line.style.transform = `translateY(0)`;
            }, i * 25);
        });
    } else if (scrollBottom < scrollPointOne && animationTriggered) {
        animationTriggered = false;
        
        lines.forEach((line, index) => {
            const offset = (index ** 1.4) * 2;
            line.style.transform = `translateY(${offset}px)`;
        });

        document.documentElement.style.removeProperty("--scale-value");
    }

    serviceItems.forEach((item, index) => {
        if (scrollBottom >= scrollPointOne && scrollBottom <= endingOffsets[index]) {
            let progress = (scrollBottom - scrollPointOne) / (endingOffsets[index] - scrollPointOne);
            progress = Math.min(progress, 1);
            let easedProgress = easeInOutQuad(progress);
            let currentOffset = startingOffsets[index] * (1 - easedProgress);
            item.style.transform = `translateX(${currentOffset}px)`;
        }
    });
};

window.addEventListener("scroll", triggerAnimation);








// *** FROM NOWHERE section ***
const serviceItems = document.querySelectorAll('.service-item');
const fromNowhereSection = document.getElementById('from-nowhere');

let startingOffsets = [];

const updateScrollPoints = () => {
    startingOffsets = [
        window.innerWidth / 4 + 50,
        window.innerWidth / 4 + 150,
        window.innerWidth / 4 + 250,
        window.innerWidth / 4 + 370
    ];

    initializeServiceItems();
};

const initializeServiceItems = () => {
    serviceItems.forEach((item, index) => {
        item.style.transform = `translateX(${startingOffsets[index]}px)`;
    });
};



updateScrollPoints();
initializeServiceItems();
window.addEventListener("resize", updateScrollPoints);



ScrollTrigger.create({
  trigger: fromNowhereSection,
  start: 'top bottom',
  onEnter: () => {

    const endOffsets = ['top center', 'top+=22% center', 'top+=44% center', 'top+=54% center'];

    serviceItems.forEach((item, i) => {
      gsap.to(item, {
        x: 0,
        ease: 'sine.out',
        scrollTrigger: {
          trigger: fromNowhereSection,
          start: 'top bottom',
          end: endOffsets[i],
          scrub: true
        }
      });
    });

  }
});
