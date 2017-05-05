const width = 900,
      height = 600;

const projection = d3.geoAlbersUsa()
    .scale(1125)

const path = d3.geoPath()
    .projection(projection);

const usMap = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const tooltip = d3.select("body")
		.append("div")
    .attr("class", "tooltip")

const x = d3.scaleLinear()
    .domain([0, 10])
    .rangeRound([600, 900]);

const color = d3.scaleThreshold()
    .domain(d3.range(1, 10))
    .range(d3.schemeGreys[9]);

const g = usMap.append("g")
    .attr("class", "key")
    .attr("transform", "translate(-575,575)");

const renderUS = (error, us, stateStats) => {
  usMap.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        if (stateStats.find(state => state.state === d.properties.name)) {
          const identifiedState = stateStats.find(state => state.state === d.properties.name)
          return color(d.rate = identifiedState.perYear)
        }
      })
      .on("click", clickState)

  usMap.insert("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => {
        return a !== b; }))
      .attr("class", "state-boundary")
      .attr("d", path);

  renderCities(stateAbbreviations)
  renderKey()
}

const renderKey = () => {
  g.selectAll("rect")
    .data(color.range().map((d) => {
        d = color.invertExtent(d)
        if (d[0] == null) d[0] = x.domain()[0];
        if (d[1] == null) d[1] = x.domain()[1];
        return d;
      }))
    .enter().append("rect")
      .attr("height", 8)
      .attr("x", (d) => x(d[0]))
      .attr("width",(d) => x(d[1]) - x(d[0]))
      .attr("fill", (d) => color(d[0]));

  g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -10)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .text("Shootings per million people, per year");
  g.call(d3.axisBottom(x)
      .tickSize(10)
      .tickFormat((x, i) => i ? x : x + "%")
      .tickValues(color.domain()))
        .select(".domain")
        .remove();
}

const plotCities = (state, response) => {
  usMap.selectAll(`circle.${state}`)
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
      .attr("fill", "tomato")
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

const clickState = (d) => {
  d3.selectAll('circle, rect, text, line, .caption, .states')
    .attr("class", "opaque")

  fetchStateRaceStats(nameToAbbreviation(d.properties.name))
}

const returnRaceStat = (ratios) => {
  for(var key in ratios) {
    return key + ' => ' + ratios[key]
  }
}

const renderStateStats = (response) => {
  g.append("text")
  .attr("class", "chart")
  .attr("x", 1200)
  .attr("y", -10)
  .attr("fill", "#000")
  .attr("text-anchor", "start")
  .text(returnRaceStat(response.ratios))
}

d3.queue()
  .defer(d3.json, "/data/us.json")
  .defer(d3.csv, "/data/state-poplulation-data.csv")
  .await(renderUS)
