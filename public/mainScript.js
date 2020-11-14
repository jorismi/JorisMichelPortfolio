/* TODO LIST */
/* TODO Contact section : Make emailing working (POST request to nodeJS)

/* TODO BONUS : Make aboutMe and Project card appear and dissapear behind sections
/* TODO BONUS : Check portfolio behavior when bad internet connection */
/* TODO BONUS Projects section : add multiple images */
/* TODO BONUS : add a photography gallery */
/* TODO BONUS : add informations about this website (vanilla JS, firebase, SCSS) */


let vsCodeLayer = document.getElementById("vsCodeLayer");
let sqlDevLayer = document.getElementById("sqlDevLayer");
let jenkinsLayer = document.getElementById("jenkinsLayer");
let kibanaLayer = document.getElementById("kibanaLayer");
let titleHeader = document.getElementById("titleHeader");
let scrollIndicator = document.getElementById("scrollIndicator");

let coefTranslateAnimationHeaderParallax = 0.1;
let coefFastTranslateAnimationHeaderParallax = 0.3;
let coefScaleAnimationHeaderParallax = 0.002;
let coefBlurAnimationHeaderParallax = 0.005;


//window.addEventListener('resize', resizing, false);

/*function resizing() {
    titleHeaderAnimation();
}*/


let contactMeForm = document.getElementById("contactMeForm");

const formEvent = contactMeForm.addEventListener('submit', async event => {
    event.preventDefault();

    let contactMeName = document.getElementById("contactMeName").value;
    let contactMeMail = document.getElementById("contactMeMail").value;
    let contactMeSubject = document.getElementById("contactMeSubject").value;
    let contactMeMessage = document.getElementById("contactMeMessage").value;


    const contactMeFormData = {
        contactMeName,
        contactMeMail,
        contactMeSubject,
        contactMeMessage
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://us-central1-jorismichelportfolio.cloudfunctions.net/emailSender", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log("TUTU!!");
    xhr.send(JSON.stringify({
        name: "contactMeName",
        email: "contactMeMail",
        subject: "contactMeSubject",
        message: "contactMeMessage"
    }));
    xhr.onload = function () {
        var data = JSON.parse(this.responseText);
        console.log("retour reçu!");
        console.log(data);
    };
    //const sendedMail = await sendMail(contactMeFormData);
    //addTodosToDOM(addedTodo);
});

/*function sendMail() {
    console.log("TOTO");

    //http://localhost:5001/jorismichelportfolio/us-central1/emailSender
    axios.post('http://localhost:5001/jorismichelportfolio/us-central1/emailSender', {
        firstName: 'Finn',
        lastName: 'Williams'
    }).then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    });
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
