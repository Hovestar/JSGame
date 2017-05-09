var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var keysDown = {};
addEventListener("keydown", function(e){keysDown[e.keyCode] = true;},false);
addEventListener("keyup", function(e){delete keysDown[e.keyCode];},false);


function drawMap(map,ctx){
  var n = map.length;
  var m = map[0].length;
  var dx = ctx.canvas.width/m;
  var dy = ctx.canvas.height/n;
  for(var i=0;i<n;i++)
  for(var j=0;j<m;j++){
    switch(map[i][j]) {
      case 0:
        ctx.fillStyle = "#FFF";
        break;
      case 1:
        ctx.fillStyle = "#000";
      break;
    }
    ctx.fillRect(j*dx,i*dy,dx,dy);
  }
}



function updateAgent(agent,modifier,map,otherLocs){
  var dy = 0;
  var dx = 0;
  if (38 in keysDown) {dy -= agent.speed * modifier;}//up
  if (40 in keysDown) {dy += agent.speed * modifier;}//down
  if (37 in keysDown) {dx -= agent.speed * modifier;}//left
  if (39 in keysDown) {dx += agent.speed * modifier;}//right
  //console.log(map[Math.floor(agent.x+0)][Math.floor(agent.y+0)]);
  var tmpx = Math.floor(agent.x+dx);
  var tmpy = Math.floor(agent.y+dy);
  var collide = (map[tmpy+0][tmpx+0] != 0) ||
                (map[tmpy+0][tmpx+1] != 0) ||
                (map[tmpy+1][tmpx+0] != 0) ||
                (map[tmpy+1][tmpx+1] != 0) || 
                (tmpy >= map.length) ||
                (tmpx >= map[0].length) ||
                (tmpx < 0) || (tmpy <0);
  if(!collide){
    agent.x += dx;
    agent.y += dy;
  }
  return agent;
}


function drawAgent(agent,ctx,map){
  var dx = ctx.canvas.width/map[0].length;
  var dy = ctx.canvas.height/map.length;
  ctx.fillStyle = "#0F0";
  ctx.fillRect(agent.x*dx,agent.y*dy,dx,dy);
}

function main(){
  var canvas = document.createElement("canvas");
  canvas.width = w.innerWidth-100;
  canvas.height = w.innerHeight-100;
  var ctx = canvas.getContext("2d");
  var agent = {"x":4.5,"y":3.790432,"speed":4};
  var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ]
  document.body.appendChild(canvas);
  requestAnimationFrame(function (){gameLoop(map,agent,ctx,Date.now());});
}

function gameLoop(map,agent,ctx,then){
  var now = Date.now();
  var delta = (now-then)/1000;
  agent = updateAgent(agent,delta,map,{});
  drawMap(map,ctx);
  drawAgent(agent,ctx,map);
  requestAnimationFrame(function (){gameLoop(map,agent,ctx,now);});
}

main();

