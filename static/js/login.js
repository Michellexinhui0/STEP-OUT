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
        window.location.replace("/search/");
      }
    });
};

