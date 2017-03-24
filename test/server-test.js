process.env.NODE_ENV = 'test'
const config = require('../knexfile.js')['test']
const knex = require('knex')(config)
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const assert = chai.assert
const should = chai.should()
const app = require('../server.js')

chai.use(chaiHttp)

describe('Server', function() {
  it('should exist', function() {
    expect(app).to.exist;
  });
});

describe('API Routes', function() {
  beforeEach(function(done) {
    const fatal_police_shootings_data = [
      {
        name: 'Tim Elliot',
        date: '2015-01-02',
        manner_of_death: 'shot',
        armed: 'gun',
        age: 53,
        gender: 'M',
        race: 'A',
        city: 'Shelton',
        state: 'WA',
        signs_of_mental_illness: 'true',
        threat_level: 'attack',
        flee: 'Not fleeing',
        body_camera: 'false'
      },
      {
        name: 'Lewis Lee Lembke',
        date: '2015-01-02',
        manner_of_death: 'shot',
        armed: 'gun',
        age: 47,
        gender: 'M',
        race: 'W',
        city: 'Aloha',
        state: 'OR',
        signs_of_mental_illness: 'false',
        threat_level: 'attack',
        flee: 'Not fleeing',
        body_camera: 'false'
      },
      {
        name: 'John Paul Quintero',
        date: '2015-01-02',
        manner_of_death: 'shot and Tasered',
        armed: 'unarmed',
        age: 23,
        gender: 'M',
        race: 'H',
        city: 'Wichita',
        state: 'KS',
        signs_of_mental_illness: 'false',
        threat_level: 'other',
        flee: 'Not fleeing',
        body_camera: 'false'
      }
    ]

    const states_and_territories = [
      {
        name: 'Kansas',
        abbreviation: 'KS',
      },
      {
        name: 'Washington',
        abbreviation: 'WA',
      },
      {
        name: 'Vermont',
        abbreviation: 'VT',
      }
    ]

    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        knex('fatal_police_shootings_data').insert(fatal_police_shootings_data)
        .then(_ => knex('states_and_territories').insert(states_and_territories))
        .then(function() {
          done();
        })
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
      .then(function() {
        done();
      });
  });

  describe('GET /api/v1/all', function() {
    it('should return all incident data for a request without any queries', function(done){
    chai.request(app)
      .get('/api/v1/all')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(3);
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('date');
        res.body[0].should.have.property('manner_of_death');
        res.body[0].should.have.property('age');
        res.body[0].should.have.property('gender');
        res.body[0].should.have.property('race');
        res.body[0].should.have.property('city');
        res.body[0].should.have.property('state');
        res.body[0].should.have.property('signs_of_mental_illness');
        res.body[0].should.have.property('threat_level');
        res.body[0].should.have.property('flee');
        res.body[0].should.have.property('body_camera');
        done()
      })
    })

    it('should return the appropriate data for a query by state that exists', function(done){
    chai.request(app)
      .get('/api/v1/all?state=WA')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(1);
        res.body[0].name.should.equal('Tim Elliot');
        res.body[0].date.should.equal('2015-01-02');
        res.body[0].manner_of_death.should.equal('shot');
        res.body[0].age.should.equal(53);
        res.body[0].gender.should.equal('M');
        res.body[0].race.should.equal('A');
        res.body[0].city.should.equal('Shelton');
        res.body[0].state.should.equal('WA');
        res.body[0].signs_of_mental_illness.should.equal('true');
        res.body[0].threat_level.should.equal('attack');
        res.body[0].flee.should.equal('Not fleeing');
        res.body[0].body_camera.should.equal('false');
        done()
      })
    })

    it('should return the appropriate data for a query by state when none exists', function(done){
    chai.request(app)
      .get('/api/v1/all?state=GA')
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.data.should.equal('There are no incidents for this state/territory- check your spelling');
        done()
      })
    })

    it('should respond appropriately when the query by state is innacurate', function(done){
    chai.request(app)
      .get('/api/v1/all?state=GAA')
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.data.should.equal('There are no incidents for this state/territory- check your spelling');
        done()
      })
    })
  })

  describe('GET /api/v1/all/:id', function() {
    it('should return a specific incident for a correct id', function(done){
    chai.request(app)
      .get('/api/v1/all/1')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(1);
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('date');
        res.body[0].should.have.property('manner_of_death');
        res.body[0].should.have.property('age');
        res.body[0].should.have.property('gender');
        res.body[0].should.have.property('race');
        res.body[0].should.have.property('city');
        res.body[0].should.have.property('state');
        res.body[0].should.have.property('signs_of_mental_illness');
        res.body[0].should.have.property('threat_level');
        res.body[0].should.have.property('flee');
        res.body[0].should.have.property('body_camera');
        done()
      })
    })

    it('should return not found for a nonexisting id', function(done){
    chai.request(app)
      .get('/api/v1/all/89999')
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.equal('double check the id');
        done()
      })
    })

    it('should return response 500, somethings wrong with db when the request param isn\'t an integer type', function(done){
      chai.request(app)
      .get('/api/v1/all/asdfa')
      .end(function (err, res) {
        res.should.have.status(500);
        res.body.error.should.equal('server error')
        done()
      })
    })
  })

  describe('GET /api/v1/state-territory', function() {
    it('should return all states and territories', function(done){
    chai.request(app)
      .get('/api/v1/state-territory')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(3);
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('abbreviation');
        done()
      })
    })
  })

  describe('GET /api/v1/state-territory/:id', function() {
    it('should return a specific states or territory', function(done){
    chai.request(app)
      .get('/api/v1/state-territory/1')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(1);
        res.body[0].name.should.equal('Kansas');
        res.body[0].id.should.equal(1);
        res.body[0].abbreviation.should.equal('KS');
        done()
      })
    })

    it('should return not found for a nonexisting id', function(done){
    chai.request(app)
      .get('/api/v1/state-territory/8999')
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.equal('no state for that id');
        done()
      })
    })

    it('should return response 500, somethings wrong with db when the request param isn\'t an integer type', function(done){
    chai.request(app)
      .get('/api/v1/state-territory/asdfa')
      .end(function (err, res) {
        res.should.have.status(500);
        done()
      })
    })
  })


  describe('GET /api/v1/state-territory/:abbreviation/incidents', function() {
    it('should return all incidents that occured in a specific state', function(done){
    chai.request(app)
      .get(`/api/v1/state-territory/WA/incidents`)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(1);
        res.body[0].name.should.equal('Tim Elliot');
        res.body[0].date.should.equal('2015-01-02');
        res.body[0].manner_of_death.should.equal('shot');
        res.body[0].age.should.equal(53);
        res.body[0].gender.should.equal('M');
        res.body[0].race.should.equal('A');
        res.body[0].city.should.equal('Shelton');
        res.body[0].state.should.equal('WA');
        res.body[0].signs_of_mental_illness.should.equal('true');
        res.body[0].threat_level.should.equal('attack');
        res.body[0].flee.should.equal('Not fleeing');
        res.body[0].body_camera.should.equal('false');
        done()
      })
    })

    it('should return not found if there are no incidents for the state', function(done){
    chai.request(app)
      .get('/api/v1/state-territory/1/incidents')
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.equal('no incidents found for the place you entered');
        done()
      })
    })
  })

  describe('GET /api/v1/state-territory/:abbreviation/average', function() {
    it('should return the average age of victims from a given state/territory', function(done){
    chai.request(app)
      .get(`/api/v1/state-territory/WA/average`)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(1);
        res.body[0].avg.should.equal('53.0000000000000000')
        done()
      })
    })

    it('should return the appropriate status and error message when there are no victims from that state', function(done){
    chai.request(app)
      .get(`/api/v1/state-territory/92/average`)
      .end(function (err, res) {
        res.should.have.status(404);
        res.body.error.should.equal('no incidents found')
        done()
      })
    })
  })

  describe('POST /api/v1/all', function() {
    it('should return all incidents with the added incident for a properly formatted request', function(done){
    chai.request(app)
      .post(`/api/v1/all`)
      .send({
        name: 'Matthew Hoffman',
        date: '2015-01-04',
        manner_of_death: 'shot',
        armed: 'toy weapon',
        age: 32,
        gender: 'M',
        race: 'W',
        city: 'San Francisco',
        state: 'CA',
        stateId: 4,
        signs_of_mental_illness: 'true',
        threat_level: 'attack',
        flee: 'Not fleeing',
        body_camera: 'false'
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(4);
        res.body[3].name.should.equal('Matthew Hoffman');
        res.body[3].date.should.equal('2015-01-04');
        res.body[3].manner_of_death.should.equal('shot');
        res.body[3].armed.should.equal('toy weapon');
        res.body[3].age.should.equal(32);
        res.body[3].gender.should.equal('M');
        res.body[3].race.should.equal('W');
        res.body[3].city.should.equal('San Francisco');
        res.body[3].state.should.equal('CA');
      //  res.body[3].stateId.should.equal(4);
        res.body[3].signs_of_mental_illness.should.equal('true');
        res.body[3].threat_level.should.equal('attack');
        res.body[3].flee.should.equal('Not fleeing');
        res.body[3].body_camera.should.equal('false');
        done()
      })
    })
  })

describe('POST /api/v1/state-territory', function() {
  it('should return all states belonging to the specifed folder, including the added state', function(done){
  chai.request(app)
    .post(`/api/v1/state-territory`)
    .send({name: 'Florida', abbreviation: 'FL'})
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[3].should.have.property('id');
      res.body[3].should.have.property('name');
      res.body[3].should.have.property('abbreviation');
      res.body[3].id.should.equal(4);
      res.body[3].name.should.equal('Florida');
      res.body[3].abbreviation.should.equal('FL');
      done()
    })
  })

  it('should return a status 400 and error message of all properties are not provided if the request does not include an abbreviation', function(done){
  chai.request(app)
    .post(`/api/v1/state-territory`)
    .send({name: 'Florida'})
    .end(function (err, res) {
      res.should.have.status(400)
      res.body.error.should.equal('All properties are not provided')
      done()
    })
  })

  it('should return a status 400 and error message of all properties are not provided if the request does not include an name', function(done){
  chai.request(app)
    .post(`/api/v1/state-territory`)
    .send({abbreviation: 'FL'})
    .end(function (err, res) {
      res.should.have.status(400)
      res.body.error.should.equal('All properties are not provided')
      done()
    })
  })

  it('should return a status 400 and error message of incorrect format if the request body includes values other than name and abbreviation', function(done){
  chai.request(app)
    .post(`/api/v1/state-territory`)
    .send({name: 'Alaska', abbreviation: 'AK', moose: 'for dayzz'})
    .end(function (err, res) {
      res.should.have.status(400)
      res.body.error.should.equal('incorrect format')
      done()
    })
  })
})

describe('DELETE /api/v1/state-territory/:id', function() {
  it('should delete a specific state or territory', function(done){
  chai.request(app)
    .delete('/api/v1/state-territory/1')
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.message.should.equal('incident for 1 deleted')
      done()
    })
  })

  it('should respond with a 404 if the paramater does not exist', function(done){
  chai.request(app)
    .delete('/api/v1/state-territory/999')
    .end(function (err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.error.should.equal('id not found');
      done()
    })
  })
})


});
