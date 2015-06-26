GraphSim = (function(oldModule){
function Action(controller){
  this.controller = controller;
};

Action.prototype = {
 init: function(){},
 shutdown: function(){},
 eventListener: function(){},
 customShutdown: function(){}
};

function ActionFactory(controller){
  this.controller = controller;
};

ActionFactory.prototype = {
  getAction: function(events){
    if (typeof events === 'string') {events = [events];}
    var action = new Action(this.controller);
    action.init = function(){
      var context = this;
      this.actualListener = this.eventListener.bind(action);
      _.each(events, function(event){
        document.addEventListener(event, context.actualListener);
      });
    };
    action.shutdown = function(){
      this.customShutdown();
      var context = this;
        _.each(events, function(event){
          document.removeEventListener(event, context.actualListener);
        });
    };
    return action;
  }
};


function UserInterface(controller){
  this.controller = controller;
  action_factory = new ActionFactory(this.controller);

  var add_vertex = action_factory.getAction("point_selected");
  add_vertex.eventListener = function(point_event){
                    this.controller.graph.addVertex(point_event.point.x,point_event.point.y);
                  };


  var remove_vertex = action_factory.getAction("vertex_selected");
  remove_vertex.eventListener = function(vertex_event){
                    this.controller.graph.removeVertex(vertex_event.vertex);
                  };

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
                      var element, adjacent, prev;
                      var context = this;

                      while(to_be_searched.length > 0 ){
                          element = to_be_searched.pop();
                          visited.push(element);
                          adjacent = graph.getNeighbours(element.vertex);
                          prev = element.vertex;

                          while(adjacent.length > 0){
                            var vertex = adjacent.pop();
                            if( vertex.id === end.id){
                              visited.push({vertex: vertex, prev: prev});
                              context.controller.removeAllHighlights();
                              _.each(construct_path(visited), function(vertex){
                                context.controller.highlight(vertex);
                              });
                              return true;
                            }
                            if(_.where(visited, {vertex: vertex}).length > 0){    // vertex is in visited array
                            }
                            else{
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
    this.controller.removeAllHighlights();
    this.start = 0;
  }
};

  this.actions = {add_vertex: add_vertex, remove_vertex: remove_vertex, add_edge: add_edge, remove_edge: remove_edge, find_shortest_path: find_shortest_path };

  add_vertex.init();
  this.current_action = add_vertex;
};


UserInterface.prototype = {
  setAction: function(action_string){
    var action = this.actions[action_string];
    this.current_action.shutdown();
    action.init()
    this.current_action = action;
  }
};

oldModule.ui = new UserInterface(oldModule.controller);


return oldModule;

})(GraphSim);
