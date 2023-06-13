const html = document.documentElement;

const titleWrapper = document.getElementById('title-wrapper');
const titleContainer = document.getElementById('title-container');
const menuList = document.getElementById('menu-list');

const contentContainer = document.getElementById('content-container');

const pages = { // Keys must match corresponding href in index.html
    '#digital_art': document.getElementById('digital-art'),
    '#programming': document.getElementById('programming'),
    '#about': document.getElementById('about')
};

function checkHash() {
    for (const page in pages) {
        pages[page].classList.remove('page-show');
        pages[page].classList.add('page-hidden');
    }

    if (Object.keys(pages).includes(location.hash)) {
        titleWrapper.classList.add('title-top');
        contentContainer.style.top = "0%";
        html.style.overflowY = "auto";

        pages[location.hash].classList.add('page-show');

        for (const page in pages)
            if (page != location.hash)
                pages[page].style.display = "none";
    } else {
        titleWrapper.style.transitionDuration = '1s';
        titleWrapper.classList.remove('title-top');
        contentContainer.style.top = "47%";
        html.style.overflowY = "hidden";

        for (const page in pages)
            pages[page].style.display = 'initial';
    }
}

function cancelAnimation() {
    titleContainer.style.animation = 'none';
    titleWrapper.style.transitionDuration = '0s';

    for (let i = 0; i < menuList.children.length; i++)
        menuList.children[i].style.animation = 'none';
}

// Cancel title intro animations if user refreshes/deep links hash page
if (Object.keys(pages).includes(location.hash)) {
    cancelAnimation();
}

checkHash();

window.onhashchange = checkHash;