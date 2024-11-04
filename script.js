// Observer Design Pattern Implementation
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(data));
  }
}

// Create an instance of the EventEmitter
const eventEmitter = new EventEmitter();

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

// Functions to manage tournament stages
function showGroupStage() {
  document.getElementById("groupStage").style.display = "block";
  document.getElementById("knockoutStage").style.display = "none";
  document.getElementById("groupStageBtn").classList.add("active");
  document.getElementById("knockoutStageBtn").classList.remove("active");
  eventEmitter.emit("stageChanged", "group");
}

function showKnockoutStage() {
  document.getElementById("groupStage").style.display = "none";
  document.getElementById("knockoutStage").style.display = "block";
  document.getElementById("groupStageBtn").classList.remove("active");
  document.getElementById("knockoutStageBtn").classList.add("active");
  eventEmitter.emit("stageChanged", "knockout");
}

// Function to show the selected stage
function showStage(stage) {
  const groupStage = document.getElementById("groupStage");
  const knockoutStage = document.getElementById("knockoutStage");

  if (stage === "group") {
    groupStage.classList.add("active");
    knockoutStage.classList.remove("active");
  } else if (stage === "knockout") {
    groupStage.classList.remove("active");
    knockoutStage.classList.add("active");
  }

  // Notify observers of the stage change
  eventEmitter.emit("stageChanged", stage);
}

// Initialize by showing the group stage and setting up listeners
document.addEventListener("DOMContentLoaded", function () {
  showStage("group");

  // Observer for favorite change
  eventEmitter.on("favoriteChanged", (data) => {
    console.log(`Favorite changed: ${data.isActive ? "Added" : "Removed"}`);
  });

  // Observer for stage change
  eventEmitter.on("stageChanged", (stage) => {
    console.log(`Stage changed to: ${stage}`);
  });
});
