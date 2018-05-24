'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { MoveList } = require('./models');
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/', jwtAuth, (req, res) => {
  console.log(req.user);
  MoveList.find({user:req.user._id}).then(function (list) {

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
  const item = MoveList.create(data).then(function (item) {
    res.status(201).json(item);
  }).catch(function (error) {
    console.log(error);
  })

})

// Delete item by id
router.delete('/:id', jwtAuth, (req, res) => {
  MoveList.remove({ _id: req.params.id, user:req.user._id}).then(function (item) {
    console.log(`Deleted move list item\`${req.params.ID}\``);
    res.status(204).end();
  });
});

//edit feature pending
router.put('/:id', jsonParser, jwtAuth, (req, res) => {
  const requiredFields = ['name', 'value', 'status'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
        `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating Move List item \`${req.params.id}\``);
  const updatedItem = MoveList.update({
    id: req.params.id,
    name: req.body.name,
    value: req.body.value,
    status: req.body.status
  });
  res.status(204).end();
})




module.exports = { router };
