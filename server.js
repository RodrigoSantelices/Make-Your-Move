'use strict'

const express = require('express');
const app = express();
app.use(express.static('public'));
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();
const { DATABASE_URL } = require('./config');
const { PORT} = require('./config');
const {router: userRouter} = require('./users');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');

mongoose.Promise = global.Promise;

passport.use("basic",localStrategy);
passport.use(jwtStrategy);

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});

app.get('/api/protected', jwtAuth, (req, res) =>{
  return res.json({
     user: req.user
  });
});

app.use('*', (req, res) =>{
  return res.status(404).json({message: 'Not Found'});
});

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module){

  runServer(DATABASE_URL).catch(err => console.error(err));
}



module.exports = {app, runServer, closeServer};
