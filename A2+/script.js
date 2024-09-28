let askForAString = prompt('Введите строку:')

const removingSpacesFromAString = (string) => {
    let start = 0;
    let end = string.length -1;
    while(start <= end && string[start] == ' ') {
        start++
    }
    if (start > end) {
        console.log("Строка состоит только из пробелов.");
        return '';
    }
    while(end >= start && string[end] == ' ') {
        end--
    }
    if (start === 0 && end === string.length - 1) {
        console.log("Нет пробелов в начале и в конце строки.");
        return string; 
    }
    let slicedString = string.slice(start, end +1);
    return slicedString;
}


alert(`|${removingSpacesFromAString(askForAString)}|`)
