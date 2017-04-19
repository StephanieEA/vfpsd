const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const axios = require('axios')
const util = require('util')
var fetch = require('node-fetch');


const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)


const countValues = require('./helpers/helpers.js').countValues
const ratio = require('./helpers/helpers.js').ratio

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Fatal Police Shootings'

//get homepage
app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

// get state population data
app.get('/data/state-poplulation-data.csv', (request, response) => {
  fs.readFile(`${__dirname}/data/state-populations.csv`, (err, file) => {
    response.send(file)
  })
})

// // get topojson state data
app.get('/data/us.json', (request, response) => {
  fs.readFile(`${__dirname}/data/us.json`, (err, file) => {
    response.send(file)
  })
})

app.get('/data/fatal-police-shootings-data.csv', (request, response) => {
  fs.readFile(`${__dirname}/data/fatal-police-shootings-data.csv`, (err, file) => {
    response.send(file)
  })
})

app.get('/data/external/:state', (request, response) => {
  const { state } = request.params
   fetch(`http://api.sba.gov/geodata/city_links_for_state_of/${state}.json`)
    .then(data => {
      return data.json()
    })
    .then(data => {
      response.send(data);
    })
    .catch(error => console.log(error))
})

// get all data
app.get('/api/v1/all', (request, response) => {
  const year = request.query.year

  database('fatal_police_shootings_data').select()
    .then((fatal_police_shootings_data) => {
      if (year) {
        const filtered_data = fatal_police_shootings_data.filter((incident) => {
          return incident.date.includes(year)})
        if (filtered_data.length == 0) {
          response.status(404).send({
            error: 'There are no incidents for this year'
          })
        } else {
          response.status(200).send(filtered_data)
        }
      } else  {
        response.status(200).send(fatal_police_shootings_data)
      }
    })
    .catch(function(error) {
      response.sendStatus(500)
      console.error('somethings wrong with db')
  });
})

// get a specific incident by id
app.get('/api/v1/all/:id', (request, response) => {
  const { id } = request.params

  database('fatal_police_shootings_data').where('id', id)
    .then((fatal_police_shootings_data) => {
      if (fatal_police_shootings_data.length == 0) {
        response.status(404).send({error: 'double check the id'})
      } else {
        response.status(200).send(fatal_police_shootings_data)
      }
    })
    .catch((error) => {
      response.status(500).send({error: 'server error'})
    })
})

// get all states
app.get('/api/v1/state-territory', (request, response) => {
  database('states_and_territories').select()
    .then((states_and_territories) => {
      response.status(200).send(states_and_territories)
    })
    .catch((error) => {
      response.status(500).send({error: 'somethings wrong with db'})
  })
})

// get a specific state by its id
app.get('/api/v1/state-territory/:id', (request, response) => {
  const { id } = request.params
  database('states_and_territories').where('id', id)
    .then((states_and_territories) => {
      if (states_and_territories.length == 0) {
        response.status(404).send({error: 'no state for that id'})
      } else {
        response.status(200).send(states_and_territories)
      }
    })
    .catch((error) => {
      response.status(500).send({error: 'somethings wrong with db'})
    })
})

// get all incidents for a specific state
app.get('/api/v1/state-territory/:abbreviation/incidents', (request, response) => {
  const { abbreviation } = request.params
 database('fatal_police_shootings_data').where('state', abbreviation)
   .then((fatal_police_shootings_data) => {
     if (fatal_police_shootings_data.length === 0) {
       response.status(404).send({error: 'no incidents found for the place you entered'})
     } else {
     response.status(200).send(fatal_police_shootings_data)
     }
   })
   .catch((error) => {
     response.status(500).send({error: 'somethings wrong with db'})
   })
})

// get the ratio of national instances in which mental illness was a factor
app.get('/api/v1/mental-illness', (request, response) => {
  database('fatal_police_shootings_data').select()
    .then((fatal_police_shootings_data) => {
      const mIValues = fatal_police_shootings_data.map(incident => incident.signs_of_mental_illness)
      const denominator = mIValues.length
      const count = countValues(mIValues)
      const ratios = ratio(count, denominator)
      response.status(200).send({ratios: ratios})
    })
    .catch((error) => {
      response.sendStatus(500).send({error: 'servers error'})
    })
})

// get the ratio of national instances in which there is body camera footage
app.get('/api/v1/body-camera', (request, response) => {
  database('fatal_police_shootings_data').select()
    .then((fatal_police_shootings_data) => {
      const footageValues = fatal_police_shootings_data.map(incident => incident.body_camera)
      const count = countValues(footageValues)
      const denominator = footageValues.length
      const ratios = ratio(count, denominator)
      response.status(200).send({ratios: ratios})
    })
    .catch((error) => {
      response.sendStatus(500).send({error: 'servers error'})
    })
})

// get ratios for incidents in which the victim was armed and if so what they were armed with
app.get('/api/v1/armed', (request, response) => {
  database('fatal_police_shootings_data').select()
    .then((fatal_police_shootings_data) => {
      const armedValues = fatal_police_shootings_data.map(incident => incident.armed)
      const count = countValues(armedValues)
      const denominator = armedValues.length
      const ratios = ratio(count, denominator)
      response.status(200).send({ratios: ratios})
    })
    .catch((error) => {
      response.sendStatus(500).send({error: 'servers error'})
    })
})

// get the ratios for incidents by race
app.get('/api/v1/race', (request, response) => {
  database('fatal_police_shootings_data').select()
    .then((fatal_police_shootings_data) => {
      const raceValues = fatal_police_shootings_data.map(incident => incident.race)
      const count = countValues(raceValues)
      const denominator = raceValues.length
      const ratios = ratio(count, denominator)
      response.status(200).send({ratios: ratios})
    })
    .catch((error) => {
      response.sendStatus(500).send({error: 'servers error'})
    })
})

// post a new incident
app.post('/api/v1/all', (request, response) => {
  if (Object.keys(request.body).length > 14) {
    response.status(422).send({error: 'incorrect format'})
  } else {
    const { name, date, manner_of_death, armed, age, gender, race, city, state,
      signs_of_mental_illness, threat_level, flee, body_camera } = request.body

    if ( !body_camera || !name || !date || !manner_of_death || !armed || !age ||
      !gender || !race || !city || !state || !signs_of_mental_illness ||
      !threat_level || !flee || !body_camera) {
      response.status(422).send({error: 'All properties are not provided'})
    } else {
      const incident = { name, date, manner_of_death, armed, age, gender, race,
        city, state, signs_of_mental_illness, threat_level, flee, body_camera }

      database('fatal_police_shootings_data').insert(incident)
      .then(() => {
        database('fatal_police_shootings_data').select()
        .then((fatal_police_shootings_data) => {
          response.status(200).json(fatal_police_shootings_data)
        })
      })
      .catch((error) => {
        console.error('somethings wrong with db')
        response.sendStatus(500)
      })
    }
  }
})

// post a new state
app.post('/api/v1/state-territory', (request, response) => {
  if (Object.keys(request.body).length > 2) {
    response.status(422).send({error: 'incorrect format'})
  } else {
    const { name, abbreviation } = request.body

    if (!name || !abbreviation) {
     response.status(422).send({error: 'All properties are not provided'})
    } else {
      const state = { name, abbreviation }

      database('states_and_territories').insert(state)
        .then(() => {
          database('states_and_territories').select()
          .then((states_and_territories) => {
            response.status(200).send(states_and_territories)
          })
        })
        .catch((error) => {
          response.status(500).send({error: 'something\'s wrong with db'})
        })
    }
  }
})

// update information for an incident
app.patch('/api/v1/all/:id', (request, response) => {
  const updates = request.body
  const { id } = request.params
  database('fatal_police_shootings_data').where('id', id).select().update(updates)
    .then(() => {
      database('fatal_police_shootings_data').where('id', id).select()
      .then((fatal_police_shootings_data) => {
        if (fatal_police_shootings_data.length === 0) {
          response.status(404).send({error: 'no incidents for this id'})
        } else {
          response.status(200).send(fatal_police_shootings_data)
        }
      })
    })
    .catch((error) => {
      response.status(500).send({error: 'something\'s wrong with db'})
    })
})

// update information for a state
app.patch('/api/v1/state-territory/:id', (request, response) => {
  const updates = request.body
  const { id } = request.params
  database('states_and_territories').where('id', id).select().update(updates)
    .then(() => {
      database('states_and_territories').where('id', id).select()
      .then((states_and_territories) => {
        if (states_and_territories.length === 0){
          response.status(404).send({error: 'no states or territories for this id'})
        } else {
          response.status(200).send(states_and_territories)
        }
      })
    })
    .catch((error) => {
      response.status(500).send({error: 'something\'s wrong with db'})
    })
})

// delete an incident
app.delete('/api/v1/all/:id', (request, response) => {
  const { id } = request.params
  database('fatal_police_shootings_data').where('id', id).del()
      .then((fatal_police_shootings_data) => {
        if(fatal_police_shootings_data === 0){
          response.status(404).send({error: 'id not found'})
        } else {
          response.status(200).send({message: `incident for id ${id} deleted`})
        }
      })
      .catch((error) => {
        response.status(500).send({error: 'server error'})
      })
})

// delete a state/territory
app.delete('/api/v1/state-territory/:id', (request, response) => {
  const { id } = request.params
  database('states_and_territories').where('id', id).del()
    .then((states_and_territories) => {
      if(states_and_territories === 0) {
        response.status(404).send({error: 'id not found'})
      } else {
        response.status(200).send({message: `incident for id ${id} deleted`})
      }
    })
    .catch((error) => {
      response.status(500).send({error: 'server error'})
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})


module.exports = app
