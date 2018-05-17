
// this function will submit an item to the loaded list if it is properly filled out

//adds Item
$(`.move-form`).submit(function(event){
  event.preventDefault();
  console.log("ran")
  const itemUnload = $(`.item-js`).val();
  $(`.item-js`).val(" ");
  const valueUnload = $(`.value-js`).val();
  $(`.value-js`).val(" ");
  $(`.unloaded-container`).append(
    `<div class = "item-container"><div class="move-list-item">${itemUnload}`+` ${valueUnload}</div><div class="item-controls">
          <label>Loaded?</label>
          <input class= "loaded-js" type= "checkbox">
      <button class="item-delete">
          delete
      </button>
    </div></div>`);
})

// this function clears items out of the loaded or unloaded lists
$(`.bigBox`).on('click','.item-delete', function(event){
  $(this).closest('.item-container').remove();
})

//this function takes a checked item from the unloaded list to the loaded list
function loadItem(){
  if ($(`.loaded-js`).attr('checked')){

  }
}


const MOCK_MOVE_LIST ={
  "moveList":[
      {
       "id":"1111",
       "name": "foof",
       "location": "car",
       "value":"$50",
       "image":"pic goes here",
       "status":"Loaded"
      },

      {
        "id":"2222",
        "name": "chair",
        "location": "truck",
        "value":"$100",
        "image":"pic goes here",
        "status":"Unloaded"
      },

      {
        "id":"3333",
        "name": "bed",
        "location": "home",
        "value":"$350",
        "image":"pic goes here",
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
  console.log('getMoveList works');
}

// this function stays the same when we connect
// to real API later

function displayMoveList(data){
  for(index in data.moveList){
    $(`.loaded-container`).append(
      `<div class = "item-container"><div class="move-list-item"><p>`+ data.moveList[index].name +" "+ data.moveList[index].value + `</p></div><div class="item-controls">
            <label>Loaded?</label>
            <input class= "loaded-js" type= "checkbox">
        <button class="item-delete">
            delete
        </button>
      </div></div>`);
  }

}
//this function can stay the same

function getAndDisplayMoveList (){
  getMoveList(displayMoveList);
  console.log('getAndDisplayMoveList works');
}

// on page load do this

$(function(){
  getAndDisplayMoveList();
  console.log('final call should work');
})
