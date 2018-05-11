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

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getMoveList(callback){
  setTimeout(function(){callback(MOCK_MOVE_LIST)},1);
}

// this function stays the same when we connect
// to real API later

function displayMoveList(data){
  for(index in data.moveList){
    $('body').append(
      '<p>'+ data.moveList[index].text + '</p>');
  }
}
//this function can stay the same

function getAndDisplayMoveList (){
  getMoveList(displayMoveList);
}

// on page load do this

$(function(){
  getAndDisplayMoveList();
})


module.exports = app;
