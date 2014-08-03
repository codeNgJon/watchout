// // start slingin' some d3 here.

////////////global variables////////////////////

var collisions = 0;
var numEnemy = d3.selectAll(".enemy")[0].length;
var score = 0;
var highScore = 0;

function move(object){
 d3.selectAll(object)
  .data(randomPosition())
    .transition().ease('cubic-in-out')
      .style({
        top:function(d){return d.y + "px"},
        left:function(d){return d.x + "px"}
      });
}


function randomPosition(){
  var position = [];
  var yOffset = parseInt(d3.select('.game').style("top"));
  var xOffset = parseInt(d3.select('.game').style("left"));
  for(var i=0; i<numEnemy; i++){
    var style = {'x': xOffset+Math.random()*1450, 'y': yOffset+ Math.random()*550};
    position.push(style);
  }
  return position;
}

///////////////////Drag behavior//////////////////////


var drag = d3.behavior.drag()
  .on("drag", dragmove)

d3.select(".player")
  .call(drag)

d3.select('.player')
  .transition()

////////////////////////dragEnd/////////////////////
function dragmove(){
  var playerX = parseInt(d3.select(".player").style('left'));
  var playerY = parseInt(d3.select(".player").style('top'));

  var boardXmax = parseInt(d3.select(".game").style("left")) + parseInt(d3.select(".game").style("width"));
  var boardXmin = parseInt(d3.select(".game").style("left"));
  var boardYmax = parseInt(d3.select(".game").style("top")) + parseInt(d3.select(".game").style("height"));
  var boardYmin = parseInt(d3.select(".game").style("top"));

  console.log(" playerX: "+ playerX + " playerY: "+playerY + " boardXmax: "+ boardXmax
              +" boardXmin: "+ boardXmin + " boardYmax: "+ boardYmax + " boardYmin: "+boardYmin);

  if(playerX < boardXmax && playerX > boardXmin &&
     playerY < boardYmax && playerY > boardYmin)
  {
  d3.select(this)
    .style("left",((d3.event.sourceEvent.pageX) - this.offsetWidth/2)+"px")
    .style("top", ((d3.event.sourceEvent.pageY) - this.offsetHeight/2)+"px")
  } else {
      d3.select(this)
      .style("left",925+"px")
      .style("top", 500+"px")
  }
}

////////collision///////////////
function checkCollision() {
  var enemyX = checkX();
  var enemyY = checkY();

  var playerX = parseInt(d3.select(".player").style('left'));
  var playerY = parseInt(d3.select(".player").style('top'));

  var enemyR = parseInt(d3.select(".enemy").style("width"))/2;
  var playerR = parseInt(d3.select(".player").style("width"))/2;

  var radiusSum = enemyR + playerR;

  // //////////debug////////////
  // console.log("xArray: "+ enemyX);
  // console.log("yArray: " + enemyY);
  // console.log('playerX: '+ playerX + ' playerY: '+ playerY);
  // console.log('enemyR: '+enemyR + ' playerR: ' + playerR);

  for(var i = 0; i<numEnemy; i++){
    var distanceX = Math.pow(Math.abs(enemyX[i] - playerX), 2);
    var distanceY = Math.pow(Math.abs(enemyY[i] - playerY), 2);
    var distance = Math.sqrt(distanceX + distanceY);

    if(distance < radiusSum){
      d3.select(".game").style("background-color","rgba(255,51,51,0.5)");
      if(score > highScore){
        highScore = score;
        d3.select(".high").select("span").text(highScore);
      }
      score = 0;
      collisions++;
      d3.select(".collisions").select("span").text(collisions);
      d3.select(".current").select("span").text(0);
    } else {
    d3.select(".game").style("background-color", "rgba(255,255,255,0.5)");
   }
  }
}

/// general function for checking horizontal x for enemies
 function checkX () {
  var xArray = [];
  var enemy = d3.selectAll(".enemy");

  d3.selectAll(".enemy").each(function(){
    xArray.push(parseInt(d3.select(this).style('left')))})
    return xArray;
  }

// general function for checking vertical y for enemies
function checkY () {
  var yArray = [];
  var enemy = d3.selectAll(".enemy");

  d3.selectAll(".enemy").each(function(){
    yArray.push(parseInt(d3.select(this).style('top')))})
    return yArray;
  }

// keeping score
 function countScore () {
  score++;
  d3.select(".current").select("span").text(score);
 }

setInterval(countScore,100);
setInterval(checkCollision,100);
setInterval(function(){ return move(".image")},1000);
setInterval(function(){ return move(".kunai")},700);
setInterval(function(){ return move(".fireball")},1200)


