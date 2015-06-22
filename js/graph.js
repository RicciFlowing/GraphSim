var GraphSim = (function(){
function Vertex(x,y){
  this.id = this.idcounter;
  this.x = x;
  this.y = y;
  this.type = "vertex";
};


function Edge(start_vertex, end_vertex, directed ){
 this.id = this.idcounter;
 this.start = start_vertex;
 this.end = end_vertex;
 directed = directed || true;
 this.is_directed = directed;
 this.type = "edge";
};


function Graph(){
  this.vertices = [];
  this.edges = [];
};

var model_added = new Event("model_added");

Graph.prototype = {
  addVertex: function(x,y){
    var vertex = new Vertex(x,y);
    this.vertices.push(vertex);
    model_added.model = vertex;
    document.dispatchEvent(model_added);
    console.log("Hello");
  },
  addEdge: function(start, end){
    var edge = new Edge(start, end);
    this.edges.push(edge);
    model_added.model = edge;
    document.dispatchEvent(model_added);
  }
};

var graph = new Graph();

return { getGraph: function(){return graph;}};

})();
