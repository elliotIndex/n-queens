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
    var numQueens = 0;
    var rowIndex = 0; 
    var hasValidChild = function(board) {
      if (numQueens >= n && !board.hasAnyQueensConflicts()) {
        return board.rows();
      }
      for (var colIndex = 0; colIndex < n; colIndex++) {
        board.togglePiece(rowIndex, colIndex);
        if(!board.hasAnyQueensConflicts()) {
          numQueens++;
          rowIndex++;
          var solution = hasValidChild(board);
          if (solution) {
            return solution;
          } else {
            numQueens--;
            rowIndex--;
            board.togglePiece(rowIndex, colIndex);
          }
        } else {
          board.togglePiece(rowIndex, colIndex);
        }
      }
      return 0;
    }
    solution = hasValidChild(board);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount;
  if (n === 0) {
    solutionCount = 1;
  } else if (n === 1) {
    solutionCount = 1;
  } else if (n === 2 || n === 3){
    solutionCount = 0;
  } else {
    var board = new Board({n:n});
    var numQueens = 0;
    var rowIndex = 0; 
    var countValidChildren = function(board) {
      if (numQueens >= n && !board.hasAnyQueensConflicts()) {
        return 1;
      }
      var solutionsSoFar = 0;
      for (var colIndex = 0; colIndex < n; colIndex++) {
        board.togglePiece(rowIndex, colIndex);
        if(!board.hasAnyQueensConflicts()) {
          numQueens++;
          rowIndex++;
          solutionsSoFar += countValidChildren(board);
          numQueens--;
          rowIndex--;
          board.togglePiece(rowIndex, colIndex);
        } else {
          board.togglePiece(rowIndex, colIndex);
        }
      }
      return solutionsSoFar;
    }
    solutionCount = countValidChildren(board);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
