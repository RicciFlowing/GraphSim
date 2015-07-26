define(['../action_factory'],function(ActionFactory){

return function(interface){
var action_factory = new ActionFactory(interface.controller);

var add_edge = action_factory.getAction("vertex_selected");
add_edge.start = 0;

add_edge.eventListener= function(vertex_event){
                  if(this.start == 0){
                    this.start = vertex_event.vertex;
                    this.controller.highlight(this.start);
                  }
                  else {
                    this.controller.graph.addEdge(this.start, vertex_event.vertex);
                    this.controller.removeHighlight(this.start);
                    this.start = 0;
                  }
                };
add_edge.customShutdown = function(){
  if(this.start!=0){
  this.controller.removeHighlight(this.start);
  this.start = 0;
}
};


var remove_edge = action_factory.getAction("edge_selected");
remove_edge.eventListener= function(edge_event){
                 var edge_to_remove = edge_event.edge;
                 this.controller.graph.removeEdge(edge_to_remove);
                };

interface.registerAction('add_edge',add_edge );
interface.registerAction('remove_edge',remove_edge );
return true;
};
});
