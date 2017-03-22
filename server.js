const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('index.html'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Fatal Police Shootings'

app.locals.names = [{name: 'Tim Elliot', date: '2015-01-02', manner_of_death: 'shot',armed: 'gun',age: 53, gender: 'M',race: 'A',city: 'Shelton',state: 'WA',signs_of_mental_illness: true, threat_level: 'attack', flee: 'Not fleeing', body_camera: 'false', stateId: 'WA', cityId: 'Shelton'},
{name: 'Sharon Elliot', date: '2015-01-02', manner_of_death: 'shot',armed: 'gun',age: 53, gender: 'M',race: 'A',city: 'Shelton',state: 'GA',signs_of_mental_illness: true, threat_level: 'attack', flee: 'Not fleeing', body_camera: 'false', stateId: 'GA', cityId: 'Shelton'}]
app.locals.state = [{id: 'WA'}, {id: 'GA'}]
app.locals.cities = [{id: 'Shelton', stateId: 'WA'}, {id: 'Atlanta', stateId: 'GA'}]

// get all names
app.get('/api/v1/names', (request, response) => {
  if (!app.locals.names) { return response.sendStatus(404)  }
  response.json(app.locals.names)
})

// get a specific name
app.get('/api/v1/names/:id', (request, response) => {
  const { id } = request.params
  const names = app.locals.names.find(name => name.name === id)

  if (!names) return response.sendStatus(404)

  response.json(names)
})

// get all states
app.get('/api/v1/state', (request, response) => {
  if (!app.locals.state) { return response.sendStatus(404)  }
  response.json(app.locals.state)
})

// get a specific state
app.get('/api/v1/state/:id', (request, response) => {
  const { id } = request.params
  const state = app.locals.state.find(state => state.id === id)

  if (!state) return response.sendStatus(404)

  response.json(state)
})

// get all cities for a specific state
app.get('/api/v1/state/:id/cities', (request, response) => {
  const { id } = request.params
  const cities = app.locals.cities.filter(city => city.stateId === id)
  if (!cities) return response.sendStatus(404)
  response.json(cities)
})

// get all names for a specific state
app.get('/api/v1/state/:id/names/', (request, response) => {
  const { id } = request.params
  const names = app.locals.names.filter(name => name.stateId === id)
  if (!names) return response.sendStatus(404)
  response.json(names)
})

// get a specific city
app.get('/api/v1/state/:id/cities/:id', (request, response) => {
  const { id } = request.params
  const city = app.locals.cities.find(city => city.id === id)

  if (!city) return response.sendStatus(404)

  response.json(city)
})


// get all names for a specific city
// should state be included?
app.get('/api/v1/state/:id/cities/:id/names', (request, response) => {
  const { id } = request.params
  // the request params only gives me {id: 'city name'}, how do I prevent it from getting a city from another state
  const names = app.locals.names.filter(name => name.cityId === id)
  if (!names) return response.sendStatus(404)
  response.json(names)
})

// post a new name
app.post('/api/v1/names', (request, response) => {
  const { name, cityId, stateId } = request.body

  if (!name || !cityId || !stateId) {
    return response.status(422).send({
      error: 'All properties are not provided'
    })
  }

  app.locals.names.push({ name, cityId, stateId })

  console.log(app.locals.names)

  return response.status(201).json({ name, cityId, stateId})
})

// post a new state
app.post('/api/v1/state', (request, response) => {
  const { state } = request.body
  const id = state

  if (!state) {
    return response.status(422).send({
      error: 'No state property provided'
    })
  }

  app.locals.state.push({id})

  return response.status(201).json(state)
})

// post a new city
app.post('/api/v1/state/:id/cities', (request, response) => {
  const { id, stateId }  = request.body

  console.log({id, stateId})
  if (!id || !stateId) {
    return response.status(422).send({
      error: 'No city and/or state property provided'
    })
  }

  app.locals.cities.push({id, stateId})
  console.log(app.locals.cities)
  return response.status(201).json({id, stateId})
})

// delete a name, this has a weird bug...
app.delete('/api/v1/names/:name', (request, response) => {
  const {name} = request.params
  console.log(name)
  app.locals.names.splice( app.locals.names.indexOf(name), 1)

  return response.json(app.locals.names)
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
