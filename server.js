const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('index.html'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Fatal Police Shootings'

// get all data
app.get('/api/v1/all', (request, response) => {
  const state = request.query.state;

    database('fatal_police_shootings_data').select()
      .then((fatal_police_shootings_data) => {
        if (state) {
          const filtered_data = fatal_police_shootings_data.filter((incident) => {
            return incident.state == state})
          if (filtered_data.length == 0) {
            response.status(404).json({
              error: 'No incidents for this state'
            })
          } else {
            response.status(200).json(filtered_data)
          }
        } else  {
          response.status(200).json(fatal_police_shootings_data)
        }
      })
      .catch(function(error) {
        response.sendStatus(500)
        console.error('somethings wrong with db')
    });
})

// get a specific incident by it's id
app.get('/api/v1/all/:id', (request, response) => {
  const { id } = request.params
  database('fatal_police_shootings_data').where('id', id)
    .then((fatal_police_shootings_data) => {
      if (fatal_police_shootings_data.length == 0) {
        response.status(404).json('double check the id')
      } else {
        response.status(200).json(fatal_police_shootings_data)
      }
    })
    .catch((error) => {
      console.error('error: ', error)
      response.sendStatus(500)
    })
})

// get all states
app.get('/api/v1/state-territory', (request, response) => {
  database('states_and_territories').select()
    .then((states_and_territories) => {
      response.status(200).json(states_and_territories)
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error('somethings wrong with db')
  })
})

// get a specific state by its id
app.get('/api/v1/state-territory/:id', (request, response) => {
  const { id } = request.params
  database('states_and_territories').where('id', id)
    .then((states_and_territories) => {
      if (states_and_territories.length == 0) {
        response.status(404).json('no state for that id')
      } else {
        response.status(200).json(states_and_territories)
      }
    })
    .catch((error) => {
      response.sendStatus(500)
    })
})

// get all cities for a specific state - ignore till cvs is worked out
// app.get('/api/v1/state/:id/cities', (request, response) => {
//   const { id } = request.params
//   const cities = app.locals.cities.filter(city => city.stateId === id)
//   if (!cities) return response.sendStatus(404)
//   response.json(cities)
// })

// get all incidents for a specific state
app.get('/api/v1/state-territory/:id/incidents', (request, response) => {
  const { id } = request.params
 database('fatal_police_shootings_data').where('stateId', id)
   .then((fatal_police_shootings_data) => {
     if (fatal_police_shootings_data.length === 0) {
       response.status(404).json('no incidents found for the place you entered')
     }
     response.status(200).json(fatal_police_shootings_data)
   })
   .catch((error) => {
     console.error('somethings wrong with db')
     response.sendStatus(500)
   })
})

// get average age of victims from specific states
app.get('/api/v1/state-territory/:id/average', (request, response) => {
  const { id } = request.params
  database('fatal_police_shootings_data').where('stateId', id).avg('age')
     .then((fatal_police_shootings_data) => {
       response.status(200).json(fatal_police_shootings_data)
     })
    .catch((error) => {
      console.error('error: ', error)
      console.error('error: ', error)
      res.sendStatus(500)
    })
})

// get a specific city - ignore till cvs is worked out
// app.get('/api/v1/state/:id/cities/:id', (request, response) => {
//   const { id } = request.params
//   const city = app.locals.cities.find(city => city.id === id)
//
//   if (!city) return response.sendStatus(404)
//
//   response.json(city)
// })

// get all names for a specific city - ignore till cvs is worked out
// app.get('/api/v1/state/:id/cities/:id/names', (request, response) => {
//   const { id } = request.params
//   // the request params only gives me {id: 'city name'}, how do I prevent it from getting a city from another state
//   const names = app.locals.names.filter(name => name.cityId === id)
//   if (!names) return response.sendStatus(404)
//   response.json(names)
// })

// post a new incident
app.post('/api/v1/all', (request, response) => {

  const { name, date, manner_of_death, armed, age, gender, race, city, state, signs_of_mental_illness, threat_level, flee, body_camera } = request.body

  if ( !body_camera || !name || !date || !manner_of_death || !armed || !age || !gender || !race || !city || !state || !signs_of_mental_illness || !threat_level || !flee || !body_camera) {
    response.sendStatus(422).json('All properties are not provided')
  } else {
    const incident = { name, date, manner_of_death, armed, age, gender, race, city, state, signs_of_mental_illness, threat_level, flee, body_camera }

    database('fatal_police_shootings_data').insert(incident)
      .then(() => {
        database('fatal_police_shootings_data').select()
        .then((fatal_police_shootings_data) => {
          response.status(200).json(fatal_police_shootings_data)
        })
        .catch((error) => {
          console.error('somethings wrong with db')
          response.sendStatus(500)
        })
      })
  }
})

// post a new state
app.post('/api/v1/state-territory', (request, response) => {
  const { name, abbreviation } = request.body
  if (!name || !abbreviation)
    {
    response.sendStatus(422)
    console.error('All properties are not provided')
  }

  const state = { name, abbreviation }

  database('states_and_territories').insert(state)
    .then(() => {
      database('states_and_territories').select()
      .then((states_and_territories) => {
        response.status(200).json(states_and_territories)
      })
      .catch((error) => {
        console.error('somethings wrong with db')
        response.sendStatus(500)
      })
    })
})
//
// // post a new city - don't worry about it till cvs is sorted
// // app.post('/api/v1/state/:id/cities', (request, response) => {
// //   const { id, stateId }  = request.body
// //
// //   console.log({id, stateId})
// //   if (!id || !stateId) {
// //     return response.status(422).send({
// //       error: 'No city and/or state property provided'
// //     })
// //   }
// //
// //   app.locals.cities.push({id, stateId})
// //   console.log(app.locals.cities)
// //   return response.status(201).json({id, stateId})
// // })
//
// update information for an incident
app.put('/api/v1/all/:id', function(request, response) {
  const updates = request.body
  const { id } = request.params
  database('fatal_police_shootings_data').where('id', id).update(updates)
    .then(() => {
      database('fatal_police_shootings_data').where('id', id)
    })
      .then((fatal_police_shootings_data) => {
        response.sendStatus(200).json(fatal_police_shootings_data)
      })
})

// update information for a state
app.put('/api/v1/state-territory/:id', (request, response) => {
  const updates = request.body
  const { id } = request.params
  database('states_and_territories').where('id', id).update(updates)
    .then(() => {
      database('states_and_territories').where('id', id)
    })
      .then((states_and_territories) => {
        response.sendStatus(200).json(states_and_territories)
      })
})

// delete an incident
app.delete('/api/v1/all/:id', (request, response) => {
  const { id } = request.params
  database('fatal_police_shootings_data').where('id', id).del()
      .then((fatal_police_shootings_data) => {
        response.status(200).json(`incident for id: ${id} deleted`)
      })
      .catch((error) => {
        console.error('somethings wrong with db')
        response.sendStatus(500)
      })
})

// delete a state/territory
app.delete('/api/v1/state-territory/:id', (request, response) => {
  const { id } = request.params
  database('states_and_territories').where('id', id).del()
      .then((states_and_territories) => {
        response.status(200).json(`incident for ${id} deleted`)
      })
      .catch((error) => {
        console.error('somethings wrong with db')
        response.sendStatus(500)
      })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
