GraphSim = (function(oldModule){

function Action(controller){
  this.controller = controller;
};

Action.prototype = {
 init: function(){},
 shutdown: function(){},
 eventListener: function(){},
 customShutdown: function(){}
};

function ActionFactory(controller){
  this.controller = controller;
};


ActionFactory.prototype = {
  getAction: function(events){
    if (typeof events === 'string') {events = [events];}
    var action = new Action(this.controller);
    action.init = function(){
      var context = this;
      this.actualListener = this.eventListener.bind(action);
      _.each(events, function(event){
        document.addEventListener(event, context.actualListener);
      });
    };
    action.shutdown = function(){
      this.customShutdown();
      var context = this;
        _.each(events, function(event){
          document.removeEventListener(event, context.actualListener);
        });
      this.controller.removeAllHighlights();
    };
    return action;
  }
};

oldModule.getActionFactory = function(controller){return new ActionFactory(controller)};


return oldModule;

})(GraphSim);
