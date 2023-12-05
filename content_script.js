const html = document.documentElement;

const titleWrapper = document.getElementById('title-wrapper');
const titleContainer = document.getElementById('title-container');
const menuList = document.getElementById('menu-list');

const contentContainer = document.getElementById('content-container');

const pages = { // Keys must match corresponding href in "menu-list" in index.html
    '#digital_art': {
        content: document.getElementById('digital-art'),
        title: "Digital Art"
    },
    '#programming': {
        content: document.getElementById('programming'),
        title: "Programming"
    },
    '#about': {
        content: document.getElementById('about'),
        title: "About"
    }
};

const artThumbnails = document.getElementsByClassName("thumbnail");
const modal = document.getElementById("modal");
const thumbnailEnlarged = document.getElementById("thumbnail-enlarged");
const closeBtn = document.getElementById("close");

function checkHash() {
    for (const page in pages) {
        if (page !== location.hash) {
            pages[page].content.classList.remove('page-show');
            pages[page].content.style.display = "none";
        } else {
            pages[page].content.classList.add('page-show');
        }
    };

    displayPage(Object.keys(pages).includes(location.hash));
}

function displayPage(isHashPage) {
    titleWrapper.classList.toggle('title-top', isHashPage);
    contentContainer.style.top = isHashPage ? '0%' : '47%';
    html.style.overflowY = isHashPage ? 'auto' : 'hidden';
    document.title = isHashPage ? `${pages[location.hash].title} - Melvin HK` : 'Melvin HK';

    if (!isHashPage) {
        titleWrapper.style.transitionDuration = '1s';
        for (const page in pages) {
            pages[page].content.style.display = "initial";
        }
    }
}

function cancelAnimation() {
    titleWrapper.style.transitionDuration = '0s';
    titleContainer.style.animation = 'none';

    Array.from(menuList.children).forEach(child => child.style.animation = 'none');
}

// Cancel title intro animations if user refreshes/deep links into hash page
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