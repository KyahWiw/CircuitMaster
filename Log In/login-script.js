// Sample user data (for demonstration purposes)
let users = [
  { username: "francis", password: "1234" },
  { username: "edward", password: "1234" },
  { username: "christopher", password: "1234" },
];

// Login Form Submission
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    // Check if the entered username and password match any user in the list
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Redirect to index.html if login is successful
      window.location.href = "../Home (login)/index.html";
    } else {
      // Show error message if login fails
      loginMessage.innerText = "Invalid username or password.";
      loginMessage.style.color = "red";
    }
  });

// Toggle between Login and Sign Up sections
document
  .getElementById("showSignUp")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("signUpSection").style.display = "block";
  });

document
  .getElementById("showLogin")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("signUpSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
  });

// Sign Up Form Submission
document
  .getElementById("signUpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const signUpMessage = document.getElementById("signUpMessage");

    // Validation for empty fields
    if (!newUsername || !newPassword) {
      signUpMessage.style.color = "red";
      signUpMessage.innerText = "Please fill in all fields.";
      return;
    }

    // Check if the username already exists
    const existingUser = users.find((user) => user.username === newUsername);

    if (existingUser) {
      signUpMessage.style.color = "red";
      signUpMessage.innerText =
        "Username already exists. Please choose another.";
    } else {
      // Add the new user to the users array
      users.push({ username: newUsername, password: newPassword });

      signUpMessage.style.color = "green";
      signUpMessage.innerText = "Sign up successful! You can now log in.";

      // Clear the form fields
      document.getElementById("newUsername").value = "";
      document.getElementById("newPassword").value = "";

      // Automatically switch back to login section after 2 seconds
      setTimeout(() => {
        document.getElementById("signUpSection").style.display = "none";
        document.getElementById("loginSection").style.display = "block";
        signUpMessage.innerText = ""; // Clear message
      }, 2000);
    }
  });
