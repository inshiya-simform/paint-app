export function floodFill(grid:string[][],rowIndex:number,colIndex:number,newcolour:string){
    const directionRows = [-1,+1,0,0];
    const directionCols = [0,0,+1,-1];
    const prevColour = grid[rowIndex][colIndex];

    if(prevColour === newcolour) return grid;

    grid[rowIndex][colIndex] = newcolour;

    for(let i=0;i<4;i++){
        const neighbourRow = rowIndex + directionRows[i];
        const neighbourCol = colIndex + directionCols[i];

        if(neighbourRow <0 || neighbourCol < 0 || neighbourRow >= grid.length || neighbourCol >= grid[0].length){
            continue;
        }
        if(grid[neighbourRow][neighbourCol] === prevColour){
            floodFill(grid,neighbourRow,neighbourCol,newcolour)
        }
    }
    return grid
}