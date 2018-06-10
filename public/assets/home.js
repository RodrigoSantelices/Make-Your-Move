
$(function () {
    $(`.log-out`).on('click', function () {
        localStorage.authToken = null;
        window.location.href="/"
    })
})

//get budget

var BUDGET_URL =  '/api/budget';
let budget= 0;
function getBudget() {
  $(`.budget`).empty();
  console.log('Retrieving budget list')
  $.ajax({
    url:BUDGET_URL,
    method: "GET",
    headers: {
      "Authorization": "bearer " + localStorage.authToken
    }
  
  }).done(function (budgetVal) {
    const lastBudget = budgetVal[budgetVal.length-1]
    budget = lastBudget.budget
    //console.log(budgetVal);
    $(`.budget`).empty();
    $(`.budget`).append(`<p>Budget: $ ${budget}</p>`)
    getSellProfit();
    
     
    });
  };



// This function may be unnecessary



//post budget
function postBudget(list) {
  $.ajax({
    method: "post",
    url: "/api/budget",
    data: JSON.stringify(list),
    headers: {
      "Authorization": "bearer " + localStorage.authToken,
      "content-type": "application/json"
    }
  }).done(function (data, error) {
    getBudget();
    if (error === "success") {

    }
    console.log(error, data)
  }
  )
}
// submit the form
$(function () {
  $(`.budget-form`).submit(function (event) {
    event.preventDefault();
      const list = {budget: $(`.budget-js`).val()}
      
    $(`.budget-js`).val("");

    postBudget(list);
  })

})


// Buy Cost for the summary

let totalCost = 0;

var BUYLIST_URL =  '/api/buy';

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
var SELLLIST_URL =  '/api/sell';

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
          let bal = budget + totalSale - totalCost;
          $(`.balance`).empty();
          $(`.balance`).append(`<div class="bal">Balance: $ ${bal}</div>`)  
          $(`.sell`).empty();
          $(`.sell`).append(`<div class="total-sale">Sell Profit: $ ${totalSale}</div>`)  
          
          if(bal >= 0){
            $(`.bal`).addClass('green')
            $(`.bal`).removeClass('red')
          }
          else if(bal < 0){
            $(`.bal`).addClass('red')
            $(`.bal`).removeClass('green')
          }
      });
    });
  }


  function eventTrigger() {
    getBuyCost();
    //getSellProfit();
    getBudget();

    
  }

  eventTrigger();