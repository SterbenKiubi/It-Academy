function randomDiap(n,m) {
    return Math.floor(Math.random()*(m-n+1))+n;
}

function mood(colorsCount) {
const colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
const alreadyUsedColors = new Set()

console.log( 'цветов: ' + colorsCount );

while(alreadyUsedColors.size < colorsCount) {

    const n=randomDiap(1,7);
    const colorName=colors[n];
    
    if(!alreadyUsedColors.has(colorName)) {
        alreadyUsedColors.add(colorName);
        console.log( colorName );
    }
}
}

mood(3);
