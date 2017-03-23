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
