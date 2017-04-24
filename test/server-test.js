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
        body_camera: 'true'
      }
    ]



    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        knex('fatal_police_shootings_data').insert(fatal_police_shootings_data)
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

    it('should return status 200 and the appropriate data for a query by year that exists', function(done){
    chai.request(app)
      .get('/api/v1/all?year=2015')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(3);
        res.body[0].name.should.equal('Tim Elliot');
        res.body[0].date.should.equal('2015-01-02');
        res.body[0].manner_of_death.should.equal('shot');
        res.body[0].age.should.equal('53');
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

    it('should return a status 404 and the appropriate message for a query by state when none exists', function(done){
    chai.request(app)
      .get('/api/v1/all?year=2089')
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.error.should.equal('There are no incidents for this year');
        done()
      })
    })

    it('should return a status 404 and the appropriate message when the query by state is innacurate', function(done){
    chai.request(app)
      .get('/api/v1/all?year=GAA')
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.error.should.equal('There are no incidents for this year');
        done()
      })
    })
  })

  describe('GET /api/v1/all/:id', function() {
    it('should return a 200 response and the specific incident for a correct id', function(done){
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

    it('should return a response 404 and the appropriate message for a nonexisting id', function(done){
    chai.request(app)
      .get('/api/v1/all/89999')
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.have.property('error')
        res.body.error.should.equal('double check the id');
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

  describe('GET /api/v1/state-territory/:abbreviation/incidents', function() {
    it('should return a response 200 and all incidents that occured in a specific state if they exist', function(done){
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
        res.body[0].age.should.equal('53');
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

    it('should return a response 404 and the appropriate message if there are no incidents for the state', function(done){
    chai.request(app)
      .get('/api/v1/state-territory/1/incidents')
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.have.property('error')
        res.body.error.should.equal('no incidents found for the place you entered');
        done()
      })
    })
  })

  describe('GET /api/v1/all/mental-illness', function() {
    it('should return a response 200 and the national ratio for incidents in which mental illness was clearly a factor', function(done){
    chai.request(app)
      .get('/api/v1/mental-illness')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.ratios.should.have.property('true')
        res.body.ratios.should.have.property('false')
        res.body.ratios.true.should.equal(0.3333333333333333)
        res.body.ratios.false.should.equal(0.6666666666666666)
        done()
      })
    })
  })

  describe('GET /api/v1/all/body-camera', function() {
    it('should return a response 200 and the national ratio for incidents in which there is body camera footage', function(done){
    chai.request(app)
      .get('/api/v1/body-camera')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.ratios.should.have.property('true')
        res.body.ratios.should.have.property('false')
        res.body.ratios.true.should.equal(0.3333333333333333)
        res.body.ratios.false.should.equal(0.6666666666666666)
        done()
      })
    })
  })

  describe('GET /api/v1/armed', function() {
    it('should return a response 200 and the national ratios for the armed status of victims', function(done){
    chai.request(app)
      .get('/api/v1/armed')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('ratios')
        res.body.ratios.should.have.property('gun')
        res.body.ratios.should.have.property('unarmed')
        res.body.ratios.gun.should.equal(0.6666666666666666)
        res.body.ratios.unarmed.should.equal(0.3333333333333333)
        done()
      })
    })
  })

  describe('GET /api/v1/race', function() {
    it('should return a response 200 and the national ratios for the race of victims', function(done){
    chai.request(app)
      .get('/api/v1/race')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('ratios')
        res.body.ratios.should.have.property('W')
        res.body.ratios.should.have.property('A')
        res.body.ratios.should.have.property('H')
        res.body.ratios.W.should.equal(0.3333333333333333)
        res.body.ratios.A.should.equal(0.3333333333333333)
        res.body.ratios.H.should.equal(0.3333333333333333)
        done()
      })
    })
  })

  describe('POST /api/v1/all', function() {
    it('should return a response 200 and all incidents with the added incident for a properly formatted request', function(done){
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
        res.body[3].age.should.equal('32');
        res.body[3].gender.should.equal('M');
        res.body[3].race.should.equal('W');
        res.body[3].city.should.equal('San Francisco');
        res.body[3].state.should.equal('CA');
        res.body[3].signs_of_mental_illness.should.equal('true');
        res.body[3].threat_level.should.equal('attack');
        res.body[3].flee.should.equal('Not fleeing');
        res.body[3].body_camera.should.equal('false');
        done()
      })
    })

    it('should return a status 422 and error message if the request does not include all properties', function(done){
    chai.request(app)
      .post(`/api/v1/all`)
      .send({name: 'Sad', date: '2016-02-05'})
      .end(function (err, res) {
        res.should.have.status(422)
        res.body.should.have.property('error')
        res.body.error.should.equal('All properties are not provided')
        done()
      })
    })

    it('should return a status 422 and error message of incorrect format if the request body includes unexpected values', function(done){
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
        body_camera: 'false',
        prosected: 'doubtful'
      })
      .end(function (err, res) {
        res.should.have.status(422)
        res.body.should.have.property('error')
        res.body.error.should.equal('incorrect format')
        done()
      })
    })
  })

describe('PATCH /api/v1/all/:id', function() {
  it('should return a response 200 and the updated incident for proper ids', function(done){
  chai.request(app)
    .patch('/api/v1/all/1')
    .send({
            name: 'Tim Elliot',
            date: '2015-01-02',
            manner_of_death: 'shot',
            armed: 'gun',
            age: 23,
            gender: 'M',
            race: 'A',
            city: 'Shelton',
            state: 'WA',
            signs_of_mental_illness: 'true',
            threat_level: 'attack',
            flee: 'Not fleeing',
            body_camera: 'true'
          })
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.length.should.equal(1);
      res.body[0].name.should.equal('Tim Elliot');
      res.body[0].date.should.equal('2015-01-02');
      res.body[0].manner_of_death.should.equal('shot');
      res.body[0].age.should.equal('23');
      res.body[0].gender.should.equal('M');
      res.body[0].race.should.equal('A');
      res.body[0].city.should.equal('Shelton');
      res.body[0].state.should.equal('WA');
      res.body[0].signs_of_mental_illness.should.equal('true');
      res.body[0].threat_level.should.equal('attack');
      res.body[0].flee.should.equal('Not fleeing');
      res.body[0].body_camera.should.equal('true');
      done()
    })
  })

  it('should return a response 404 and the appropriate error message for nonexisting ids', function(done){
  chai.request(app)
    .patch('/api/v1/all/55')
    .send({
            name: 'Tim Elliot',
            date: '2015-01-02',
            manner_of_death: 'shot',
            armed: 'gun',
            age: 23,
          })
    .end(function (err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.should.have.property('error')
      res.body.error.should.equal('no incidents for this id');
      done()
    })
  })
})

describe('DELETE /api/v1/all/:id', function() {
  it('should return a response 200 and delete a specific incident', function(done){
  chai.request(app)
    .delete('/api/v1/all/1')
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.message.should.equal('incident for id 1 deleted')
      done()
    })
  })

  it('should respond with a 404, message of id not found, if the incident does not exist', function(done){
  chai.request(app)
    .delete('/api/v1/all/999')
    .end(function (err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.should.have.property('error')
      res.body.error.should.equal('id not found');
      done()
    })
  })
})

});
