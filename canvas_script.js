const canvas = document.getElementById("walk-path");
const ctx = canvas.getContext('2d');

const mekuWalkRight = new Image();
mekuWalkRight.src = "./images/mekuWalkSpriteSheetFlipped.png";
const mekuWalkLeft = new Image();
mekuWalkLeft.src = "./images/mekuWalkSpriteSheet.png";
const mekuIdle = new Image();
mekuIdle.src = "./images/mekuIdle.png";
const mekuIdleFlipped = new Image();
mekuIdleFlipped.src = "./images/mekuIdleFlipped.png";

let currentMeku = new Image();
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

    currentMeku = direction == 1 ? mekuWalkRight : direction == -1 ? mekuWalkLeft : currentMeku;

    ctx.drawImage(
        currentMeku,
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

const baseInterval = 1550;
let randomInterval = baseInterval;

function setRandomDirection() {
    const chance = Math.random();
    if (chance < 0.5) {
        currentMeku = direction == 1 ? mekuIdleFlipped : direction == -1 ? mekuIdle : currentMeku;
        direction = 0;
    } else
        direction = chance < 0.75 ? 1 : -1;
    randomInterval = baseInterval * (1 + chance);
}

setInterval(setRandomDirection, randomInterval);

draw();

