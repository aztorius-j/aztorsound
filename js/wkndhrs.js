const   wkndhrs = document.getElementById('wkndhrs'),
        smallText = document.querySelector('.small-text'),
        lines = Array.from(document.querySelectorAll('.line')),
        serviceItems = Array.from(document.querySelectorAll('.service-item'));

let     scrollPointOne = wkndhrs.previousElementSibling.offsetTop + wkndhrs.previousElementSibling.offsetHeight,
        scrollPointTwo = scrollPointOne + smallText.offsetTop + smallText.clientHeight * 0.8,
        scrollPointThree = scrollPointOne + wkndhrs.clientHeight,
        animationTriggered = false;

// SMALL TEXT INITIALIZATION
lines.forEach((line, index) => {
    const offset = (index ** 1.5) * 2;
    line.style.transform = `translateY(${offset}px)`;
});

// BIG TEXT INITIALIZATION
let startingOffsets = [
    window.innerWidth / 4 + 50,
    window.innerWidth / 4 + 150,
    window.innerWidth / 4 + 250,
    window.innerWidth / 4 + 370
];

let endingOffsets = [
    scrollPointThree - 250,
    scrollPointThree - 175,
    scrollPointThree - 100,
    scrollPointThree - 30
];

serviceItems.forEach((item, index) => {
    item.style.transform = `translateX(${startingOffsets[index]}px)`;
});

const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

// ANIMATIONS
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