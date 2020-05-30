var flowerSize = 200;
var petalSize = 150;
var padding = 65;
var svg = d3.select('svg')
    //.style('left', flowerSize*2 + 'px')
    .append('g')
    .attr('transform', 'translate(' + [padding, padding] + ')');
/**************************************************************************/
//shape of the petal coordinates
var petalPaths = [
    ['M 0,0 C -5,-5 -5,-20 0,-25 C 5,-20 5,-5 0,0'],
];
/**************************************************************************/

//different scales
var targetColors = d3.scaleOrdinal()
    .domain(['Undergraduate Student', 'Graduate Student', 'Masters Student', 'PhD Student', 'Postdoc',
        'Faculty', 'Assistant Professor', 'Associate Professor', 'Professor', 'Administrative', 'Not Disclosed', 'K-12'
    ])
    .range(['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9',
        '#74add1', '#4575b4', '#313695', '#000'
    ]);

var perpColors = d3.scaleOrdinal()
    .domain(['Undergraduate Student', 'Graduate Student', 'Masters Student', 'PhD Student', 'Postdoc',
        'Faculty', 'Assistant Professor', 'Associate Professor', 'Professor', 'Administrative', 'Not Disclosed'
    ])
    .range(['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9',
        '#74add1', '#4575b4', '#313695'
    ]);

var flowerSizeScale = d3.scaleOrdinal()
    .domain(['Multiple', 'Elite Institution/Ivy League', 'Other R1', 'Small Liberal Arts College',
        'R2', 'Regional Teaching College', 'Other Research Agency', 'Other Type of School'
    ])
    .range(_.range(8));

/**************************************************************
 ** get incident data
 ******************************************************/
d3.json("https://raw.githubusercontent.com/mona2711/Data/master/data.json", function(error, data) {
    if (error) {
        return console.warn(error);
    }
    data = _.chain(data)
        .map(function(incident) {
            incident.gender = incident.gendersquash;
            incident.institute = incident.itype;
            return incident;
        }).value();
    /*})
d3.csv("https://raw.githubusercontent.com/mona2711/Data/master/maindata.csv",function(error,data){
  if (error) {
    return console.warn(error);
}
  data = _.chain(data)
    .map(function(incident) {
      incident.gender = incident.gendersquash;
      incident.institute = incident.itype;
      incident.Target =  incident.cleantarget;
      return incident;
    }).value();*/
    var flowers = svg.selectAll('g.flower')
        .data(_.values(data)).enter().append('g')
        .classed('flower', true)
        .attr('transform', function(d, i) {
            var scale = (((flowerSizeScale(d.institute))+1)*.3);
            var x = (i % 9) * petalSize;
            var y = Math.floor(i / 9) * petalSize;
           // return 'translate(' + x + ',' + y + ')';
            return 'translate(' + [x, y] +
            ')scale(' + scale + ')';

        });

    flowers.selectAll('path')
        .data(function(d) {
            //console.log(d3.map(data, function(d){return(d.cleantargetrole)}).keys())
            var petalsValue = (d.event.length) / 50;
            var numPetals = petalsValue;
            var path = petalPaths[0]
            var Tcolor = targetColors(d.cleantargetrole)
            return _.times(numPetals, function(i) {
                return {
                    angle: (360 / numPetals) * i,
                    path: path,
                    color: Tcolor,
                }
            });
        }).enter().append('path')
        .attr('stroke', '#000')
        //.attr('stroke-width', 2)
        .attr('fill', function(d) {
            return d.color
        })

        .attr('d', function(d) {
            return d.path
        })
        .attr('transform', function(d) {
            var cx = flowerSize / 100;
            var cy = flowerSize / 100;
            return 'translate(' + [cx, cy] +
                ')rotate(' + [d.angle] + ')';
        });


    flowers.append("circle") // attach a circle
        .attr("cx", 2) // position the x-centre
        .attr("cy", 2) // position the y-centre
        .attr("r", 28) // set the radius
        .style("fill", "none")
        .attr('stroke-width', 2)
        .attr("stroke", function(d) {
            return perpColors(d.cleanperprole)
        })

        .attr("stroke-dasharray", function(d) {
            if (d.gender == "Male") {
                return "0,0"
            }
            if (d.gender == "Female") {
                return "7,2"
            }
            if (d.gender == "Other") {
                return "2,2"
            }
        })

});