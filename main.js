console.log("hello");
params = new URLSearchParams(window.location.search);

function drawNode(n, index) {
  pen.fillStyle="rgb(100,0,0)";
  if(n.isStart) {
    pen.fillStyle="rgb(0,255,0)";
  }
  if(n.isGoal) {
    pen.fillStyle="rgb(255,0,0)";
  }
  pen.beginPath();
  pen.ellipse(n.x,n.y,4,4,0,0,Math.PI*2);
  pen.font="20px serif"
  pen.fillText(index,n.x+5,n.y);
  pen.fill();
}
function h_cost(n,sum) {
  if(n.isStart) {return sum;}
  return sum+h_cost(n.parent,n.distTo(n.parent));
}
var canvas = document.getElementById('canvas');
var pen = canvas.getContext('2d');

const width=760;
const height=475;
pen.strokeStyle="rgb(0,255,0)";
pen.lineWidth=5;
var datas = [];


startingLocation=params.get("start");
endingLocation=params.get("end");
// Initialize the index in datas that will later become the index for the start and goal nodes
var start=0;
var goal=0;
if(startingLocation!="Commons" && startingLocation!="Main Office") {
    startingLocation=Number(startingLocation);
}
if(endingLocation!="Commons" && endingLocation!="Main Office") {
    endingLocation=Number(endingLocation);
}
        function onWindowChange() {
            var mapp = document.getElementById("map");
            v(roomToNode.get(startingLocation),roomToNode.get(endingLocation));
        }
window.onresize=onWindowChange;
window.onload = function() {onWindowChange();}
function mousePressed(e) {
    alert(e.clientX+","+e.clientY);
}


function getSmallestIndex(n) {
  var min=0;
  for(var i=0;i<n.length;i++) {
    if(n[i]<n[min]) {
      min=i;
    }
  }
  return min;
}
function raceToBottom(n) {
  if(n.isStart) {pen.fillStyle="rgb(0,255,0)";pen.beginPath();pen.arc(n.x,n.y,6,0,2*Math.PI);pen.fill();return n;}
  if(n.floor!=n.parent.floor) {return raceToBottom(n.parent);}
  pen.beginPath();
    //pen.setLineDash([10,10]);
  pen.moveTo(n.x,n.y);
  pen.lineTo(n.parent.x,n.parent.y);
  pen.stroke();
  return raceToBottom(n.parent);
}