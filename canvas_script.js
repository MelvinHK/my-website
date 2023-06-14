const canvas = document.getElementById("walk-path");
const ctx = canvas.getContext('2d');

const mekuSprite = new Image();
mekuSprite.src = "./images/mekuSpriteSheet.png";
const mekuWidth = 40;
const mekuHeight = 82;

const shadowSprite = new Image();
shadowSprite.src = './images/mekuWalkShadow.png';
const shadowWidth = 104;
const shadowHeight = 13;

let spriteFrameX = 0;
let spriteFrameY = 0; // 0 = walk left, 1 = walk right, 2 = idle

let gameFrame = 0;
let frameRate = 24;

let xPos = 0; // 
let direction = 1; // 0 = idle, 1 = right, -1 = left
const leftOffset = 70; // Offset meku to account for their shadow

const mekuLink = document.getElementById("meku-link");

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spriteFrameY = direction == 1 ? 1 : direction == -1 ? 0 : 2;

    ctx.drawImage(
        mekuSprite,
        spriteFrameX * mekuWidth, spriteFrameY * mekuHeight, mekuWidth, mekuHeight, // Sprite sheet cropping
        xPos + leftOffset, canvas.height - mekuHeight - 8, mekuWidth, mekuHeight // Canvas position
    );
    ctx.drawImage(shadowSprite, 0, 0, shadowWidth, shadowHeight, xPos, canvas.height - shadowHeight, shadowWidth, shadowHeight);

    if (direction != 0) {
        if (gameFrame % frameRate == 0)
            spriteFrameX = spriteFrameX < 5 ? spriteFrameX + 1 : 0;

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
        spriteFrameX = direction == 1 ? 1 : direction == -1 ? 0 : spriteFrameX;
        direction = 0;
    } else
        direction = chance < 0.75 ? 1 : -1;
    randomInterval = baseInterval * (1 + chance);
}

setInterval(setRandomDirection, randomInterval);

draw();

