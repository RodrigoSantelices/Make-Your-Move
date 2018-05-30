'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Budget } = require('./models');
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/', jwtAuth, (req, res) => {
  console.log(req.user);
  Budget.find({user:req.user._id}).then(function (list) {

    res.json(list);
  })
})
router.post('/', jsonParser, jwtAuth, (req, res) => {
  const requiredFields = ['budget'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  
  const data = {...req.body, user: req.user._id}
  const item = Budget.create(data).then(function (item) {
    res.status(201).json(item);
  }).catch(function (error) {
    console.log(error);
  })

})


//Load Router//Load Router
router.put('/:id', jsonParser, jwtAuth, (req, res) => {
  Budget.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
    Budget.findOne({_id:req.params.id}).then(function(list){
      res.send(list);
      console.log(`Updated budget item\`${req.params._id}\``);
      res.status(204).end();
    })
  })
})



module.exports = { router };
