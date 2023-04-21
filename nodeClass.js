class node {
  constructor(x,y,start=false,end=false,floor="a",canvasWidth,canvasHeight) {
    // Scaling x and y to map. I created the initial coords based on a 757x481 map,
    // so I divide the x by that number to get a percentage of the screen, then multiply
    // it by the current canvas width/height
    this.x=canvasWidth*x/757;
    this.y=canvasHeight*y/481;
    this.isStart=start;
    this.isGoal=end;
    this.connections=[];
    this.parent;
    this.floor=floor;
  }
  distTo(n) {
    // If two nodes are right on top of each other, return 10, an arbitrary (but importantly non-zero) estimation of the length of the stairwell
    if(this.floor!=n.floor) {return 10;}
      
    // Otherwise just use pythagorean theorem
      // NOTE: If the digital map given isn't scaled to reality correctly, this estimation will be off. Oh well.
    return Math.sqrt(Math.pow(n.x-this.x,2)+Math.pow(n.y-this.y,2));
  }
  f_cost(end) {
    if(this.isStart) {return 0;}
    var gCost = end.distTo(this);
    var hCost = h_cost(this,0);
    
    return gCost+hCost;
  }
  // Helper function to check if two nodes are in the same place
  equals(n) {
    if(this.x==n.x && this.y==n.y) {return true;}
    return false;
  }
}