function init(){
    a=  [[1, 2],[3,4]];
    console.log(getLengths(a));
    b=  [[1, 2, 3], [4, 5, 6]];
    console.log(getLengths(b));
    c=  [[1,1],[2],[3]];
    console.log(getLengths(c));
    d=  [[1,1],[2,2],[3,2]];
    console.log(getLengths(d));
    e =  [[1,1,1],[2,2,2],[3,3,3]];
    console.log(getLengths(e));

    console.log(matrixMult(a, b));
    console.log(matrixMult(b,c));
    console.log(matrixMult(c,d));
    console.log(matrixMult(e,e));
};

var getLengths = function(A){
    //get lengths of 2X2 matrix; returns false if its not a 2X2 matrix
    var rows = A.length;
    if(Array.isArray(A) && rows>0){
        var cols = A[0].length;
        for(var i=0; i<A.length; i++){
            //checks that all columns have same dimensions
            if(!(cols === A[i].length)){
                return false;
            }else{
                for(j=0; j<A[i].length; j++){
                    //checks that every single entry is a number
                    if(typeof(A[i][j]) != 'number'){
                        return false;
                    }
                }
            }
        }
    }else{
        return false;
    }
    return {"rows": rows, "cols":cols, "0": rows, "1": cols};
}

var matrixMult = function(A,B){
    //multiply two matrix; returns false if matrix are not well defined
    if(getLengths(A) && getLengths(B) && getLengths(A).cols===getLengths(B).rows){
        var acum = 0;
        var rowsA = getLengths(A).rows;
        var rowsB = getLengths(B).rows;
        var colsB = getLengths(B).cols;
        var C = [];
        var row = [];
        for(var i=0; i<rowsA; i++){
            row = [];
            for(var k=0; k<colsB; k++){
                acum = 0;
                for(var j=0; j<rowsB; j++){
                    acum += A[i][j]*B[j][k];
                }
                row.push(acum);
            }
            C.push(row);
        }
        return C;
    }else{
        return false;
    }
}