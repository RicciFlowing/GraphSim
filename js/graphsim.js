define([ 'graph', 'controller','userinterface', 'template', 'actions/vertex', 'actions/edge', 'actions/algorithm'],
  function(Graph, Controller, UserInterface, Template, vertex_action_init, edge_action_init, algorithm_action_init){
    var canvas = oCanvas.create({canvas: "#canvas"});
    var point_selected = new Event("point_selected");
    canvas.bind("click", function(){
      point_selected.point = {x: canvas.mouse.x, y: canvas.mouse.y};
      document.dispatchEvent(point_selected);
      });

    var graph = new Graph();
    var controller = new Controller(graph, canvas, new Template(canvas));
    var interface = new UserInterface(controller);

    vertex_action_init(interface);
    edge_action_init(interface);
    algorithm_action_init(interface);


    return {
      setAction: interface.setAction.bind(interface),
      clear: graph.clear.bind(graph)
    }
  });
