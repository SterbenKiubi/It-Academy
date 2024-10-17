// let askForAString = prompt('Введите строку');

// const countOfVowelsInAString = (string) => {
//     let count = 0;
//     const vowels = ['а', 'у', 'о', 'и', 'э', 'ы', 'я', 'ю', 'е', 'ё', 'А', 'У', 'О', 'И', 'Э', 'Ы', 'Я', 'Ю', 'Е', 'Ё'];
//     for(let i = 0; i < string.length; i++) {
//         if(vowels.includes(string[i])) {
//             count++
//         }
//     }
//     return count;
// }

// console.log(countOfVowelsInAString(askForAString));

let askForAString = prompt('Введите строку');

const countOfVowelsInAString = (str) => {
    str.toLowerCase();
    let vowels = {'а': true, 'б': true}
    let count = 0;
    for( let i = 0; i< str.length; i++) {
        let char = str[i];
        switch (char) {
            case 'а':
            case 'б':
                count++
        }
    }
    return count;
    
}

console.log(countOfVowelsInAString(askForAString));


