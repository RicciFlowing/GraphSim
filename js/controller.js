GraphSim = (function(oldModule){

function Controller(graph){
  this.elements = [];
  this.idcounter = 0;
  this.graph = graph;

  document.addEventListener("model_added", this.render.bind(this));

};

Controller.prototype = {
  createView: function(model){
       var element = {id: this.idcounter++,  model: model, view: new GraphSim.View(model) };
       this.elements.push(element);
       return element;
  },
  render: function(event){
      var element = this.createView(event.model);
      var shape = element.view.getShape();
      GraphSim.canvas.addChild(shape);
      if(element.model.type == "edge"){
        shape.zIndex = "back";
      }
    }
};

oldModule.controller = new Controller(GraphSim.getGraph());

return oldModule;

})(GraphSim);
