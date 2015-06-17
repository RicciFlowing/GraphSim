function Vertex(){
  this.x = 0;
  this.y = 0;
  this.neigbhours = [];
};


function Edge(){
 this.start = {};
 this.end = {};
 this.is_directed = true;
};

function Graph(){
  this.vertices = [];
  this.egdes = [];
};

Graph.prototype = {
  addVertex: function(vertex){
    this.vertices.push(vertex);
  },
  addEdge: function(edge){
    this.edges.push(edge);
  }
};
