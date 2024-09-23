// const lastName = prompt('Введите вашу фамилию');
// const firstName = prompt('Введите ваше имя');
// const patronymic = prompt('Введите ваше отчество');
// const currentAge = prompt('Введите ваш полный возраст');
// const ageInDays = +currentAge * 365;
// const inFiveYears = +currentAge + 5;
// const definitionOfGender = confirm('Ваш пол - мужской?');

// let gender = undefined;
// let retired = undefined;

// const RETIREMENT_AGE_FOR_MEN = 60;
// const RETIREMENT_AGE_FOR_WOMEN = 55;

// const ckeckingDetails = (item1, item2, item3) => {
//     if(item1 && item1.trim() && item2 && item2.trim() && item3 && item3.trim()) {
//         console.log(item1, item2, item3)
//     } else {
//         throw new Error('Введены неверные данные Ф.И.О.')
//     }
// }
// ckeckingDetails(lastName, firstName, patronymic);

// const checkingAge = (age) => {
//     if(age && age.trim() && Number.isInteger(+age) && +age > 0) {
//         console.log(age)
//     } else {
//         throw new Error('Введены неверные данные возраста')
//     }
// }
// checkingAge(currentAge);

// const checkingGender = (check) => {
//     check ? gender = 'мужской' : gender = 'женский'
// }
// checkingGender(definitionOfGender);

// const checkingForRetirementAge = () => {
//     gender == 'мужской' && +currentAge >= RETIREMENT_AGE_FOR_MEN ? retired = 'да' : retired = 'нет';
//     gender == 'женский' && +currentAge >= RETIREMENT_AGE_FOR_WOMEN ? retired = 'да' : retired = 'нет';
// }
// checkingForRetirementAge()

// console.log(ageInDays);
// console.log(inFiveYears);
// console.log(definitionOfGender);
// console.log(retired);
// console.log(gender);

// alert(`ваше ФИО: ${lastName} ${firstName} ${patronymic}
// ваш возраст в годах: ${currentAge}
// ваш возраст в днях: ${ageInDays}
// через 5 лет вам будет: ${inFiveYears}
// ваш пол: ${gender}
// вы на пенсии: ${retired}`);


const isValidName = (name) => {
    return name.trim() == '';
}

let lastName = prompt('Введите вашу фамилию');

while (lastName === null) {
    lastName = prompt('Вы отменили ввод. Введите вашу фамилию:');
}
while (isValidName(lastName)) {
    lastName = prompt('Фамилия не должна быть пустой. Введите вашу фамилию:');
    while (lastName === null) {
        lastName = prompt('Вы отменили ввод. Введите вашу фамилию:');
    }
}

let firstName = prompt('Введите ваше имя');

while (firstName === null) {
    firstName = prompt('Вы отменили ввод. Введите ваше имя:');
}
while (isValidName(firstName)) {
    firstName = prompt('Имя не должно быть пустым. Введите ваше имя:');
    while (firstName === null) {
        firstName = prompt('Вы отменили ввод. Введите ваше имя:');
    }
}

let patronymic = prompt('Введите ваше отчество');

while (patronymic === null) {
    patronymic = prompt('Вы отменили ввод. Введите ваше отчество:');
}
while (isValidName(patronymic)) {
    patronymic = prompt('Отчество не должно быть пустым. Введите ваше отчество:');
    while (patronymic === null) {
        patronymic = prompt('Вы отменили ввод. Введите ваше отчество:');
    }
}

let currentAge = prompt('Введите ваш полный возраст');

const isValidAge = (age) => {
    return !isNaN(age) && age > 0 && Number.isInteger(parseFloat(age));
}

while (currentAge === null) {
    currentAge = prompt('Вы отменили ввод. Введите ваш возраст:');
}
while (!isValidAge(currentAge)) {
    currentAge = prompt('Введите корректный возраст в годах (положительное целое число):');
    while (currentAge === null) {
        currentAge = prompt('Вы отменили ввод. Введите ваш возраст:');
    }
} 

let ageInDays = +currentAge * 365;
let inFiveYears = +currentAge + 5;

let definitionOfGender = confirm('Ваш пол - мужской?');
let gender = undefined;

const checkingGender = (check) => {
    check ? gender = 'мужской' : gender = 'женский'
}
checkingGender(definitionOfGender)

let retired = 'нет';

const RETIREMENT_AGE_FOR_MEN = 60;
const RETIREMENT_AGE_FOR_WOMEN = 55;

const checkingForRetirementAge = () => {
    if(gender == 'мужской' && +currentAge >= RETIREMENT_AGE_FOR_MEN) {
        retired = 'да';
    }
    if(gender == 'женский' && +currentAge >= RETIREMENT_AGE_FOR_WOMEN) {
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