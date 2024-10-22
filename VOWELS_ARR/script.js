let askForAString = prompt('Введите строку');

const countOfVowelsInAStringForEachUse = (string) => {
    let count = 0;
    const vowels = ['а', 'у', 'о', 'и', 'э', 'ы', 'я', 'ю', 'е', 'ё', 'А', 'У', 'О', 'И', 'Э', 'Ы', 'Я', 'Ю', 'Е', 'Ё'];
    let arrOfStringChars = string.split('');
    arrOfStringChars.forEach(function(item) {
        if(vowels.includes(item)) {
            count++
        }
    })
    return count;
}

const countOfVowelsInAStringFilterUse = (string) => {
    const vowels = ['а', 'у', 'о', 'и', 'э', 'ы', 'я', 'ю', 'е', 'ё', 'А', 'У', 'О', 'И', 'Э', 'Ы', 'Я', 'Ю', 'Е', 'Ё'];
    return string.split('').filter(function (item) {
        if(vowels.includes(item)) {
            return item;
        }
    }).length;
}

const countOfVowelsInAStringReduceUse = (string) => {
    const vowels = ['а', 'у', 'о', 'и', 'э', 'ы', 'я', 'ю', 'е', 'ё', 'А', 'У', 'О', 'И', 'Э', 'Ы', 'Я', 'Ю', 'Е', 'Ё'];
    return string.split('').reduce( (count, char) => {
        return vowels.includes(char) ? count + 1 : count;
    }, 0)
}




console.log(countOfVowelsInAStringForEachUse(askForAString));
console.log(countOfVowelsInAStringFilterUse(askForAString));
console.log(countOfVowelsInAStringReduceUse(askForAString));

