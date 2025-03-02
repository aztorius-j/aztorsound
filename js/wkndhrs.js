const   wkndhrs = document.getElementById('wkndhrs'),
        smallText = document.querySelector('.small-text');
        lines = Array.from(document.querySelectorAll('.line'));

let     scrollStartingPoint = wkndhrs.previousElementSibling.offsetHeight + (smallText.clientHeight / 2);
let     backwardScrollingPoint = wkndhrs.previousElementSibling.offsetHeight + (smallText.clientHeight);
let     animationTriggered = false;

lines.forEach((line, index) => {
    const offset = Math.pow(index, 1.5) * 2;
    line.style.transform = `translateY(${offset}px)`;
});

const triggerAnimation = () => {
    const scrollTop = window.scrollY + window.innerHeight;

    if (scrollTop >= scrollStartingPoint && !animationTriggered) {
        animationTriggered = true;
        document.documentElement.style.setProperty("--scale-value", 0);
        lines.forEach((line, i) => {
            setTimeout(() => {
                line.style.transform = `translateY(0)`;
            }, i * 25);
        });
    }
};

window.addEventListener("scroll", triggerAnimation);