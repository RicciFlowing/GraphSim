var canvas = oCanvas.create({
	canvas: "#canvas"
});

var Corner = Backbone.Model.extend({
  defaults:  {
    type: 'corner',
    x: canvas.width/2,
    y: canvas.height/2,
  },
  render: function(){
    var circle = canvas.display.ellipse({
      x: this.get('x'),
      y: this.get('y'),
      radius: 60,
      fill: "#079"
    });
    canvas.addChild(circle);
  }
});


var Edge   = Backbone.Model.extend({
  defaults:  {
    type: 'edge'
  },
  render: function(){

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

var Graph  = Backbone.Collection.extend({model: Part});

var graph1 = new Graph();
var p = new Corner({ x : 500 , y: 20});
p.render();
graph1.add(p);



var button = canvas.display.rectangle({
	x: canvas.width / 2,
	y: canvas.width / 5,
	origin: { x: "center", y: "center" },
	width: 300,
	height: 40,
	fill: "#079",
	stroke: "10px #079",
	join: "round"
});
var buttonText = canvas.display.text({
	x: 0,
	y: 0,
	origin: { x: "center", y: "center" },
	align: "center",
	font: "bold 25px sans-serif",
	text: "Toggle Rotation",
	fill: "#fff"
});
button.addChild(buttonText);

canvas.addChild(button);
