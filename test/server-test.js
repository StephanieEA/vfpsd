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

});
