const MOCK_MOVE_LIST ={
  "moveList":[
      {
      //  "id":"1111",
      "name": "foof",
      //  "location": "car",
      //  "value":"$50",
      //  "image":"pic goes here",
        "status":"Loaded"
      },

      {
      //  "id":"2222",
       "name": "chair",
      //  "location": "truck",
      //  "value":"$100",
      //  "image":"pic goes here",
        "status":"Unloaded"
      },

      {
      //  "id":"3333",
       "name": "bed",
      //  "location": "home",
      //  "value":"$350",
      //  "image":"pic goes here",
        "status":"Loaded"
      }
  ]
}

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getMoveList(callbackFN){
  setTimeout(function(){callbackFN(MOCK_MOVE_LIST)},1);
}

// this function stays the same when we connect
// to real API later

function displayMoveList(data){
  for(index in data.moveList){
    $(`.move-list-js`).append(
      '<p>'+ data.moveList[index].name + '</p>');
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
