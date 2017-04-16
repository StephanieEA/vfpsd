const stateAbbreviations = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE",
"FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA",
"MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND",
"OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA",
"WV", "WI", "WY"]

const countCityIncidents = (response) => {
  return response.reduce((object, value, index) => {
    if (!object[value.city]) {
      object[value.city] = 1
    } else {
      object[value.city]++
    }
    return object
  }, {})
}
