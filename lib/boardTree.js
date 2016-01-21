var BoardTree = function(board, numQueens, currentRow) {
  this.board = board;
  this.rowIndex = currentRow || 0;
  // this.colIndex = 0;
  // this.parent = null;
  this.children = [];
  this.childCounter = 0;
  this.numQueens = numQueens || 0;
  this.n = board.get('n');

};


BoardTree.prototype.addChild = function(board, numQueens, currentRow) {
  var childTree = new BoardTree(board, numQueens, currentRow);
  //childTree.parent = this;
  this.children.push(childTree);
};

BoardTree.prototype.step = function (position, n) {
  position.col++;
  if (position.col >= n) {
    position.col = 0;
    position.row ++;
  }
  return position;
};

BoardTree.prototype.hasValidChild = function () {
  // base cases
  if (this.numQueens >= this.n && !this.board.hasAnyQueensConflicts()) {
    return this.board.rows();
  }

  if (this.rowIndex >= this.n) { // has reached last row and not found a solution
    return 0;
  }

  for (var colIndex = 0; colIndex < this.n; colIndex++) {
    this.board.togglePiece(this.rowIndex, colIndex);
    if(!this.board.hasAnyQueensConflicts()) {
      var newBoard = new Board(this.board.rows()); // the rows is a pointer, so it changes back
      this.addChild(newBoard,  this.numQueens+1, this.rowIndex+1);
      var solution = this.children[this.childCounter++].hasValidChild();
      if (solution) {
        return solution;
      } else {
        this.board.togglePiece(this.rowIndex, colIndex);  // on this line. Boards currently DONT have their own boards. they all point to the same one
      }
    } else {
      this.board.togglePiece(this.rowIndex, colIndex);  // on this line. Boards currently DONT have their own boards. they all point to the same one
    }
  }

  return 0;

  if (this.children.length === 0 || colIndex === this.n ) {
    return 0;
  }
  var possibleSolution;
  for (var i = 0; i < this.children.length; i++) {
    possibleSolution = this.children[i].hasValidChild();
    if (possibleSolution) {
      return possibleSolution;
    }
  }
  return 0;
};

BoardTree.prototype.removeFromParent = function () {
  var removedTreeboard = this.board;

  _.each(this.parent.children, function(child, childIndex, collection){
    if (child.board === removedTreeboard) {
      collection.splice(childIndex, 1);
    }
  });

  this.parent = null;
};

BoardTree.prototype.traverse = function(callback) {
  callback.call(this); //(this.board);
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].traverse(callback);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

// addChild has constant time complexity

// contains has linear time complexity because every node must be
// visited before you can determine that a BoardTree does NOT contain
// the target in the worst case scenario