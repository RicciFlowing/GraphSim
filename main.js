var graph = new Graph();

function render_part(part){ part.render();};

graph.on("add",render_part);
graph.on("change:x",render_part);
graph.on("change:y",render_part);

var menu = new GraphEdit(graph, canvas);
menu.set_edge_mode();
canvas.bind("keydown",		function() {
	var key = canvas.keyboard.getKeysDown();
		if(key == 69 ){
			 menu.set_edge_mode();
			console.log("hello");
			}
		if(key == 67 ){
			menu.set_corner_mode();
		}
		});
