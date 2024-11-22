// CONSTANTS 
const MIN_DIAMETER = 200;
const MAX_DIAMETER = 800;
const FONT_SIZE_FACTOR = 0.07;

// ELEMENTS
const clockContainer = document.getElementById('clock-container');
const inputContainer = document.getElementById('input-container');
const diameterInput = document.getElementById('diameter');
const buildClockButton = document.getElementById('build-clock');
const clock = document.getElementById('clock');
const numberContainer = document.getElementById('numbers');
const electronicClock = document.getElementById('electronic-clock');

// STATE
let diameter = 0;
let setIntervalId = undefined


// FUNCTIONS
const getDiameter = () => {
    const value = diameterInput?.value;
    const numValue = Number(value);
    diameter = !Number.isNaN(numValue) ? numValue : 0;
}
const validateClockDiameter = () => {
    return diameter >= MIN_DIAMETER && diameter <= MAX_DIAMETER
}

const hideInput = () => {
    inputContainer.classList.add('hidden');

    removeListeners()
}
const showClock = () => {
    clockContainer.classList.remove('hidden');
}
const getTime = () => {
    const now = new Date();
    const hours = now.getHours() % 24;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log(`${hours}:${minutes}:${seconds}`);
    

    return { hours, minutes, seconds };
}
const getStingTime = (timeNumber) => timeNumber.toString().padStart(2, '0');

const drawClockFace = () => {
    clock.style.height = `${diameter}px`;
    clock.style.width = `${diameter}px`;
    clock.style.backgroundColor = 'rgb(238, 218, 36)';
    clock.style.borderRadius = '50%';
}
const drawClockNumbers = () => {
    for( let i = 0; i <= 12; i += 1) {
        const number = document.createElement('div');
        number.textContent = i;
        number.textContent.toString()
        number.style.position = 'absolute';
        number.style.transform = 'translate(-50%, -50%)';
        number.style.backgroundColor = '#28a502';
        number.style.borderRadius = '50%';
        number.style.width = '7%';
        number.style.height = '7%';
        number.style.display = 'flex';
        number.style.alignItems = 'center';
        number.style.justifyContent = 'center';
        number.style.fontSize = `${diameter * FONT_SIZE_FACTOR}px`;

        // ANGLE FOR NUMBERS
        const angle = (i * 30) * (Math.PI / 180);

        number.style.left = `${(diameter / 2) + (diameter / 2 - 30) * Math.sin(angle)}px`;
        number.style.top = `${(diameter / 2) - (diameter / 2 - 30) * Math.cos(angle)}px`;
        numberContainer.appendChild(number);
    }
}

const drawClock = () => {
    drawClockFace();
    drawClockNumbers()
}
const drawElectronicClock = () => {
    electronicClock.style.fontSize = `${diameter * FONT_SIZE_FACTOR}px`;
    electronicClock.style.position = 'absolute';
    electronicClock.style.top = '20%'; 

}
const updateElectronicClock = (time) => {
    const { hours, minutes, seconds } = time;
    electronicClock.innerHTML = `${getStingTime(hours)}:${getStingTime(minutes)}:${getStingTime(seconds)}`;
}

const updateClock = (time) => {
    const { hours, minutes, seconds } = time;

    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');

    hourHand.style.transform = `rotate(${(hours * 30) + (minutes / 2)}deg)`;
    minuteHand.style.transform = `rotate(${(minutes * 6)}deg)`;
    secondHand.style.transform = `rotate(${(seconds * 6)}deg)`;
}

const updateClocks = () => {
    const time = getTime();

    updateElectronicClock(time);
    updateClock(time)
}

const startClock = () => {
    updateClocks();

    setIntervalId = setInterval(updateClocks, 1000)
}

const runClock = () => {
    getDiameter()

    if (!validateClockDiameter()) {
        alert(`Введите значение от ${MIN_DIAMETER} до ${MAX_DIAMETER}`);
        return;
    }

    hideInput();

    drawClock();
    drawElectronicClock();

    startClock()

    showClock();
}

const clickHandler = () => {
    runClock();
}


// LISTENER FOR BUTTON
const addListeners = () => {
    buildClockButton.addEventListener('click', clickHandler);
    window.addEventListener("unload", () => {
        clearInterval(setIntervalId);
    });
}

const removeListeners = () => {
    buildClockButton.removeEventListener('click', clickHandler);
}

//APP
const app = () => {
    addListeners()
}
app()

