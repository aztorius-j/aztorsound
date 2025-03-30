const   customerLines = Array.from(document.querySelectorAll('.customers-line')),
        secondLine = customerLines[1],
        thirdLine = customerLines[2],
        fourthLine = customerLines[3],
        customersWrapper = document.querySelector('.customers-wrapper');

let     secondPadding = 0,
        thirdPadding = 0;

function updateLinesPadding() {

    const fourthLineChildren = Array.from(fourthLine.children);
    const totalChildrenWidth = fourthLineChildren.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
    const totalPadding = customersWrapper.getBoundingClientRect().width - totalChildrenWidth - 32;

    secondPadding = totalPadding / 3;
    thirdPadding = totalPadding / 3 * 2;

    secondLine.style.paddingLeft = `${secondPadding}px`;
    thirdLine.style.paddingLeft = `${thirdPadding}px`;
}

window.addEventListener("DOMContentLoaded", updateLinesPadding);
window.addEventListener("resize", updateLinesPadding);
