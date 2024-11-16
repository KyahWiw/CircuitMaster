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

let notifications = []; // Array to store notifications

// Function to toggle the notification dropdown
function toggleDropdown() {
  const dropdown = document.getElementById("notificationDropdown");
  dropdown.classList.toggle("active");
}

// Function to add a notification
function addNotification(message) {
  const notificationBadge = document.getElementById("notificationBadge");
  const notificationList = document.getElementById("notificationList");

  // Add new notification to the array
  notifications.unshift(message);

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
