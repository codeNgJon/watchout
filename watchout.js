// start slingin' some d3 here.

function move() {

 d3.selectAll(".enemy")
  .data(randomPosition())
    .transition('slow')
      .style({
        top:function(d){return d.x + "px"},
        left:function(d){return d.y + "px"}
      });
}


function randomPosition(){
  var position = [];

  for(var i=0; i<numEnemy; i++){
    var style = {'x': Math.random()*800, 'y': Math.random()*700};
    position.push(style);
  }

  return position;
}

function dragmove(){
  d3.select(this)
    .attr("cx", ((d3.event.sourceEvent.pageX) - this.offsetWidth/2))
    .attr("cy", ((d3.event.sourceEvent.pageY) - this.offsetHeight/2))
}

var drag = d3.behavior.drag()
  .on("drag", dragmove)

d3.select(".player")
  .call(drag)

d3.select('.player')
  .transition()

var collisions = 0;
var numEnemy = 6;
var score=0;
var highScore=0;

function checkCollision() {
  var enemyX = checkX();
  var enemyY = checkY();

  var playerX = d3.select(".player")[0][0].getAttribute('cx');
  var playerY = d3.select(".player")[0][0].getAttribute('cy');

  var enemyR = parseInt(d3.select(".enemy").style("width"))/2;
  var playerR = parseInt(d3.select(".player")[0][0].getAttribute('r'));

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

    // console.log("Distance: " + distance + " " + radiusSum);

    if(distance < radiusSum){
      if(score > highScore){
        highScore = score;
        d3.select(".high").select("span").text(highScore);
      }
      score = 0;
      collisions++;
      d3.select(".collisions").select("span").text(collisions);
      d3.select(".current").select("span").text(0);
    }
  }

}


 function checkX () {
  var xArray = [];
  var enemy = d3.selectAll(".enemy");

    d3.selectAll(".enemy").each(function(){
    xArray.push(parseInt(d3.select(this).style('left')))})

  return xArray;
 }

function checkY () {
  var yArray = [];
  var enemy = d3.selectAll(".enemy");

  d3.selectAll(".enemy").each(function(){
    yArray.push(parseInt(d3.select(this).style('top')))})

  return yArray;
 }

 checkY();

 function countScore () {
  score ++;
  d3.select(".current").select("span").text(score);
 }

setInterval(countScore,100);
setInterval(checkCollision,100);
setInterval(move, 1000);


