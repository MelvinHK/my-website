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
    for (const page in pages)
        pages[page].classList.remove('page-show'); // Remove page-show if it was added from previous call; pages are hidden by default.

    if (Object.keys(pages).includes(location.hash)) {
        titleWrapper.classList.add('title-top'); // Animate title to top of page
        contentContainer.style.top = "0%";
        html.style.overflowY = "auto";

        pages[location.hash].classList.add('page-show'); // Make matching page visible

        for (const page in pages)
            if (page != location.hash)
                pages[page].style.display = "none"; // Make other pages display = none, otherwise longer pages will cause overflow...
    } else {
        titleWrapper.style.transitionDuration = '1s';
        titleWrapper.classList.remove('title-top'); // Animate title center page
        contentContainer.style.top = "47%";
        html.style.overflowY = "hidden";

        for (const page in pages)
            pages[page].style.display = 'initial';
    }
}

function cancelAnimation() {
    titleWrapper.style.transitionDuration = '0s';
    titleContainer.style.animation = 'none';

    for (let i = 0; i < menuList.children.length; i++)
        menuList.children[i].style.animation = 'none';
}

// Cancel title intro animations if user refreshes/deep links hash page
if (Object.keys(pages).includes(location.hash)) {
    cancelAnimation();
}

checkHash();
window.onhashchange = checkHash;

const artThumbnails = document.getElementsByClassName("thumbnail");
const modal = document.getElementById("modal");
const thumbnailEnlarged = document.getElementById("thumbnail-enlarged");
const closeBtn = document.getElementById("close");

function enlargeThumbnail() {
    modal.style.display = "flex";
    thumbnailEnlarged.src = this.src;
}

for (var i = 0; i < artThumbnails.length; i++)
    artThumbnails[i].addEventListener('click', enlargeThumbnail, false);

closeBtn.onclick = function () {
    modal.style.display = "none";
};