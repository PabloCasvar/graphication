fs = require('fs');
myCode = fs.readFileSync('../src/app.js','utf-8');
eval(myCode);

describe("Evaluates matrix operations", function() {
 
  beforeEach(function() {
    A = [[1, 2],[3,4]];
    B = [[1, 2, 3], [4, 5, 6]];
    C = [[1,1],[2],[3]];
    I = [[1,0,0],[0,1,0],[0,0,1]];
    E = [[1,1,1],[2,2,2],[3,3,3]];
  });

  it("should retun correct dimensions for A", function() {
    expect(getLengths(A).rows).toEqual(2);
    expect(getLengths(A)[0]).toEqual(2);
    expect(getLengths(A).cols).toEqual(2);
    expect(getLengths(A)[1]).toEqual(2);
  });

  it("should return correct dimentions for B", function(){
    expect(getLengths(B).rows).toEqual(2);
    expect(getLengths(B).cols).toEqual(3);
  });

    it("should return false for not well defined matrix", function(){
    expect(getLengths(C).rows).toBeFalsy();
  });

  it("should return correct multiplication AB", function(){
    expect(matrixMult(A,B)).toEqual([[9, 12, 15], [19, 26, 33]]);
  });

  it("should return false for bad multiplication", function(){
    expect(matrixMult(B,A)).toBeFalsy();
  });

  it("should return correct multiplication EE", function(){
    expect(matrixMult(E,E)).toEqual(
      [
      [6, 6, 6], 
      [12, 12, 12],
      [18, 18, 18]
      ]);
  });

  it("should return same matrix", function(){
    expect(matrixMult(I,I)).toEqual(I);
  });
  
});

describe("Evaluates vector/array transformations", function() {
 
  beforeEach(function() {
    array = [1, 2, 3];
    matrixVertical = [[1], [2], [3]];
    matrixHorizontal = [[1, 2, 3]];
  });

  it("should return vertical vector", function() {
    expect(arrayToVerticalMatrix(array)).toEqual(matrixVertical);
  });

  it("should return false for not array", function() {
    expect(arrayToVerticalMatrix(1)).toBeFalsy();
  });

  it("should return horizontal vector", function() {
    expect(arrayToHorizontalMatrix(array)).toEqual(matrixHorizontal);
  });

  it("should return array from vertical matrix", function() {
    expect(matrixVerticalToArray(matrixVertical)).toEqual(array);
  });

  it("should return array from horizontal matrix", function() {
    expect(matrixHorizontalToArray(matrixHorizontal)).toEqual(array);
  });

  it("should return false from vertical matrix", function() {
    expect(matrixVerticalToArray(matrixHorizontal)).toBeFalsy();
  });

  it("should return false from horizontal matrix", function() {
    expect(matrixHorizontalToArray(matrixVertical)).toBeFalsy();
  });

});

