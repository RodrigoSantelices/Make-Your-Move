'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {MoveList} = require('./models');

router.get('/',(req, res)=>{
  MoveList.find().then(function(list){
    res.json(list);
  })
})
router.post('/', jsonParser, (req, res) =>{
  const  requiredFields = ['name','value'];
  for (let i=0; i<requiredFields.length;i++){
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = MoveList.create(req.body).then(function(item){
    res.status(201).json(item);
  }).catch(function(error){
    console.log(error);
  })
 
})

// Delete item by id
router.delete('/:id',(req, res)=>{
  MoveList.delete(req.params.id);
  console.log(`Deleted move list item\`${req.params.ID}\``);
  res.status(204).end();
});

//edit feature pending
router.put('/:id', jsonParser, (req, res) =>{
  const requiredFields = ['name', 'value','status'];
  for (let i=0; i<requiredFields.length;i++){
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
    if (req.params.id !== req.body.id){
      const message = (
        `Request path id (${req.params.id}) and request body id `
        `(${req.body.id}) must match`);
        console.error(message);
          return res.status(400).send(message);
}
    console.log(`Updating Move List item \`${req.params.id}\``);
      const updatedItem = Recipes.update({
        id: req.params.id,
        name: req.body.name,
        ingredients: req.body.ingredients
});
res.status(204).end();
})




module.exports = {router};
