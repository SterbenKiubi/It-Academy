// ELEMENTS 
const startButton = document.getElementById('startButton');
const leftScoreDiv = document.getElementById('left-score');
const rightScoreDiv = document.getElementById('right-score');
const gameArea = document.getElementById('gameArea');
const leftRacket = document.getElementById('leftRacket');
const rightRacket = document.getElementById('rightRacket');
const redBall = document.getElementById('redBall');

// SETTINGS CONSTANTS
const GAME_AREA_WIDTH = 800;
const GAME_AREA_HEIGHT = 500;
const RACKET_HEIGHT = 100;
const RACKET_WIDTH = 10;
const BALL_WIDTH = 25;
const BALL_HEIGHT = 25;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min;

// SPEED
const RACKET_SPEED = 5;
const BALL_SPEED = 1;

// VARIABLES FOR GAME
let ballDirectionX = Math.random() < 0.5 ? BALL_SPEED : -BALL_SPEED; 
let ballDirectionY = (Math.random() * 2 - 1) * BALL_SPEED; 
let leftScore = 0;
let rightScore = 0;
let isGameStarted = false;
let leftRacketStartY = (GAME_AREA_HEIGHT - RACKET_HEIGHT) / 2 + 'px';
let rightRacketStartY = (GAME_AREA_HEIGHT - RACKET_HEIGHT) / 2 + 'px';

// FLAGS FOR KEYS
let isShiftPressed = false; 
let isControlPressed = false; 
let isArrowUpPressed = false; 
let isArrowDownPressed = false; 

// BALL INITIALIZATION
const ballGameArea = {
    minX: 0 + RACKET_WIDTH + (BALL_WIDTH / 2),
    maxX: GAME_AREA_WIDTH - (BALL_WIDTH / 2) - RACKET_WIDTH,
    minY: 0 + (BALL_WIDTH / 2),
    maxY: GAME_AREA_HEIGHT - (BALL_HEIGHT / 2),
};
const ballStartX = GAME_AREA_WIDTH / 2;
const ballStartY = GAME_AREA_HEIGHT / 2;
const yLimitCoef = (ballGameArea.maxY - ballGameArea.minY) / (ballGameArea.maxX - ballGameArea.minX);

const ball = {
    x: ballStartX,
    y: ballStartY,
    directionX: randomInt(-BALL_SPEED, BALL_SPEED) || BALL_SPEED, // directions straight to players
    directionY: randomInt(-BALL_SPEED * yLimitCoef, BALL_SPEED * yLimitCoef) || BALL_SPEED * yLimitCoef, // directions straight to players
}

// FUNCTIONS
const setBallAndRacketsStartPostition = () => {
    redBall.style.left = (GAME_AREA_WIDTH - BALL_WIDTH) / 2 + 'px';
    redBall.style.top = (GAME_AREA_HEIGHT - BALL_HEIGHT) / 2 + 'px';
    leftRacket.style.top = leftRacketStartY;
    rightRacket.style.top = rightRacketStartY;
}
setBallAndRacketsStartPostition();

const moveRacketUp = (racket) => {
    let currentTopPosition = racket.style.top;
    if(currentTopPosition !== '0px') {
        racket.style.top = parseInt(currentTopPosition) - RACKET_SPEED + 'px';
    } else {
        return;
    }
}

const moveRacketDown = (racket) => {
    let currentTopPosition = racket.style.top;
    if(currentTopPosition !== ((GAME_AREA_HEIGHT - RACKET_HEIGHT) + 'px')) {
        racket.style.top = parseInt(currentTopPosition) + RACKET_SPEED + 'px'; 
    } else {
        return;
    }
}

const updateRackets = () => {
    if (isShiftPressed) {
        moveRacketUp(leftRacket);
    }
    if (isControlPressed) {
        moveRacketDown(leftRacket);
    }
    if (isArrowUpPressed) {
        moveRacketUp(rightRacket);
    }
    if (isArrowDownPressed) {
        moveRacketDown(rightRacket);
    }
}
const startGame = () => {
    const player1 = {
        racket: { // set racket position here
            top: 0,
            bottom: (ballGameArea.maxY - ballGameArea.minX) / 2,
        },
        score: 0,
    }
    const player2 = {
        racket: { // set correct racket here
            top: 0,
            bottom: (ballGameArea.maxY - ballGameArea.minX) / 2,
        },
        score: 0,
    }
    let intervalId;
    const monitor144Hz = 1000 / 144; // ToDo: ask should we use RequestAnimationFrame

    const ballRun = () => {
        ball.x += ball.directionX;
        ball.y += ball.directionY;

        const isTouchPlayer1 = ball.x <= ballGameArea.minX;
        const isTouchPlayer2 = ball.x >= ballGameArea.maxX;
        const isTouchTop = ball.y <= ballGameArea.minY;
        const isTouchBottom = ball.y >= ballGameArea.maxY;
        const isOutPlayer1 = ball.y < player1.racket.top || ball.y > player1.racket.bottom;
        const isOutPlayer2 = ball.y < player2.racket.top || ball.y > player2.racket.bottom;
        const isGoalPlayer1 = isTouchPlayer1 && isOutPlayer1;
        const isGoalPlayer2 = isTouchPlayer2 && isOutPlayer2;

        if (isGoalPlayer1) {
            player2.score += 1;
            console.log('Player 2 score: ', player2.score);
            resetBall();

            return;
        }

        if (isGoalPlayer2) {
            player1.score += 1;
            console.log('Player 1 score: ', player1.score);
            resetBall()

            return;
        }


        if (isTouchPlayer1 || isTouchPlayer2) {
            ball.directionX = -ball.directionX;
            console.log('ricochet by racket');
        }

        if (isTouchTop || isTouchBottom) {
            ball.directionY = -ball.directionY;
            console.log('ricochet by field');
        }

        redBall.style.left = ball.x + 'px';
        redBall.style.top = ball.y + 'px';
    }
    

    ballRun();
    intervalId = setInterval(ballRun, monitor144Hz);

}

// INTERVAL
setInterval(updateRackets, 1000 / 60); 

startButton.addEventListener('click', startGame);

// LISTENER FOR PRESSED KEYS
document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        isShiftPressed = true;
    } 
    else if (event.key === 'Control') {
        isControlPressed = true;
        
    } 
    else if (event.key === 'ArrowUp') {
        isArrowUpPressed = true;
    } 
    else if (event.key === 'ArrowDown') {
        isArrowDownPressed = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
        isShiftPressed = false;
    } 
    else if (event.key === 'Control') {
        isControlPressed = false;
    } 
    else if (event.key === 'ArrowUp') {
        isArrowUpPressed = false;
    } 
    else if (event.key === 'ArrowDown') {
        isArrowDownPressed = false;
    }
});




