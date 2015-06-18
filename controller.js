function Controller(graph, canvas){
  this.elements = [];
  this.canvas = canvas;
  this.idcounter = 0;
  this.graph = graph;
};

Controller.prototype = {
  createViews: function(graph){
     this.elements = [];
     var list_of_models = _.union(this.graph.vertices , this.graph.edges);
     var context = this;                                                                  //Set context, because inside the function called by _.each the context is global
     _.each(list_of_models, function(model){
       var element = {id: this.idcounter++,  model: model, view: new View(model, template) };
       context.elements.push(element);
    });
  },
  render: function(){
        this.createViews(this.graph);
      _.each(this.elements, function(element){
          var shape = element.view.getShape();
          this.canvas.addChild(shape);
      });
    }
};
