const countCityIncidents = (response) => {
  return response.reduce((object, value) => {
    if (!object[value.city]) {
      object[value.city] = 1
    } else {
      object[value.city]++
    }
    return object
  }, {})
}

const stateArray = [
    {
        "name": "Alabama",
        "abbreviation": "AL",
        "fips": 01
    },
    {
        "name": "Alaska",
        "abbreviation": "AK",
        "fips": 02
    },
    // {
    //     "name": "American Samoa",
    //     "abbreviation": "AS",
    //     "fips": 60
    // },
    {
        "name": "Arizona",
        "abbreviation": "AZ",
        "fips": 04
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR",
        "fips": 05
    },
    {
        "name": "California",
        "abbreviation": "CA",
        "fips": 06
    },
    {
        "name": "Colorado",
        "abbreviation": "CO",
        "fips": 08
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT",
        "fips": 09
    },
    {
        "name": "Delaware",
        "abbreviation": "DE",
        "fips": 10
    },
    {
        "name": "District of Columbia",
        "abbreviation": "DC",
        "fips": 11
    },
    // {
    //     "name": "Federated States Of Micronesia",
    //     "abbreviation": "FM",
    //     "fips": 64
    // },
    {
        "name": "Florida",
        "abbreviation": "FL",
        "fips": 12
    },
    {
        "name": "Georgia",
        "abbreviation": "GA",
        "fips": 13
    },
    // {
    //     "name": "Guam",
    //     "abbreviation": "GU",
    //     "fips": 66
    // },
    {
        "name": "Hawaii",
        "abbreviation": "HI",
        "fips": 15
    },
    {
        "name": "Idaho",
        "abbreviation": "ID",
        "fips": 16
    },
    {
        "name": "Illinois",
        "abbreviation": "IL",
        "fips": 17
    },
    {
        "name": "Indiana",
        "abbreviation": "IN",
        "fips": 18
    },
    {
        "name": "Iowa",
        "abbreviation": "IA",
        "fips": 19
    },
    {
        "name": "Kansas",
        "abbreviation": "KS",
        "fips": 20
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY",
        "fips": 21
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA",
        "fips": 22
    },
    {
        "name": "Maine",
        "abbreviation": "ME",
        "fips": 23
    },
    // {
    //     "name": "Marshall Islands",
    //     "abbreviation": "MH",
    //     "fips": 68
    // },
    {
        "name": "Maryland",
        "abbreviation": "MD",
        "fips": 24
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA",
        "fips": 25
    },
    {
        "name": "Michigan",
        "abbreviation": "MI",
        "fips": 26
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN",
        "fips": 27
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS",
        "fips": 28
    },
    {
        "name": "Missouri",
        "abbreviation": "MO",
        "fips": 29
    },
    {
        "name": "Montana",
        "abbreviation": "MT",
        "fips": 30
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE",
        "fips": 31
    },
    {
        "name": "Nevada",
        "abbreviation": "NV",
        "fips": 32
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH",
        "fips": 33
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ",
        "fips": 34
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM",
        "fips": 35
    },
    {
        "name": "New York",
        "abbreviation": "NY",
        "fips": 36
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC",
        "fips": 37
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND",
        "fips": 38
    },
    // {
    //     "name": "Northern Mariana Islands",
    //     "abbreviation": "MP",
    //     "fips": 69
    // },
    {
        "name": "Ohio",
        "abbreviation": "OH",
        "fips": 39
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK",
        "fips": 40
    },
    {
        "name": "Oregon",
        "abbreviation": "OR",
        "fips": 41
    },
    // {
    //     "name": "Palau",
    //     "abbreviation": "PW",
    //     "fips": 70
    // },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA",
        "fips": 42
    },
    // {
    //     "name": "Puerto Rico",
    //     "abbreviation": "PR",
    //     "fips": 72
    // },
    {
        "name": "Rhode Island",
        "abbreviation": "RI",
        "fips": 44
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC",
        "fips": 45
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD",
        "fips": 46
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN",
        "fips": 47
    },
    {
        "name": "Texas",
        "abbreviation": "TX",
        "fips": 48
    },
    {
        "name": "Utah",
        "abbreviation": "UT",
        "fips": 49
    },
    {
        "name": "Vermont",
        "abbreviation": "VT",
        "fips": 50
    },
    // {
    //     "name": "Virgin Islands",
    //     "abbreviation": "VI",
    //     "fips": 78
    // },
    {
        "name": "Virginia",
        "abbreviation": "VA",
        "fips": 51
    },
    {
        "name": "Washington",
        "abbreviation": "WA",
        "fips": 53
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV",
        "fips": 54
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI",
        "fips": 55
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY",
        "fips": 56
    }
]

const nameToAbbreviation = (name) => stateArray.find(state => state.name === name).abbreviation
const abbreviationToFips = (abbreviation) => stateArray.find(state => state.abbreviation === abbreviation).fips

const stateFips =
  stateArray.map(state => state.fips)

const stateAbbreviations =
  stateArray.map(state => state.abbreviation)
