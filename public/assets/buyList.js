

/*
function getItemFromElement(item) {
  return $(item).closest('.item-container').data('object-id');
};*/
function getItemIdFromElement(item) {
  return $(item).closest('.item-container').data('item-id');
};

// DELETE Function
function deleteBuyList() {
  $(`.bigBox`).on('click', '.item-delete', function (event) {
    const id = getItemIdFromElement(event.currentTarget);
    $.ajax({
      method: "delete",
      url: `/api/buy/${id}`,
      headers: {
        "Authorization": "bearer " + localStorage.authToken
      }
    }).done(function (data, error) {
      getBuyList();

      if (error === "success") {

      }
      console.log(error, data)
    }
    )

  })
  

}

// Load Function

function loadItem() {
  $(`.unloaded-container`).on('click', '.item-load', function (event) {
    console.log("Loading item start")
    const id = getItemIdFromElement(event.currentTarget);
    const data = {"status":true};
    $.ajax({
      method: "PUT",
      url: `/api/buy/${id}`,
      headers: {
        "Authorization": "bearer " + localStorage.authToken,
        "content-type": "application/json"    
      },
      data:JSON.stringify(data)
}).done(function (data, error) {
      getBuyList();

      if (error === "success") {

      }
      console.log(error, data)
    }
    )

  })
  //unloads
  $(`.loaded-container`).on('click', '.item-unload', function (event) {
    console.log("unLoading item start")
    const id = getItemIdFromElement(event.currentTarget);
    const data = {"status":false};
    $.ajax({
      method: "PUT",
      url: `/api/buy/${id}`,
      headers: {
        "Authorization": "bearer " + localStorage.authToken,
        "content-type": "application/json"    
      },
      data:JSON.stringify(data)
}).done(function (data, error) {
      getBuyList();

      if (error === "success") {

      }
      console.log(error, data)
    }
    )

  })



}


var serverBase = '//localhost:8080';
var BUYLIST_URL = serverBase + '/api/buy';

function getBuyList() {
  $(`.loaded-wrapper`).empty();
  $(`.unloaded-wrapper`).empty();
  console.log('Retrieving move list')
  $.ajax({
    url:BUYLIST_URL,
    method: "GET",
    headers: {
      "Authorization": "bearer " + localStorage.authToken
    }
  
  }).done(function (buyLists) {
    console.log(buyLists);
    var buyElement = buyLists.map(function (buyList) {
      // var element = $();
      // element.attr('_id', buyList.id);
      if (buyList.status === true) {
        $(`.loaded-wrapper`).prepend(
          `<div class = "item-container" data-item-id="${buyList._id}"><div class="buy-list-item"><p class= "item-p">` + buyList.name + `</p><p class= "item-p">$` + buyList.value + `</p><p class= "item-p">` + buyList.link + `</p><div class="item-controls">
          <input class="item-delete" value="ERASE" type="button"></input>
          <input class="item-unload" value="RETURN" type="button"></input>
          
        </div></div></div>`);
      }
      else {
        $(`.unloaded-wrapper`).prepend(
          `<div class = "item-container" data-item-id="${buyList._id}"><div class="buy-list-item"><p class= "item-p">` + buyList.name + `</p><p class= "item-p">$` + buyList.value + `</p><p class= "item-p">` + buyList.link + `</a></p><div class="item-controls">
          <input class="item-delete" value = "ERASE" type="button"></input>
          <input class="item-load" value="PURCHASED" type="button"></input>
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
function getAndDisplayBuyList() {
  getBuyList();
  console.log('getAndDisplayBuyList works');
}

// Posts to the database
function postBuyList(list) {
  $.ajax({
    method: "post",
    url: "/api/buy",
    data: JSON.stringify(list),
    headers: {
      "Authorization": "bearer " + localStorage.authToken,
      "content-type": "application/json"
    }
  }).done(function (data, error) {
    getBuyList();
    if (error === "success") {

    }
    console.log(error, data)
  }
  )
}
// submit the form
$(function () {
  $(`.buy-form`).submit(function (event) {
    event.preventDefault();
    const list = {
      name: $(`.name-js`).val(),
      value: $(`.value-js`).val(),
      link: $(`.link-js`).val(),
      status: false
    }
    $(`.name-js`).val("");
    $(`.value-js`).val("");
    $(`.link-js`).val("");
    postBuyList(list);
  })

})



// on page load do this

$(function () {
  getAndDisplayBuyList();
  console.log('final call should work');
})

function eventTrigger() {
  deleteBuyList();
  loadItem();
  
}

eventTrigger();