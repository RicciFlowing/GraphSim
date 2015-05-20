var NAMES = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,z];

function Point(x,y,id){
  this.x = x;
  this.y = y;
  this.id = id;
  this.name = NAMES[id % 24]
}
