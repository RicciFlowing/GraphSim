define(['./action'],function(action_mod){
function ActionFactory(controller){
  this.controller = controller;
};


ActionFactory.prototype = {
  getAction: function(events){
    if (typeof events === 'string') {events = [events];}
    var action = new action_mod(this.controller);
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


return ActionFactory;
});
