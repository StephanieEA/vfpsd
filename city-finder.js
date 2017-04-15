const getCitiesForState = (state) => {
  return fetch(`http://localhost:3000/api/v1/state-territory/${state.toUpperCase()}/incidents`)
    .then(response => response.json())
    .then(response => response.map(incident => incident.city))
    .then(cities => cities.filter((city, index, array) => {
      return array.indexOf(city) === index
    }))
    .then(incidentCities => {
      return getCoordinatesForCities(state, incidentCities)
    })
    .then(response => {
      const cityCoordinates = response.map(cities => Object.values(cities))
      svg.selectAll("circle")
          .data(
            cityCoordinates
          )
          .enter()
          .append("circle")
          .attr("cx", d => {
            console.log(`x : ${d[0].longitude}`)
            console.log(`y : ${d[0].latitude}`)
            return projection([d[0].longitude, d[0].latitude])[0]
          })
          .attr("cy", d => {
            return projection([d[0].longitude, d[0].latitude])[1]
          })
          .attr("r", 4.25)
          .attr("fill", "red")
          .style("opacity", 0.15)
      return response
    })
    .catch(error => console.log(error))
}

const getCoordinatesForCities = (state, incidentCities) => {
  return fetch(`http://api.sba.gov/geodata/city_links_for_state_of/${state}.json`)
    .then(response => response.json())
    .then(response => {
      return response.map(cities => {
        if (incidentCities.indexOf(cities.name) !== -1) {
          return Object.assign({}, { [cities.name] : {
            latitude: cities.primary_latitude,
            longitude: cities.primary_longitude
            }
          })
        } else {
          return false
        }
      })
    })
    .then(cities => cities.filter(city => city !== false))
    .catch(error => console.log(error))
}
