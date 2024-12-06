// APP STATE / ELEMENTS
const leftRackedId = 'leftRacket';
const rightRacketId = 'rightRacket';
const leftRacket = document.getElementById(leftRackedId);
const rightRacket = document.getElementById(rightRacketId);
const startButton = document.getElementById('startButton');
const leftScoreDiv = document.getElementById('left-score');
const rightScoreDiv = document.getElementById('right-score');
const ballElement = document.getElementById('ballElement');

// APP STATE / SETTINGS CONSTANTS
const GAME_AREA_WIDTH = 800;
const GAME_AREA_HEIGHT = 500;
const RACKET_HEIGHT = 100;
const RACKET_WIDTH = 10;
const BALL_DIAMETER = 25; 
const MONITOR_144_HZ = 1000 / 144;

//  APP STATE / SPEED
const RACKET_SPEED = 2;
const BALL_SPEED = 2;

// APP STATE / VARIABLES FOR GAME
const leftRacketStartY = (GAME_AREA_HEIGHT - RACKET_HEIGHT) / 2;
const rightRacketStartY = (GAME_AREA_HEIGHT - RACKET_HEIGHT) / 2;

// APP STATE / FLAGS FOR KEYS
let isShiftPressed = false;
let isControlPressed = false;
let isArrowUpPressed = false;
let isArrowDownPressed = false;

// APP STATE / BALL INITIALIZATION
const ballGameArea = {
    minX: 0 + RACKET_WIDTH + (BALL_DIAMETER / 2),
    maxX: GAME_AREA_WIDTH - (BALL_DIAMETER / 2) - RACKET_WIDTH,
    minY: 0 + (BALL_DIAMETER / 2),
    maxY: GAME_AREA_HEIGHT - (BALL_DIAMETER / 2),
};
const ballStartX = GAME_AREA_WIDTH / 2;
const ballStartY = GAME_AREA_HEIGHT / 2;
const yLimitCoef = (ballGameArea.maxY - ballGameArea.minY) / (ballGameArea.maxX - ballGameArea.minX);

// APP STATE / GAME STATE
let isGameStopped = true;
const ball = {
    x: ballStartX,
    y: ballStartY,
    directionX: BALL_SPEED,
    directionY: BALL_SPEED,
}
const player1 = {
    racket: { 
        top: leftRacketStartY,
        bottom: leftRacketStartY + RACKET_HEIGHT,
    },
    score: 0,
}
const player2 = {
    racket: { 
        top: rightRacketStartY,
        bottom: rightRacketStartY + RACKET_HEIGHT,
    },
    score: 0,
}

// UTILS FUNCTIONS
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min;

// FUNCTIONS
const setBallAndRacketsStartPosition = () => { 
    ballElement.style.left = ball.x + 'px'; 
    ballElement.style.top = ball.y + 'px'; 
    leftRacket.style.top = leftRacketStartY + 'px';
    rightRacket.style.top = rightRacketStartY + 'px';
}

const getRacketPosition = (racket, direction) => {
    const speed = direction === 'up' ? -RACKET_SPEED : RACKET_SPEED;

    const currentTopPosition = parseInt(racket.style.top);
    const nextPosition = currentTopPosition + speed;

    if (direction === 'up') {
        return nextPosition > 0 ? nextPosition : 0;
    }

    return nextPosition < GAME_AREA_HEIGHT - RACKET_HEIGHT ? nextPosition : GAME_AREA_HEIGHT - RACKET_HEIGHT;
}

const moveRacket = (racket, topPosition) => {
    const isLeftRacket = racket.id === leftRackedId;
    const isRightRacket = racket.id === rightRacketId;

    if (isLeftRacket) {
        player1.racket.top = topPosition;
        player1.racket.bottom = topPosition + RACKET_HEIGHT;
    }
    if (isRightRacket) {
        player2.racket.top = topPosition;
        player2.racket.bottom = topPosition + RACKET_HEIGHT;
    }

    racket.style.top = topPosition + 'px';
}
const moveRacketUp = (racket) => {
    const topPosition = getRacketPosition(racket, 'up');

    moveRacket(racket, topPosition);
};


const moveRacketDown = (racket) => { 
    const topPosition = getRacketPosition(racket, 'down');

    moveRacket(racket, topPosition);
};

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
};

const renderBall = () => {
    ballElement.style.left = ball.x - BALL_DIAMETER / 2 + 'px';
    ballElement.style.top = ball.y + 'px';
};

const renderScore = () => {
    leftScoreDiv.innerHTML = player1.score;
    rightScoreDiv.innerHTML = player2.score;
}

const startGame = () => {
    isGameStopped = false;

    ball.x = ballStartX;
    ball.y = ballStartY;
    ball.directionX = randomInt(-BALL_SPEED, BALL_SPEED) || BALL_SPEED;
    ball.directionY = randomInt(-BALL_SPEED * yLimitCoef, BALL_SPEED * yLimitCoef) || BALL_SPEED * yLimitCoef;
}
const stopGame = () => {
    isGameStopped = true;
};

const updateBall = () => {
    if (isGameStopped) {
        return;
    }

    ball.x += ball.directionX;
    ball.y += ball.directionY;

    const isTouchPlayer1 = ball.x <= ballGameArea.minX;
    const isTouchPlayer2 = ball.x >= ballGameArea.maxX;
    const isTouchFramePlayer1 = ball.x <= 0 + BALL_DIAMETER / 2;
    const isTouchFramePlayer2 = ball.x >= GAME_AREA_WIDTH - BALL_DIAMETER / 2;
    const isTouchTop = ball.y + (BALL_DIAMETER / 2) <= ballGameArea.minY;
    const isTouchBottom = ball.y + (BALL_DIAMETER / 2) >= ballGameArea.maxY;
    const isOutPlayer1 = ball.y + BALL_DIAMETER / 2 < player1.racket.top || ball.y - BALL_DIAMETER / 2 > player1.racket.bottom;
    const isOutPlayer2 = ball.y + BALL_DIAMETER / 2 < player2.racket.top || ball.y - BALL_DIAMETER / 2 > player2.racket.bottom;
    const isGoalPlayer1 = isTouchFramePlayer1 && isOutPlayer1;
    const isGoalPlayer2 = isTouchFramePlayer2 && isOutPlayer2;

    if (isGoalPlayer1) {
        player2.score += 1;

        renderBall();
        renderScore()
        stopGame();

        return;
    }

    if (isGoalPlayer2) {
        player1.score += 1;

        renderBall();
        renderScore()
        stopGame();

        return;
    }


    if ((isTouchPlayer1 && !isOutPlayer1) || (isTouchPlayer2 && !isOutPlayer2)) {
        ball.directionX = -ball.directionX;
    }

    if (isTouchTop || isTouchBottom) {
        ball.directionY = -ball.directionY;
    }

    renderBall();
}


const update = () => {
    updateRackets();
    updateBall();
}

// APP
(() => {
    // Initialization
    setBallAndRacketsStartPosition();

    // INTERVAL
    setInterval(update, MONITOR_144_HZ);

    // Listeners
    startButton.addEventListener('click', startGame);
})();

// LISTENER FOR PRESSED KEYS
document.addEventListener('keydown', (event) => {
    if (isGameStopped) {
        return;
    }

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
    if (isGameStopped) {
        return;
    }

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




