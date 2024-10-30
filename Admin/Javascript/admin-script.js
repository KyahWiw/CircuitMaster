const tournaments = [];

// Event listener for creating a tournament
document
  .getElementById("createTournament")
  .addEventListener("click", function () {
    const tournamentName = document.getElementById("tournamentName").value;
    const discipline = document.getElementById("discipline").value;
    const platform = document.getElementById("platform").value;
    const type = document.getElementById("type").value;
    const size = document.getElementById("size").value;

    // Create new tournament object
    const newTournament = {
      name: tournamentName,
      discipline: discipline,
      platform: platform,
      type: type,
      size: size,
    };

    // Add tournament to the list
    tournaments.push(newTournament);
    displayTournaments();

    // Clear input fields
    document.getElementById("tournamentName").value = "";
    document.getElementById("discipline").value = "";
    document.getElementById("platform").value = "";
    document.getElementById("type").value = "";
    document.getElementById("size").value = "";
  });

// Function to display tournaments
function displayTournaments() {
  const tournamentDetails = document.getElementById("tournamentDetails");
  tournamentDetails.innerHTML = ""; // Clear previous entries

  tournaments.forEach((tournament) => {
    const tournamentDiv = document.createElement("div");
    tournamentDiv.className = "tournament";
    tournamentDiv.innerHTML = `
            <h2>${tournament.name}</h2>
            <p><strong>Discipline:</strong> ${tournament.discipline}</p>
            <p><strong>Platform:</strong> ${tournament.platform}</p>
            <p><strong>Type:</strong> ${tournament.type}</p>
            <p><strong>Size:</strong> ${tournament.size}</p>
        `;
    tournamentDetails.appendChild(tournamentDiv);
  });
}
