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
  // here is where i will get value from my search bar, just to get input
  input = document.getElementById("myInput");

  // input value will change to upper case, only use filter to do filtering
  filter = input.value.toUpperCase();

  // extract all content in my table
  table = document.getElementById("myTable");

  // extracting all content in tr from table 
  tr = table.getElementsByTagName("tr");

  // here will loop content of patient id, surname and given name
  for (i = 0; i < tr.length; i++) {
    td0 = tr[i].getElementsByTagName("td")[0];
    td1 = tr[i].getElementsByTagName("td")[1];
    td2 = tr[i].getElementsByTagName("td")[2];

    // check if td0/td1/td2 have the content inside - no tr and th here 
    if (td0 || td1 || td2) {

    // initiate a variable for filtering and take the content in each td0/td1/td2
      txtValue0 = td0.textContent || td0.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;

      // comparison if what we have search matches the content 
      if (txtValue0.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
