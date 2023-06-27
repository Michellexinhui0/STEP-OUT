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
  const reviewEdit = document.getElementById("review-edit");
  const reviewSubmit = document.getElementById("review-submit");
  const loading = document.querySelector(".loading-container");
  const skip = document.getElementById("skip");
  const updated = document.querySelector(".updated-container");
  const updateStatus = document.querySelector(".save.submit.edit-status");
  const confirmUpdateStatus = document.querySelector(
    ".save.update.update-status"
  );
  const statusUpdated = document.querySelector(".statusUpdatedContainer");
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
  const backSearch = document.getElementById("backSearch");
  const signout = document.getElementById("signOut");
  const search = document.querySelector(".top-search-button");
  const searchResult = document.querySelector(".top-search");
  const statusReason = document.querySelector("textarea");

  var previousSection = "details";
  var selectedCategoryNumber = 0;
  const image = ["general", "leg", "hand", "stomach", "chest", "eye"];
  var systolic = (diastolic = oxygen = null);
  var checkboxesCheckedValue = (checkboxesChecked = painLevel = final = []);
  var predictedStatus = "Recovered";
  var currentStatus = "Hospitalized";
  var predOrCurrent, selectedStatus;

  info[0].textContent = getCookie('patient_id');
  info[1].textContent = getCookie('surname');
  info[2].textContent = getCookie('given_name');
  info[3].textContent = getCookie('gender');
  info[4].textContent = getCookie('day') + "/" + getCookie('month') + "/" + getCookie('year');
  info[5].textContent = getCookie('admission_date');
  info[6].textContent = getCookie('ward');
  info[7].textContent = getCookie('doctor');
  info[8].textContent = getCookie('last_update');

  currentStatus = getCookie('status');

  switch (currentStatus) {
    case "Hospitalized":
      statusName[0].style.background = "#7b1bff";
      statusImg[0].style.filter = "grayscale(0%)";
      break;
    case "Outlying":
      statusName[1].style.background = "#ff7b1b";
      statusImg[1].style.filter = "grayscale(0%)";
      break;
    case "Recovered":
      statusName[2].style.background = "#00BF8F";
      statusImg[2].style.filter = "grayscale(0%)";
      break;
  }

  //search.addEventListener("click", (e) => {
  //  window.location.href = "/search/";
  //});

  signout.addEventListener("click", (e) => {
    window.location.href = "/user/signout";
  });
  backSearch.addEventListener("click", (e) => {
    window.location.href = "/search/";
  });

  oChart[0].addEventListener("click", (e) => {
    console.log("Observation Chart was opened.");
    chartBackground.style.display = "block";
    charts[0].style.display = "block";
  });

  oChart[1].addEventListener("click", (e) => {
    console.log("Prescription Chart was opened.");
    chartBackground.style.display = "block";
    charts[1].style.display = "block";
  });

  chartBackground.addEventListener("click", (e) => {
    chartBackground.style.display = "none";
    charts[0].style.display = "none";
    charts[1].style.display = "none";
  });

  edit.addEventListener("click", (e) => {
    console.log("Edit button was clicked.");
    statusDirection.textContent = "Current Status:";
    statusImg[3].style.filter = "grayscale(0%)";
    statusImg[4].style.filter = "grayscale(100%)";
    statusImg[5].style.filter = "grayscale(100%)";
    switch (previousSection) {
      case "details":
        details.style.display = "none";
        break;
      case "conditions":
        conditions.style.display = "none";
        break;
      case "review":
        review.style.display = "none";
        break;
      case "loading":
        loading.style.display = "none";
        break;
      case "updated":
        updated.style.display = "none";
        break;
    }
    predOrCurrent = 0;
    switch (currentStatus) {
      case "Outlying":
        statusName[3].style.background = "#ff7b1b";
        statusText[0].textContent = "Outlying";
        statusDesc[3].textContent =
          "Patient can receive treatment from home by PCA";
        statusImg[3].src = "../static/imgs/outlying.png";
        statusText[1].textContent = "Hospitalized";
        statusDesc[4].textContent = "Patient sitll requires medical attention";
        statusImg[4].src = "../static/imgs/hospitalized.png";
        statusText[2].textContent = "Recovered";
        statusDesc[5].textContent = "Patient can check out from the hospital";
        statusImg[5].src = "../static/imgs/recovered.png";
        break;

      case "Hospitalized":
        statusName[3].style.background = "#7b1bff";
        statusText[0].textContent = "Hospitalized";
        statusDesc[3].textContent = "Patient sitll requires medical attention";
        statusImg[3].src = "../static/imgs/hospitalized.png";
        statusText[1].textContent = "Recovered";
        statusDesc[4].textContent = "Patient can check out from the hospital";
        statusImg[4].src = "../static/imgs/recovered.png";
        statusText[2].textContent = "Outlying";
        statusDesc[5].textContent =
          "Patient can receive treatment from home by PCA";
        statusImg[5].src = "../static/imgs/outlying.png";
        break;

      case "Recovered":
        statusName[3].style.background = "#00BF8F";
        statusText[0].textContent = "Recovered";
        statusDesc[3].textContent = "Patient can check out from the hospital";
        statusImg[3].src = "../static/imgs/recovered.png";
        statusText[1].textContent = "Outlying";
        statusDesc[4].textContent =
          "Patient can receive treatment from home by PCA";
        statusImg[4].src = "../static/imgs/outlying.png";
        statusText[2].textContent = "Hospitalized";
        statusDesc[5].textContent = "Patient sitll requires medical attention";
        statusImg[5].src = "../static/imgs/hospitalized.png";
        break;
    }
    status.style.display = "grid";
  });

  exit.addEventListener("click", (e) => {
    console.log("Exit button was clicked.");
    status.style.display = "none";
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
        updated.style.display = "grid";
        break;
    }
  });

  next.addEventListener("click", (e) => {
    console.log("Next button was clicked.");
    details.style.display = "none";
    conditions.style.display = "grid";
    previousSection = "conditions";
  });

  back.addEventListener("click", (e) => {
    console.log("Back button was clicked.");
    details.style.display = "grid";
    conditions.style.display = "none";
    previousSection = "details";
  });

  save.addEventListener("click", (e) => {
    console.log("Back button was clicked.");
    details.style.display = "none";
    conditions.style.display = "none";
    review.style.display = "grid";
    previousSection = "review";

    systolic = detailsValue[0].value;
    diastolic = detailsValue[1].value;
    oxygen = detailsValue[2].value;
    console.log(
      "Systolic: " +
        systolic +
        " Diastolic: " +
        diastolic +
        " Oxygen: " +
        oxygen
    );
    BpnOL = [];
    BpnOL.push(parseInt(systolic));
    BpnOL.push(parseInt(diastolic));
    BpnOL.push(parseInt(oxygen));

    checkboxesChecked = [];
    checkboxesCheckedValue = [];
    getCheckedBoxes("general");
    console.log("Checked boxes: " + checkboxesChecked);
    console.log("Array for general conditions: " + checkboxesCheckedValue);

    painLevel = [];
    painLevel.push(
      parseInt(document.querySelector('input[name="leg"]:checked').value)
    );
    painLevel.push(
      parseInt(document.querySelector('input[name="hand"]:checked').value)
    );
    painLevel.push(
      parseInt(document.querySelector('input[name="stomach"]:checked').value)
    );
    painLevel.push(
      parseInt(document.querySelector('input[name="chest"]:checked').value)
    );
    painLevel.push(
      parseInt(document.querySelector('input[name="eye"]:checked').value)
    );
    console.log("Pain Levels: " + painLevel);

    final = [];
    final.push(BpnOL);
    final.push(checkboxesCheckedValue);
    final.push(painLevel);
    console.log("Final: " + final);

    const generalReview = getGeneral(checkboxesChecked);
    const painReview = getPain(painLevel);

    if (
      (systolic != 0 && diastolic != 0 && oxygen != 0) ||
      generalReview != "" ||
      painReview != ""
    ) {
      reviewSubmit.style.display = "block";
      reviewError.style.display = "none";
      reviewTable.style.display = "table";
      document.getElementById("tableDetails").style.display = "table-row";
      document.getElementById("tableGeneral").style.display = "table-row";
      document.getElementById("tableCategories").style.display = "table-row";

      if (systolic != 0 || diastolic != 0 || oxygen != 0) {
        const basicReview =
          "Blood Pressure: " +
          systolic +
          "/" +
          diastolic +
          " mmHg\n" +
          "Oxygen Level: " +
          oxygen +
          "%";
        document.getElementById("tableDetailsValues").textContent = basicReview;
      } else {
        document.getElementById("tableDetails").style.display = "none";
      }
      if (generalReview != "") {
        document.getElementById("tableGeneralValues").textContent =
          generalReview;
      } else {
        document.getElementById("tableGeneral").style.display = "none";
      }
      if (painReview != "") {
        document.getElementById("tableCategoriesValues").textContent =
          painReview;
      } else {
        document.getElementById("tableCategories").style.display = "none";
      }
    } else {
      reviewTable.style.display = "none";
      reviewError.style.display = "flex";
      reviewSubmit.style.display = "none";
    }
  });

  reviewEdit.addEventListener("click", (e) => {
    review.style.display = "none";
    conditions.style.display = "grid";
    previousSection = "conditions";
  });

  reviewSubmit.addEventListener("click", (e) => {
    review.style.display = "none";
    loading.style.display = "grid";
    previousSection = "loading";
    sendData();
    setTimeout(() => {
      predOrCurrent = 1;
      loading.style.display = "none";
      updated.style.display = "grid";
      previousSection = "updated";
      statusDirection.textContent = "Predicted Status:";
      statusImg[3].style.filter = "grayscale(0%)";
      statusImg[4].style.filter = "grayscale(100%)";
      statusImg[5].style.filter = "grayscale(100%)";
      switch (predictedStatus) {
        case "Outlying":
          statusBanner.style.background = "#ff7b1b";
          statusBanner.textContent = "Outlying";
          updatedText.textContent =
            "Patient can receive treatment from home by PCA";
          updatedImage.src = "../static/imgs/outlying.png";
          updateStatus.classList.add("outlying");
          statusName[3].style.background = "#ff7b1b";
          statusText[0].textContent = "Outlying";
          statusDesc[3].textContent =
            "Patient can receive treatment from home by PCA";
          statusImg[3].src = "../static/imgs/outlying.png";
          statusText[1].textContent = "Hospitalized";
          statusDesc[4].textContent =
            "Patient sitll requires medical attention";
          statusImg[4].src = "../static/imgs/hospitalized.png";
          statusText[2].textContent = "Recovered";
          statusDesc[5].textContent = "Patient can check out from the hospital";
          statusImg[5].src = "../static/imgs/recovered.png";
          break;

        case "Hospitalized":
          statusBanner.style.background = "#7b1bff";
          statusBanner.textContent = "Hospitalized";
          updatedText.textContent = "Patient sitll requires medical attention";
          updatedImage.src = "../static/imgs/hospitalized.png";
          updateStatus.classList.add("hospitalized");
          statusName[3].style.background = "#7b1bff";
          statusText[0].textContent = "Hospitalized";
          statusDesc[3].textContent =
            "Patient sitll requires medical attention";
          statusImg[3].src = "../static/imgs/hospitalized.png";
          statusText[1].textContent = "Recovered";
          statusDesc[4].textContent = "Patient can check out from the hospital";
          statusImg[4].src = "../static/imgs/recovered.png";
          statusText[2].textContent = "Outlying";
          statusDesc[5].textContent =
            "Patient can receive treatment from home by PCA";
          statusImg[5].src = "../static/imgs/outlying.png";
          break;

        case "Recovered":
          statusBanner.style.background = "#00BF8F";
          statusBanner.textContent = "Recovered";
          updatedText.textContent = "Patient can check out from the hospital";
          updatedImage.src = "../static/imgs/recovered.png";
          updateStatus.classList.add("recovered");
          statusName[3].style.background = "#00BF8F";
          statusText[0].textContent = "Recovered";
          statusDesc[3].textContent = "Patient can check out from the hospital";
          statusImg[3].src = "../static/imgs/recovered.png";
          statusText[1].textContent = "Outlying";
          statusDesc[4].textContent =
            "Patient can receive treatment from home by PCA";
          statusImg[4].src = "../static/imgs/outlying.png";
          statusText[2].textContent = "Hospitalized";
          statusDesc[5].textContent =
            "Patient sitll requires medical attention";
          statusImg[5].src = "../static/imgs/hospitalized.png";
          break;
      }
    }, 2000);
  });

  status1.addEventListener("click", (e) => {
    statusImg[3].style.filter = "grayscale(0%)";
    statusImg[4].style.filter = "grayscale(100%)";
    statusImg[5].style.filter = "grayscale(100%)";
    switch (predOrCurrent) {
      case 0:
        switch (currentStatus) {
          case "Hospitalized":
            statusName[3].style.background = "#7b1bff";
            selectedStatus = "Hospitalized";
            break;
          case "Outlying":
            statusName[3].style.background = "#ff7b1b";
            selectedStatus = "Outlying";
            break;
          case "Recovered":
            statusName[3].style.background = "#00BF8F";
            selectedStatus = "Recovered";
            break;
        }
        statusName[4].style.background = "#a7a7a7";
        statusName[5].style.background = "#a7a7a7";
        break;
      case 1:
        switch (predictedStatus) {
          case "Hospitalized":
            statusName[3].style.background = "#7b1bff";
            selectedStatus = "Hospitalized";
            break;
          case "Outlying":
            statusName[3].style.background = "#ff7b1b";
            selectedStatus = "Outlying";
            break;
          case "Recovered":
            statusName[3].style.background = "#00BF8F";
            selectedStatus = "Recovered";
            break;
        }
        statusName[4].style.background = "#a7a7a7";
        statusName[5].style.background = "#a7a7a7";
        break;
    }
  });

  status2.addEventListener("click", (e) => {
    statusImg[3].style.filter = "grayscale(100%)";
    statusImg[4].style.filter = "grayscale(0%)";
    statusImg[5].style.filter = "grayscale(100%)";
    switch (predOrCurrent) {
      case 0:
        switch (currentStatus) {
          case "Hospitalized":
            statusName[4].style.background = "#00BF8F";
            selectedStatus = "Recovered";
            break;
          case "Outlying":
            statusName[4].style.background = "#7b1bff";
            selectedStatus = "Hospitalized";
            break;
          case "Recovered":
            statusName[4].style.background = "#ff7b1b";
            selectedStatus = "Outlying";
            break;
        }
        statusName[3].style.background = "#a7a7a7";
        statusName[5].style.background = "#a7a7a7";
        break;
      case 1:
        switch (predictedStatus) {
          case "Hospitalized":
            statusName[4].style.background = "#00BF8F";
            selectedStatus = "Recovered";
            break;
          case "Outlying":
            statusName[4].style.background = "#7b1bff";
            selectedStatus = "Hospitalized";
            break;
          case "Recovered":
            statusName[4].style.background = "#ff7b1b";
            selectedStatus = "Outlying";
            break;
        }
        statusName[3].style.background = "#a7a7a7";
        statusName[5].style.background = "#a7a7a7";
        break;
    }
  });

  status3.addEventListener("click", (e) => {
    statusImg[3].style.filter = "grayscale(100%)";
    statusImg[4].style.filter = "grayscale(100%)";
    statusImg[5].style.filter = "grayscale(0%)";
    switch (predOrCurrent) {
      case 0:
        switch (currentStatus) {
          case "Hospitalized":
            statusName[5].style.background = "#ff7b1b";
            selectedStatus = "Outlying";
            break;
          case "Outlying":
            statusName[5].style.background = "#00BF8F";
            selectedStatus = "Recovered";
            break;
          case "Recovered":
            statusName[5].style.background = "#7b1bff";
            selectedStatus = "Hospitalized";
            break;
        }
        statusName[3].style.background = "#a7a7a7";
        statusName[4].style.background = "#a7a7a7";
        break;
      case 1:
        switch (predictedStatus) {
          case "Hospitalized":
            statusName[5].style.background = "#ff7b1b";
            selectedStatus = "Outlying";
            break;
          case "Outlying":
            statusName[5].style.background = "#00BF8F";
            selectedStatus = "Recovered";
            break;
          case "Recovered":
            statusName[5].style.background = "#7b1bff";
            selectedStatus = "Hospitalized";
            break;
        }
        statusName[3].style.background = "#a7a7a7";
        statusName[4].style.background = "#a7a7a7";
        break;
    }
  });

  updateStatus.addEventListener("click", (e) => {
    updated.style.display = "none";
    status.style.display = "grid";
    updateStatus.className = "save submit edit-status";
    previousSection = "details";
  });

  confirmUpdateStatus.addEventListener("click", (e) => {
    status.style.display = "none";
    statusUpdated.style.display = "grid";
    fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: final,
        status: selectedStatus,
        reason: statusReason.value,
      }),
    });
    statusName[3].style.background = "#a7a7a7";
    statusName[4].style.background = "#a7a7a7";
    statusName[5].style.background = "#a7a7a7";
    setTimeout(() => {
      statusUpdated.style.display = "none";
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
          previousSection = "details";
          break;
      }
    }, 2000);
    switch (currentStatus) {
      case "Hospitalized":
        statusName[0].style.background = "#a7a7a7";
        statusImg[0].style.filter = "grayscale(100%)";
        break;
      case "Outlying":
        statusName[1].style.background = "#a7a7a7";
        statusImg[1].style.filter = "grayscale(100%)";
        break;
      case "Recovered":
        statusName[2].style.background = "#a7a7a7";
        statusImg[2].style.filter = "grayscale(100%)";
        break;
    }
    currentStatus = selectedStatus;
    switch (currentStatus) {
      case "Hospitalized":
        statusName[0].style.background = "#7b1bff";
        statusImg[0].style.filter = "grayscale(0%)";
        break;
      case "Outlying":
        statusName[1].style.background = "#ff7b1b";
        statusImg[1].style.filter = "grayscale(0%)";
        break;
      case "Recovered":
        statusName[2].style.background = "#00BF8F";
        statusImg[2].style.filter = "grayscale(0%)";
        break;
    }
  });

  categories[0].addEventListener("click", (e) => {
    changeCategory(0);
    title.textContent = "General Symptoms";
  });

  categories[1].addEventListener("click", (e) => {
    changeCategory(1);
    title.textContent = "Legs Pain Level";
  });

  categories[2].addEventListener("click", (e) => {
    changeCategory(2);
    title.textContent = "Hands Pain Level";
  });

  categories[3].addEventListener("click", (e) => {
    changeCategory(3);
    title.textContent = "Stomach Pain Level";
  });

  categories[4].addEventListener("click", (e) => {
    changeCategory(4);
    title.textContent = "Chest Pain Level";
  });

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
      .then((json) => console.log(json));
  }

  function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
      // And stick the checked ones onto an array...
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
        checkboxesCheckedValue.push("1");
      } else {
        checkboxesCheckedValue.push("0");
      }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }

  function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}
  console.log(getCookie('id'));

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
