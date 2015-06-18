function Action(graph){
  this.graph = graph;
};

Action.prototype = {
 init: function(){},
 shutdown: function(){}
};



function UserInterface(controller){
  this.controller = controller;
  var add_vertex = new Action(this.controller.graph);

  add_vertex.eventListener = function(point_event){
   this.graph.addVertex(new Vertex(point_event.point.x,point_event.point.y));
   controller.render();
  };

  add_vertex.init = function(){
    document.addEventListener("point_selected", this.eventListener.bind(this));
  };

  add_vertex.init();
  this.current_action = add_vertex;
};
