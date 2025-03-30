const   customerLines = Array.from(document.querySelectorAll('.customers-line')),
        secondLine = customerLines[1],
        thirdLine = customerLines[2],
        customersWrapper = document.querySelector('.customers-wrapper');

function updateLinesPadding() {

    const wrapperWidth = customersWrapper.getBoundingClientRect().width;
    const viewportWidth = window.innerWidth;

    const maxWrapperWidth = parseFloat(getComputedStyle(customersWrapper).maxWidth) || 860;
    const minViewport = 600;

    const secondMaxPadding = 90;
    const thirdMaxPadding = 180;

    const range = maxWrapperWidth - minViewport;
    const progress = Math.max(0, Math.min((wrapperWidth - minViewport) / range, 1));

    const secondPadding = viewportWidth < minViewport ? 0 : progress * secondMaxPadding;
    const thirdPadding = viewportWidth < minViewport ? 0 : progress * thirdMaxPadding;

    secondLine.style.paddingLeft = `${secondPadding}px`;
    thirdLine.style.paddingLeft = `${thirdPadding}px`;
}

window.addEventListener("DOMContentLoaded", updateLinesPadding);
window.addEventListener("resize", updateLinesPadding);
