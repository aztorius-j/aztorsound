const   whoNeedsMeSection = document.getElementById('who-needs-me'),
        customersWrapper = document.querySelector('.customers-wrapper'),
        customerLines = Array.from(document.querySelectorAll('.customers-line')),
        customers = Array.from(document.querySelectorAll('.customer')),
        secondLine = customerLines[1],
        thirdLine = customerLines[2],
        fourthLine = customerLines[3];

let     secondPadding = 0,
        thirdPadding = 0,
        needsMeStart,
        needsMeTotal;

const   bearkPoints = [
    1.0,
    10.1,
    19.2,
    28.3,
    37.4,
    46.5,
    55.6,
    64.7,
    73.8,
    82.9,
    92.0
];

function updateScrollMetrics() {
    needsMeStart = whoNeedsMeSection.offsetTop;
    needsMeTotal = whoNeedsMeSection.getBoundingClientRect().height - window.innerHeight;
}

function updateLinesPadding() {
    if (window.innerWidth < 600 && window.innerHeight > 600) {
        secondLine.style.paddingLeft = '0px';
        thirdLine.style.paddingLeft = '0px';
        return;
    }

    const fourthLineChildren = Array.from(fourthLine.children);
    const totalChildrenWidth = fourthLineChildren.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
    const totalPadding = customersWrapper.getBoundingClientRect().width - totalChildrenWidth - 32;

    secondPadding = totalPadding / 3;
    thirdPadding = totalPadding / 3 * 2;

    secondLine.style.paddingLeft = `${secondPadding}px`;
    thirdLine.style.paddingLeft = `${thirdPadding}px`;
}

function handleResizeAndPositioning() {
    updateScrollMetrics();
    updateLinesPadding();
    customers.forEach(customer => {
        customer.style.transform = `translateX(${window.innerWidth}px)`;
    });
    customerAppear();
}

window.addEventListener("DOMContentLoaded", handleResizeAndPositioning);
window.addEventListener("resize", handleResizeAndPositioning);
window.addEventListener("orientationchange", handleResizeAndPositioning);

customers.forEach(customer => {
    customer.style.transform = `translateX(${window.innerWidth}px)`;
});

const customerAppear = () => {
    const currentTranslate = Math.max(0, window.scrollY - needsMeStart);
    const translatePerc = Math.min(100, (currentTranslate * 100) / needsMeTotal);
    
    bearkPoints.forEach((breakPoint, index) => {
        if (translatePerc >= breakPoint && customers[index]) {
            customers[index].style.transform = 'translateX(0)';
            customers[index].style.opacity = '1';
        } else if (translatePerc < breakPoint && customers[index]) {
            customers[index].style.transform = `translateX(${window.innerWidth}px)`;
            customers[index].style.opacity = '0';
        }
    });
}

window.addEventListener('scroll', customerAppear);