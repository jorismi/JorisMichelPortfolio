/* TODO LIST */

/* TODO BONUS : implement a menu? */
/* TODO BONUS contact me section : Too many blank space below contact links from contactMe section */
/* TODO BONUS contact me section : Factorise the contactLinksMobile */
/* TODO BONUS : Check portfolio behavior when bad internet connection */
/* TODO BONUS Projects section : add multiple images */
/* TODO BONUS : add a photography gallery (Some picture in demo (carroussel?) and a link to the full gallery?)*/
/* TODO BONUS : add informations about this website (vanilla JS, firebase, SCSS) (during loading page?) */
/* TODO BONUS project section : make 1 button see code and 1 button see in action for project */
/* TODO BONUS Contact me section : Make better HTTP request with axios or promises rather than AJAX */
/* TODO BONUS Contact me section : double check the sanityzing process, exemple message I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" /> */
/* TODO BONUS loadingScreen : make a better loading screen; */
/* TODO BONUS : Clean media query (find best practice about it, where to position it) */
/* TODO BONUS : add a section Montreal vs Toulouse where we compare different metric fetched by API?? */

let loadingScreen = document.getElementById("loadingScreen");
let titleHeader = document.getElementById("titleHeader");
let scrollIndicator = document.getElementById("scrollIndicator");
let contactMeForm = document.getElementById("contactMeForm");
let contactMeSend = document.getElementById("contactMeSend");

var sanitizeHTML = function (str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};

window.onload = hideLoadingScreen;

function hideLoadingScreen() {
    loadingScreen.addEventListener("transitionend", function (event) {
        loadingScreen.style.display = "none";
    }, false);
    loadingScreen.style.opacity = 0;
}

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

window.addEventListener("scroll", function () {
    var value = window.scrollY;
    if (value > 300) {
        scrollIndicator.style.display = "none";
    }
    titleHeader.style.opacity = (100 - window.scrollY * 0.05) + "%";
    titleHeader.style.transform = "translateY(" + window.scrollY * 0.08 + "vh)";
});
