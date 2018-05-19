'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {MoveList} = require('../models');

router.post('/move', jsonParser, (req, res) =>{
  const  requiredFields = ['name','value'];
  for (let i=0; i<requiredFields.length;i++){
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = MoveList.create(req.body.name, req.body.value);
  res.status(201).json(item);
})


module.exports = {router};
