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
    .domain([1, 3])
    .rangeRound([600, 860]);

var color = d3.scaleThreshold()
        .domain(d3.range(2, 5))
        .range(d3.schemeGreys[3]);

var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(0,50)");

const renderUS = (error, us, statePopulations) => {
  svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        if (statePopulations.find(state => state.state === d.properties.name)) {
          const indentifiedState = statePopulations.find(state => state.state === d.properties.name)
          const population = Number(indentifiedState.population.replace(/,/g,''))
          // console.log(Math.random() * 3 + 1)
          return color(d.rate =         Math.random() * 3 + 1) 
            //returns what I want
            // fetch(`http://localhost:3000/api/v1/state-territory/${nameToAbbreviation(d.properties.name)}/incidents`)
            //   .then(response => response.json())
            //   .then(response => {
            //     let filtered = response.filter(response => response.date.includes('2017-'))
            //     return (filtered.length*1000000)/population
            //   })
            //   .then(response => {
            //     console.log(response)
            //     return parseFloat(response)
            //   })
          // )
        }
      })

  svg.insert("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => {
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

  g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -7)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("Shootings per million people");

  g.call(d3.axisBottom(x)
      .tickSize(10)
      .tickFormat(function(x, i) { return i ? x : x + "%"; })
      .tickValues(color.domain()))
    .select(".domain")
      .remove();

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
      .style("opacity", 0.25)
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
  .defer(d3.csv, "/data/state-poplulation-data.csv")
  .await(renderUS)
