document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is loaded");
  const save = document.getElementById("Save");
  const details = document.getElementById("basic-details");
  const conditions = document.getElementById("conditions");
  details.style.display = "none";
  conditions.style.display = "grid";
  save.addEventListener("click", (e) => {
    console.log("Next button was clicked.");
    details.style.display = "none";
    conditions.style.display = "grid";
  });
});
