


function getItemFromElement(item) {
  return $(item).closest('.item-container').data('object-id');
};
function getItemIdFromElement(item) {
  return $(item).closest('.item-container').data('item-id');
};

// DELETE Function
function deleteSellList() {
  $(`.bigBox`).on('click', '.item-delete', function (event) {
    const id = getItemIdFromElement(event.currentTarget);
    $.ajax({
      method: "delete",
      url: `/api/sell/${id}`,
      headers: {
        "Authorization": "bearer " + localStorage.authToken
      }
    }).done(function (data, error) {
      getSellList();

      if (error === "success") {

      }
      console.log(error, data)
    }
    )

  })

}

// Load Function

function sellItem() {
  $(`.bigBox`).on('click', '.item-sell', function (event) {
    console.log("Selling item start")
    const id = getItemIdFromElement(event.currentTarget);
    const data = {"status":true};
    $.ajax({
      method: "PUT",
      url: `/api/sell/${id}`,
      headers: {
        "Authorization": "bearer " + localStorage.authToken,
        "content-type": "application/json"    
      },
      data:JSON.stringify(data)
}).done(function (data, error) {
      getSellList();

      if (error === "success") {

      }
      console.log(error, data)
    }
    )

  })
  //take off sold list
  $(`.bigBox`).on('click', '.item-sold', function (event) {
    console.log("Selling item start")
    const id = getItemIdFromElement(event.currentTarget);
    const data = {"status":false};
    $.ajax({
      method: "PUT",
      url: `/api/sell/${id}`,
      headers: {
        "Authorization": "bearer " + localStorage.authToken,
        "content-type": "application/json"    
      },
      data:JSON.stringify(data)
}).done(function (data, error) {
      getSellList();

      if (error === "success") {

      }
      console.log(error, data)
    }
    )

  })
}

let sale = 0;
var serverBase = '//localhost:8080';
var SELLLIST_URL = serverBase + '/api/sell';

function getSellList() {
  $(`.loaded-wrapper`).empty();
  $(`.unloaded-wrapper`).empty();
  console.log('Retrieving sell list')
  $.ajax({
    url:SELLLIST_URL,
    method: "GET",
    headers: {
      "Authorization": "bearer " + localStorage.authToken
    }
  
  }).done(function (sellLists) {
    console.log(sellLists);
    var sellElement = sellLists.map(function (sellList) {

      let sum=0;
      for (let i = 0; i < sellLists.length; i++) {
        sum += sellLists[i].value;}
        sale = sum;
        $(`.sell-total`).empty();
        $(`.sell-total`).append(`<div class="total-sale">Total Sales: $ ${sale}</div>`)
      // var element = $();
      // element.attr('_id', sellList.id);
      if (sellList.status === true) {
        $(`.loaded-wrapper`).prepend(
          `<div class = "item-container" data-item-id="${sellList._id}"><div class="sell-list-item"><p class= "item-p">` + sellList.name + `</p><p class= "item-p">$` + sellList.value + `</p><div class="item-controls">
          <input class="item-sold" value="NOT SOLD" type="button">
             
          </input>
          <input class="item-delete" value="ERASE" type="button">
          </input>
        </div></div></div>`);
      }
      else {
        $(`.unloaded-wrapper`).prepend(
          `<div class = "item-container" data-item-id="${sellList._id}"><div class="sell-list-item"><p class= "item-p">` + sellList.name + `</p><p class= "item-p">$` + sellList.value + `</p><div class="item-controls">
        <input class="item-sell" value="SOLD" type="button"></input>
        <input class="item-delete" value = "ERASE" type="button"></input>
      </div></div></div>`);
      }
       
    });
  });
}


// This function may be unnecessary
function getAndDisplaySellList() {
  getSellList();
  console.log('getAndDisplaySellList works');
}

// Posts to the database
function postSellList(list) {
  $.ajax({
    method: "post",
    url: "/api/sell",
    data: JSON.stringify(list),
    headers: {
      "Authorization": "bearer " + localStorage.authToken,
      "content-type": "application/json"
    }
  }).done(function (data, error) {
    getSellList();
    if (error === "success") {

    }
    console.log(error, data)
  }
  )
}
// submit the form
$(function () {
  $(`.sell-form`).submit(function (event) {
    event.preventDefault();
    const list = {
      name: $(`.name-js`).val(),
      value: $(`.value-js`).val(),
      status: false
    }
    $(`.name-js`).val("");
    $(`.value-js`).val("");
    postSellList(list);
  })

})



// on page load do this

$(function () {
  getAndDisplaySellList();
  console.log('final call should work');
})

function eventTrigger() {
  deleteSellList();
  sellItem();
}

eventTrigger();