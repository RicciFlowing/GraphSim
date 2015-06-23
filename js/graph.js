var GraphSim = (function(){

var id_counter = 0;

function Vertex(x,y){
  this.id = id_counter++;
  this.x = x;
  this.y = y;
  this.type = "vertex";
};


function Edge(start_vertex, end_vertex, directed ){
 //this.id = this.idcounter;
 this.start = start_vertex;
 this.end = end_vertex;
 directed = directed || true;
 this.is_directed = directed;
 this.type = "edge";
};

function Graph(){
  this.vertices = [];
  this.edges = [];
  this.adjacent = Matrix.Zero(1);
};

var model_added = new Event("model_added");
var model_removed = new Event("model_removed");

Graph.prototype = {
  addVertex: function(x,y){
    var vertex = new Vertex(x,y);
    this.vertices.push(vertex);
    this.adjacent.set(1,vertex.id,vertex.id);
    model_added.model = vertex;
    document.dispatchEvent(model_added);
  },
  addEdge: function(start, end){
    var edge = new Edge(start, end);
    this.edges.push(edge);
    var temp = this.adjacent.get(start.id,end.id);
    this.adjacent.set(++temp,start.id,end.id);
    temp = this.adjacent.get(end.id,start.id);          //undirected
    this.adjacent.set(++temp,end.id,start.id);
    model_added.model = edge;
    document.dispatchEvent(model_added);
  },
  removeEdge: function(edge){
    this.edges = _.difference(this.edges, [edge]);
    model_removed.model = edge;
    var start = edge.start;
    var end = edge.end;
    var temp = this.adjacent.get(start.id,end.id);
    this.adjacent.set(--temp,start.id,end.id);
    temp = this.adjacent.get(end.id,start.id);          //undirected
    this.adjacent.set(--temp,end.id,start.id);
    document.dispatchEvent(model_removed);
  },
  removeVertex: function(vertex){
    //find all edges starting at the vertex or ending in this vertex
    var edges_starting_at_vertex = _.where(this.edges, {start: vertex});
    var edges_ending_at_vertex = _.where(this.edges, {end: vertex});
    var edges_to_remove = _.union(edges_starting_at_vertex, edges_ending_at_vertex);
    this.edges = _.difference(this.edges, edges_to_remove);
    _.each(edges_to_remove, function(edge){
      model_removed.model = edge;
      document.dispatchEvent(model_removed);
    });
    this.vertices = _.difference(this.vertices, [vertex]);
    model_removed.model = vertex;
    document.dispatchEvent(model_removed);
  },
  getVertex: function(id){
    return _.findWhere(this.vertices, {id: id});
  },
  getNeighbours: function(vertex){
    var neighbours = [];
    _.each(this.adajcent[vertex.id],function(value, id){
      if(value>0){
        var neighbour = this.getVertex(id);
        neighbours.push(neighbour);
        }
    });
    return this.neighbours;
  },
};

var graph = new Graph();

return { getGraph: function(){return graph;}};

})();
