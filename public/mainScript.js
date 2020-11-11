let vsCodeLayer = document.getElementById("vsCodeLayer");
let sqlDevLayer = document.getElementById("sqlDevLayer");
let jenkinsLayer = document.getElementById("jenkinsLayer");
let kibanaLayer = document.getElementById("kibanaLayer");
let titleHeader = document.getElementById("titleHeader");
let scrollIndicator = document.getElementById("scrollIndicator");

let coefTranslateAnimationHeaderParallax = 0.1;
let coefFastTranslateAnimationHeaderParallax = 0.3;
let coefScaleAnimationHeaderParallax = 0.001;
let coefBlurAnimationHeaderParallax = 0.005;


window.addEventListener('resize', resizing, false);

function resizing() {
    titleHeaderAnimation();
}

function titleHeaderAnimation() {
    if (window.matchMedia("(min-width: 800px)").matches) {
        titleHeader.style.opacity = (100 - window.scrollY * 0.1) + "%";
    } else {
        titleHeader.style.opacity = (100 - window.scrollY * 0.2) + "%";
    }
}

window.addEventListener("scroll", function () {
    var value = window.scrollY;
    if (value > 300) {
        scrollIndicator.style.display = "none";
    }
    vsCodeLayer.style.transform = "translate(" + (-value * coefFastTranslateAnimationHeaderParallax) + "%," + (value * coefFastTranslateAnimationHeaderParallax) + "%) rotate(15deg) scale(" + (1 + value * coefScaleAnimationHeaderParallax) + ")";
    vsCodeLayer.style.filter = "blur(" + (value * coefBlurAnimationHeaderParallax) + "px)";

    sqlDevLayer.style.transform = "translate(" + (value * coefFastTranslateAnimationHeaderParallax) + "%," + (value * coefFastTranslateAnimationHeaderParallax) + "%) rotate(-15deg) scale(" + (1 + value * coefScaleAnimationHeaderParallax) + ")";
    sqlDevLayer.style.filter = "blur(" + (value * coefBlurAnimationHeaderParallax) + "px)";

    jenkinsLayer.style.transform = "translate(" + (-value * coefTranslateAnimationHeaderParallax) + "%," + (-value * coefTranslateAnimationHeaderParallax) + "%) rotate(-10deg) scale(" + (1 + value * coefScaleAnimationHeaderParallax) + ")";
    jenkinsLayer.style.filter = "blur(" + (value * coefBlurAnimationHeaderParallax) + "px)";

    kibanaLayer.style.transform = "translate(" + (value * coefTranslateAnimationHeaderParallax) + "%," + (-value * coefTranslateAnimationHeaderParallax) + "%) rotate(10deg) scale(" + (1 + value * coefScaleAnimationHeaderParallax) + ")";
    kibanaLayer.style.filter = "blur(" + (value * coefBlurAnimationHeaderParallax) + "px)";

    titleHeaderAnimation();
});
