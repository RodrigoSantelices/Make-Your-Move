


function getItemFromElement(item) {
  return $(item).closest('.item-container').data('object-id');
};
function getItemIdFromElement(item) {
  return $(item).closest('.item-container').data('item-id');
};

// DELETE Function
function deleteMoveList() {
  $(`.bigBox`).on('click', '.item-delete', function (event) {
    const id = getItemIdFromElement(event.currentTarget);
    $.ajax({
      method: "delete",
      url: `/api/move/${id}`,
      headers: {
        "Authorization": "bearer " + localStorage.authToken
      }
    }).done(function (data, error) {
      getMoveList();

      if (error === "success") {

      }
      console.log(error, data)
    }
    )

  })

}

// Load Function

function loadItem() {
  $(`.bigBox`).on('click', '.item-load', function (event) {
    console.log("Loading item start")
    const id = getItemIdFromElement(event.currentTarget);
    const data = {"status":true}
    $.ajax({
      method: "PUT",
      url: `/api/move/${id}`,
      headers: {
        "Authorization": "bearer " + localStorage.authToken
        //"content-type": "application/json"    
      },
      data:JSON.stringify(data)
}).done(function (data, error) {
      getMoveList();

      if (error === "success") {

      }
      console.log(error, data)
    }
    )

  })

}


var serverBase = '//localhost:8080';
var MOVELIST_URL = serverBase + '/api/move';

function getMoveList() {
  $(`.loaded-wrapper`).empty();
  $(`.unloaded-wrapper`).empty();
  console.log('Retrieving move list')
  $.ajax({
    url:MOVELIST_URL,
    method: "GET",
    headers: {
      "Authorization": "bearer " + localStorage.authToken
    }
  
  }).done(function (moveLists) {
    console.log(moveLists);
    var moveElement = moveLists.map(function (moveList) {
      // var element = $();
      // element.attr('_id', moveList.id);
      if (moveList.status === true) {
        $(`.loaded-wrapper`).prepend(
          `<div class = "item-container" data-item-id="${moveList._id}"><div class="move-list-item"><p class= "item-p">` + moveList.name + `</p><p class= "item-p">` + moveList.value + moveList.status + `</p><p class= "item-p">` + moveList.location + `</p><div class="item-controls">
          <input class="item-unload" value="Unload">
             
          </input>
          <input class="item-delete" value="Delete">
          </input>
        </div></div></div>`);
      }
      else {
        $(`.unloaded-wrapper`).prepend(
          `<div class = "item-container" data-item-id="${moveList._id}"><div class="move-list-item"><p class= "item-p">` + moveList.name + `</p><p class= "item-p">` + moveList.value + moveList.status + `</p><p class= "item-p">` + moveList.location + `</p><div class="item-controls">
        <input class="item-load" value="Load"></input>
        <input class="item-delete" value = "Delete"></input>
      </div></div></div>`);
      }

      //var moveMe = moveLists.map(function (moveList) {
        //moveList.name;
        //moveList.status;})
      // return element;
         
    });
  });
}


// This function may be unnecessary
function getAndDisplayMoveList() {
  getMoveList();
  console.log('getAndDisplayMoveList works');
}

// Posts to the database
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
    getMoveList();
    if (error === "success") {

    }
    console.log(error, data)
  }
  )
}
// submit the form
$(function () {
  $(`.move-form`).submit(function (event) {
    event.preventDefault();
    const list = {
      name: $(`.name-js`).val(),
      value: $(`.value-js`).val(),
      location: $(`.location-js`).val(),
      status: false
    }
    $(`.name-js`).val("");
    $(`.value-js`).val("");
    $(`.location-js`).val("");
    postMoveList(list);
  })

})



// on page load do this

$(function () {
  getAndDisplayMoveList();
  console.log('final call should work');
})

function eventTrigger() {
  deleteMoveList();
  loadItem();
}

eventTrigger();