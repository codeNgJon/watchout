// start slingin' some d3 here.

function move(){
  var position = randomPosition();

  d3.select("svg").selectAll(".enemy")
  .data(position)
    .transition()
      .attr({
        cx: function(d){return d.x},
        cy: function(d){return d.y}
      });

}

function randomPosition(){
  var position = [];

  //return css object
  for(var i=0; i<4; i++){
    var style = {'x': Math.random()*500, 'y': Math.random()*500};
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
  .on("drag", dragmove);

d3.select(".player")
  .call(drag)


d3.select('.player')
  .transition()

//////////////GLOBAL VARIABLES//////////////
var collisions = 0;
var numEnemy = 4;
var score=0;
var highScore=0;

function checkCollision() {
  var enemyX = checkX();
  var enemyY = checkY();

  var playerX = d3.select(".player")[0][0].getAttribute('cx');
  var playerY = d3.select(".player")[0][0].getAttribute('cy');

//////////////// GET RADIUS DYNAMICALLY!!//////////////
  var enemyR = 10;
  var playerR = 10;

  var radiusSum = enemyR + playerR;

/////////////////DELETE THIS!!////////////////////////
  /*console.log("enemyX: "+ enemyX);
  console.log("enemyY: "+ enemyY);

  console.log("playerX: "+ playerX);
  console.log("playerY: "+ playerY);

  console.log("sum of radius: "+radiusSum);*/

  //check for collisions
  for(var i = 0; i<enemyX.length; i++){
    var distanceX = Math.pow(Math.abs(enemyX[i] - playerX), 2);
    var distanceY = Math.pow(Math.abs(enemyY[i] - playerY), 2);
    var distance = Math.sqrt(distanceX + distanceY);
    console.log("Distance: " + distance + " " + radiusSum);
    if(distance < radiusSum){
      if(score > highScore){
        highScore = score;
        d3.select(".high").select("span").text(highScore);
      }
      score = 0;
      collisions++;
      d3.select(".collisions").select("span").text(collisions);
      d3.select(".current").select("span").text(0);
    } else{
        //fill in later
    }

  }


}


 function checkX () {
  var xArray = [];
  var enemy = d3.select("svg").selectAll(".enemy");

  for(var i=0; i<enemy[0].length; i++){
    xArray.push(enemy[0][i].getAttribute('cx'));
  }

  return xArray;
 }

function checkY () {
  var yArray = [];
  var enemy = d3.select("svg").selectAll(".enemy");

  for(var i=0; i<enemy[0].length; i++){
    yArray.push(enemy[0][i].getAttribute('cy'));
  }

  return yArray;
 }

 function countScore () {
  score ++;
  d3.select(".current").select("span").text(score);
  console.log(score);
 }

setInterval(countScore,100);
setInterval(checkCollision,100);
setInterval(move, 1000);


