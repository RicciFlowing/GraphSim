function GraphEdit(graph_to_edit, target_canvas){
	this.addCorner = function(){
	  var p = new Corner({ x : target_canvas.mouse.x , y: target_canvas.mouse.y});
		graph_to_edit.add(p);
	};

	this.addEdge = function(){
		if(!this.corner_selected){
			this.start_corner = graph_to_edit.find_nearest_corner(target_canvas.mouse.x,target_canvas.mouse.y);
			this.corner_selected = true;
		}
		else {
			this.end_corner = graph_to_edit.find_nearest_corner(target_canvas.mouse.x,target_canvas.mouse.y);
			var edge = new Edge({start: this.start_corner, end: this.end_corner});
			graph_to_edit.add(edge);
			this.corner_selected = false;
			this.start_corner = {};
			this.end_corner = {};
		}
	};

	this.set_corner_mode = function(){
		target_canvas.unbind("click", this.addEdge);
		target_canvas.bind("click", this.addCorner );
	};

	this.set_edge_mode = function(){
		canvas.start_corner = {};
		canvas.end_corner = {};
		canvas.corner_selected = false;
		target_canvas.unbind("click", this.addCorner );
		target_canvas.bind("click", this.addEdge );
	};


};
