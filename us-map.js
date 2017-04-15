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

  svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);

  svg.insert("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => {
        return a !== b; }))
      .attr("class", "state-boundary")
      .attr("d", path);
});

getCitiesForState('ca')
