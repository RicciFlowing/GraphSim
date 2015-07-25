define(function(){

function UserInterface(controller){
  this.controller = controller;
  this.actions = {};
  this.current_action  = undefined;
};


UserInterface.prototype = {
  setAction: function(action_string){
    var action = this.actions[action_string];
    if( this.current_action !== undefined){
      this.current_action.shutdown();
    }
    action.init();
    this.current_action = action;
  },
  registerAction: function(action_name, action){
    this.actions[action_name] = action;
  }
};


return UserInterface;

});
