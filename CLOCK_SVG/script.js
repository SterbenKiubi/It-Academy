// CONSTANTS 
const MIN_DIAMETER = 200;
const MAX_DIAMETER = 800;
const svgNS = 'http://www.w3.org/2000/svg';

// ELEMENTS
let inputContainer = null;
let diameterInput = null;
let buildClockButton = null;
let clock = null;

// STATE
let diameter = 0;

// FUNCTIONS
const drawInput = () => {
    const container = document.createElement('div');
    container.id = "input-container";


    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'diameter');
    input.setAttribute('placeholder', 'Введите диаметр часов');
    container.appendChild(input);

    const button = document.createElement('button');
    button.setAttribute('id', 'build-clock');
    button.textContent = 'Построить часы';
    container.appendChild(button);

    inputContainer = container;
    diameterInput = input;
    buildClockButton = button;

    document.body.appendChild(container);
}
const getDiameter = () => {
    const value = diameterInput?.value;
    const numValue = Number(value);
    diameter = !Number.isNaN(numValue) ? numValue : 0;
}

const getSmallSizes = () => {
    const smallDiameter = diameter / 20;
    const smallRadius = diameter / 2 - smallDiameter * 1.5;

    return {
        smallDiameter,
        smallRadius,
    }
}
const validateClockDiameter = () => {
    return diameter >= MIN_DIAMETER && diameter <= MAX_DIAMETER
}
const removeInput = () => {
    inputContainer.remove();
}

const drawClockNumbers = () => {
    const { smallRadius, smallDiameter } = getSmallSizes();

    for(let i = 1; i <= 12; i += 1) {
        const [cx, cy] = numberCenter(i, [diameter / 2, diameter / 2], smallRadius, 12)

        const numberCircle = document.createElementNS(svgNS, 'circle');
        numberCircle.setAttribute("r", smallDiameter.toString());
        numberCircle.setAttribute('fill', 'green');

        numberCircle.setAttribute("cx", cx.toString());
        numberCircle.setAttribute("cy", cy.toString());

        clock.appendChild(numberCircle);


        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        textElement.setAttribute('x', cx.toString());
        textElement.setAttribute('y', (cy + smallDiameter / 9).toString());
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('dominant-baseline', 'middle');
        textElement.style.fontSize = `${smallDiameter}px`;

        textElement.textContent = i.toString();

        clock.appendChild(textElement);
    }
}
const drawClockFace = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "clock");
    clock = svg;

    clock.setAttribute('xmlns', svgNS);
    clock.setAttribute('width', diameter);
    clock.setAttribute('height', diameter);

    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', diameter / 2);
    circle.setAttribute('cy', diameter / 2);
    circle.setAttribute('r', diameter / 2);
    circle.setAttribute('fill', 'rgb(238, 218, 36)');
    clock.appendChild(circle);

    drawClockNumbers()

    document.body.appendChild(svg);
}

const drawHand = ({  width, color, x, y }) => {
    const hand = document.createElementNS(svgNS, 'line');
    hand.setAttribute('name', 'hand');
    hand.setAttribute('x1', diameter / 2);
    hand.setAttribute('y1', diameter / 2);
    hand.setAttribute('x2', x);
    hand.setAttribute('y2', y);
    hand.setAttribute('stroke', color);
    hand.setAttribute('stroke-width', width);
    clock.appendChild(hand);
}
const drawHourHand = (hours) => {
    const [x, y] = numberHands(hours, 12, 0.5);

    drawHand({ width: 5, color: 'black', x, y });
}

const drawMinuteHand = (minutes) => {
    const [x, y] = numberHands(minutes,  60, 0.7);

    drawHand({ width: 3, color: 'black', x, y });
}
const drawSecondHand = (seconds) => {
    const [x, y] = numberHands(seconds, 60, 0.9);

    drawHand({ width: 1, color: 'red', x, y });
}

const numberCenter = (number, center, radius, numberOnFace) => {
    const zeroDegreeFixer = numberOnFace / 4;
    let angle = (number - zeroDegreeFixer) * 2 * Math.PI / numberOnFace;
    let x = center[0] + radius * Math.cos(angle);
    let y = center[1] + radius * Math.sin(angle);
    return [x, y];
}
const numberHands = (number, numberOnFace, radiusFixer = 1) => {
    const baseRadius = diameter / 2 - diameter / 20 * 1.5;
    const radius = baseRadius * radiusFixer;
    const center = [diameter / 2, diameter / 2];

    return numberCenter(number, center, radius, numberOnFace);
}

const getTime = () => {
    const now = new Date();
    const hours = now.getHours() % 24;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
    
    return { hours, minutes, seconds };
}

const drawHands = () => {
    const { hours, minutes, seconds } = getTime();

    drawHourHand(hours);
    drawMinuteHand(minutes);
    drawSecondHand(seconds);
}

const removeHands = () => {
    const hands = document.querySelectorAll('[name=hand]');

    hands.forEach(hand => {
        hand.remove();
    })
}

const updateClock = () => {
    removeHands();
    drawHands();
}

const drawClock = () => {
    drawClockFace();
    updateClock();
    runClock();
}

const runClock = () => {
    setInterval(updateClock, 1000);
}

const clickHandler = () => {
    getDiameter();

    if (!validateClockDiameter()) {
        alert(`Введите значение от ${MIN_DIAMETER} до ${MAX_DIAMETER}`);
        return;
    }

    removeInput();
    drawClock()
}

// LISTENER FOR BUTTON
const addListeners = () => {
    buildClockButton.addEventListener('click', clickHandler);
}

//APP
const app = () => {
    drawInput();
    addListeners();
}
app()

