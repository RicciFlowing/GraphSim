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

  function Tree(){
    this.tree = [];
  };
  Tree.prototype = {
    add: function(vertices, prev){
      if(Array.isArray(vertices) == false) {
        this.tree.push({vertex: vertices, prev: prev});
        }
        else{
          _.each(vertices, this.add);
        }
      },
    contains: function(vertex){
      if(typeof(_.findWhere(this.tree, {vertex: vertex}))==='undefined'){
          return false
        }
        else{
          return true
        }
    }
  };

  find_shortest_path.eventListener= function(vertex_event){

                    if(this.start == 0){
                      this.start = vertex_event.vertex;
                      this.controller.highlight(this.start);
                    }
                    else {
                      var end = vertex_event.vertex;
                      var graph = this.controller.graph;
                      this.controller.highlight(end);

                      var search_tree = new Tree();

                      search_tree.add(this.start, false);
                      var to_be_searched = [{prev: this.start , list: _.without(graph.getNeighbours(this.start), this.start)}];
                      var searched = graph.getNeighbours(this.start);

                      while(to_be_searched.length > 0 ){
                          var element = to_be_searched.pop();
                          _.each(element.list, function(vertex){
                            if( vertex === end){
                              search_tree.add(vertex, element.prev);
                              console.log("Yeah");
                              return true;
                            }
                            var current_neighbours = _.difference(graph.getNeighbours(vertex), searched);
                            to_be_searched.push({prev: vertex, list: _.without(current_neighbours, vertex)});
                            searched = _.union(searched,_.without(current_neighbours, vertex) );
                          });
                        }
                      this.start = 0;
                      return false;
                    }
                  };
  find_shortest_path.customShutdown = function(){
    if(this.start!=0){
    this.controller.removeHighlight(this.start);
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
