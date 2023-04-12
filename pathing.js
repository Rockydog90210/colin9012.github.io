var mapp = document.getElementById("map");
function v(startNode, endNode) {
    // Clean the canvas for future drawing
    pen.clearRect(0,0,canvas.width,canvas.height);
    
    // Map img/width
    var mapWidth=mapp.getBoundingClientRect().width;
    var mapHeight=mapp.getBoundingClientRect().height;
    
    
    // Initialize the datas array which will store all nodes
    var datas = [];
    
    // Here I load the nodes into datas[], and set isStart and isGoal if they are.
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
        // "nodes" is a map with the name of the node (a15 for example) as key and its coords as values.
        var coords=new node(floorNodes.get("b"+i)[0],floorNodes.get("b"+i)[1],false,false,"b",mapWidth,mapHeight);
        //drawNode(coords,i);  //<--- optionally draw the node to screen
    
        if(i==startNode.substring(1)&&startNode.charAt(0)=='b') {coords.isStart=true;var start =i+NUMBER_OF_MAIN_FLOOR_NODES;}
        if(i==endNode.substring(1)&&endNode.charAt(0)=='b') {coords.isGoal=true;var goal = i+NUMBER_OF_MAIN_FLOOR_NODES;}

        datas.push(coords);
    }
    
    // Initialize all the neighbors. Having loaded nodes is great. Lets get them to know each other!
    
    // TODO: Make this loop load basement nodes
    
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
            if(current.charAt(0)=='a') {
                datas[i].connections.push(datas[neighbor[j].substring(1)]);
            } 
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
        //      *also, this .splice() caused me an issue that took a day to resolve. Why must I specify one?!
        open.splice(getSmallestIndex(f_costs),1);
        closedd.push(currentNode);
    
        
        // If it's the goal, log it and call raceToBottom.
        if(currentNode.isGoal) {
            console.log("Found goal!");
            // Race to bottom backtracks from the goal using the parents to draw the line.
            
            raceToBottom(currentNode);
            pen.fillStyle="rgb(255,0,0)";pen.beginPath();pen.arc(currentNode.x,currentNode.y,6,0,2*Math.PI);pen.fill();
            return;
        }
    
        // Now it's time to add the explored nodes neighbors to the open list
        for(var i=0;i<currentNode.connections.length;i++) {
            // n is the current neighbor that is (possibly) being added to open
            var n = currentNode.connections[i];
            
    
            // Calculate it's f cost. I can't use the node's built in f cost function because
            // the f cost function uses the h cost function with requires an initialized parent
            // But since this one hasn't been added to open yet, it doesn't have a parent. 
            // Thankfully, currentNode DOES have a parent because it's coming from the open list.
            var n_Cost = h_cost(currentNode,0)+n.distTo(currentNode)+n.distTo(datas[goal]);
    
            if(open.filter(function(e){return e.floor==n.floor&&e.x==n.x&&e.y==n.y&&e.f_cost(datas[goal])<=n_Cost;}).length>0) {
                //Skip if open list already has a node with this position and lower F cost
      
            }
            else if(closedd.filter(function(ee){return ee.floor==n.floor&&ee.x==n.x&&ee.y==n.y&&ee.f_cost(datas[goal])<=n_Cost;}).length>0) {
                //Skip if CLOSED list already had a node with this position and lower F cost
        

            } else {
                // Populate open list with new neighbors and set their parents to current node
                // Note how it's parent is being initialized, in addition to being how it draws the line,
                // it's also critical for the f cost calculation as seen in the n_Cost
                n.parent=currentNode;
                open.push(n);
        
            }
    
    
    
       
        }
    
  
    }
}