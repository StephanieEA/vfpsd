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


// const renderMap = () => {
//   d3.json("http://bl.ocks.org/mbostock/raw/4090846/us.json", (error, us) => {
//     if (error) throw error;
//     // plotUS(us)
//   })
// }

const plotUS = (us) => {
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
}

const renderCities = () => {
  return stateAbbreviations.forEach(state => getCitiesForState(state))
}

const plotCities = (response) => {
  const cityCoordinates = response.map(cities => Object.values(cities))
  svg.selectAll("circle")
      .data(
        cityCoordinates
      )
      .enter()
      .append("circle")
      .attr("cx", d => {
        return projection([d[0].longitude, d[0].latitude])[0]
      })
      .attr("cy", d => {
        return projection([d[0].longitude, d[0].latitude])[1]
      })
      .attr("r", 4.25)
      .attr("fill", "red")
      .style("opacity", 0.15)
  return response
}


d3.queue()
  .defer(d3.json, "http://bl.ocks.org/mbostock/raw/4090846/us.json")
  .await(function(error, us) {
    if (error) throw error;
    plotUS(us)
    renderCities()
  });
