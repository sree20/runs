var WIDTH = 800;
var HEIGHT = 500;



d3.select('svg')
.attr('width',WIDTH)
.attr('height',HEIGHT);

var lastTransform = null;
var yScale = d3.scaleLinear();
var xScale = d3.scaleTime();

yScale.range([HEIGHT,0]);
yScale.domain([100,500]);
console.log(yScale.range());
console.log(yScale.domain());

console.log(yScale(2.5));
console.log(yScale.invert(250));

xScale.range([0,WIDTH]);
xScale.domain([new Date('2016-1-1'),new Date('2016-5-1')]);
console.log("Xscale Values")
console.log(xScale(new Date('2016-2-1')));

var leftAxis = d3.axisLeft(yScale);
d3.select('svg').append('g').attr('id',"y-axis").call(leftAxis);

var bottomAxis = d3.axisBottom(xScale);
d3.select('svg').append('g').attr('id',"x-axis").attr('transform','translate(0,' + HEIGHT + ')').call(bottomAxis);

var render = function(){
  d3.json('/runs',function(error,data){
    var circles =   d3.select('#points').selectAll('circle').data(data,function(d){
      return d.id;
    });


  circles.enter()
  .append('circle')
  .attr('cx',function(datum,index){
    return xScale(new Date(datum.date));
  })
  .attr('cy',function(datum,index){
    return yScale(datum.distance);
  });

  circles.exit().remove();
  d3.selectAll('circle').on('click',function(datum,index){
    d3.event.stopPropagation();
    d3.request('/runs/'+datum.id)
      .header("content-type","application/json")
      .send('DELETE',render);
  //  console.log(datum);
  //  console.log(index);
  //  console.log(this);
  //  console.log(d3.select(this));
  });
});

var dragEnd = function(d){
var x = d3.event.x;
var y = d3.event.y;

var date = xScale.invert(x);
var distance = yScale.invert(y);
 console.log("date:"+date +"distance:"+distance);
d.date = date;
d.distance = distance;

d3.request('/runs/'+d.id)
  .header("content-type","application/json")
  .send('PUT',JSON.stringify(d),render);
}

var dragStart = function(d){

}

var drag = function(d){
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr('cx',x);
  d3.select(this).attr('cy',y);
}
var dragBehaviour = d3.drag().on('start',dragStart)
                    .on('drag',drag)
                    .on('end',dragEnd);
  d3.selectAll('circle').call(dragBehaviour);

};
render();


var zoomCallback = function(){
  lastTransform = d3.event.transform;
  d3.select('#points').attr("transform",d3.event.transform);
  d3.select('#x-axis').call(bottomAxis.scale(d3.event.transform.rescaleX(xScale)));
      d3.select('#y-axis').call(leftAxis.scale(d3.event.transform.rescaleY(yScale)));

}
var zoom = d3.zoom().on('zoom',zoomCallback);
d3.select('svg').call(zoom);


d3.select('svg').on('click',function(){
  console.log(d3.event);
 var x = d3.event.offsetX;
 var y = d3.event.offsetY;

if(lastTransform !== null){
  x = lastTransform.invertX(d3.event.offsetX);
  y = lastTransform.invertY(d3.event.offsetY);
}


  var distance = yScale.invert(y);
  var date = xScale.invert(x);
  console.log('distance:'+ distance + 'date:'+ date);
var runObject = {
                  distance: distance,
                  date: date
                };
d3.request('/runs')
  .header("content-type","application/json")
  .post(
    JSON.stringify(runObject),
    render
  );


});





// console.log(d3.select('span').classed('awesome'));
// d3.select('main').append('selection')
// .html('<div>hello</div');
//
// d3.select('span').classed('awesome',false).
// classed('super-awesome','true').append('span').
// html('<h1>spam</h1>');


// var divspan = d3.selectAll('div').attr('foo','bar')
//                .selectAll('span');
//
//   divspan.html('foo')
//           .style('color','red')
//           .style('font-size','40px');
//
//
// //var h1 = d3.select('h1');
// //var divs = d3.selectAll('div');
// //divs.html('foo');
// console.log(h1.html());
