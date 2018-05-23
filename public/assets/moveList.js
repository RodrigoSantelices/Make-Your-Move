
 function getItemIdFromElement(item) {
  return $(item).closest('.item-element').data('item-id');
};

// DELETE Function
function deleteMoveList() {
  $(`.bigBox`).on('click', '.item-delete', function (event) {
    console.log("delete");
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    api.findAndDelete(id, function(moveItem){ //api not defined store not defined
      store.findAndDelete(id);
      getMoveList();
    })
  })

}



//this function takes a checked item from the unloaded list to the loaded list
$(`.loaded-container`).on('click','item-load',function(event) {
  event.preventDefault();
  unloadItem();})

function loadItem() {
  
    $.getJSON(MOVELIST_URL, function (moveLists) {
      console.log('rendering move list');
      var moveElement = moveLists.map(function (moveList) {
        moveList.status = true;
})
})
}

//this function takes a checked item from the unloaded list to the loaded list
$(`.unloaded-container`).on('click','item-unload', function(event) {
  event.preventDefault();
  loadItem();})

function unloadItem() {
  
    $.getJSON(MOVELIST_URL, function (moveLists) {
      console.log('rendering move list');
      var moveElement = moveLists.map(function (moveList) {
        moveList.status = false;
})
})
}

var serverBase = '//localhost:8080';
var MOVELIST_URL = serverBase + '/api/move';

function getMoveList() {
  console.log('Retrieving move list')
  $.getJSON(MOVELIST_URL, function (moveLists) {
    console.log(moveLists);
    var moveElement = moveLists.map(function (moveList) {
     // var element = $();
     // element.attr('_id', moveList.id);
     if(moveList.status === true){
      $(`.loaded-container`).append(
        `<div class = "item-container"><div class="move-list-item"><p class= "item-p">` + moveList.name + `</p><p class= "item-p">` + moveList.value + moveList.status`</p></div><div class="item-controls">
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
      value: $(`.value-js`).val(),
      status: false
    }
    postMoveList(list);
  })

})


// on page load do this

$(function () {
  getAndDisplayMoveList();
  console.log('final call should work');
})

function eventTrigger(){
  deleteMoveList();
}

eventTrigger();