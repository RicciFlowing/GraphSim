var canvas = oCanvas.create({canvas: "#canvas"});


function Vertex(x,y){
  this.x = x;
  this.y = y;
  this.neigbhours = [];
};


function Edge(start_vertex, end_vertex, directed = true){
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

function GraphController(graph, canvas){
  this.graph = graph;
  this.canvas = canvas;
};

GraphController.prototype = {
  render: function(){
      _.each(graph.vertices, function(vertex){
        var circle = this.canvas.display.ellipse({
          radius: 10,
          fill: "#079",
          x: vertex.x,
          y: vertex.y
        });
        this.canvas.addChild(circle);
      });

      _.each(graph.edges, function(edge){
        var line = this.canvas.display.line({
    			start: { x: edge.start.x, y: edge.start.y },
    			end: { x: edge.end.x, y: edge.end.y },
    			stroke: "5px #079",
    			cap: "round"
    		});
        this.canvas.addChild(line);
      });

  }
};

var graph = new Graph();
var v = new Vertex(40,50);
var w = new Vertex(100,200);
graph.addVertex(v);
graph.addVertex(w);
var e = new Edge(v,w);
graph.addEdge(e);

var graph_controller = new GraphController(graph, canvas);
graph_controller.render();
