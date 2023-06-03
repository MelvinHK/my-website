const digitalArt = document.getElementById('digital-art');
const programming = document.getElementById('programming');
const about = document.getElementById('about');
const titleWrapper = document.getElementById('title-wrapper');

function checkHash() {
    digitalArt.style.display = "none";
    programming.style.display = "none";
    about.style.display = "none";

    if (location.hash === '#digital_art' || location.hash === '#programming' || location.hash === '#about') {
        titleWrapper.style.top = "0%";
        titleWrapper.style.left = "50%";
        titleWrapper.style.transform = "translate(-50%, -0%)";
        switch (location.hash) {
            case '#digital_art':
                digitalArt.style.display = "initial";
                break;
            case '#programming':
                programming.style.display = "initial";
                break;
            case '#about':
                about.style.display = "initial";
                break;
        }
    } else if (location.hash === "") {
        titleWrapper.style.top = "50%";
        titleWrapper.style.left = "50%";
        titleWrapper.style.transform = "translate(-50%, -50%)";
    }
}

checkHash();

window.onhashchange = checkHash;