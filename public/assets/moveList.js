
// this function will submit an item to the loaded list if it is properly filled out

//adds Item lets make this post to an endpoint


/*
$(`.move-form`).submit(function (event) {
  event.preventDefault();
  console.log("ran")
  const itemUnload = $(`.item-js`).val();
  $(`.item-js`).val(" ");
  const valueUnload = $(`.value-js`).val();
  $(`.value-js`).val(" ");
  $(`.unloaded-container`).append(
    `<div class = "item-container"><div class="move-list-item"><p>${itemUnload}</p>
    <p>${valueUnload}</div><div class="item-controls">
          <label>Loaded?</label>
          <input class= "loaded-js" type= "checkbox">
      <button class="item-delete">
          delete
      </button>
    </div></div>`);
})
*/
// this function clears items out of the loaded or unloaded lists
$(`.bigBox`).on('click', '.item-delete', function (event) {
  $(this).closest('.item-container').remove();

})

//this function takes a checked item from the unloaded list to the loaded list
if ($(`.loaded-container`).on('click','item-load')) {
  loadItem();}

function loadItem() {
  
    $.getJSON(MOVELIST_URL, function (moveLists) {
      console.log('rendering move list');
      var moveElement = moveLists.map(function (moveList) {
        moveList.status = 1;
})
})
}


var serverBase = '//localhost:8080';
var MOVELIST_URL = serverBase + '/api/move';

function getMoveList() {
  console.log('Retrieving move list')
  $.getJSON(MOVELIST_URL, function (moveLists) {
    console.log('rendering move list');
    var moveElement = moveLists.map(function (moveList) {
     // var element = $();
     // element.attr('_id', moveList.id);
     if(moveList.status === 1){
      $(`.loaded-container`).append(
        `<div class = "item-container"><div class="move-list-item"><p class= "item-p">` + moveList.name + `</p><p class= "item-p">` + moveList.value + `</p></div><div class="item-controls">
          <button class="item-unload">
              Unload
          </button>
          <button class="item-delete">
              delete
          </button>
        </div></div>`);}
     else{
     $(`.unloaded-container`).append(
      `<div class = "item-container"><div class="move-list-item"><p class= "item-p">` + moveList.name + `</p><p class= "item-p">` + moveList.value + `</p></div><div class="item-controls">
        <button class="item-load">
            Load
        </button>
        <button class="item-delete">
            delete
        </button>
      </div></div>`);}
     
     // return element;
    });
  });
}

// this function stays the same when we connect
// to real API later


//this function can stay the same

function getAndDisplayMoveList() {
  getMoveList();
  console.log('getAndDisplayMoveList works');
}

function postMoveList(list) {
  $.ajax({
    method: "post",
    url: "/api/move",
    data: JSON.stringify(list),
    headers: {
      "Authorization": "bearer " + localStorage.authToken,
      "content-type": "application/json"
    }
  }).done(function (data, error) {
    if (error === "success") {

    }
    console.log(error, data)
  }
  )
}
$(function () {
  $(`.move-form`).submit(function (event) {
    event.preventDefault();
    const list = {
      name: $(`.name-js`).val(),
      value: $(`.value-js`).val()
    }
    postMoveList(list);
  })

})


// on page load do this

$(function () {
  getAndDisplayMoveList();
  console.log('final call should work');
})
