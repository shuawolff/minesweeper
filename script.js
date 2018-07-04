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
buildBoard(10,10);
buildGameArray(10);
//Sets array values to zero so if not close to any bomb it shows 0
    for (let i = 0; i<arr.length;i+=1) {
        for (let j = 0;j<arr[i].length; j+=1) {
            arr[i][j] = 0;
        }
    }
// Randomly places bombs in gameboard and arrays and calculates number of bombs each space is touching and prints to array
function placeBombs(num, rows, columns) {
    let alreadyThere = [];
    for (i = 1; i <= num; i+=1) {
        let random = Math.floor(Math.random() * rows);
        let random2 = Math.floor(Math.random() * columns);
        if (alreadyThere.includes(`${random}-${random2}`)) {
            i-=1;
            console.log("Gotcha");
        }
        alreadyThere.push(`${random}-${random2}`);
        document.querySelector(`#box${random}${random2}`).className += ' bomb';
        arr[random][random2] = 'bomb';
        findNeighbors(random,random2);
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

//Checks all neighbors of specific divs and makes sure they are not off board
//If the neighbor is next to a bomb then adds 1 for each
function findNeighbors(x,y) {
    if ((x-1 >= 0 && x-1 < arr.length) && (y-1 >= 0 && y-1 < arr.length) && (!(arr[x-1][y-1] === 'bomb'))) {
        arr[x-1][y-1] += 1;
    } if ((x >= 0 && x < arr.length) && (y-1 >= 0 && y-1 < arr.length) && (!(arr[x][y-1] === 'bomb'))) {
        arr[x][y-1] += 1;
    } if ((x+1 >= 0 && x+1 < arr.length) && (y-1 >= 0 && y-1 < arr.length) && (!(arr[x+1][y-1] === 'bomb'))) {
        arr[x+1][y-1] += 1
    } if ((x-1 >= 0 && x-1 < arr.length) && (y >= 0 && y < arr.length) && (!(arr[x-1][y] === 'bomb'))) {
        arr[x-1][y] += 1;
    } if ((x+1 >= 0 && x+1 < arr.length) && (y >= 0 && y < arr.length) && (!(arr[x+1][y] === 'bomb'))) {
        arr[x+1][y] += 1;
    } if ((x-1 >= 0 && x-1 < arr.length) && (y+1 >= 0 && y+1 < arr.length) && (!(arr[x-1][y+1] === 'bomb'))) {
        arr[x-1][y+1] += 1;
    } if ((x >= 0 && x < arr.length) && (y+1 >= 0 && y+1 < arr.length) && (!(arr[x][y+1] === 'bomb'))) {
        arr[x][y+1] += 1;
    } if ((x+1 >= 0 && x+1 < arr.length) && (y+1 >= 0 && y+1 < arr.length) && (!(arr[x+1][y+1] === 'bomb'))) {
        arr[x+1][y+1] += 1;
    }
}
//Place bombs on board
placeBombs(20,10,10);

//Prints from array to gameboard how many bombs each space is touching
for (let i = 0; i<arr.length;i+=1) {
    for (let j = 0;j<arr[i].length; j+=1) {
        if (!(arr[i][j] === 'bomb')) {
        document.querySelector(`#box${i}${j}`).textContent += arr[i][j];
        }
    }
}

function revealBox(e) {
    if (e.target.className.includes('box bomb')) {
        e.target.style.backgroundSize = '50px';
    } if (e.target.className === 'box') {
        e.target.style.fontSize = '35px';
    }
}


document.querySelector('#container').addEventListener('click',revealBox);