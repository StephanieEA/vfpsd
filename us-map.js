const width = 960,
    height = 500;

const projection = d3.geoAlbersUsa()
    .scale(1000)

const path = d3.geoPath()
    .projection(projection);

const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("http://bl.ocks.org/mbostock/raw/4090846/us.json", (error, us) => {
  if (error) throw error;
  svg.insert("path", ".graticule")
        .datum(topojson.feature(us, us.objects.land))
        .attr("class", "land")
        .attr("d", path);

  svg.insert("path", ".graticule")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => { return a !== b; }))
      .attr("class", "state-boundary")
      .attr("d", path);

  var spaceCircles = [[30, 30], [70, 70], [110, 110]];

  svg.selectAll("circle")
  		.data(spaceCircles)
      .enter()
  		.append("circle")
  		.attr("cx", d => d[0])
  		.attr("cy", d => d[1])
  		.attr("r", 5)
  		.attr("fill", "red")



  });


  // d3.map(getCitiesForState('AK'), data => {
  //   svg.selectAll('circle')
  //     .data(data)
  //     .enter()
  //     .append('circle')
  //     .attr("cx", function(d) {
  //       return projection([d.lon, d.lat])[0];
  //     })
  //     .attr("cy", function(d) {
  //       return projection([d.lon, d.lat])[1];
  //     })
  //     .attr("r", 5)
  //     .style("fill", black)
  //     .style("opacity", 0.85)
  // })
// });

// getCitiesForState('GA')
