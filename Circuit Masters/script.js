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
    slidesPerView: 3, // Show 3 slides at a time
    spaceBetween: 20, // Space between slides
    loop: true, // Enable loop mode to avoid disappearing buttons
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
  });
});
