define(function(){

function Action(controller){
  this.controller = controller;
};

Action.prototype = {
 init: function(){},
 shutdown: function(){},
 eventListener: function(){},
 customShutdown: function(){}
};

return Action;

});
