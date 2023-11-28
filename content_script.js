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

const artThumbnails = document.getElementsByClassName("thumbnail");
const modal = document.getElementById("modal");
const thumbnailEnlarged = document.getElementById("thumbnail-enlarged");
const closeBtn = document.getElementById("close");

function checkHash() {
    for (const page in pages) {
        pages[page].classList.remove('page-show');

        if (page !== location.hash) {
            pages[page].style.display = "none";
        }
    }

    displayPage(Object.keys(pages).includes(location.hash));
}

function displayPage(isHashPage) {
    titleWrapper.classList.toggle('title-top', isHashPage);
    contentContainer.style.top = isHashPage ? '0%' : '47%';
    html.style.overflowY = isHashPage ? 'auto' : 'hidden';

    if (isHashPage) {
        document.title = `${hashToDocumentTitle(location.hash)} - Melvin HK`;
        pages[location.hash].classList.add('page-show');
    } else { // Default to title screen
        titleWrapper.style.transitionDuration = '1s';
        document.title = 'Melvin HK';
        for (const page in pages) {
            pages[page].style.display = "initial";
        }
    }
}

function hashToDocumentTitle(hash) {
    switch (hash) {
        case "#digital_art":
            return "Digital Art";
        case "#programming":
            return "Programming";
        case "#about":
            return "About";
    }
}

function cancelAnimation() {
    titleWrapper.style.transitionDuration = '0s';
    titleContainer.style.animation = 'none';

    Array.from(menuList.children).forEach(child => child.style.animation = 'none');
}

// Cancel title intro animations if user refreshes/deep links hash page
if (Object.keys(pages).includes(location.hash)) {
    cancelAnimation();
}

checkHash();
window.onhashchange = checkHash;

function enlargeThumbnail() {
    modal.style.display = "flex";
    thumbnailEnlarged.src = this.src;
}

Array.from(artThumbnails).forEach(thumbnail => thumbnail.addEventListener('click', enlargeThumbnail));

closeBtn.onclick = () => { modal.style.display = "none"; };