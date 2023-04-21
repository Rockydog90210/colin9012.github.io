
params = new URLSearchParams(window.location.search);


var canvas = document.getElementById('canvas');
var pen = canvas.getContext('2d');

const width=757;
const height=481;
pen.strokeStyle="rgb(0,255,0)";
pen.lineWidth=5;
var datas = [];


startingLocation=params.get("start");
endingLocation=params.get("end");
// Initialize the index in datas that will later become the index for the start and goal nodes

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