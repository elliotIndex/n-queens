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
  for (var colIndex = 0; colIndex < this.n; colIndex++) {
    this.board.togglePiece(this.rowIndex, colIndex);
    if(!this.board.hasAnyQueensConflicts()) {
      var newBoard = new Board(this.board.rows());
      this.numQueens++;
      this.rowIndex++;
      var solution = this.hasValidChild();
      if (solution) {
        return solution;
      } else {
        this.numQueens--;
        this.rowIndex--;
        this.board.togglePiece(this.rowIndex, colIndex);

      }
    } else {
      this.board.togglePiece(this.rowIndex, colIndex);
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