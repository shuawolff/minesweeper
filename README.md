# minesweeper-project

The whole project is created with HTML, CSS and Vanilla Javascript. First I built the game board in JS by creating the correct amount of divs and adding them to the container. There is also a corresponding array with the same dimensions where the bombs and numbers are evaluated before being put on the board.

The bombs are then randomly placed and added to the 2d array. All neighbors within the array all get 1 added per bomb they are touching. Those values are then printed from the array to the game board while being hidden.

When you click on a cell, if the cell is a bomb it reveals all bombs and it's Game Over. If the cell is a number, the number is revealed.

If the cell is a 0 then it will open all the cells around that 0 and if any of the newly opened cells are 0 it will continue to open all the cells until it hits a number.

If you think the space is a bomb you can right-click to flag and freeze the cell so it won't be clicked. 

If all the non-bomb spaces are clicked then you win.

Building the algorithm to open all the boxes surrounding 0 was done by using the x,y position on the array and searching the 8 cells around it by adding or removing 1 to the x and y. The difficult part was making it continue opening cells if any of the newly opened cells were a 0. When I tried to check if the newly opened cell was 0 and then rerun the code within the same function it was flooding the callstack and freezing the game. 

I resolved this by checking to make sure the surrounding cell was not yet open and then pushing that cell to an array. I then creted a new Open function which then opened up each cell listed in the array and then removed it from the array. If any newly openeded cells were 0 it runs the algorithm again and adds the additional cells to the array and so on until the array is empty and all the cells are open.

Here is the function used to check all the neighbors and push those surrounding cells to the toOpen array if they were not yet open.

```
let neighborsCheck = [{x:-1, y:-1},{x:0, y:-1},{x:+1,y:-1},{x:-1, y:0},{x:+1, y:0},{x:-1, y:+1},{x:0, y:+1},{x:+1, y:+1}];
let toOpen = [];
function openZeros(x,y) {
    for (let i = 0; i < neighborsCheck.length; i += 1) {
        if ((x + neighborsCheck[i].x >= 0 && x + neighborsCheck[i].x < arr.length) && (y + neighborsCheck[i].y >= 0 && y + neighborsCheck[i].y < arr.length)) {
            let location = {x:x + neighborsCheck[i].x, y:y + neighborsCheck[i].y};
            let param1 = x + neighborsCheck[i].x
            let param2 = y + neighborsCheck[i].y
            if (!(document.querySelector(`[data-num = '${param1}-${param2}']`).style.backgroundColor === 'white')) {
                toOpen.push(location);
        }
    }
}
        return toOpen;
    }
    
```

Lesson Learned: Try to break up larger functions into smaller bites which can then be used and manipulated easier.