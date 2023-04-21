// mapp is the image of the map itself. I need to fetch it so the canvas can know how big
// the map it's drawing over is. This ensures that it scales correctly
var mapp = document.getElementById("map");

// --- Helper Functions ---

// Given array n return the index of the smallest element
function getSmallestIndex(n) {
  var min=0;
  for(var i=0;i<n.length;i++) {
    if(n[i]<n[min]) {
      min=i;
    }
  }
  return min;
}

// Calculate the h-cost, given node n. Basically it backtracks, calculating the distance
// from the node n to the starting node along its current path (as layed out by the parents)
function h_cost(n,sum) {
  if(n.isStart) {return sum;}
  return sum+h_cost(n.parent,n.distTo(n.parent));
}

// Given node n, draw lines from n to the start node. This is called when A* reaches the ending node,
// at which point this function recursivly draws lines from each node to its parent until finally reaching
// the beggining
function raceToBottom(n) {
  if(n.isStart) {pen.fillStyle="rgb(0,255,0)";pen.beginPath();pen.arc(n.x,n.y,6,0,2*Math.PI);pen.fill();return n;}
  if(n.floor!=n.parent.floor) {return raceToBottom(n.parent);}
  pen.beginPath();
    //pen.setLineDash([10,10]);   <--- Optionally make line dotted, but marketting said it's bad
  pen.moveTo(n.x,n.y);
  pen.lineTo(n.parent.x,n.parent.y);
  pen.stroke();
  return raceToBottom(n.parent);
}

function v(startNode, endNode) {
    // Clean the canvas for future drawing
    pen.clearRect(0,0,canvas.width,canvas.height);
    
    // Map img/width
    var mapWidth=mapp.getBoundingClientRect().width;
    var mapHeight=mapp.getBoundingClientRect().height;
   
    
    // Initialize the datas array which will store all nodes
    var datas = [];
    
    // Here I load the main floor nodes into datas[], and set isStart and isGoal if they are the start/end.
    for(var i=0;i<NUMBER_OF_MAIN_FLOOR_NODES;i++) {
        // "nodes" is a map with the name of the node (a15 for example) as key and its coords as values.
        var coords=new node(nodes.get("a"+i)[0],nodes.get("a"+i)[1],false,false,"a",mapWidth,mapHeight);
        //drawNode(coords,i);  //<--- optionally draw the node to screen
    
        if(i==startNode.substring(1)&&startNode.charAt(0)=='a') {coords.isStart=true;var start =i;}
        if(i==endNode.substring(1)&&endNode.charAt(0)=='a') {coords.isGoal=true;var goal = i;}

        datas.push(coords);
    }
    // Load basement (The Pit) nodes
    for(var i=0;i<floorNodes.size;i++) {
        // "floorNodes" is a map with the name of the node (b7 for example) as key and its coords as values.
        var coords=new node(floorNodes.get("b"+i)[0],floorNodes.get("b"+i)[1],false,false,"b",mapWidth,mapHeight);
        //drawNode(coords,i);  //<--- optionally draw the node to screen
    
        if(i==startNode.substring(1)&&startNode.charAt(0)=='b') {coords.isStart=true;var start =i+NUMBER_OF_MAIN_FLOOR_NODES;}
        if(i==endNode.substring(1)&&endNode.charAt(0)=='b') {coords.isGoal=true;var goal = i+NUMBER_OF_MAIN_FLOOR_NODES;}

        datas.push(coords);
    }
    
    // Initialize all the neighbors. Having loaded nodes is great. Lets get them to know each other!
    
    for(var i=0;i<datas.length;i++) {
        // Grab neighbors from 'neighbors' map
        if(neighbors.has("a"+i)) {
            var neighbor=neighbors.get("a"+i);
        } else {
            
            var neighbor=neighbors.get("b"+(i-NUMBER_OF_MAIN_FLOOR_NODES));
        }
        
        for(var j=0;j<neighbor.length;j++) {
            // Add them to each nodes connections attribute
//            datas[i].connections.push(datas[neighbor[j].substring(1)]);
            var current=neighbor[j];
            // Add it to main floor node if 'a'
            if(current.charAt(0)=='a') {
                datas[i].connections.push(datas[neighbor[j].substring(1)]);
            } 
            // Add it to pit/lower wing floor node if 'b'
            else if(current.charAt(0)=='b') {
                
                datas[i].connections.push(datas[parseInt(neighbor[j].substring(1))+NUMBER_OF_MAIN_FLOOR_NODES]);
            }
        }
    }
            
            
        
                
            
        
        
    
    
    // Create open and closed arrays.
    //      *Open is for possible candidates to explore
    //      *Closed is for already visitied nodes
    var open = [];
    var closedd = [];
    
    // Add starting node to open. 
    open.push(datas[start]);
    
    // While loop. If it runs out of nodes in 'open' then it fails
    while(open.length!=0) {
        
        // Find smallest f cost in the open list and set it to currentNode
        var f_costs = [];
        for(var i=0;i<open.length;i++) {
                f_costs[i]=open[i].f_cost(datas[goal]);
        }
        var currentNode=open[getSmallestIndex(f_costs)];
        
        // Remove this node from the open list and add it to the closed list since it's now visited.
        open.splice(getSmallestIndex(f_costs),1);
        closedd.push(currentNode);
    
        
        // If it's the goal, call raceToBottom.
        if(currentNode.isGoal) {
            
            // Race to bottom backtracks from the goal using the parents to draw the line.
            
            raceToBottom(currentNode);
            // Draw a red circle at the end to signify it's the end
            pen.fillStyle="rgb(255,0,0)";pen.beginPath();pen.arc(currentNode.x,currentNode.y,6,0,2*Math.PI);pen.fill();
            return;
        }
    
        // Now it's time to add the explored nodes neighbors to the open list
        for(var i=0;i<currentNode.connections.length;i++) {
            // n is the current neighbor that is (possibly) being added to open
            var n = currentNode.connections[i];
            
    
            // Calculate it's f cost. I can't use the node's built in f cost function because
            // the f cost function uses the h cost function with requires an initialized parent.
            // But since this one hasn't been added to open yet, it doesn't have a parent. 
            // Thankfully, 'currentNode' DOES have a parent because it's coming from the open list.
            // In other words, only nodes in the open list have parents. The unexplored nodes don't
            // have parents, but they're coming from the open list and we know the distance between them.
            // We can't just give them all parents because we have to do check viability via the following if statements
            var n_Cost = h_cost(currentNode,0)+n.distTo(currentNode)+n.distTo(datas[goal]);
    
            if(open.filter(function(e){return e.floor==n.floor&&e.x==n.x&&e.y==n.y&&e.f_cost(datas[goal])<=n_Cost;}).length>0) {
                //Skip if OPEN list already has a node with this position and lower F cost
      
            }
            else if(closedd.filter(function(ee){return ee.floor==n.floor&&ee.x==n.x&&ee.y==n.y&&ee.f_cost(datas[goal])<=n_Cost;}).length>0) {
                //Skip if CLOSED list already had a node with this position and lower F cost
        

            } else {
                // Populate open list with new neighbors and set their parents to current node
                // Note how it's parent is being initialized. In addition to being how it draws the line,
                // it's also critical for the f cost calculation as seen in the n_Cost variable
                n.parent=currentNode;
                open.push(n);
        
            }
    
    
    
       
        }
    
  
    }
}