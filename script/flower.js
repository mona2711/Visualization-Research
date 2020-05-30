var padding = 10;
var svg = d3.select('svg')
  .append('g')
  .attr('transform', 'translate(' + [30, 30] + ')');

// Define the gradient
var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

// Define the gradient colors
gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "#FF8C00")
    .attr("stop-opacity", 1);

gradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "#FF0080")
    .attr("stop-opacity", 1);




var flowerSize = 180;
var petalSize = 150;
var numPetals = 8;
var petalPaths = [
[
  'M 0,0 C -5,-5 -5,-20 0,-25 C 5,-20 5,-5 0,0'
],[
  'M 0,0 C -10,-10 -10,-20 0,-25 C 10,-20 10,-10 0,0'
],
[
  'M 0,0 C 5, 5 5,20 0,20 C -5,20 -5,5 0,0'
],[
  'M 0,0 C 10, 10 10,20 0,20 C -10,20 -10,10 0,0'
],
[
  'M 0,0 C 5,8 5,14 4,20 L0,16 L-10,20 C-5, 14 -5,8 0,0'
],[
  'M0,0',
  'C10,8 10,14 4,20',
  'L0,17',
  'L-4,20',
  'C-10,14 -10,8 0,0'
],
['M0,0',
'C5,8 5,14 4,20',
'L0,17',
'L-4,20',
'C-5,14 -5,8 0,0'
],
[
  'M-7,0',
      'C-5,5 5,5 7,0',
      'C10,5 5,14 0,20',
      'C-5,14 -10,5 -7,0'
],[
'M-7,0',
'C-10,10 10,10 7,0',
'C10,10 10,14 0,20',
'C-10,14 -10,10 -7,0'
]
];


var flowers = svg.selectAll('g.flower')
  .data(petalPaths).enter().append('g')
  .classed('flower', true)
  .attr('transform', function(d, i) {
    var x = (i%3) * petalSize;
    var y = Math.floor(i/3) * petalSize;
    return 'translate(' + x + ',' + y + ')';
  });

flowers.selectAll('path')
  .data(function(d) {
    // for each flower, draw the petal 6 times
    return _.times(numPetals, function(i) {
      return {
        angle: (360/numPetals) * i,
        d: d
      }
    });
  }).enter().append('path')
  .attr('stroke', '#000')
   .attr('stroke-width', 1)
   .attr('fill', 'url(#gradient)')
   .attr('d', function(d) {return d.d})
  .attr('transform', function(d) {
    var cx = flowerSize/2 ;
    var cy = flowerSize/2;
    return 'translate(' + [cx, cy] +
      ')rotate(' + [d.angle] + ')';
  });

  flowers.append("circle")        // attach a circle
    .attr("cx", 90)           // position the x-centre
    .attr("cy", 90)           // position the y-centre
    .attr("r", 28)             // set the radius
    .style("stroke", "#2166ac")    // set the line colour
    .attr('stroke-width', 2)
    .style("stroke-dasharray", ("3,2")) // make the stroke dashed
    .style("fill", "none");
        // set the fill colour



