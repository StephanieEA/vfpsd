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
        stateId: 56,
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
        stateId: 43,
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
        stateId: 19,
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
    it('should return all incident data', function(done){
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
        res.body[0].should.have.property('stateId');
        res.body[0].should.have.property('signs_of_mental_illness');
        res.body[0].should.have.property('threat_level');
        res.body[0].should.have.property('flee');
        res.body[0].should.have.property('body_camera');
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
        res.body[0].should.have.property('stateId');
        res.body[0].should.have.property('signs_of_mental_illness');
        res.body[0].should.have.property('threat_level');
        res.body[0].should.have.property('flee');
        res.body[0].should.have.property('body_camera');
        done()
      })
    })
  })

  describe('GET /api/v1/all/:id', function() {
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
  })

  describe('GET /api/v1/all/:id', function() {
    it.skip('should return response 500, somethings wrong with db when the request param isn\'t an integer type', function(done){
    chai.request(app)
      .get('/api/v1/all/asdfa')
      .end(function (err, res) {
        res.should.have.status(500);
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
    it('should return not found for a nonexisting id', function(done){
    chai.request(app)
      .get('/api/v1/state-territory/89999')
      .end(function (err, res) {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.equal('no state for that id');
        done()
      })
    })
  })

  describe('GET /api/v1/state-territory/:id', function() {
    it('should return response 500, somethings wrong with db when the request param isn\'t an integer type', function(done){
    chai.request(app)
      .get('/api/v1/state-territory/asdfa')
      .end(function (err, res) {
        res.should.have.status(500);
        done()
      })
    })
  })

//   describe('GET /api/v1/folders/:id/urls', function() {
//     it('should return all urls belonging to a specific folder', function(done){
//     chai.request(app)
//       .get(`/api/v1/folders/${1}/urls`)
//       .end(function (err, res) {
//         res.should.have.status(200);
//         res.should.be.json;
//         res.body.should.be.a('array');
//         res.body.length.should.equal(1);
//         res.body[0].should.have.property('visits');
//         res.body[0].should.have.property('id');
//         res.body[0].should.have.property('long_url');
//         res.body[0].should.have.property('created_at');
//         res.body[0].should.have.property('updated_at');
//         done()
//       })
//     })
//   })
//
//   describe('POST /api/v1/folders', function() {
//     it('should return all folders with the added folder', function(done){
//     chai.request(app)
//       .post(`/api/v1/folders/`)
//       .send({ name: 'Aliens',
//       })
//       .end(function (err, res) {
//         res.should.have.status(200);
//         res.should.be.json;
//         res.body.should.be.a('array');
//         res.body.length.should.equal(3);
//         res.body[2].should.have.property('name');
//         res.body[2].should.have.property('id');
//         res.body[2].should.have.property('name', 'Aliens');
//         res.body[2].should.have.property('created_at');
//         res.body[2].should.have.property('updated_at');
//         done()
//       })
//     })
//   })
//
//   describe('POST /api/v1/folders/:id/urls', function() {
//     it('should return all urls belonging to the specifed folder, including the added url', function(done){
//     chai.request(app)
//       .post(`/api/v1/folders/${1}/urls`)
//       .send({ long_url: 'www.turing.io' })
//       .end(function (err, res) {
//         res.should.have.status(200);
//         res.should.be.json;
//         res.body.should.be.a('array');
//         res.body.length.should.equal(2);
//         res.body[0].should.have.property('visits');
//         res.body[0].should.have.property('id');
//         res.body[0].should.have.property('long_url');
//         res.body[0].should.have.property('created_at');
//         res.body[0].should.have.property('updated_at');
//         done()
//       })
//     })
//   })
//
  // describe('GET /:id', function() {
  //   it('should redirect to the long_url associated with that id', function(done){
  //   chai.request(app)
  //     .get(`/2`)
  //     .end(function (err, res) {
  //       res.should.have.status(200);
  //       expect(res).to.redirect;
  //       expect(res).to.redirectTo('http://www.animals.com/')
  //       res.should.be.html;
  //       done()
  //     })
  //   })
  // })
});
