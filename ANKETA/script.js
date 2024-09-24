const isTheNameEmpty = (name) => { // Имя пустое?
    return name.trim() == '';
}

let lastName;
let lastNameMessage = 'Введите вашу фамилию:';

do {
    lastName = prompt(lastNameMessage); // Один раз
    if(lastName == null) {
        lastNameMessage = 'Вы отменили ввод. Введите вашу фамилию:';
    } else if (isTheNameEmpty(lastName)) {
        lastNameMessage = 'Фамилия не должна быть пустой. Введите вашу фамилию:'
    } else {
        lastNameMessage = null;
    }
} while (lastNameMessage);



let firstName;
let firstNameMessage = 'Введите ваше имя';

do {
    firstName = prompt(firstNameMessage);
    if(firstName == null) {
        firstNameMessage = 'Вы отменили ввод. Введите ваше имя:';
    } else if (isTheNameEmpty(firstName)) {
        firstNameMessage = 'Имя не должно быть пустым. Введите ваше имя:'
    } else {
        firstNameMessage = null;
    }
} while (firstNameMessage);

let patronymic;
let patronymicMessage = 'Введите ваше отчество';

do {
    patronymic = prompt(patronymicMessage);
    if(patronymic == null) {
        patronymicMessage = 'Вы отменили ввод. Введите ваше отчество:';
    } else if (isTheNameEmpty(patronymic)) {
        patronymicMessage = 'Отчество не должно быть пустым. Введите ваше отчество:'
    } else {
        patronymicMessage = null;
    }
} while (patronymicMessage);

const isValidAge = (age) => {
    return !isNaN(age) && age > 0 && Number.isInteger(parseFloat(age));
}

let currentAge;
let currentAgeMessage = 'Введите ваш полный возраст';

do {
    currentAge = prompt(currentAgeMessage);
    currentAge = +currentAge; // Числовое значение сразу после prompt
    if(currentAge == null) {
        currentAgeMessage = 'Вы отменили ввод. Введите ваш возраст:';
    } else if (!isValidAge(currentAge)) {
        currentAgeMessage = 'Введите корректный возраст в годах (положительное целое число):';
    } else {
        currentAgeMessage = null;
    }
} while (currentAgeMessage);

let ageInDays = currentAge * 365; // Расчет сразу с числом
let inFiveYears = currentAge + 5;

let definitionOfGender = confirm('Ваш пол - мужской?');
let gender = undefined;

const checkingGender = (check) => {
    gender = (check == true) ? 'мужской' : 'женский'; // Если понадобится переделать код то только в этом месте
}
checkingGender(definitionOfGender)

let retired = 'нет';

const RETIREMENT_AGE_FOR_MEN = 60;
const RETIREMENT_AGE_FOR_WOMEN = 55;

const checkingForRetirementAge = () => {
    if(definitionOfGender && currentAge >= RETIREMENT_AGE_FOR_MEN) { // Используется definitionOfGender который либо true либо false
        retired = 'да';
    }
    if(!definitionOfGender && currentAge >= RETIREMENT_AGE_FOR_WOMEN) {
        retired = 'да'
    }
}
checkingForRetirementAge()

alert(`ваше ФИО: ${lastName} ${firstName} ${patronymic}
ваш возраст в годах: ${currentAge}
ваш возраст в днях: ${ageInDays}
через 5 лет вам будет: ${inFiveYears}
ваш пол: ${gender}
вы на пенсии: ${retired}`);