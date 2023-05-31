const logInButton = document.getElementById("logIn");
const container = document.getElementById("container");

clickLogin = (e) => {
  e.preventDefault();
  fetch("https=://www.stepout.com/login", {
    method: "POST",
    body: JSON.stringify({
      email: this.state.idValue,
      password: this.state.pwValue,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.message === "SUCCESS") {
        alert("You are logged in.");
        window.location.href = "http://www.stepout.com/search";
      } else {
        alert("Please check your login information.");
      }
    });
};
