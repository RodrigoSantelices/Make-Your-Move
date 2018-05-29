
$(function () {
    $(`.log-out`).on('click', function () {
        localStorage.authToken = null;
        window.location.href="/"
    })
})


// Buy Cost for the summary

let totalCost = 0;
var serverBase = '//localhost:8080';
var BUYLIST_URL = serverBase + '/api/buy';

function getBuyCost() {
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
    
    let sum=0;
    for (let i = 0; i < buyLists.length; i++) {
      sum += buyLists[i].value;}
      totalCost = sum;
      getSellProfit();
      $(`.buy`).empty();
      $(`.buy`).append(`<p>Buy Cost: $ ${totalCost}</p>`)


      });
  };

let totalSale = 0;
var SELLLIST_URL = serverBase + '/api/sell';

function getSellProfit() {
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
          totalSale = sum;
          let bal = totalSale - totalCost;
          $(`.balance`).empty();
          $(`.balance`).append(`<div class="bal">Balance: $ ${bal}</div>`)  
          $(`.sell`).empty();
          $(`.sell`).append(`<div class="total-sale">Sell Profit: $ ${totalSale}</div>`)   
      });
    });
  }
  
  function eventTrigger() {
    getBuyCost();
    //getSellProfit();

    
  }

  eventTrigger();