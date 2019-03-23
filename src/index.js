module.exports = function solveSudoku(matrix) {
// check columns
  for (let i = 0, len = matrix.length; i < len; i++) {
  	for (let j = 0, lenI = matrix[i].length; j < lenI; j++) {
  		if (matrix[i][j] === 0) {
  			matrix[i][j] = [1,2,3,4,5,6,7,8,9];
  			for (let k = 0, lenIJ = matrix[i][j].length; k < lenIJ; k++) {
  				for (let l = 1; l < lenI; l++) {
  					if (matrix[i][j][k] === matrix[l][j]) {
  						matrix[i][j].splice(k, 1);
  						if (matrix[i][j].length === 1) {
  							matrix[i][j] = matrix[i][j][0];
  						}
  					}
  				}
  			}
  		}
  	}
  }
// check rows
  for (let i = 0, len = matrix.length; i < len; i++) {
  	for (let j = 0, lenI = matrix[i].length; j < lenI; j++) {
  		for (let k = 0, lenIJ = matrix[i][j].length; k < lenIJ; k++) {
  			for (let l = 1; l < lenI; l++) {
  				if (matrix[i][j][k] === matrix[i][l])	{
  					matrix[i][j].splice(k, 1);
  					if (matrix[i][j].length === 1) {
  						matrix[i][j] = matrix[i][j][0];
  					}
  				}	
  			}
  		}
  	}
  }
  return matrix;
}
