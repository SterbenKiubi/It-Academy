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
    let left = 0;
    let right = cleanedString.length -1;

    while(left < right) {
        if(cleanedString[left] !== cleanedString[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

if(isPalindrome(askForAString)) {
    alert('Это палиндром');
} else {
    alert('Это не палиндром');
}
