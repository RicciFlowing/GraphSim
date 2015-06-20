function Controller(graph, canvas){
  this.elements = [];
  this.canvas = canvas;
  this.idcounter = 0;
  this.graph = graph;

  document.addEventListener("model_added", this.createView.bind(this));

};

Controller.prototype = {
  createView: function(event){
       var element = {id: this.idcounter++,  model: event.model, view: new View(event.model, template) };
       this.elements.push(element);
       this.render();
  },
  render: function(){
      _.each(this.elements, function(element){
          var shape = element.view.getShape();
          this.canvas.addChild(shape);
      });
    }
};
