var BoardTree = function(board, numQueens, lastQueenPosition) {
  this.board = board;
  this.parent = null;
  this.children = [];
  this.numQueens = numQueens;
  this.currentPosition = lastQueenPosition;
  this.n = board.get('n');

};


BoardTree.prototype.addChild = function(board, numQueens, lastQueenPosition) {
  var childTree = BoardTree(board, numQueens, lastQueenPosition);
  childTree.parent = this;
  this.children.push(childTree);
};

BoardTree.prototype.hasValidChild = function () {
  // base cases
  if (this.numQueens >= this.n) {
    return this.board.rows();
  }
  window.step(this.currentPosition, this.n);
  while (this.board._isInBounds(this.currentPosition.row,this.currentPosition.col)) {
    this.board.togglePiece(this.currentPosition.row, this.currentPosition.col);
    if(!this.board.hasAnyQueensConflicts()) {
      var newBoard = this.board.row();
      this.addChild(newBoard,  this.numQueens+1, this.currentPosition);
    }
    this.board.togglePiece(this.currentPosition.row, this.currentPosition.col);
    window.step(this.currentPosition, this.n);
  }
  if (this.children.length === 0) {
    return false;
  }
  var possibleSolution;
  for (var i = 0; i < this.children.length; i++) {
    possibleSolution = this.children[i].hasValidChild();
    if (possibleSolution) {
      return possibleSolution;
    }
  }
  return false;
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