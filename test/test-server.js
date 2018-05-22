'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

const expect = chai.expect;

chai.use(chaiHttp);

describe('MoveList', function(){
  before(function(){
    return runServer();
  })

  after(function(){
    return closeServer();
  });

  it('should return Move items on get', function(){
    return chai.request(app)
    .get('/move')
    .then(function(res){
      expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');

        // because we create three items on app load
        expect(res.body.length).to.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        const expectedKeys = ['name','value','status', 'id'];
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });
