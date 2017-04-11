const getCitiesForState = (state) => {
  fetch(`http://localhost:3000/api/v1/state-territory/${state.toUpperCase()}/incidents`)
  .then(response => response.json())
  .then(response => response.map(incident => incident.city))
  .then(cities => cities.filter((city, index, array) => {
    return array.indexOf(city) === index;
  }))
  .then(incidentCities => {
    return getCoordinatesForCities(state, incidentCities)
  })
  .then(response => console.log(response))
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
