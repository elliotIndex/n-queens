var BoardTree = function(board) {
  var newTree = {};
  newTree.board = board;
  newTree.parent = null;
  newTree.children = [];
  _.extend(newTree, BoardTreeMethods);
  return newTree;
};

var BoardTreeMethods = {};

BoardTreeMethods.addChild = function(board) {
  var childTree = BoardTree(board);
  childTree.parent = this;
  this.children.push(childTree);
};

// BoardTreeMethods.contains = function(target) {
//   if (this.board === target) {
//     return true;
//   }
//   var childHasTarget = false;
//   for (var i = 0; i < this.children.length; i++) {
//     childHasTarget = this.children[i].contains(target);
//     if (childHasTarget) {
//       return true;
//     }
//   }
//   return false;
// };

BoardTreeMethods.removeFromParent = function () {
  var removedTreeboard = this.board;

  _.each(this.parent.children, function(child, childIndex, collection){
    if (child.board === removedTreeboard) {
      collection.splice(childIndex, 1);
    }
  });

  this.parent = null;
};

BoardTreeMethods.traverse = function(callback) {
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
// visited before you can determine that a Boardtree does NOT contain
// the target in the worst case scenario