
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
