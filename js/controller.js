GraphSim = (function(oldModule){

function Controller(graph){
  this.views = [];
  this.graph = graph;
  document.addEventListener("model_added", this.render.bind(this));
};

Controller.prototype = {
  createView: function(model){
       var view = new GraphSim.View(model);
       this.views.push(view);
       return view;
  },
  render: function(event){
      var view = this.createView(event.model);
      var shape = view.getShape();
      GraphSim.canvas.addChild(shape);
      if(view.model.type == "edge"){
        shape.zIndex = "back";
      }
    },
    redraw: function(){
      GraphSim.canvas.redraw();
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


};

oldModule.controller = new Controller(GraphSim.getGraph());

return oldModule;

})(GraphSim);
