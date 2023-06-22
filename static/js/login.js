//document.addEventListener("DOMContentLoaded", function () {
const logIn = document.querySelector("button");

logIn.addEventListener("click", (e) => {
  e.preventDefault;
  const userId = document.getElementById("userId").value;
  const password = document.getElementById("password").value;

  // Create an object with the login credentials
  const credentials = {
    userId: userId,
    password: password,
  };

  // Send a POST request to the backend server
  fetch("http://127.0.0.1:5000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).catch((error) => {
    console.error("Error:", error);
    swal("Error", "An error occurred. Please try again later.", "error");
  });
});
//});

$("form[name=login_form").submit(function (e) {
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
    },
  });

  e.preventDefault();
});
