// JavaScript code
document.addEventListener("DOMContentLoaded", function () {
  var rows = document.querySelectorAll(".abdyullah");
  var ids = document.querySelectorAll(".patient");
  
  
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
          console.log(json.patient_id);
          document.cookie = "patient_id=" + json.patient_id + "; expires=10000; path =/patient";
          document.cookie = "surname=" + json.name.surname + "; expires=10000; path =/patient";
          document.cookie = "given_name=" + json.name.given_name + "; expires=10000; path =/patient";
          document.cookie = "gender=" + json.gender + "; expires=10000; path =/patient";
          document.cookie = "day=" + json.DOB.day + "; expires=10000; path =/patient";
          document.cookie = "month=" + json.DOB.month + "; expires=10000; path =/patient";
          document.cookie = "year=" + json.DOB.year + "; expires=10000; path =/patient";
          document.cookie = "admission_date=" + json.hospital_visit.admission_date + "; expires=10000; path =/patient";
          document.cookie = "ward=" + json.hospital_visit.ward + "; expires=10000; path =/patient";
          document.cookie = "doctor=" + json.hospital_visit.doctor + "; expires=10000; path =/patient";
          document.cookie = "last_update=" + json.last_update + "; expires=10000; path =/patient";
          document.cookie = "status=" + json.status + "; expires=10000; path =/patient";  
          console.log(json);
          window.location.href = "/patient";
        });
    });
  }
  })