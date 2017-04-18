const width = 900,
      height = 600;

const projection = d3.geoAlbersUsa()
    .scale(1125)

const path = d3.geoPath()
    .projection(projection);

const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const tooltip = d3.select("body")
		.append("div")
    .attr("class", "tooltip")

// Define scale for output
var x = d3.scaleLinear()
    .domain([1, 10])
    .rangeRound([600, 860]);

var color = d3.scaleThreshold()
        .domain(d3.range(2, 10))
        .range(d3.schemeBlues[9]);

var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(0,40)");

const renderUS = (error, us, statePopulations) => {
  console.log(us.objects.states.geometries.map(states => states.properties.name))

  svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states.geometries))
      // .data(us.features)
      // .data(topojson.feature(us, us.geometry.coordinates).features)
      .enter().append("path")
      .attr("fill", (d) => {
        console.log(d)
        console.log(statePopulations)
        console.log(statePopulations.find(state => state.state === d.id))
        color(d.rate = statePopulations)})
      .attr("d", path);

  svg.insert("path")
      .datum(topojson.mesh(us, us.objects.states.geometries, (a, b) => {
        return a !== b; }))
      .attr("class", "state-boundary")
      .attr("d", path);

  g.selectAll("rect")
    .data(color.range().map(function(d) {
        d = color.invertExtent(d);
        if (d[0] == null) d[0] = x.domain()[0];
        if (d[1] == null) d[1] = x.domain()[1];
        return d;
      }))
    .enter().append("rect")
      .attr("height", 8)
      .attr("x", function(d) { return x(d[0]); })
      .attr("width", function(d) { return x(d[1]) - x(d[0]); })
      .attr("fill", function(d) { return color(d[0]); });

  renderCities(stateAbbreviations)
}

const plotCities = (state, response) => {
  svg.selectAll(`circle.${state}`)
      .data(response)
      .enter()
      .append("circle")
      .attr("class", `${state}`)
      .attr("cx", d => {
        return projection([Object.values(d)[0].longitude, Object.values(d)[0].latitude])[0]
      })
      .attr("cy", d => {
        return projection([Object.values(d)[0].longitude, Object.values(d)[0].latitude])[1]
      })
      .attr("r", 3)
      .attr("fill", "red")
      .style("opacity", 0.15)
      .on("mouseover", (d) => {
        tooltip.transition()
         .duration(200)
         .style("opacity", 1);
        tooltip.html(`<p class="tooltip city">${Object.keys(d)[0]}<p/>
                    ${Object.values(d)[0].count}`)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY) + "px");
      })
      .on("mouseout", (d) => {
          tooltip.transition()
             .duration(500)
             .style("opacity", 0);
      });
}

d3.queue()
  .defer(d3.json, "/data/us.json")
  // .defer(d3.json, "https://bl.ocks.org/mbostock/raw/2206489/7110de3d8412433d3222c9b7e3ac6593593162b2/us-states.json")
  // .defer(d3.json, "http://bl.ocks.org/mbostock/raw/4090846/us.json")
  .defer(d3.csv, "/data/state-poplulation-data.csv")
  .await(renderUS)
