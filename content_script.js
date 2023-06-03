const digitalArt = document.getElementById('digital-art');
const programming = document.getElementById('programming');
const about = document.getElementById('about');
const html = document.documentElement;

function checkHash() {
    html.style.setProperty('align-items', 'center');
    digitalArt.style.setProperty('display', 'none');
    programming.style.setProperty('display', 'none');
    about.style.setProperty('display', 'none');

    if (location.hash === '#digital_art' || location.hash === '#programming' || location.hash === '#about') {
        html.style.setProperty('align-items', 'initial');
        switch (location.hash) {
            case '#digital_art':
                digitalArt.style.setProperty('display', 'initial');
                break;
            case '#programming':
                programming.style.setProperty('display', 'initial');
                break;
            case '#about':
                about.style.setProperty('display', 'initial');
                break;
        }
    }
}

checkHash();

window.onhashchange = checkHash;