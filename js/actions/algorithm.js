define(['../action_factory'], function(ActionFactory){

return function(controller){
var action_factory = new ActionFactory(controller);

var find_shortest_path = action_factory.getAction("vertex_selected");
find_shortest_path.start = 0;

find_shortest_path.eventListener= function(vertex_event){
                  if(this.start == 0){
                    this.start = vertex_event.vertex;
                    this.controller.removeAllHighlights();
                    this.controller.highlight(this.start);
                  }
                  else {
                    var end = vertex_event.vertex;
                    var graph = this.controller.graph;
                    this.controller.highlight(end);

                    var to_be_searched = [{ vertex: this.start, prev: false}];
                    var visited = [];
                    var element, prev;
                    var context = this;

                    while(to_be_searched.length > 0 ){
                        element = to_be_searched.shift();
                        visited.push(element);
                        var adjacent = graph.getNeighbours(element.vertex);
                        prev = element.vertex;


                        while(adjacent.length > 0){
                          var vertex = adjacent.shift();
                          if( vertex.id === end.id){
                            visited.push({vertex: vertex, prev: prev});
                            context.controller.removeAllHighlights();
                            _.each(construct_path(visited), function(vertex){
                              context.controller.highlight(vertex);
                            });
                            this.start = 0;
                            return true;
                          }
                          if(_.where(visited, {vertex: vertex}).length > 0){    // vertex is in visited array
                          }
                          else{
                            //DEBUG (Show added vertex)
                            //  this.controller.removeAllHighlights();
                            //  this.controller.highlight(vertex);
                            //DEBUG
                          to_be_searched.push({vertex: vertex, prev: prev});
                        }
                        };
                      }
                    this.start = 0;
                    return false;
                  }

                function construct_path(list){
                  var end = _.last(list);
                  var path = [end.vertex];
                  var current_vertex = end;
                  while(current_vertex.prev){
                    current_vertex = _.findWhere(list, {vertex: current_vertex.prev})
                    path.push(current_vertex.vertex);
                  };
                  return path;
                }

                };
find_shortest_path.customShutdown = function(){
  if(this.start!=0){
  this.start = 0;
}
};


var create_random_graph = action_factory.getAction("point_selected");
create_random_graph.eventListener = function(){
  this.controller.graph.clear();
  var vertices = [];
  for(var i = 0; i<10; i++){
    var x = Math.random()*800;
    var y = Math.random()*500;
    var vertex = this.controller.graph.addVertex(x,y);
    vertices.push(vertex);
  }

  for(var k = 0; k<10; k++){
    for(var j = 0; j<10; j++){
      if(Math.random() > 0.86){
        this.controller.graph.addEdge(vertices[k], vertices[j]);
      }
    }
  }
};

return {
  find_shortest_path: find_shortest_path,
  create_random_graph: create_random_graph
};
};

});
