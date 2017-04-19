const renderCities = (states) => {
  return states.forEach(state => {
    return fetch(`/api/v1/state-territory/${state}/incidents`)
    .then(response => response.json())
    .then(response => countCityIncidents(response))
    .then(incidentCities => assignCityData(state, incidentCities))
    .then(response => plotCities(state, response))
    .catch(error => console.log(error))
  })
}

const assignCityData = (state, incidentCities) => {
  return fetch(`//api.sba.gov/geodata/city_links_for_state_of/${state}.json`)
    .then(response => response.json())
    .then(response => {
      return response.map(cities => {
        if (incidentCities[cities.name]) {
          return Object.assign({}, { [cities.name] : {
            latitude: cities.primary_latitude,
            longitude: cities.primary_longitude,
            count: incidentCities[cities.name]
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
