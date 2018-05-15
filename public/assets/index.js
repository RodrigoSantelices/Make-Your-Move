
function signIn(user){
$.ajax({
  method:"post",
  url: "/api/auth",
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
      username: $(`#email`).val();
      password: $(`#password`).val();
    }
    signIn(user);
  })

})
