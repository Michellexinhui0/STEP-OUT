const logInButton = document.getElementById("logIn");
const container = document.getElementById("container");

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

clickLogin = (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://127.0.0.1:5000", {
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
        window.location.href = "http://127.0.0.1:5000/search/";
      } else {
        alert("Please check your login information.");
      }
    });
};

