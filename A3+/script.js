let askForAString = prompt('Введите строку');

const isPalindrome = (string) => {
    string = string.toLowerCase();

    let cleanedString = '';
    for(let i = 0; i < string.length; i++) {
        const char = string[i];
        if((char >= 'а' && char <= 'я') || char === 'ё' || (char >= 'a' && char <= 'z')) {
            cleanedString += (char === 'ё') ? 'е' : char;
        }
    }
    cleanedString = cleanedString.replace(/ь/g, '').replace(/ъ/g, '');

    return cleanedString.trim() === cleanedString.split('').reverse().join('').trim();
}

if(isPalindrome(askForAString)) {
    alert('Это палиндром');
} else {
    alert('Это не палиндром');
}
