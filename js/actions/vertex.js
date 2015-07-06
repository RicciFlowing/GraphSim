(function()
var action_factory = GraphSim.getActionFactory(this.controller);

/////
// Add Vertex Action
////

var add_vertex = action_factory.getAction("point_selected");
add_vertex.eventListener = function(point_event){
                  this.controller.graph.addVertex(point_event.point.x,point_event.point.y);
                };

/////
// Remove Vertex Action
////

var remove_vertex = action_factory.getAction("vertex_selected");
remove_vertex.eventListener = function(vertex_event){
                  this.controller.graph.removeVertex(vertex_event.vertex);
                };

/////
// Highlight Vertex Action
////


var highlight_neighbours = action_factory.getAction("vertex_selected");
highlight_neighbours.eventListener = function(vertex_event){
                                            this.controller.removeAllHighlights();
                                            var vertex = vertex_event.vertex;
                                            var context = this;
                                            var neighbours = this.controller.graph.getNeighbours(vertex);
                                            _.each(neighbours, function(vertex){
                                              context.controller.highlight(vertex);
                                            });
                                          };



})();
