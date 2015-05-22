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

var Graph  = Backbone.Collection.extend({
  model: Part,
  render: function(){
    this.each(function(part){
      part.render();
      });
  }
  });

var graph = new Graph();

function render_part(part){ part.render();};

graph.on("add",render_part);
graph.on("change:x",render_part);
graph.on("change:y",render_part);

function addCorner(){
  var p = new Corner({ x : canvas.mouse.x , y: canvas.mouse.y});
  graph.add(p);
};

canvas.bind("click", addCorner )

var p = new Corner({ x : 500 , y: 20});
var q = new Corner({ x : 300 , y: 200});
var e = new Edge({start: p, end: q});
graph.add(p);
graph.add(q);
graph.add(e);
//p.set("x", 100)
