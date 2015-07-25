define(['./template'],function(Template){


var vertex_selected = new Event("vertex_selected");
var edge_selected = new Event("edge_selected");

var View = function(model, template){
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
    }},
  setHighlight: function(){
    this.shape.fill = "#109";
  },
  removeHighlight: function(){
    this.shape.fill = "#079";
  }
};





return View;

});
