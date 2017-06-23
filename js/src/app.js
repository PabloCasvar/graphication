function init(){
    var c = document.getElementById("myCanvas");
    var width = c.width;
    var height = c.height;

    var ctx = c.getContext("2d");
    
    var x = 10;
    var y = 10;
    var r = 10;

    var v = 74;
    var w = 45;
    var x0 = 0;
    var y0 = 0;
    var vx = v*Math.cos(w);
    var vy = v*Math.sin(w);
    var ay = -9.81;
    var ax = 0;

    for(var i=0 ; i<100; i++){
        t = 0.25*i;
        x = x0 + vx*t + 0.5*ax*t*t;
        y = y0 + vy*t + 0.5*ay*t*t;
        yt= height - y; 
        ctx.beginPath();
        ctx.arc(x, yt, r, 0, 2*Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.stroke();
    }
};

//todo: implement this function for arbitrary multiple dimension matrix
getLengths = function(A){
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

matrixMult = function(A,B){
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
};

arrayToVerticalMatrix = function(array){
    if(!Array.isArray(array)) return false;
    var vector = [];
    for(var i=0 ; i<array.length; i++){
        vector.push([array[i]]);
    }
    return vector;
}

arrayToHorizontalMatrix = function(array){
    if(!Array.isArray(array)) return false;
    return [array];
}

matrixVerticalToArray = function(matrix){
    if(getLengths(matrix).cols != 1) return false;
    array = [];
    for(var i=0; i<matrix.length; i++){
        array.push(matrix[i][0]);
    }
    return array;
}

matrixHorizontalToArray = function(matrix){
    if(getLengths(matrix).rows != 1) return false;
    return matrix[0];
}

createIdentity = function(n){
    //creates an Identity matrix nXn 
    var I = [];
    var a = 0;
    for(var j=0; j<n; j++){
        row = [];
        for(var i=0; i<n; i++){
            if(i===j){
                a = 1;                
            }else{
                a = 0;
            }
            row.push(a);
        }
        I.push(row);
    }
    return I;
};

translationMatrix = function(x,y,z){
    matrix = [];
    if(z === undefined){
        n = 3;
        matrix = createIdentity(n);
    }else{
        n = 4;
        matrix = createIdentity(n);
        matrix[2][n-1] = z;
    }
    matrix[0][n-1] = x;
    matrix[1][n-1] = y;
    return matrix;
};

