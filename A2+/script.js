let askForAString = prompt('Введите строку:')

const removingSpacesFromAString = (string) => {
    let isAStringOfSpacesOnly = true;            // Использую флаг а не отладочное сообщение
    for(let index of string) {
        if(index !== ' ') {
            isAStringOfSpacesOnly = false;
            break
        }
    }
    if(isAStringOfSpacesOnly) {
        return '';
    }
    let start = 0;
    let end = string.length -1;
    while(start <= end && string[start] == ' ') {
        start++
    }
    while(end >= start && string[end] == ' ') {
        end--
    }
    if(start === 0 && end === string.length -1) {
        return string;
    }
    let slicedString = string.slice(start, end +1);
    return slicedString;
}

alert(`|${removingSpacesFromAString(askForAString)}|`)