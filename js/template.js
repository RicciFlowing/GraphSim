define(function(){
  function Template(canvas){
    this.canvas = canvas;
  };

  Template.prototype ={
    getVertexShape: function(){
      return this.canvas.display.ellipse({
            radius: 15,
            fill: "#079"
          });
    },
    getEdgeShape: function(){
       return this.canvas.display.line({
        stroke: "3px #079",
        cap: "round"
      });
    }
  };

  return Template;
});
