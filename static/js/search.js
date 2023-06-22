// JavaScript code
var rows = document.querySelectorAll(".abdyullah");
var ids = document.querySelectorAll(".patient");
var patientDetails = {
  id: "id",
  surname: "surname",
  givenName: "givenName",
  gender: "gender",
  dob: "dob",
  admission: "admission",
  ward: "ward",
  dr: "dr",
  prev: "prev",
  current: "Outlying",
};

for (let n = 0; n < rows.length; n++) {
  rows[n].addEventListener("click", (e) => {
    console.log(ids[n].textContent);
    fetch("/patientdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data: ids[n].textContent }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        patientDetails = JSON.parse(json);
        window.location.href = "/patient";
      });
  });

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
        if (
          txtValue0.toUpperCase().indexOf(filter) > -1 ||
          txtValue1.toUpperCase().indexOf(filter) > -1 ||
          txtValue2.toUpperCase().indexOf(filter) > -1
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}
