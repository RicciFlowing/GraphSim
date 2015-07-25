define(['./view'], function(View){

function Controller(graph, canvas, template){
  this.canvas = canvas;
  this.graph = graph;
  this.template = template;
  this.views = [];
  document.addEventListener("model_added", this.render.bind(this));
  document.addEventListener("model_removed", this.removeView.bind(this));
};

Controller.prototype = {
  createView: function(model){
       var view = new View(model, this.template);
       this.views.push(view);
       return view;
  },
  render: function(event){
      var view = this.createView(event.model);
      var shape = view.getShape();
      this.canvas.addChild(shape);
      if(view.model.type == "edge"){
        shape.zIndex = "back";
      }
    },
    redraw: function(){
      this.canvas.redraw();
    },

  highlight: function(model){
    var view = _.findWhere(this.views, {model: model});
    view.setHighlight();
    this.redraw();
  },
  removeHighlight: function(model){
    var view = _.findWhere(this.views, {model: model});
    view.removeHighlight();
    this.redraw();
  },
  removeAllHighlights: function(){
    _.each(this.views, function(view){
      if( view.model.type === "vertex"){
      view.removeHighlight();
    }
    });
    this.redraw();
  },
  removeView: function(event){
    var view = _.findWhere(this.views, {model: event.model});
    this.canvas.removeChild(view.getShape());
    this.views = _.difference(this.views);
    this.canvas.redraw();
  }


};

return Controller;

});
