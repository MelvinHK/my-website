const canvas = document.getElementById("walk-path");
const ctx = canvas.getContext('2d');

const meku = new Image();
const mekuWidth = 40;
const mekuHeight = 82;

const shadow = new Image();
shadow.src = './images/mekuWalkShadow.png';
const shadowWidth = 104;
const shadowHeight = 13;

let spriteFrame = 0;
let gameFrame = 0;
let frameRate = 24;

let xPos = 0;
let direction = 1;
const leftOffset = 70; // offset meku to account for their shadow

const mekuLink = document.getElementById("meku-link");

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (direction == 1)
        meku.src = "./images/mekuWalkSpriteSheetFlipped.png";
    if (direction == -1)
        meku.src = "./images/mekuWalkSpriteSheet.png";

    ctx.drawImage(
        meku,
        direction == 0 ? 0 : spriteFrame * mekuWidth, 0, mekuWidth, mekuHeight, // sprite sheet cropping
        xPos + leftOffset, canvas.height - mekuHeight - 8, mekuWidth, mekuHeight // canvas position
    );
    ctx.drawImage(shadow, 0, 0, shadowWidth, shadowHeight, xPos, canvas.height - shadowHeight, shadowWidth, shadowHeight);

    if (direction != 0) {
        if (gameFrame % frameRate == 0)
            spriteFrame = spriteFrame < 5 ? spriteFrame + 1 : 0;

        if (xPos < leftOffset - shadowWidth + mekuWidth)
            direction = 1;
        if (xPos > canvas.width - leftOffset - mekuWidth)
            direction = -1;
        xPos += direction;
    }

    mekuLink.style.setProperty('left', `calc(50% + ${xPos - 185}px)`);

    gameFrame++;

    requestAnimationFrame(draw);
}

function setRandomDirection() {
    const chance = Math.random();
    if (chance < 0.5) {
        if (direction == 1)
            meku.src = "./images/mekuIdleFlipped.png";
        if (direction == -1)
            meku.src = "./images/mekuIdle.png";
        direction = 0;
    } else
        direction = chance < 0.75 ? 1 : -1;
}

setInterval(setRandomDirection, 2000);

draw();

