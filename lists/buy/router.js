'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { BuyList } = require('./models');
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/', jwtAuth, (req, res) => {
  console.log(req.user);
  BuyList.find({user:req.user._id}).then(function (list) {

    res.json(list);
  })
})
router.post('/', jsonParser, jwtAuth, (req, res) => {
  const requiredFields = ['name', 'value'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  
  const data = {...req.body, user: req.user._id}
  const item = BuyList.create(data).then(function (item) {
    res.status(201).json(item);
  }).catch(function (error) {
    console.log(error);
  })

})

// Delete item by id
router.delete('/:id', jwtAuth, (req, res) => {
  BuyList.remove({ _id: req.params.id, user:req.user._id}).then(function (item) {
    console.log(`Deleted move list item\`${req.params._id}\``);
    res.status(204).end();
  });
});

//Load Router//Load Router
router.put('/:id', jsonParser, jwtAuth, (req, res) => {
  BuyList.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
    BuyList.findOne({_id:req.params.id}).then(function(list){
      res.send(list);
      console.log(`Updated move list item\`${req.params._id}\``);
      res.status(204).end();
    })
  })
})



module.exports = { router };
