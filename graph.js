var Corner = Backbone.Model.extend({
  defaults:  {
    type: 'corner'
  }
});
var Edge   = Backbone.Model.extend({
  defaults:  {
    type: 'edge'
  }
});
var Part   = Backbone.Model.extend({
  model: function(attr,options){
       switch(attr.type){
           case 'corner':
               return new Corner(attr,options);
               break;
           case 'edge':
               return new Edge(attr,options);
               break;
       }
   }
});

var Graph  = Backbone.Collection.extend({model: Part});

var graph1 = new Graph();
var p = new Corner({ x : 1 , y: 2});
graph1.add(p);
console.log(graph1.length);
