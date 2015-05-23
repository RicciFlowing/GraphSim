var canvas = oCanvas.create({
	canvas: "#canvas"
});

var Corner = Backbone.Model.extend({
  defaults:  {
    type: 'corner',
    x: canvas.width/2,
    y: canvas.height/2
  },
	initialize: function(){
		this.circle = canvas.display.ellipse({
      radius: 10,
      fill: "#079"
    });
		this.drawn = false;

	},
  render: function(){
		var circle = this.circle;
		if(this.drawn){
			canvas.removeChild(circle);
		}
    circle.x = this.get("x");
    circle.y = this.get("y");
    canvas.addChild(circle);
		this.drawn = true;
  }
});


var Edge   = Backbone.Model.extend({
  defaults:  {
    type: 'edge'
  },
	initialize: function(){
		this.line = canvas.display.line({
			start: { x: 0, y: 0 },
			end: { x: 100, y: 100 },
			stroke: "5px #079",
			cap: "round"
		});
		this.drawn = false;
	},
  render: function(){
		var line = this.line;
		if(this.drawn){
			canvas.removeChild(line);
		}
    line.start = this.get_start();
    line.end = this.get_end();
    canvas.addChild(line);
		this.drawn = true;
  },
	get_start: function(){
			var temp_start = this.get("start");
			return {x: temp_start.get("x") , y: temp_start.get("y")};
	},
	get_end: function(){
		var temp_end = this.get("end");
		return {x: temp_end.get("x") , y: temp_end.get("y")};
	}

});

var Part   = Backbone.Model.extend({
  model: function(attr,options){
       switch(attr.type){
           case 'corner':
               return new Corner(attr,options);
               break;
           case 'edge':
               return new Edge(attr,options);
               break;
       }
   }
});

function distance(x1,y1,x2,y2){ return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))};

var Graph  = Backbone.Collection.extend({
  model: Part,
  render: function(){
    this.each(function(part){
      part.render();
      });
  },
	find_nearest_corner: function(x,y){
		var nearest_corner =  {};
		var min_distance = 10000000.0;

		this.each(function(part){
			if(part.get("type") == 'corner'){
				if( distance(x,y, part.get("x"), part.get("y"))< min_distance ){
					nearest_corner = part;
					min_distance = distance(x,y, part.get("x"), part.get("y"));
				};
			}
		});
		return nearest_corner;
	}
  });

var graph = new Graph();

function render_part(part){ part.render();};

graph.on("add",render_part);
graph.on("change:x",render_part);
graph.on("change:y",render_part);



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
