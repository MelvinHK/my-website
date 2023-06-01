const canvas = document.getElementById("walk-path");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 550;
const CANVAS_HEIGHT = canvas.height = 90;

const mekuIdle = new Image();
mekuIdle.src = './images/mekuIdle.png';

const mekuWalkRight = new Image();
mekuWalkRight.src = './images/mekuWalkSpriteSheetFlipped.png';

const mekuWalkLeft = new Image();
mekuWalkLeft.src = './images/mekuWalkSpriteSheet.png';

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

function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.drawImage(
        direction == 0 ? mekuIdle : direction == 1 ? mekuWalkRight : mekuWalkLeft, // sprite image
        direction == 0 ? 0 : spriteFrame * mekuWidth, 0, mekuWidth, mekuHeight, // sprite sheet cropping coordinates
        xPos + leftOffset, CANVAS_HEIGHT - mekuHeight - 8, mekuWidth, mekuHeight // canvas position coordinates
    );
    ctx.drawImage(shadow, 0, 0, shadowWidth, shadowHeight, xPos, CANVAS_HEIGHT - shadowHeight, shadowWidth, shadowHeight);

    if (direction != 0) {
        if (gameFrame % frameRate == 0)
            spriteFrame = spriteFrame < 5 ? spriteFrame + 1 : 0;

        if (xPos < leftOffset - shadowWidth + mekuWidth)
            direction = 1;
        if (xPos > CANVAS_WIDTH - leftOffset - mekuWidth)
            direction = -1;
        xPos += direction;
    }

    gameFrame++;

    requestAnimationFrame(draw);
}

function setRandomDirection() {
    const chance = Math.random();
    if (chance < 0.5) {
        mekuIdle.src = direction == 1 ? "./images/mekuIdleFlipped.png" : direction == -1 ? "./images/mekuIdle.png" : mekuIdle.src;
        direction = 0;
    } else
        direction = chance < 0.75 ? 1 : -1;
}

setInterval(setRandomDirection, 2000);

draw();

