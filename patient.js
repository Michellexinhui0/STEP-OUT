document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is loaded");
  const save = document.getElementById("Save");
  const details = document.getElementById("basic-details");
  const conditions = document.getElementById("conditions");
  const categories = document.querySelectorAll(".category");
  var selectedCategoryNumber = 0;

  details.style.display = "grid";
  conditions.style.display = "none";
  save.addEventListener("click", (e) => {
    console.log("Next button was clicked.");
    details.style.display = "none";
    conditions.style.display = "grid";

    //for (let i=0; i <categories.length; i++) {
    //categories[i].addEventListener("click", (e) => {
    //})
    //console.log("Category " + i + " has added an EventListener.");
    //}
  });
});
