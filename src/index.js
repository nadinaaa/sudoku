module.exports = function solveSudoku(matrix) {

    var grid = matrix;
    var row = 0; 
    var col = 0; 


    function StopSolve(grid) { 
        for (var row = 0; row < 9; row++) 
        for (var col = 0; col < 9; col++) 
        if (grid[row][col] == 0 || Array.isArray(grid[row][col])) 
        return false; 
        
        return true; 
        } 

    function findUnassignedLocation(grid, row, col) { 
        var done = false; 
        var res = [-1, -1]; 
        while (!done) { 
            if (row == 9) { 
                done = true; 
            } else { 
                if (grid[row][col] == 0) { 
                    res[0] = row; 
                    res[1] = col; 
                    done = true; 
                } else { 
                    if (col < 8) { 
                        col++; 
                    } else { 
                        row++; 
                        col = 0; 
                    } 
                } 
            } 
        } 
        return res; 
    } 
        
    function findUnassignedLocationArr(grid, row, col) { 
        var done = false; 
        var res = [-1, -1]; 
        
        while (!done) { 
            if (row == 9) { 
                done = true; 
            } else { 
                if (Array.isArray(grid[row][col])) { 
                    res[0] = row; 
                    res[1] = col; 
                    done = true; 
                } else { 
                    if (col < 8) { 
                    col++; 
                    } else { 
                        row++; 
                        col = 0; 
                    } 
                } 
            } 
        } 
        return res; 
    } 
        
    function noConflicts(grid, row, col, num) { 
        return isRowOk(grid, row, num) && isColOk(grid, col, num) && isBoxOk(grid, row, col, num); 
    } 
        
    function isRowOk(grid, row, num) { 
        for (var col = 0; col < 9; col++) 
            if (grid[row][col] == num) 
                return false; 
        
        return true; 
    } 

    function isColOk(grid, col, num) { 
        for (var row = 0; row < 9; row++) 
            if (grid[row][col] == num) 
                return false; 
        
        return true; 
    } 
        
    function isBoxOk(grid, row, col, num) { 
        row = Math.floor(row / 3) * 3; 
        col = Math.floor(col / 3) * 3; 
        
        for (var r = 0; r < 3; r++) 
            for (var c = 0; c < 3; c++) 
                if (grid[row + r][col + c] == num) 
                    return false; 
        
        return true; 
    } 
        
    function isRowOkArr(grid, row, col, num) { 
        var count = 0;
        for (var col = 0; col < 9; col++){
            if (grid[row][col] == num) {
                return false; 
            }
            if (Array.isArray(grid[row][col]) && grid[row][col].includes(num)){
                count++;
            }
            if (count > 1) {
                return false; 
            }
        }
        
        return true; 
    } 
        
    function isColOkArr(grid, row, col, num) { 
        var count = 0;
        for (var row = 0; row < 9; row++){ 
            if (grid[row][col] == num) {
                return false; 
            } 
            if (Array.isArray(grid[row][col]) && grid[row][col].includes(num)){
                count++;
            }
            if (count > 1) {
                return false; 
            } 
        }
        return true; 
    } 
        
    function isBoxOkArr(grid, row, col, num) { 
        var count = 0;
        row = Math.floor(row / 3) * 3; 
        col = Math.floor(col / 3) * 3; 
        
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                if (grid[row + r][col + c] == num) {
                    return false; 
                } 
                if (Array.isArray(grid[row + r][col + c]) && grid[row + r][col + c].includes(num)){
                    count++;
                }
                if (count > 1) {
                    return false; 
                } 
            }
        }
        return true; 
    } 
        
    function solve(grid, row, col) { 
        if (StopSolve(grid)) {
            return grid;
        }
        var cell = findUnassignedLocation(grid, row, col); 
        row = cell[0]; 
        col = cell[1]; 
        if (row == -1) { 
            return solve1(grid,0,0); 
        } 
        var arr =[]; 
        for (var num = 1; num <= 9; num++) { 
            if ( noConflicts(grid, row, col, num) ) { 
                arr.push(num); 
            }
        } 
        if (arr.length==1) { 
            grid[row][col] = arr[0]; 
            return solve(grid, 0, 0); 
        } else { 
            return solve(grid,row,col+1);
        } 
    } 
        
    function solve1(grid, row, col) { 
        if (StopSolve(grid)) {
            return grid;
        }
        var cell = findUnassignedLocation(grid, row, col); 
        row = cell[0]; 
        col = cell[1]; 
        if (row == -1) { 
            return solve2(grid,0,0); 
        } 
        var arr =[]; 
        for (var num = 1; num <= 9; num++) { 
            if ( noConflicts(grid, row, col, num) ) { 
                arr.push(num); 
            }
        } 
        if (arr.length==1) { 
            grid[row][col] = arr[0]; 
            return solve1(grid, 0, 0); 
        } else { 
            grid[row][col] = arr;
            return solve1(grid,row,col+1);
        } 
    } 
        
    function solve2(grid, row, col) { 
        if (StopSolve(grid)) {
            return grid;
        }
        var cell = findUnassignedLocationArr(grid, row, col); 
        row = cell[0]; 
        col = cell[1]; 
        if (row == -1) { 
            return solve3(grid, 0, 0); 
        } 
        for (var i = 0; i < grid[row][col].length; i++) {
            var num = grid[row][col][i];
            if ( isRowOkArr(grid, row, col, num) ) { 
                grid[row][col] = num; 
                return solve2(grid, 0, 0); 
            }
        }
        return solve2(grid,row,col+1);
    }
        
    function solve3(grid, row, col) { 
        if (StopSolve(grid)) {
            return grid;
        }
        var cell = findUnassignedLocationArr(grid, row, col); 
        row = cell[0]; 
        col = cell[1]; 
        if (row == -1) { 
            return solve4(grid, 0, 0); 
        } 
        for (var i = 0; i < grid[row][col].length; i++) {
            var num = grid[row][col][i];
            if ( isColOkArr(grid, row, col, num) ) { 
                grid[row][col] = num; 
                return solve3(grid, 0, 0); 
            }
        }
        return solve3(grid,row,col+1);
    }
        
    function solve4(grid, row, col) { 
        if (StopSolve(grid)) {
            return grid;
        }
        var cell = findUnassignedLocationArr(grid, row, col); 
        row = cell[0]; 
        col = cell[1]; 
        if (row == -1) { 
            return solve5(grid, 0, 0); 
        } 
        for (var i = 0; i < grid[row][col].length; i++) {
            var num = grid[row][col][i];
            if ( isBoxOkArr(grid, row, col, num) ) { 
                grid[row][col] = num; 
                return solve4(grid, 0, 0); 
            }
        } 
        return solve4(grid,row,col+1);
    }
        
    function solve5(grid, row, col) { 
        if (StopSolve(grid)) {
            return grid;
        }
        var cell = findUnassignedLocationArr(grid, row, col); 
        row = cell[0]; 
        col = cell[1]; 
        if (row == -1) { 
            return solve(grid, 0, 0); 
        } 
        grid[row][col] = 0; 
        return solve5(grid,row,col+1);
    }


    
    return solve(grid, row, col); 

}
