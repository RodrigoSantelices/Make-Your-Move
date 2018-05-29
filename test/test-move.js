'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../server');
const mongoose = require('mongoose');
const { MoveList } = require('../lists/move/models');
const { User } = require('../users/models');
const { TEST_DATABASE_URL } = require('../config');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);
const url = "http://localhost:8080/";



describe('MoveList', function () {
  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';

  before(function () {

    return runServer(TEST_DATABASE_URL);
  })

  beforeEach(function () {
    return User.hashPassword(password)
      .then(password => {
        return User.create({
          username,
          password,
          firstName,
          lastName
        })
      }) 
      .then(function (user) {
        console.log(user);
        return MoveList.create({
            name: "Test Object",
            value: 1000,
            location: "car",
            user: user._id
          })
      }).catch(function(error){
        console.log(error);
      })
  })
  after(function () {
   // mongoose.connection.db.dropDatabase(done);
    return closeServer();
  });

  afterEach(function () {
    return User.remove();
  })

  it('should return Move items on get', function () {
    const token = jwt.sign(
      {
        user: {
          username,
          firstName,
          lastName
        }
      },
      JWT_SECRET,
      {
        algorithm: 'HS256',
        subject: username,
        expiresIn: '7d'
      }
    );
    return chai.request(url)
      .get('api/move')
      .set('Authorization', `Bearer ${token}`)
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');

        // because we create three items on app load
        expect(res.body.length).to.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        const expectedKeys = ['name', 'value', 'status', 'location', 'id'];
        res.body.forEach(function (item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  })
})
