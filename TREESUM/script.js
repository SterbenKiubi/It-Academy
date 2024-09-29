const array = [ 5, 7, 
    [ 4, [2], 8, [1,3], 2 ], 
    [ 9, [] ], 
    1, 8 ];

const treeSum = (arr) => {
    let sum = 0;
    for(let elem of arr) {
        if(Array.isArray(elem)) {
            sum += treeSum(elem);
        } else if (typeof(elem) === 'number') {
            sum += elem; 
        }
    }
    return sum;
}

console.log(treeSum(array));


