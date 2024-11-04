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

function toggleFavorite(button) {
  // Check if the button is currently active (favorited)
  const isActive = button.classList.contains("active");

  // Toggle the active class
  button.classList.toggle("active", !isActive);

  // Update the inner HTML of the button based on the favorite state
  if (!isActive) {
    button.innerHTML = '<span class="star">★</span> Remove from Favorites';
  } else {
    button.innerHTML = '<span class="star">★</span> Add to Favorites';
  }
}

// Swiper JS initialization
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: "auto", // Automatically determine the number of slides to show by default
    spaceBetween: 10, // Space between slides
    loop: false, // Disable automatic looping
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2, // Show 2 slides on tablets
      },
      480: {
        slidesPerView: 1, // Show 1 slide on mobile
      },
    },
    resizeObserver: true, // Enable resize observation
    watchSlidesProgress: true, // Keeps track of slide visibility
  });

  // Add custom navigation behavior for the next button
  const nextButton = document.querySelector(".swiper-button-next");
  nextButton.addEventListener("click", function () {
    if (swiper.isEnd) {
      swiper.slideTo(0); // Go back to the first slide if currently on the last slide
    } else {
      swiper.slideNext(); // Otherwise, go to the next slide
    }
  });
});

// Standing
function showGroupStage() {
  document.getElementById("groupStage").style.display = "block";
  document.getElementById("knockoutStage").style.display = "none";

  document.getElementById("groupStageBtn").classList.add("active");
  document.getElementById("knockoutStageBtn").classList.remove("active");
}

function showKnockoutStage() {
  document.getElementById("groupStage").style.display = "none";
  document.getElementById("knockoutStage").style.display = "block";

  document.getElementById("groupStageBtn").classList.remove("active");
  document.getElementById("knockoutStageBtn").classList.add("active");
}
