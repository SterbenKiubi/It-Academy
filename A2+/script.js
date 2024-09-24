let askForAString = prompt('Введите строку:')

const removingSpacesFromAString = (string) => {
    let start = 0;
    let end = string.length -1;
    while(start <= end && string[start] == ' ') {
        start++
    }
    while(end >= start && string[end] == ' ') {
        end--
    }
    let slicedString = string.slice(start, end +1);
    return slicedString;
}

alert(`|${removingSpacesFromAString(askForAString)}|`)