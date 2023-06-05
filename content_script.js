const digitalArt = document.getElementById('digital-art');
const programming = document.getElementById('programming');
const about = document.getElementById('about');
const titleWrapper = document.getElementById('title-wrapper');
const contentContainer = document.getElementById('content-container');
const html = document.documentElement;

function checkHash() {
    digitalArt.style.opacity = "0";
    programming.style.opacity = "0";
    about.style.opacity = "0";
    html.style.overflowY = "hidden";

    if (location.hash === '#digital_art' || location.hash === '#programming' || location.hash === '#about') {
        window.scrollTo(0, 0);
        titleWrapper.style.top = "0%";
        titleWrapper.style.left = "50%";
        titleWrapper.style.transform = "translate(-50%, -0%)";
        titleWrapper.style.transform += "scale(0.75)";
        contentContainer.style.top = "0%";
        html.style.overflowY = "auto";
        switch (location.hash) {
            case '#digital_art':
                digitalArt.style.opacity = "1";
                break;
            case '#programming':
                programming.style.opacity = "1";
                break;
            case '#about':
                about.style.opacity = "1";
                break;
        }
    } else if (location.hash === "") {
        titleWrapper.style.top = "50%";
        titleWrapper.style.left = "50%";
        titleWrapper.style.transform = "translate(-50%, -50%)";
        contentContainer.style.top = "47%";
    }
}

checkHash();

window.onhashchange = checkHash;