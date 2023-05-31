const logInButton = document.getElementById("logIn");
const container = document.getElementById("container");

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

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

// JavaScript code

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
