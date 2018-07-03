//Builds Board to custom size
let n = 0;
function buildBoard(rows, columns) {
for (let j = 1; j<= columns; j+=1) {
    let newColumn = document.createElement('div');
    newColumn.id = `Row${j}`
    document.querySelector('body').appendChild(newColumn);
    for (let i = 1; i <= rows; i+=1 ) {
        let div = document.createElement('div');
        div.className = 'box';
        div.id = `box${n}`;
        document.querySelector(`#Row${j}`).appendChild(div);
        n+=1;
    }
}
}
// Randomly places bombs
function placeBombs(num) {
    for (i = 1; i <= num; i+=1) {
        let random = Math.floor(Math.random() * n);
        console.log(random);
        document.querySelector(`#box${random}`).className += ' bomb';
    }
}
buildBoard(8,8);
placeBombs(5);

var rect = document.querySelector('#Row1 #box1').getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);
