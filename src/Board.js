// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var piecesInRow = _.reduce(this.get(rowIndex), function(piecesInRow, tile) {
        return piecesInRow + tile;
      });
      return piecesInRow > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // return this.rows().reduce(function(conflictFound, row, rowIndex){
      //   return conflictFound || this.hasRowConflictAt(rowIndex);
      // }, false);

      var conflictFound = false;
      for (var i = 0; i < this.get('n'); i++) {
        conflictFound = conflictFound || this.hasRowConflictAt(i);
      }
      return conflictFound;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var piecesInColumn = 0;
      for (var rowIndex = 0; rowIndex < this.get('n'); rowIndex++) {
        piecesInColumn += this.get(rowIndex)[colIndex];
      }
      return piecesInColumn > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var conflictFound = false;
      for (var i = 0; i < this.get('n'); i++) {
        conflictFound = conflictFound || this.hasColConflictAt(i);
      }
      return conflictFound;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var columnIndex = majorDiagonalColumnIndexAtFirstRow;
      var piecesInDiagonal = 0;
      var rowIndex = 0;

      if (columnIndex < 0) {
        rowIndex = columnIndex * -1;
        columnIndex = 0;
      }

      while(rowIndex < this.get('n') && columnIndex < this.get('n')){//this.indexInBounds(columnIndex) && this.indexInBounds(rowIndex)) {
        piecesInDiagonal += this.get(rowIndex)[columnIndex];
        
        rowIndex++;
        columnIndex++;
      }

      return piecesInDiagonal > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var conflictFound = false;
      for (var i = 1-this.get('n') ; i < this.get('n'); i++) {
        conflictFound = conflictFound || this.hasMajorDiagonalConflictAt(i);
      }
      return conflictFound;
    },
    

    indexInBounds: function(index) {
      return index >= 0 && index < this.get('n');
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var columnIndex = minorDiagonalColumnIndexAtFirstRow;
      var piecesInDiagonal = 0;
      var rowIndex = 0;
      
      if (columnIndex > this.get('n')) {
        rowIndex = columnIndex - (this.get('n') - 1);
        columnIndex = this.get('n')-1;
      }

      while(rowIndex < this.get('n') && columnIndex >= 0) { //this.indexInBounds(columnIndex) && this.indexInBounds(rowIndex)) {
        piecesInDiagonal += this.get(rowIndex)[columnIndex];

        columnIndex--;
        rowIndex++;
      }
      return piecesInDiagonal > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var conflictFound = false;
      for (var i = 0 ; i < 2*(this.get('n')-1) + 1; i++) {
        conflictFound = conflictFound || this.hasMinorDiagonalConflictAt(i);
      }
      return conflictFound;
    },

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
