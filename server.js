const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Fatal Police Shootings'

app.locals.names = [{name: 'Tim Elliot', date: '2015-01-02', manner_of_death: 'shot',armed: 'gun',age: 53, gender: 'M',race: 'A',city: 'Shelton',state: 'WA',signs_of_mental_illness: true, threat_level: 'attack', flee: 'Not fleeing', body_camera: 'false', stateId: 'WA', cityId: 'Shelton'}]
app.locals.state = [{id: 'wa'}, {id: 'ga'}]
app.locals.city = [{id: 'Shelton', stateId: 'wa'}, {id: 'Atlanta', stateId: 'ga'}]

// get all states
app.get('/api/v1', (request, response) => {
  if (!app.locals.state) { return response.sendStatus(404)  }

  response.json(app.locals.state)
})

// get a specific state
app.get('/api/v1/state/:id'), (request, response) => {
  const { id } = request.params
  const state = app.locals.state.find(state => state.id == id)

  if (!state) { return response.sendStatus(404)  }

  response.json(state)
}

// get all cities for a specific state
app.get('/api/state/:id/cities'), (request, response) => {
  const { id } = request.params
  const cities = app.locals.city.filter(city => city.stateId === id)
  response.json(cities)
}

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
