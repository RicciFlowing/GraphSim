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

function View(model, template){
  this.model = model;
  this.template = template;
  this.shape = {};
}

View.prototype = {
  getShape: function(){
            if(this.model instanceof Vertex){
              this.shape = this.template.getVertexShape(this.model);
            }
            else{ //must be an edge
              this.shape = this.template.getEdgeShape(this.model);
            }
            this.fillTemplate(this.model, this.shape);
            return this.shape;
          },
  fillTemplate: function(data, shape_template){
      _.each(data, function(value, key){
          shape_template[key] = value;
      });
    }
};
