define(['../action_factory'],function(ActionFactory){

return function(interface){
  var action_factory = new ActionFactory(interface.controller);

  /////
  // Add Vertex
  ////

  var add_vertex = action_factory.getAction("point_selected");
  add_vertex.eventListener = function(point_event){
                    this.controller.graph.addVertex(point_event.point.x,point_event.point.y);
                  };
  /////
  // Remove Vertex
  ////

  var remove_vertex = action_factory.getAction("vertex_selected");
  remove_vertex.eventListener = function(vertex_event){
                    this.controller.graph.removeVertex(vertex_event.vertex);
                  };
  ////
  // Highlight Vertex
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

interface.registerAction("add_vertex", add_vertex);
interface.registerAction("remove_vertex", remove_vertex);
interface.registerAction("highlight_neighbours", highlight_neighbours);

  return true;
}

});
