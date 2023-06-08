function sendData(){
  fetch('/result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: final}),
    success: function(response) {
    console.log(response)
    document.getElementById('output').innerHTML = response;
    
}, error : function(error) {
    console.log(error);
}
  });
//   console.log(data)
//   $.ajax({
//   url: '/result',
//   type: 'POST',
//   data: JSON.stringify(data),
//   datatype:"json",
  
//   })
}
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is loaded");
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

  var previousSection = "details";
  var selectedCategoryNumber = 0;
  const image = ["general","leg","hand","stomach","chest","eye"];
  var systolic = diastolic = oxygen = null;
  var checkboxesCheckedValue = checkboxesChecked = painLevel = final = [];

  
  //Development only code, delete during deployment
  //details.style.display = "none";
  //conditions.style.display = "none";
  //status.style.display = "none";
  //review.style.display = "grid";

  edit.addEventListener("click", (e) => {
    console.log("Edit button was clicked.");
    if (previousSection == "details") {
      details.style.display = "none";
    } else if (previousSection == "conditions") {
      conditions.style.display = "none";
    } else (console.log("error"));
    status.style.display = "grid";
  })

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
    console.log("Systolic: " + systolic + " Diastolic: " + diastolic + " Oxygen: " + oxygen);
    BpnOL=[]
    BpnOL.push(parseInt(systolic));
    BpnOL.push(parseInt(diastolic));
    BpnOL.push(parseInt(oxygen));

    checkboxesChecked = [];
    checkboxesCheckedValue = [];
    getCheckedBoxes("general");
    console.log("Checked boxes: " + checkboxesChecked);
    console.log("Array for general conditions: " + checkboxesCheckedValue)

    painLevel = [];
    painLevel.push(parseInt(document.querySelector('input[name="leg"]:checked').value));
    painLevel.push(parseInt(document.querySelector('input[name="hand"]:checked').value));
    painLevel.push(parseInt(document.querySelector('input[name="stomach"]:checked').value));
    painLevel.push(parseInt(document.querySelector('input[name="chest"]:checked').value));
    painLevel.push(parseInt(document.querySelector('input[name="eye"]:checked').value));
    console.log("Pain Levels: " + painLevel);
    
    final = [];
    final.push(BpnOL);
    final.push(checkboxesCheckedValue);
    final.push(painLevel);
    console.log("Final: " + final);
    // fetch('/result', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({data: final})
    // })
    // .then(response => response.text())
    // .then(result => {
    //   console.log(result);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });

    const basicReview = "Blood Pressure: " + systolic + "/" + diastolic + " mmHg\n" + "Oxygen Level: " + oxygen + "%";
    document.getElementById("tableDetailsValues").textContent = basicReview;
    const generalReview = getGeneral(checkboxesChecked);
    if (generalReview != "") {
      document.getElementById("tableGeneralValues").textContent = generalReview;
    } else {
      document.getElementById("tableGeneral").style.display = "none";
    };
    const painReview = getPain(painLevel);
    if (painReview != "") {
      document.getElementById("tableCategoriesValues").textContent = painReview;
    } else {
      document.getElementById("tableCategories").style.display = "none";
    };
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
      categories[num].style.color = "white"
      categories[num].querySelector("img").src = "../static/imgs/" + image[num] + "W.png";
      document.getElementById(image[selectedCategoryNumber] + "Form").style.display = "none";
      document.getElementById(image[num] + "Form").style.display = "grid";
      console.log("Changed selected category.");
      categories[selectedCategoryNumber].style.background = "white";
      categories[selectedCategoryNumber].style.color = "black";
      categories[selectedCategoryNumber].querySelector("img").src = "../static/imgs/" + image[selectedCategoryNumber] + ".png";
      console.log("Selected category number has been changed to " + selectedCategoryNumber);
      selectedCategoryNumber = num;
    } else {
      console.log("The category has already been selected.")
    };
  }

  function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
       // And stick the checked ones onto an array...
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].value);
          checkboxesCheckedValue.push(1);
       } else {checkboxesCheckedValue.push(0)};
    };
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }

  const getGeneral = (arr) => {
    var generalSymptoms = "";
    for (let i=1; i<=arr.length; i++) {
      generalSymptoms = generalSymptoms + i + ". " + arr[i-1] + "\n";
    }
    console.log(generalSymptoms);
    return generalSymptoms;
  };

  const getPain = (arr) => {
    var painLevels = "";
    if (arr[0] > 0) {
      painLevels = painLevels + "Leg - " + arr[0] + "/10\n";
    };
    if (painLevel[1] > 0) {
      painLevels = painLevels + "Hand - " + arr[1] + "/10\n";
    };
    if (painLevel[2] > 0) {
      painLevels = painLevels + "Stomach - " + arr[2] + "/10\n";
    };
    if (painLevel[3] > 0) {
      painLevels = painLevels + "Chest - " + arr[3] + "/10\n";
    };
    if (painLevel[4] > 0) {
      painLevels = painLevels + "Eye - " + arr[4] + "/10\n";
    };
    console.log(painLevels);
    return painLevels;
  }

});
