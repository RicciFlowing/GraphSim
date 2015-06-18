var canvas = oCanvas.create({canvas: "#canvas"});

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

var template = new Template(canvas);

var point_selected = new Event("point_selected");
var vertex_selected = new Event("vertex_selected");
var edge_selected = new Event("edge_selected");

canvas.bind("click", function(){
  point_selected.point = {x: canvas.mouse.x, y: canvas.mouse.y};
  document.dispatchEvent(point_selected);
});

function View(model, template){
  this.model = model;
  this.template = template;
  if(this.model instanceof Vertex){
    this.shape = this.template.getVertexShape(this.model);
    this.shape.bind("click", function(){
      vertex_selected.vertex = this.model;
      document.dispatchEvent(vertex_selected);
    });
  }
  else{ //must be an edge
    this.shape = this.template.getEdgeShape(this.model);
    this.shape.bind("click", function(){
      edge_selected.edge = this.model;
      document.dispatchEvent(edge_selected);
    });
  }

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
    }
};
