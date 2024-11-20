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

// Simulate adding notifications
setTimeout(() => addNotification("Match SF#1 has started!"), 3000);
setTimeout(() => addNotification("Team A1 won their match!"), 6000);

// Swiper JS initialization
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: "auto",
    spaceBetween: 10,
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 1,
      },
    },
    resizeObserver: true,
    watchSlidesProgress: true,
  });

  // Custom navigation behavior for the next button
  const nextButton = document.querySelector(".swiper-button-next");
  nextButton.addEventListener("click", function () {
    if (swiper.isEnd) {
      swiper.slideTo(0);
    } else {
      swiper.slideNext();
    }
  });
});

// Functions to manage stages
function showGroupStage() {
  document.getElementById("groupStage").style.display = "block";
  document.getElementById("knockoutStage").style.display = "none";
  document.getElementById("groupStageBtn").classList.add("active");
  document.getElementById("knockoutStageBtn").classList.remove("active");
  showGroup("A"); // Show Group A by default in Group Stage
  eventEmitter.emit("stageChanged", "group");
}

function showKnockoutStage() {
  document.getElementById("groupStage").style.display = "none";
  document.getElementById("knockoutStage").style.display = "block";
  document.getElementById("groupStageBtn").classList.remove("active");
  document.getElementById("knockoutStageBtn").classList.add("active");
  eventEmitter.emit("stageChanged", "knockout");
}

// Functions to manage groups
function showGroup(group) {
  const groupAContent = document.getElementById("groupAContent");
  const groupBContent = document.getElementById("groupBContent");
  const groupABtn = document.getElementById("groupABtn");
  const groupBBtn = document.getElementById("groupBBtn");

  if (group === "A") {
    groupAContent.style.display = "block";
    groupBContent.style.display = "none";
    groupABtn.classList.add("active");
    groupBBtn.classList.remove("active");
  } else if (group === "B") {
    groupAContent.style.display = "none";
    groupBContent.style.display = "block";
    groupABtn.classList.remove("active");
    groupBBtn.classList.add("active");
  }

  eventEmitter.emit("groupChanged", group);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  showGroupStage(); // Show Group Stage by default

  // Observers
  eventEmitter.on("stageChanged", (stage) => {
    console.log(`Stage changed to: ${stage}`);
  });

  eventEmitter.on("groupChanged", (group) => {
    console.log(`Group changed to: ${group}`);
  });
});
