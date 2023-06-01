const logInButton = document.getElementById("logIn");
const container = document.getElementById("container");

clickLogin = (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/", {
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
      if (result.message === "SUCCESS") {
        alert("You are logged in.");
        window.location.href = "/search/";
      } else {
        alert("Please check your login information.");
      }
    });
};

