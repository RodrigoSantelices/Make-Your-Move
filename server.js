'use strict'

const express = require('express');
const app = express();
app.use(express.static('public'));
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

if (require.main === module){
app.listen(process.env.PORT || 8080, function(){
  console.info(`App is listening on ${this.address().port}`);
});
}
const MOCK_MOVE_LIST ={
  "moveList":[
      {
        "id":"1111",
        "item-name": "foof",
        "item-location": "car",
        "item-value":"$50",
        "item-image":"pic goes here",
        "status":"Loaded"
      },

      {
        "id":"2222",
        "item-name": "chair",
        "item-location": "truck",
        "item-value":"$100",
        "item-image":"pic goes here",
        "status":"Unloaded"
      },

      {
        "id":"3333",
        "item-name": "bed",
        "item-location": "home",
        "item-value":"$350",
        "item-image":"pic goes here",
        "status":"Loaded"
      },
  ]
}
module.exports = app;
