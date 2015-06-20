function Controller(graph, canvas){
  this.elements = [];
  this.canvas = canvas;
  this.idcounter = 0;
  this.graph = graph;

  document.addEventListener("model_added", this.render.bind(this));

};

Controller.prototype = {
  createView: function(model){
       var element = {id: this.idcounter++,  model: model, view: new View(model, template) };
       this.elements.push(element);
       return element;
  },
  render: function(event){
      var element = this.createView(event.model);
      var shape = element.view.getShape();
      this.canvas.addChild(shape);
    }
};
