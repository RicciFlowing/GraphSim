define(function(){

function Matrix(){
  this.elements = [];
};

Matrix.create = function(elements){
  var matrix = new Matrix();
  matrix.setElements(elements);
  return matrix;
};

Matrix.Zero = function(dim){
  var temp_array = [];
  var temp_elements = [];
  for(var j = 0; j<dim; j++){
    temp_array.push(0);
  }
  for(var i = 0; i<dim; i++){
    temp_elements.push(temp_array);
  }
  var matrix = new Matrix();
  matrix.setElements(temp_elements);
  return matrix;
};

Matrix.prototype = {
  get: function(i,j){
    if ( i < this.dimension().row && j < this.dimension().col )
      return this.elements[i][j];
    else {
        return 0;                    // Expand matrix with zeros if necessary
      }
  },
  set: function(value,i,j){
    var dim = this.dimension();
    if( i > dim.row -1){
      this.expand(i + 1);
    }
    if( j > dim.col-1){
      this.expand(j + 1);
    }
    this.elements[i][j] = value;
  },
  dimension: function(){
    return {row: this.elements.length, col: this.elements[0].length};
  },
  add: function(matrix){
    var dimension = this.dimension();
    for(var row =0; row < dimension.row; row++){
      for(var col =0; col < dimension.col; col++){
        this.elements[row][col] += matrix.get(row,col);
        }
      }
  },
  print: function(){console.log(this.elements);},
  setElements: function(els) {
    var i, j;
    var elements = els;
    if (elements[0] && typeof(elements[0][0]) !== 'undefined') {
      this.elements = [];
      for(var row_counter = 0; row_counter < elements.length; row_counter++){
        this.elements[row_counter] = []; //create new column
        for(var col_counter = 0; col_counter < elements[row_counter].length; col_counter++){
          this.elements[row_counter][col_counter] = elements[row_counter][col_counter];

        }
      }
      return this;
    }
    else{
      var n = elements.length;
      this.elements = [];
      for (i = 0; i < n; i++) {
        this.elements.push([elements[i]]);
        }
        return this;
      }
  },
  expand: function(dim){
    var new_matrix = Matrix.Zero(dim);
    new_matrix.add(this);
    this.setElements(new_matrix.elements);
  }
};

return Matrix;

});
