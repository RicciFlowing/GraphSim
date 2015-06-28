  
function Tree(){
  this.tree = [];
};
Tree.prototype = {
  add: function(vertices, prev){
    if(Array.isArray(vertices) == false) {
      this.tree.push({vertex: vertices, prev: prev});
      }
      else{
        _.each(vertices, this.add);
      }
    },
  contains: function(vertex){
    if(typeof(_.findWhere(this.tree, {vertex: vertex}))==='undefined'){
        return false
      }
      else{
        return true
      }
  }
})();
