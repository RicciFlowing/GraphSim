GraphSim = (function(oldModule){
var canvas = oCanvas.create({canvas: "#canvas"});

oldModule.canvas = canvas;

function Template(canvas){
  this.canvas = canvas;
};

Template.prototype ={
  getVertexShape: function(){
    return this.canvas.display.ellipse({
          radius: 10,
          fill: "#079",
        });
  },
  getEdgeShape: function(){
     return this.canvas.display.line({
      stroke: "5px #079",
      cap: "round",
    });
  }
};


var point_selected = new Event("point_selected");
var vertex_selected = new Event("vertex_selected");
var edge_selected = new Event("edge_selected");

oldModule.canvas.bind("click", function(){
  point_selected.point = {x: canvas.mouse.x, y: canvas.mouse.y};
  document.dispatchEvent(point_selected);
});


var template = new Template(oldModule.canvas);

var View = function(model){
  this.model = model;
  this.template = template;
  this.setShape();
}

View.prototype = {
  getShape: function(){
            this.fillTemplate(this.model, this.shape);
            return this.shape;
          },
  fillTemplate: function(data, shape_template){
      _.each(data, function(value, key){
          shape_template[key] = value;
      });
    },
  setShape: function(){  if(this.model.type ==="vertex"){
      this.shape = this.template.getVertexShape(this.model);
      var context = this;
      this.shape.bind("click", function(){
        vertex_selected.vertex = context.model;
        document.dispatchEvent(vertex_selected);
      });
    }
    else{ //must be an edge
      this.shape = this.template.getEdgeShape(this.model);
      var context = this;
      this.shape.bind("click", function(){
        edge_selected.edge = context.model;
        document.dispatchEvent(edge_selected);
      });
    }}
};

oldModule.View = View;
oldModule.setCanvas = function(canvas_id){
  canvas = oCanvas.create({canvas: canvas_id});
};



return oldModule;

})(GraphSim);
