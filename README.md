# Minesweeper

![](Screenshot.png)
<br>This is a replica of the game Minesweeper which I created using HTML, CSS and Vanilla Javascript. I've always been intrigued by the game and the logic needed to beat it. I thought it would be fun to recreate it as a project.

### How to play

When you click on a cell, if the cell is a bomb it reveals all bombs and it's Game Over. If the cell is a number that number represents how many bombs it is touching.

If the cell is not touching any bombs then it will open all the cells around that one, if any of the newly opened cells are not touching any bombs either it will continue to open all the cells until it hits a number.

If you think the space is a bomb you can right-click to flag and freeze the cell so it can't be clicked. 

If all the non-bomb spaces are clicked then you win.

### Code Example

Building the algorithm to open all the boxes surrounding a 0 cell was done by using the x,y position of the cell and searching the 8 cells around it by adding or removing 1 to the x and y. The difficult part was making it continue opening cells if any of the newly opened cells were a 0. When I tried to check if the newly opened cell was 0 and then rerun the code within the same function it was flooding the call stack and freezing the game. 

I resolved this by checking to make sure the surrounding cell was not yet open and then pushing that cell to an array. I then created a new Open function which then opened up each cell listed in the array and then removed it from the array. If any newly opened cells were 0 it runs the algorithm again and adds the additional cells to the array and so on until the array is empty and all the cells are open.

Lesson Learned: Try to break up larger functions into smaller bites which can then be used and manipulated easier.

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
