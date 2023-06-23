document.addEventListener("DOMContentLoaded", function () {


  console.log("DOM is loaded");
  const info = document.querySelectorAll(".info");
  const next = document.getElementById("Next");
  const details = document.getElementById("basic-details");
  const conditions = document.getElementById("conditions");
  const categories = document.querySelectorAll(".category");
  const title = document.getElementById("symptoms-text");
  const edit = document.querySelector(".edit");
  const back = document.getElementById("back");
  const status = document.querySelector(".statusContainer");
  const detailsValue = document.querySelectorAll(".details-input");
  const save = document.getElementById("save");
  const review = document.querySelector(".review-container");
  const reviewError = document.querySelector(".errorContainer");
  const reviewTable = document.querySelector(".review-table");
  const reviewEdit = document.getElementById("review-edit");
  const reviewSubmit = document.getElementById("review-submit");
  const loading = document.querySelector(".loading-container");
  const skip = document.getElementById("skip");
  const updated = document.querySelector(".updated-container");
  const updateStatus = document.getElementById("updateStatus");
  const confirmUpdateStatus = document.querySelector(
    ".save.update.update-status"
  );
  const statusUpdated = document.querySelector(".statusUpdatedContainer");
  const statusBanner = document.querySelector(".updated-status");
  const updatedImage = document.querySelector(".updated-img");
  const updatedText = document.querySelector(".updated-status.desc");
  const exit = document.querySelector(".exit");
  const status1 = document.getElementById("s1");
  const status2 = document.getElementById("s2");
  const status3 = document.getElementById("s3");
  const chartBackground = document.querySelector(".chartBackground");
  const oChart = document.querySelectorAll(".document");
  const charts = document.querySelectorAll(".chart");
  const statusName = document.querySelectorAll(".status-name");
  const statusText = document.querySelectorAll(".status-name-text");
  const statusDesc = document.querySelectorAll(".status-desc");
  const statusImg = document.querySelectorAll(".status-img");
  const statusDirection = document.getElementById("status-direction");
  const patientInfo = document.querySelectorAll(".info");

  var previousSection = "details";
  var selectedCategoryNumber = 0;

  exit.addEventListener("click", (e) => {
    console.log("Exit button was clicked.");
    status.style.display = "none";
    statusName[3].style.background = "#a7a7a7";
    statusName[4].style.background = "#a7a7a7";
    statusName[5].style.background = "#a7a7a7";
    switch (previousSection) {
      case "details":
        details.style.display = "grid";
        break;
      case "conditions":
        conditions.style.display = "grid";
        break;
      case "review":
        review.style.display = "grid";
        break;
      case "loading":
        loading.style.display = "grid";
        break;
      case "updated":
        details.style.display = "grid";
        break;
    }
  });

  next.addEventListener("click", (e) => {
    console.log("Next button was clicked.");
    details.style.display = "none";
    conditions.style.display = "grid";

  categories[5].addEventListener("click", (e) => {
    changeCategory(5);
    title.textContent = "Eye Pain Level";
  });

  const changeCategory = (num) => {
    if (selectedCategoryNumber != num) {
      categories[num].style.transition = "background-color 0.5s ease";
      categories[num].style.background = "#1a5154";
      categories[num].style.color = "white";
      categories[num].querySelector("img").src =
        "../static/imgs/" + image[num] + "W.png";
      document.getElementById(
        image[selectedCategoryNumber] + "Form"
      ).style.display = "none";
      document.getElementById(image[num] + "Form").style.display = "grid";
      console.log("Changed selected category.");
      categories[selectedCategoryNumber].style.background = "white";
      categories[selectedCategoryNumber].style.color = "black";
      categories[selectedCategoryNumber].querySelector("img").src =
        "../static/imgs/" + image[selectedCategoryNumber] + ".png";
      console.log(
        "Selected category number has been changed to " + selectedCategoryNumber
      );
      selectedCategoryNumber = num;
    } else {
      console.log("The category has already been selected.");
    }
  };

  function sendData() {
    fetch("/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data: final }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        predictedStatus = json.status;
        console.log(predictedStatus);
      });
  }

  function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
      // And stick the checked ones onto an array...
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
        checkboxesCheckedValue.push(1);
      } else {
        checkboxesCheckedValue.push(0);
      }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }

  const getGeneral = (arr) => {
    var generalSymptoms = "";
    for (let i = 1; i <= arr.length; i++) {
      generalSymptoms = generalSymptoms + i + ". " + arr[i - 1] + "\n";
    }
    console.log(generalSymptoms);
    return generalSymptoms;
  };

  const getPain = (arr) => {
    var painLevels = "";
    if (arr[0] > 0) {
      painLevels = painLevels + "Leg - " + arr[0] + "/10\n";
    }
    if (painLevel[1] > 0) {
      painLevels = painLevels + "Hand - " + arr[1] + "/10\n";
    }
    if (painLevel[2] > 0) {
      painLevels = painLevels + "Stomach - " + arr[2] + "/10\n";
    }
    if (painLevel[3] > 0) {
      painLevels = painLevels + "Chest - " + arr[3] + "/10\n";
    }
    if (painLevel[4] > 0) {
      painLevels = painLevels + "Eye - " + arr[4] + "/10\n";
    }
    console.log(painLevels);
    return painLevels;
  };
});