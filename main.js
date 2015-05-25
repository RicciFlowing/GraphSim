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


var p = new Corner({ x : 500 , y: 20});
var q = new Corner({ x : 300 , y: 200});
var e = new Edge({start: p, end: q});
graph.add(p);
graph.add(q);
//graph.add(e);
//p.set("x", 100)
