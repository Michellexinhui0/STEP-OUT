document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is loaded");
  const save = document.getElementById("Save");
  const details = document.getElementById("basic-details");
  const conditions = document.getElementById("conditions");
  const categories = document.querySelectorAll(".category");
  const title = document.getElementById("symptoms-text");

  const back = document.getElementById("back");
  var selectedCategoryNumber = 0;
  const image = ["general","leg","hand","stomach","chest","eye"];

  
  //Development only code, delete during deployment
  //details.style.display = "none";
  //conditions.style.display = "grid";


  save.addEventListener("click", (e) => {
    console.log("Next button was clicked.");
    details.style.display = "none";
    conditions.style.display = "grid";
  });

  back.addEventListener("click", (e) => {
    console.log("Back button was clicked.");
    details.style.display = "grid";
    conditions.style.display = "none";
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


  
});

