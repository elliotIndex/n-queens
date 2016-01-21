/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


/*
 * Complexity: What is the time complexity of the above functions?
 */

// addChild has constant time complexity

// contains has linear time complexity because every node must be
// visited before you can determine that a tree does NOT contain
// the target in the worst case scenario

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  for (var i = 0; i < n; i++) {
    board.togglePiece(i,i);
  }
  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function(n) { 
    return n <= 1 ? 1 : n*factorial(n-1);
  } 

  var solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  if (n === 0) {
    solution = [];
  } else if (n === 1) {
    solution = [[1]];
  } else if (n === 2 || n === 3) {
    var emptyBoard = new Board({n:n});
    solution = emptyBoard.rows();
  } else {
    var board = new Board({n:n});
    var queensAdded = 0;
    var currentRow = 0; // {row: 0, col: -1}  --->  0, only need rows because of your idea
    var boardTree = new BoardTree(board, queensAdded, currentRow); // 0;oardTree.hasValidChild();
    solution = boardTree.hasValidChild();
  }
  console.log(n,solution);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
