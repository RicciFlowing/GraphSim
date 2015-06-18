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

  add_vertex.prototype = {
    eventListener: function(point_event){
                    this.graph.addVertex(new Vertex(point_event.point.x,point_event.point.y));
                    controller.render();
                  },

    init: function(){
          document.addEventListener("point_selected", this.eventListener.bind(this));
        }
  }

  var add_edge = new Action(this.controller.graph);
  add_edge.start = 0;

  add_edge.eventListener= function(vertex_event){
                    if(this.start == 0){
                      this.start = vertex_event.vertex;
                    }
                    else {
                      this.graph.addEdge(new Edge(this.start, vertex_event.vertex));
                      console.log(this.start);
                      controller.render();
                      this.start = 0;
                    }
                  };

  add_edge.init=  function(){
          document.addEventListener("vertex_selected", this.eventListener.bind(this));
        };




  add_edge.init();
  this.current_action = add_edge;
};
