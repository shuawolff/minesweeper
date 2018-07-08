//Default Game size
let bombNumber = 10;
let rows = 8;
let columns = 8;
let openedCells = 0;
//Builds Board to custom size
let totalCells = 0;
function buildBoard(rows, columns) {
    for (let j = 0; j< columns; j += 1) {
        let newColumn = document.createElement('div');
        newColumn.id = `Row${j}`
        document.querySelector('#container').appendChild(newColumn);
        for (let i = 0; i < rows; i += 1 ) {
            let div = document.createElement('div');
            div.className = 'box';
            div.id = `box${j}-${i}`;
            div.setAttribute('data-flagged', 2);
            document.querySelector(`#Row${j}`).appendChild(div);
            totalCells+=1;
        }
    }
}
//Build 2d Array of same size
let arr = [];
function buildGameArray(columns) {
    for (let j = 0; j< columns; j += 1) {
        arr[j] = new Array(columns);
    }
}

//Sets array values to zero so if not close to any bomb it shows 0
function setZero (arr) {    
    for (let i = 0; i<arr.length; i += 1) {
        for (let j = 0;j<arr[i].length; j += 1) {
            arr[i][j] = 0;
        }
    }
}
// Randomly places bombs in gameboard and arrays
function placeBombs(num, rows, columns) {
    let alreadyThere = [];
    for (i = 1; i <= num; i += 1) {
        let random = Math.floor(Math.random() * rows);
        let random2 = Math.floor(Math.random() * columns);
        if (alreadyThere.includes(`${random}-${random2}`)) {
            i-=1;
        }
        alreadyThere.push(`${random}-${random2}`);
        document.querySelector(`#box${random}-${random2}`).className += ' bomb';
        arr[random][random2] = 'bomb';
    }
}
//Checks all neighbors of specific divs and makes sure they are not off board
//If the neighbor of the bomb is on board it then adds 1 for each
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
//Used findNeighbors function to calculate number of bombs each space is touching
function bombNeighbors() {
    for (let i = 0; i<arr.length; i += 1) {
        for (let j = 0;j<arr[i].length; j += 1) {
            if (arr[i][j] === 'bomb') {
                findNeighbors(i,j);
            }
        }
    }
}
//Prints from array to gameboard how many bombs each space is touching
function renderBombs (arr){
    for (let i = 0; i<arr.length; i += 1) {
        for (let j = 0;j<arr[i].length; j += 1) {
        if (!(arr[i][j] === 'bomb')) {
        document.querySelector(`#box${i}-${j}`).textContent += arr[i][j];
            }
        }
    }
}

function setupGame () {
    buildBoard(rows,columns);
    buildGameArray(columns);
    setZero(arr);
    placeBombs(bombNumber,rows,columns);
    bombNeighbors();
    renderBombs(arr);
    document.querySelector('h2').textContent = `Beware: ${bombNumber} Bombs`;
}
setupGame();
//Reveals all other bombs on board if you click on a bomb                    
function revealBombs () {
    for(i=0; i< bombNumber;i += 1)
    document.querySelectorAll('.bomb')[i].style.objectPosition = '0';
}
//Function to reveal the box when clicked
function revealBox(e) {
    if (e.target.className.includes('box bomb') && !(e.target.getAttribute('data-flagged') === "1")) {
        e.target.style.objectPosition = '0';
        revealBombs();
        document.querySelector('body').removeEventListener('contextmenu',rightClick);
        document.querySelector('#container').removeEventListener('click',revealBox);
        document.querySelector('h2').textContent = `Game Over`;
        document.querySelector('#bomb').style.visibility = 'visible';
        document.querySelector('#bomb1').style.visibility = 'visible';
    } if (e.target.className === 'box' && !(e.target.getAttribute('data-flagged') === "1")) {
            if (e.target.textContent === '0') {
                if (e.target.id.length === 5) {
                    let place = e.target.id.match(/\d/g);
                    let x = parseInt(place[0]);
                    let y = parseInt(place[1]);
                    openZeros(x,y);
                    openRest();     
                } else {
                    let place = e.target.id.replace( /^\D+/g, '');
                    let x = parseInt(place.slice(0,2));
                    let y = parseInt(place.slice(2));
                    openZeros(x,y)
                    openRest();
                }
            } if (!(e.target.style.backgroundColor === 'white')) {
                openedCells+=1;
            } if (e.target.textContent === '0'){
                e.target.style.backgroundColor = 'white';
                e.target.setAttribute('data-flagged', 0);
            } else {
                e.target.style.fontSize = '35px';
                e.target.style.backgroundColor = 'white';
                e.target.setAttribute('data-flagged', 0);
            }
        if (openedCells === totalCells - bombNumber) {
            document.querySelector('h2').textContent = `Mission Accomplished`;
            document.querySelector('#bomb').style.visibility = 'visible';
            document.querySelector('#bomb1').style.visibility = 'visible';
            document.querySelector('#bomb').src = 'https://media.giphy.com/media/13n4Hd98ewKJsQ/giphy.gif';
            document.querySelector('#bomb1').src = 'https://media.giphy.com/media/13n4Hd98ewKJsQ/giphy.gif'
            document.querySelector('#container').removeEventListener('click',revealBox);
            document.querySelector('body').removeEventListener('contextmenu',rightClick);
        }
    }
}
//Function to freeze box if right-clicked and unfreeze if right-clicked again
function rightClick(e) {
    debugger;
    if (e.target.className.includes('box') && !(e.target.getAttribute('data-flagged') === "1") && !(e.target.getAttribute('data-flagged') === "0") ) {
        e.preventDefault();
        e.target.style.backgroundColor = 'green';
        e.target.setAttribute('data-flagged', 1);
    } else if (e.target.className.includes('box') && e.target.getAttribute('data-flagged') === "1") {
        e.preventDefault();
        e.target.style.backgroundColor = 'grey';
        e.target.setAttribute('data-flagged', 2);
    }
}

//Removes current board so game can be reset
function removeBoard(rows) {
    for (let i = rows-1; i >= 0; i -= 1 ) {
        document.querySelector(`#container`).removeChild(document.querySelector(`#container`).childNodes[i])
    }
}

//Resets the game to correct level
function resetGame() {
    openedCells = 0;
    totalCells = 0;
    k = 0;
    arr = [];
    alreadyThere = [];
    setupGame();
    document.querySelector('h2').textContent = `Beware: ${bombNumber} Bombs`;
    document.querySelector('#bomb').src = 'https://media.giphy.com/media/X92pmIty2ZJp6/giphy.gif';
    document.querySelector('#bomb1').src = 'https://media.giphy.com/media/X92pmIty2ZJp6/giphy.gif'
    document.querySelector('#bomb').style.visibility = 'hidden';
    document.querySelector('#bomb1').style.visibility = 'hidden';
    document.querySelector('#container').addEventListener('click',revealBox);
    document.querySelector('body').addEventListener('contextmenu',rightClick);
}

//Adds click and right click event listeners
document.querySelector('body').addEventListener('contextmenu',rightClick);
document.querySelector('#container').addEventListener('click',revealBox);

//Calculates all surrounding neighbors and if they haven't already been cicked they get added to an array
let toOpen = [];
function openZeros(x,y) {
    if ((x-1 >= 0 && x-1 < arr.length) && (y-1 >= 0 && y-1 < arr.length)) {
        let topLeft = {x:x-1, y:y-1};
        let param1 = x-1;
        let param2 = y-1;
        if (!(document.querySelector(`#box${param1}-${param2}`).style.backgroundColor === 'white')) {
            toOpen.push(topLeft);
        }
    } if ((x >= 0 && x < arr.length) && (y-1 >= 0 && y-1 < arr.length)) {
        let left = {x:x, y:y-1};
        let param1 = x;
        let param2= y-1;
        if (!(document.querySelector(`#box${param1}-${param2}`).style.backgroundColor === 'white')) {
            toOpen.push(left);
        }
    } if ((x+1 >= 0 && x+1 < arr.length) && (y-1 >= 0 && y-1 < arr.length)) {
        let bottomLeft = {x:x+1,y:y-1};
        let param1 = x+1;
        let param2= y-1;
        if (!(document.querySelector(`#box${param1}-${param2}`).style.backgroundColor === 'white')) {
            toOpen.push(bottomLeft);
        }
    } if ((x-1 >= 0 && x-1 < arr.length) && (y >= 0 && y < arr.length)) {
        let topCenter = {x:x-1, y:y};
        let param1 = x-1;
        let param2= y;
        if (!(document.querySelector(`#box${param1}-${param2}`).style.backgroundColor === 'white')) {
            toOpen.push(topCenter);
        }
    } if ((x+1 >= 0 && x+1 < arr.length) && (y >= 0 && y < arr.length)) {
        let bottomCenter = {x:x+1, y:y};
        let param1 = x+1;
        let param2= y;
        if (!(document.querySelector(`#box${param1}-${param2}`).style.backgroundColor === 'white')) {
            toOpen.push(bottomCenter);
        }
    } if ((x-1 >= 0 && x-1 < arr.length) && (y+1 >= 0 && y+1 < arr.length)) {
        let topRight = {x:x-1, y:y+1};
        let param1 = x-1;
        let param2= y+1;
        if (!(document.querySelector(`#box${param1}-${param2}`).style.backgroundColor === 'white')) {
            toOpen.push(topRight);
        }
    } if ((x >= 0 && x < arr.length) && (y+1 >= 0 && y+1 < arr.length)) {
        let right = {x:x, y:y+1};
        let param1 = x;
        let param2= y+1;
        if (!(document.querySelector(`#box${param1}-${param2}`).style.backgroundColor === 'white')) {
            toOpen.push(right);
        }
    } if ((x+1 >= 0 && x+1 < arr.length) && (y+1 >= 0 && y+1 < arr.length)) {
        let bottomRight = {x:x+1, y:y+1};
        let param1 = x+1;
        let param2= y+1;
        if (!(document.querySelector(`#box${param1}-${param2}`).style.backgroundColor === 'white')) {
            toOpen.push(bottomRight);
        }
        return toOpen;
    }
}
//Opens all the surrounding neighbors from array and reruns the toOpen function if one of the newly opened is a 0
function openRest() {
    for (let i = 0;i < toOpen.length;i+=0) {
        if (!(document.querySelector(`#box${toOpen[i].x}-${toOpen[i].y}`).style.backgroundColor === 'white')) {
            openedCells+=1;
        }
        if (document.querySelector(`#box${toOpen[i].x}-${toOpen[i].y}`).textContent === '0'){
            openZeros(toOpen[i].x,toOpen[i].y)
            document.querySelector(`#box${toOpen[i].x}-${toOpen[i].y}`).style.backgroundColor = 'white';
            document.querySelector(`#box${toOpen[i].x}-${toOpen[i].y}`).setAttribute('data-num', 0);
        } else {
            document.querySelector(`#box${toOpen[i].x}-${toOpen[i].y}`).style.fontSize = '35px';
            document.querySelector(`#box${toOpen[i].x}-${toOpen[i].y}`).style.backgroundColor = 'white';
            document.querySelector(`#box${toOpen[i].x}-${toOpen[i].y}`).setAttribute('data-num', 0);
        }
        toOpen.shift();
    }
}
//Retreives the value from menu and resets game to correct level
let formValue = document.querySelector('.form').value;
function boardSize() {
    debugger;
    if (document.querySelector('.form').value === 'easy') {
        removeBoard(rows);
        rows = 8
        columns = 8
        bombNumber = 10
        resetGame();
    } else if (document.querySelector('.form').value === 'medium') {
        removeBoard(rows);
        rows = 10
        columns = 10
        bombNumber = 18
        resetGame();
    } else if (document.querySelector('.form').value === 'hard') {
        removeBoard(rows);
        rows = 12
        columns = 12
        bombNumber = 30
        resetGame();
    }
}
//Adds click ability to Restart Game button
document.querySelector('#submit').addEventListener('click',boardSize);