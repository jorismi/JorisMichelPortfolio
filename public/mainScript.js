/* TODO LIST */
/* TODO contactMe section: make OAuth2 authentification for sending mail. 

/* TODO BONUS : Make aboutMe and Project card appear and dissapear behind sections
/* TODO BONUS : Check portfolio behavior when bad internet connection */
/* TODO BONUS Projects section : add multiple images */
/* TODO BONUS : add a photography gallery */
/* TODO BONUS : add informations about this website (vanilla JS, firebase, SCSS) */
/* TODO BONUS project section : make 1 button see code and 1 button see in action for project */
/* TODO Contact me section : Make better HTTP request with axios or promises rather than AJAX
/* TODO Contact me section : double check the sanityzing process, exemple message I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" /> */

let vsCodeLayer = document.getElementById("vsCodeLayer");
let sqlDevLayer = document.getElementById("sqlDevLayer");
let jenkinsLayer = document.getElementById("jenkinsLayer");
let kibanaLayer = document.getElementById("kibanaLayer");
let titleHeader = document.getElementById("titleHeader");
let scrollIndicator = document.getElementById("scrollIndicator");
let contactMeForm = document.getElementById("contactMeForm");
let contactMeSend = document.getElementById("contactMeSend");

let coefTranslateAnimationHeaderParallax = 0.1;
let coefFastTranslateAnimationHeaderParallax = 0.3;
let coefScaleAnimationHeaderParallax = 0.002;
let coefBlurAnimationHeaderParallax = 0.005;


var sanitizeHTML = function (str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};

const formEvent = contactMeForm.addEventListener('submit', async event => {
    event.preventDefault();

    contactMeSend.value = "In progress...";
    contactMeSend.disabled = true;
    contactMeSend.style.cursor = "wait";
    contactMeSend.style.background = "#E86826";

    let contactMeName = document.getElementById("contactMeName").value;
    let contactMeMail = document.getElementById("contactMeMail").value;
    let contactMeSubject = document.getElementById("contactMeSubject").value;
    let contactMeMessage = document.getElementById("contactMeMessage").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/emailSender", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onloadend = function () {
        //console.log('return status sending mail function : ', xhr.status);
        contactMeSend.style.cursor = "default";
        if (xhr.status == "200") {
            contactMeSend.style.background = "green";
            contactMeSend.value = "Thanks for your message";
        } else {
            contactMeSend.style.background = "red";
            contactMeSend.value = "Error, please try again";
        }
        myVar = setTimeout(resetSendingButton, 5000);
    }
    xhr.send(JSON.stringify({
        name: sanitizeHTML(contactMeName),
        email: sanitizeHTML(contactMeMail),
        subject: sanitizeHTML(contactMeSubject),
        message: sanitizeHTML(contactMeMessage)
    }));
});

function resetSendingButton() {
    contactMeSend.style.background = "#168ED1";
    contactMeSend.value = "SEND MAIL";
    contactMeSend.disabled = false;
    contactMeSend.style.cursor = "pointer";
}
//window.addEventListener('resize', resizing, false);

/*function resizing() {
    titleHeaderAnimation();
}*/

function titleHeaderAnimation() {
    //if (window.matchMedia("(min-width: 800px)").matches) {
    //titleHeader.style.opacity = (100 - window.scrollY * 0.05) + "%";
    //titleHeader.style.transform = "translateY("+window.scrollY * 0.08+"vh)";
    //} else {
    //titleHeader.style.opacity = (100 - window.scrollY * 0.2) + "%";
    //titleHeader.style.transform = "translateY("+window.scrollY * 0.08+"vh)";
    //}
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

    titleHeader.style.opacity = (100 - window.scrollY * 0.05) + "%";
    titleHeader.style.transform = "translateY(" + window.scrollY * 0.08 + "vh)";

    //titleHeaderAnimation();
});
