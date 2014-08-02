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
    .attr("cx", ((d3.event.sourceEvent.pageX) - this.offsetWidth/2)+"px")
    .attr("cy", ((d3.event.sourceEvent.pageY) - this.offsetHeight/2)+"px")
}

var drag = d3.behavior.drag()
  .on("drag", dragmove);

d3.select(".player")
  .call(drag)


d3.select('.player')
  .transition()
  .tween('custom', checkCollision);


var collision = false;
var numEnemy = 4;

function checkCollision() {
  var enemyX = checkX();
  var enemyY = checkY();

  var playerX = d3.select(".player")[0][0].getAttribute('cx');
  var playerY = d3.select(".player")[0][0].getAttribute('cy');

  console.log("enemyX: "+ enemyX);
  console.log("enemyY: "+ enemyY);

  console.log("playerX: "+ playerX);
  console.log("playerY: "+ playerY);
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

setInterval(checkCollision,1000);
setInterval(move, 1000);


