module.exports = function solveSudoku( matrix ) {

    matrix = findLoner( matrix );

    return matrix;
};

function _recursion( matrix, options, key, i ){                         //рекурсия - потому что ф-я вызывает ф-ю findLoner
                                                                        //в которой в цикле вызывается _recursion за счет чего получается
    matrix[Math.trunc( key / 10 )][key % 10] = options[key][i];         //рекурсия с ветвлением т.к данная функция изменяет matrix что приводит
                                                                        //к измненеию параметров при вызове _recursion из findLoner
    return findLoner( matrix );
}

function getOptions( matrix, i, j ){                                    //возвращает массив всех возможных чисел в заданной позиции i, j
                                                                        //или undefined в случае если кандидатов нет
    var optionsArr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

    for( var m = Math.trunc( i / 3 ) * 3; m < Math.trunc( i / 3 ) * 3 + 3; m++ ){


        for( var n = Math.trunc( j / 3 ) * 3; n < Math.trunc( j / 3 ) * 3 + 3; n++ ){
            optionsArr = optionsArr.filter( function( num ){ return num != matrix[m][n] ? 1 : 0 } );
        }
    }

    for( var m = 0; m < matrix.length; m++ ){

        optionsArr = optionsArr.filter( function( num ){ return num != matrix[i][m] ? 1 : 0 } );
        optionsArr = optionsArr.filter( function( num ){ return num != matrix[m][j] ? 1 : 0 } );
    }

    return optionsArr.length ? optionsArr : undefined;
}

function findLoner( matrix ){

    var options = {};
    var flag = 1;

    while( flag ){                                                      //цикл продолжает работу если в текущей итерации был найден "одиночка"
                                                                        //что привело к необходимости проверить матрицу на наличие одиночек
        flag = false;

        for ( var i = 0; i < matrix.length; i++ ) {

            for ( var j = 0; j < matrix[i].length; j++ ) {

                if ( !matrix[i][j] ) {

                    options['' + +i + +j] = getOptions( matrix, i, j );
                    if( options['' + +i + +j] == undefined ){

                        return false;
                    }
                    if ( options['' + +i + +j].length == 1 ){

                        matrix[i][j] = options['' + +i + +j][0];
                        delete options['' + +i + +j];
                        flag = true;
                    }
                }
            }
        }
    }

    if( checkSolve( matrix ) ){                                             //если в результате поиска одиночек получено решение
                                                                            //оно возвращается
        return matrix;
    }

    var result = false;

    for( var i = 0; i < options[Object.keys( options )[0]].length; i++ ){   //для первого массива в массиве options текущей функции цикл
                                                                            //запускает _recursion
        var newMatrix = [[],[],[],[],[],[],[],[],[]];                       //в цикле меняется номер числа которое выбирается для заполнения

        for( var j = 0; j < matrix.length; j++ ){
            for( var z = 0; z < matrix.length; z++ ){
                newMatrix[j][z] = matrix[j][z];
            }
        }
        result = _recursion( newMatrix, options, Object.keys( options )[0], i );

        if( result ) break;
    }

    return result;
}

function checkSolve( matrix ){

    for( var i = 0; i < matrix.length; i++ ){

        if( matrix[i].reduce( function( a, b ){ return( a + b ) } ) != 45 ) return false;

        var sum = 0;

        for( var j = 0; j < matrix[i].length; j++ ){

            sum += matrix[j][i];
        }

        if( sum != 45 ) return false;
    }

    return true;
}
