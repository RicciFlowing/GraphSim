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

    var vertex_actions = vertex_action_init(controller);

    interface.registerAction("add_vertex", vertex_actions.add_vertex);
    interface.registerAction("remove_vertex", vertex_actions.remove_vertex);
    interface.registerAction("highlight_neighbours", vertex_actions.highlight_neighbours);

    var edge_actions = edge_action_init(controller);

    interface.registerAction('add_edge',edge_actions.add_edge );
    interface.registerAction('remove_edge',edge_actions.remove_edge );

    var algorithm_actions = algorithm_action_init(controller);

    interface.registerAction('find_shortest_path',algorithm_actions.find_shortest_path );
    interface.registerAction('create_random_graph',algorithm_actions.create_random_graph );

    return {
      setAction: interface.setAction.bind(interface),
      clear: graph.clear.bind(graph)
    }
  });
