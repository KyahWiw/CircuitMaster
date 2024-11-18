// Functional Observer Design Pattern Implementation
function createEventEmitter() {
  const events = {};

  function on(event, listener) {
    if (!events[event]) {
      events[event] = [];
    }
    events[event].push(listener);
  }

  function off(event, listener) {
    if (!events[event]) return;
    events[event] = events[event].filter((l) => l !== listener);
  }

  function emit(event, data) {
    if (!events[event]) return;
    events[event].forEach((listener) => listener(data));
  }

  return { on, off, emit };
}

// Create an instance of the EventEmitter
const eventEmitter = createEventEmitter();

// Function to toggle favorite state
function toggleFavorite(button) {
  const isActive = button.classList.contains("active");
  button.classList.toggle("active", !isActive);

  // Update button text based on favorite state
  button.innerHTML = isActive
    ? '<span class="star">★</span> Add to Favorites'
    : '<span class="star">★</span> Remove from Favorites';

  // Notify observers of the favorite change
  eventEmitter.emit("favoriteChanged", { isActive: !isActive, button });
}

// Function to store notifications in localStorage
function saveNotifications() {
  localStorage.setItem("notifications", JSON.stringify(notifications));
}

// Function to load notifications from localStorage
function loadNotifications() {
  const storedNotifications = JSON.parse(localStorage.getItem("notifications"));
  if (storedNotifications) {
    notifications = storedNotifications;
    updateNotificationUI();
  }
}

// Function to update the notification list and badge
function updateNotificationUI() {
  const notificationBadge = document.getElementById("notificationBadge");
  const notificationList = document.getElementById("notificationList");

  // Update the badge count
  notificationBadge.textContent = notifications.length;

  // Update the notification list
  notificationList.innerHTML = "";
  notifications.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note;
    notificationList.appendChild(li);
  });

  // If no notifications, show default message
  if (notifications.length === 0) {
    const noNotification = document.createElement("li");
    noNotification.textContent = "No new notifications";
    notificationList.appendChild(noNotification);
  }
}

// Add a notification and save it
function addNotification(message) {
  notifications.unshift(message);
  saveNotifications();
  updateNotificationUI();
}

// Load notifications on page load
document.addEventListener("DOMContentLoaded", loadNotifications);

// Example: Simulate adding notifications
setTimeout(() => addNotification("Match SF#1 has started!"), 3000);
setTimeout(() => addNotification("Team A1 won their match!"), 6000);
