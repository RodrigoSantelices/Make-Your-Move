//signup
let signUpState = 0;
$(`.signup`).on('click',function(event){
  event.preventDefault();
if(signUpState === 0){
    $(`.signup`).append(`
    <section class="signUpBox">
    <input type="email" name="email-input" class='inputs' id="email" placeholder="Email" required= "Email Required">
    <input type="password" name="password-input" class='inputs' id="password" placeholder="Password" required="Password Required">
    </section>`);
    signUpState++;
    loginState=0;
    }

    $(`.login`).children(`section`).remove();

})
let loginState =0;
$(`.login`).on('click',function(event){
  event.preventDefault();
  if(loginState === 0){
  $(`.login`).append(`
    <section class="loginBox">
    <input type="email" name="email-input" class='inputs' id="emailLogin" placeholder="Email" required=" Email Required">
    <input type="password" name="password-input" class='inputs' id="passwordLogin" placeholder="Password" required="Password Required">
    <div class="buttpad">
    </section>`)
    loginState++;
    signUpState=0;
  }
    $(`.signup`).children(`section`).remove();
})


//signin
function signUp(user){
$.ajax({
  method:"post",
  url: "/api/users/",
  data: JSON.stringify(user),
  headers:{
    "content-type":"application/json"
  }
}).done(function(error, data)
{
  console.log(error, data)
}
)
}
$(function(){
  $(`.signup`).submit(function(event){
    event.preventDefault();
    const user = {
      username: $(`#email`).val(),
      password: $(`#password`).val()
    }
    signUp(user);
  })

})

function logIn(user){
$.ajax({
  method:"post",
  url: "/api/auth/login/",
  headers:{
    "Authorization": "basic "+btoa(user.username+":"+user.password)
  }
}).done(function(error, data)
{
  console.log(error, data)
}
)
}
$(function(){
  $(`.login`).submit(function(event){
    event.preventDefault();
    const user = {
      username: $(`#emailLogin`).val(),
      password: $(`#passwordLogin`).val()
    }
    logIn(user);
  })

})
