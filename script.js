let bombNumber = 10;
let rows = 8;
let columns = 8;

//Retreives the value from menu and resets game to correct level
function amtrc() {
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
        bombNumber = 24
        resetGame();
    }
}
//Adds click ability to Restart Game button
document.querySelector('#submit').addEventListener('click',amtrc);


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
            div.setAttribute('data-num', 2);
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
buildBoard(rows,columns);
buildGameArray(columns);
//Sets array values to zero so if not close to any bomb it shows 0
    for (let i = 0; i<arr.length;i+=1) {
        for (let j = 0;j<arr[i].length; j+=1) {
            arr[i][j] = 0;
        }
    }
// Randomly places bombs in gameboard and arrays
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
    }
}

//Calculates number of bombs each space is touching and prints to array
function bombNeighbors() {
    for (let i = 0; i<arr.length;i+=1) {
        for (let j = 0;j<arr[i].length; j+=1) {
            if (arr[i][j] === 'bomb') {
                findNeighbors(i,j);
            }
        }
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
placeBombs(bombNumber,rows,columns);
bombNeighbors();

//Prints from array to gameboard how many bombs each space is touching
// function numbalgorithm() {
    for (let i = 0; i<arr.length;i+=1) {
    for (let j = 0;j<arr[i].length; j+=1) {
        if (!(arr[i][j] === 'bomb')) {
        document.querySelector(`#box${i}${j}`).textContent += arr[i][j];
        }
    }
// }
// numbalgorithm();

//Reveals all other bombs on board if you click on a bomb
function revealBombs () {
    for(i=0; i< bombNumber;i+=1)
    document.querySelectorAll('.bomb')[i].style.objectPosition = '0';
}

//Function to reveal the box when clicked
function revealBox(e) {
    if (e.target.className.includes('box bomb') && !(e.target.getAttribute('data-num') === "1")) {
        e.target.style.objectPosition = '0';
        revealBombs();
        document.querySelector('#container').removeEventListener('click',revealBox);
        document.querySelector('body').removeEventListener('contextmenu',rightClick);
        document.querySelector('h2').textContent = `Game Over`;
    } if (e.target.className === 'box' && !(e.target.getAttribute('data-num') === "1")) {
        e.target.style.fontSize = '35px';
        e.target.style.backgroundColor = 'white';
        e.target.setAttribute('data-num', 0);
    }
}
//Function to freeze box if right-clicked and unfreeze if right-clicked again
function rightClick(e) {
    if (e.target.className.includes('box') && !(e.target.getAttribute('data-num') === "1") && !(e.target.getAttribute('data-num') === "0") ) {
        e.preventDefault();
        e.target.style.backgroundColor = 'green';
        e.target.setAttribute('data-num', 1);
        console.log(e.target.getAttribute('data-num'));
    } else if (e.target.className.includes('box') && e.target.getAttribute('data-num') === "1") {
        e.preventDefault();
        e.target.style.backgroundColor = 'lightgrey';
        e.target.setAttribute('data-num', 2);
        console.log(e.target.getAttribute('data-num'));
    }
}
document.querySelector('#container').addEventListener('contextmenu',rightClick);

document.querySelector('h2').textContent = `Bombs: ${bombNumber}`;

//Resets the game to correct level
function resetGame() {
    n = 0;
    buildBoard(rows, columns);
    arr = [];
    alreadyThere = [];
    buildGameArray(columns);
    debugger;
    for (let i = 0; i<arr.length;i+=1) {
        for (let j = 0;j<arr[i].length; j+=1) {
            arr[i][j] = 0;
        }
    }
    placeBombs(bombNumber, rows, columns);
    bombNeighbors();
        for (let i = 0; i<arr.length;i+=1) {
            for (let j = 0;j<arr[i].length; j+=1) {
                if (!(arr[i][j] === 'bomb')) {
                    document.querySelector(`#box${i}${j}`).textContent += arr[i][j];
                    }
                }
            }
            document.querySelector('h2').textContent = `Bombs: ${bombNumber}`;
            document.querySelector('#container').addEventListener('click',revealBox);
            document.querySelector('body').addEventListener('contextmenu',rightClick);
        }
        
        function removeBoard(rows) {
            for (let i = rows-1; i >= 0; i-=1 ) {
                document.querySelector(`#container`).removeChild(document.querySelector(`#container`).childNodes[i])
            }
        }
    }
    
    document.querySelector('#container').addEventListener('click',revealBox);



//var txt = document.querySelector('#box40').id
// var numb = txt.match(/\d/g);
// numb = numb.join(""); splt = numb.split(""); splt[0]
// "4"
// if document.querySelector('#box40').textContent === 0 then get x,y and search for and open all neighbors
//Option above to get x,y (take box id and get x,y from there and plug into function which will open all found neighbors)