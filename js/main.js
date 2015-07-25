requirejs.config({
    baseUrl: 'js',
    paths: {
      actions: 'actions'
    }
});

// Start the main app logic.
requirejs([ 'graphsim'],
function(graphsim) {
 window.GraphSim = graphsim;
});
