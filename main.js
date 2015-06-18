var graph = new Graph();
var v = new Vertex(40,50);
var w = new Vertex(100,200);
graph.addVertex(v);
graph.addVertex(w);
var e = new Edge(v,w);
graph.addEdge(e);

var graph_controller = new Controller(graph, canvas);
graph_controller.render();