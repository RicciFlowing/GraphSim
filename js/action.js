GraphSim = (function(oldModule){
function Action(graph){
  this.graph = graph;
};

Action.prototype = {
 init: function(){},
 shutdown: function(){},
 eventListener: function(){}
};

function ActionFactory(graph){
  this.graph = graph;
};

ActionFactory.prototype = {
  getAction: function(events){
    if (typeof events === 'string') {events = [events];}
    var action = new Action(this.graph);
    action.init = function(){
      var context = this;
      _.each(events, function(event){
        document.addEventListener(event, context.eventListener.bind(action));
      });
    };
    action.shutdown = function(){
        _.each(events, function(event){
          document.removeEventListener(event, context.eventListener);
        });
    };
    return action;
  }
};


function UserInterface(controller){
  this.controller = controller;
  action_factory = new ActionFactory(this.controller.graph);

  var add_vertex = action_factory.getAction("point_selected");
  add_vertex.eventListener = function(point_event){
                    this.graph.addVertex(point_event.point.x,point_event.point.y);
                  };


  var add_edge = action_factory.getAction("vertex_selected");
  add_edge.start = 0;

  add_edge.eventListener= function(vertex_event){
                    if(this.start == 0){
                      this.start = vertex_event.vertex;
                    }
                    else {
                      this.graph.addEdge(this.start, vertex_event.vertex);
                      this.start = 0;
                    }
                  };

  add_vertex.init();
  this.current_action = add_vertex;
};

UserInterface.prototype = {
  setAction: function(action){
    this.current_action.shutdown();
    action.init()
    this.current_action = action;
  }
};

oldModule.ui = new UserInterface(oldModule.controller);

return oldModule;

})(GraphSim);
