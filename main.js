const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = 600;
canvas.width = 400;
let altitude = 0
let countdown = 10;
let xpressed = false;
let zpressed = false;

const ship = {
    x: 150,
    y: 500,
    height: 100,
    width: 50,
    boosterPower: 0,
    yVel: 0
};

let score = 0;
let frame = 0;
let gravity = 1;
let gameState = 'build'; // Possible: 'build', 'launchPrompt', 'launched'
const bgImg = new Image();bgImg.src = './assets/spacebg.png';
const shiphold = new Image();shiphold.src = './assets/shipholder.png';
const rocketShip = new Image();rocketShip.src = './assets/rocket.png';

// === X and Z ===
const blackX = new Image();blackX.src = './assets/blackx.png';
const redX = new Image();redX.src = './assets/redx.png';
const blackZ = new Image();blackZ.src = './assets/blackz.png';
const redZ = new Image();redZ.src = './assets/redz.png';


function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(bgImg, 0, 0, canvas.width, canvas.height)

    // Ship holder
    c.drawImage(shiphold, 130, 536)
    // Ship
    c.fillStyle = 'green';
    c.drawImage(rocketShip, ship.x, ship.y, ship.width, ship.height);

    // X and Z images
    if (xpressed === true){
        c.drawImage(redX, 200, 320)
    } else {
        c.drawImage(blackX, 200, 320)
    }

    if (zpressed === true){
        c.drawImage(redZ, 250, 400)
    } else {
        c.drawImage(blackZ, 250, 400)
    }

    // UI
    c.fillStyle = 'white';
    c.font = '24px sans-serif';
    c.fillText(`Score: ${score}`, 10, 30);
    c.fillText(`Booster: ${ship.boosterPower}`, 10, 60);
    c.fillText(`Altitude: ${altitude}`, 10, 90)
    c.fillText(`Countdown: ${countdown}`, 10, 120)

    // Launch text
    if (gameState === 'launchPrompt') {
        c.font = '40px sans-serif';
        c.fillText('Launch!', canvas.width / 2 - 90, canvas.height / 2);
    }
}

function update() {
    if (frame >= 400 && countdown > 0 && gameState === 'build'){
        if (frame % 60 === 0) {
            countdown--
        }
    }

    if (gameState === 'build') {
        frame++;
        if (frame >= 1000) {
            gameState = 'launchPrompt';
        }
    } else if (gameState === 'launched') {
        ship.y += ship.yVel;
        ship.yVel += gravity;
        altitude++

        // Stop when the ship lands back down
        if (ship.y + ship.height >= canvas.height) {
            ship.y = canvas.height - ship.height;
            ship.yVel = 0;
            gravity = 0;
            frame = 0;
            countdown = 10
            gameState = 'build'; // Optional end state
        }
    }
}

function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}
loop();

window.addEventListener('keydown', e => {
    if (gameState === 'build') {
        if (e.key === 'x') {
            ship.boosterPower++;
            xpressed = true;
        } else if (e.key === 'z'){
            ship.boosterPower++
            zpressed = true
        }
    }
});

window.addEventListener('keyup', e => {
    if (gameState === 'build') {
        if (e.key === 'x') {
            xpressed = false
        } else if (e.key === 'z'){
            zpressed = false
        }
    }


    if (gameState === 'launchPrompt' && e.key === ' ') {
        gameState = 'launched';
        ship.yVel = -ship.boosterPower * 0.5; // Tune the multiplier for launch height
        //altitude++
        gravity = 0.5; // Re-enable gravity
        score = ship.boosterPower;
        ship.boosterPower = 0;
    }
});
