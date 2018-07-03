//Builds Board to custom size
let n = 0;
function buildBoard(rows, columns) {
for (let j = 0; j< columns; j+=1) {
    let newColumn = document.createElement('div');
    newColumn.id = `Row${j}`
    document.querySelector('#container').appendChild(newColumn);
    for (let i = 0; i < rows; i+=1 ) {
        let div = document.createElement('div');
        div.className = 'box';
        div.id = `box${j}${i}`;
        document.querySelector(`#Row${j}`).appendChild(div);
        n+=1;
    }
}
}
//Build 2d Array of same size
let arr = [];
function buildGameArray(columns) {
    for (let j = 0; j< columns; j+=1) {
            arr[j] = new Array(columns);
        }
    }
// Randomly places bombs in board and array and makes sure there is not already a bomb in that space
function placeBombs(num, rows, columns) {
    let alreadyThere = [];
    for (i = 1; i <= num; i+=1) {
        let random = Math.floor(Math.random() * rows);
        let random2 = Math.floor(Math.random() * columns);
        if (alreadyThere.includes(random)) {
            i-=1;
        }
        document.querySelector(`#box${random}${random2}`).className += ' bomb';
        arr[random][random2] = 'bomb';
    }
}



//Upper left = -1,-1
//Upper center = 0,-1
//Upper right = +1,-1
//Left = -1,0
//Right = +1,0
//Bottom left = -1,+1
//Bottom center = 0,+1
//Bottom right = +1,+1   

//Checks all neighbors of specific divs and makes sure they are not off board;
function findNeighbors(x,y) {
    if ((x-1 >= 0 && x-1 < arrex.length) && (y-1 >= 0 && y-1 < arr.length)) {
        arr[x-1][y-1] += 1;
    } else if ((x >= 0 && x < arrex.length) && (y-1 >= 0 && y-1 < arr.length)) {
        arr[x][y-1] += 1;
    } else if ((x+1 >= 0 && x+1 < arrex.length) && (y-1 >= 0 && y-1 < arr.length)) {
        arr[x+1][y-1] +=1
    } else if ((x-1 >= 0 && x-1 < arrex.length) && (y >= 0 && y < arr.length)) {
        arr[x-1][y] += 1;
    } else if ((x+1 >= 0 && x+1 < arrex.length) && (y >= 0 && y < arr.length)) {
        arr[x+1][y];
    } else if ((x-1 >= 0 && x-1 < arrex.length) && (y+1 >= 0 && y+1 < arr.length)) {
        arr[x-1][y+1];
    } else if ((x >= 0 && x < arrex.length) && (y+1 >= 0 && y+1 < arr.length)) {
        arr[x][y+1];
    } else if ((x+1 >= 0 && x+1 < arrex.length) && (y+1 >= 0 && y+1 < arr.length)) {
        arr[x+1][y+1];
    } else {
        console.log("nope");
    }
}

buildBoard(3,3);
buildGameArray(3);
placeBombs(1,3,3);
//console.log(arr[4][4]);

// let arrex = [];
// function buildGameArrayex(columns) {
//     for (let j = 0; j< columns; j+=1) {
//             arrex[j] = new Array(columns);
//         }
//     }
// buildGameArrayex(3);
// console.log(arrex.length);
// arrex[0][0] = null
// arrex[0][0] += 1;
// console.log(arrex[0][0]);
// console.log(arrex[1-1]);