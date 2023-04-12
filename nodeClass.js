class node {
  constructor(x,y,start=false,end=false,floor="a",canvasWidth,canvasHeight) {
    this.x=canvasWidth*x/757;
    this.y=canvasHeight*y/481;
    this.isStart=start;
    this.isGoal=end;
    this.connections=[];
    this.parent;
    this.gscore;
    this.floor=floor;
  }
  distTo(n) {
    // If two nodes are right on top of each other, return 0.1, an estimation of the length of the stairwell
    if(this.floor!=n.floor) {return 10;}
      
    // Otherwise just use pythagorean theorem
    return Math.sqrt(Math.pow(n.x-this.x,2)+Math.pow(n.y-this.y,2));
  }
  f_cost(end) {
    if(this.isStart) {return 0;}
    var gCost = end.distTo(this);
    var hCost = h_cost(this,0);
    
    return gCost+hCost;
  }
  equals(n) {
    if(this.x==n.x && this.y==n.y) {return true;}
    return false;
  }
}