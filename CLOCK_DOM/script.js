// CONSTANTS 
const MIN_DIAMETER = 200;
const MAX_DIAMETER = 800;

// ELEMENTS
const clockContainer = document.getElementById('clock-container');
const inputContainer = document.getElementById('input-container');
const diameterInput = document.getElementById('diameter');
const buildClockButton = document.getElementById('build-clock');

// LISTENER FOR BUTTON
buildClockButton.addEventListener('click', () => {
    const diameter = parseFloat(diameterInput.value);
    if(diameter >= MIN_DIAMETER && diameter <= MAX_DIAMETER) {
        inputContainer.classList.add('hidden');
        clockContainer.classList.remove('hidden');

        // DRAW CLOCK
        const clock = document.getElementById('clock');

        clock.style.height = `${diameter}px`;
        clock.style.width = `${diameter}px`;
        clock.style.backgroundColor = 'rgb(238, 218, 36)';
        clock.style.borderRadius = '50%';

        // DRAW NUMBERS
        const numberContainer = document.getElementById('numbers');
        for( let i = 0; i <= 12; i++) {
            const number = document.createElement('div');
            number.textContent = i;
            number.style.position = 'absolute';
            number.style.transform = 'translate(-50%, -50%)';
            number.style.backgroundColor = '#28a502';
            number.style.borderRadius = '50%';
            number.style.width = '7%';
            number.style.height = '7%';
            number.style.display = 'flex';
            number.style.alignItems = 'center';
            number.style.justifyContent = 'center';

            // ANGLE FOR NUMBERS
            const angle = (i * 30) * (Math.PI / 180);

            number.style.left = `${(diameter / 2) + (diameter / 2 - 30) * Math.sin(angle)}px`; 
            number.style.top = `${(diameter / 2) - (diameter / 2 - 30) * Math.cos(angle)}px`;
            numberContainer.appendChild(number);
        }
        setInterval(() => {
            const now = new Date();
            console.log(now);
            let hours = now.getHours() % 24;
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            
            // DRAW ELECTRONIC CLOCK
            let electronicClock = document.getElementById('electronic-clock');
            electronicClock.style.fontSize = '150%';
            electronicClock.style.position = 'absolute';
            electronicClock.style.top = '20%';
            function str0l(val,len) {
                let strVal=val.toString();
                while ( strVal.length < len )
                    strVal='0'+strVal;
                return strVal;
            }
            electronicClock.innerHTML = `${str0l(hours, 2)}:${str0l(minutes, 2)}:${str0l(seconds, 2)}`;

            // UPDATE CLOCK
            const hourHand = document.getElementById('hour-hand');
            const minuteHand = document.getElementById('minute-hand');
            const secondHand = document.getElementById('second-hand');

            hourHand.style.transform = `rotate(${(hours * 30) + (minutes / 2)}deg)`; 
            minuteHand.style.transform = `rotate(${(minutes * 6)}deg)`; 
            secondHand.style.transform = `rotate(${(seconds * 6)}deg)`;
            
        }, 1000)
    } else {
        alert(`Введите значение от ${MIN_DIAMETER} до ${MAX_DIAMETER}`)
    }
    
})

