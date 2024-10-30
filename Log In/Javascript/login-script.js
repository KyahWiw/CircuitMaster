// Sample user data (for demonstration purposes)
const users = [
  { username: "francis", password: "1234" },
  { username: "edward", password: "1234" },
  { username: "christopher", password: "1234" },
];

// Form submission handler
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents page reload on form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    // Check if the entered username and password match any user in the list
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Redirect to organizer page if login is successful
      window.location.href = "/Admin/admin-index.html";
    } else {
      // Show error message if login fails
      loginMessage.innerText = "Invalid username or password.";
    }
  });
