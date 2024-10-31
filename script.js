// Sample data structure to hold schedules and scores
const schedules = [];
const scores = [];

// Function to load schedules and scores from localStorage
function loadData() {
  const savedSchedules = localStorage.getItem("schedules");
  const savedScores = localStorage.getItem("scores");

  if (savedSchedules) {
    schedules.push(...JSON.parse(savedSchedules));
  }

  if (savedScores) {
    scores.push(...JSON.parse(savedScores));
  }

  updateScheduleList();
  updateScoreList();
}

// Function to update the schedule list in the UI
function updateScheduleList() {
  const scheduleList = document.getElementById("schedule-list");
  scheduleList.innerHTML = ""; // Clear existing list

  schedules.forEach((match) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${match.teamA} vs ${match.teamB} - Date: ${match.date}`;
    scheduleList.appendChild(listItem);
  });
}

// Function to update the score list in the UI
function updateScoreList() {
  const scoreList = document.getElementById("score-list");
  scoreList.innerHTML = ""; // Clear existing scores

  scores.forEach((match) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${match.teamA} ${match.scoreA} - ${match.teamB} ${match.scoreB}`;
    scoreList.appendChild(listItem);
  });
}

// Call loadData on page load
window.onload = loadData;

// JavaScript for scorecard interactivity

document.addEventListener("DOMContentLoaded", () => {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      if (button.classList.contains("active")) {
        showNotification("Added to favorites!");
        button.textContent = "Unfavorite";
      } else {
        showNotification("Removed from favorites");
        button.textContent = "Favorite";
      }
    });
  });

  // Function to show notifications
  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    notification.style.opacity = "1";

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        notification.style.display = "none";
      }, 500);
    }, 3000);
  }
});
