
function Vertex(x,y){
  this.id = this.idcounter;
  this.x = x;
  this.y = y;
};


function Edge(start_vertex, end_vertex, directed = true){
 this.id = this.idcounter;
 this.start = start_vertex;
 this.end = end_vertex;
 this.is_directed = directed;
};


function Graph(){
  this.vertices = [];
  this.edges = [];
};

Graph.prototype = {
  addVertex: function(vertex){
    this.vertices.push(vertex);
  },
  addEdge: function(edge){
    this.edges.push(edge);
  }
};
