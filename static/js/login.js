//To Recreate the problem uncomment out 1. login.JS ur code leave the bottom one commented
//login.html oso add back in the method + action
//serve with flask, the login button will bring to the blank page with user info
// That is base case
//Now comment out the entire JS part
//rerun server it still can do the same thing
//now comment out the html action + method for the login form
//now its sending get req and can view user info in the address bar

/*
const logInButton = document.getElementById("logIn");
const container = document.getElementById("container");

clickLogin = (e) => {
  e.preventDefault();

  const email = document.getElementsByName("email").value;
  const password = document.getElementsByName("password").value;

  fetch("/user/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        alert("Please check your login information.");
      } else {
        alert("You are logged in.");
        windowlocation.replace("/search/");
      }
    });
};
*/

/*
function login(){

  e.preventDefault();
  const form = document.getElementsByName("login_form")
  const data = new FormData(form)
  const loginData = new URLSearchParams(data).toString();

  $.ajax({
    url: "/user/login",
    type: "POST",
    data: loginData,
    dataType: "json",
    success: function(resp) {
      window.location.href = "/search/";
    },
    error: function(resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });
}
*/

/*$("form[name=login_form").submit(function (e) {

  var $form = $(this);
  var $error = $form.find(".error");
  var data = $form.serialize();

  $.ajax({
    url: "/user/login",
    type: "POST",
    data: data,
    dataType: "json",
    success: function (resp) {
      window.location.href = "/search/";
    },
    error: function (resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });

  e.preventDefault();
});
*/