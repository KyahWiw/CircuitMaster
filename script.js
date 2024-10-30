// main.js

// Functionality for search input, e.g., for a console log demonstration
document.getElementById("search").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    alert("Searching for: " + event.target.value);
  }
});
