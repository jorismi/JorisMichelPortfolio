

let bg = document.getElementById("bg");
let moon = document.getElementById("moon");
let mountain = document.getElementById("mountain");
let road = document.getElementById("road");
let title = document.getElementById("title");

window.addEventListener("scroll", function(){
    var value = window.scrollY;
    bg.style.top = value * 0.25 + "px";
    moon.style.left = -value * 0.25 + "px";
    mountain.style.top = -value * 0.10 + "px";
    road.style.top = value * 0.10 + "px";
    title.style.top = value * 0.75 + "px";
});