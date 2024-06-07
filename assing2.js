const allPlayers = (searchQuery = 'Danny_Welbeck') => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.player) {
                displayPlayers(data.player);
            } else {
                document.getElementById("playerdisplay").innerHTML = "<p>No players found</p>";
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
};

const displayPlayers = (players) => {
    const playerContainer = document.getElementById("playerdisplay");
    playerContainer.innerHTML = ''; 

    players.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("display", "mt-4", "col-md-4"); 
        div.innerHTML = `
            <div class="card h-100">
                <img class="card-img-top" src="${element.strThumb}" alt="${element.strPlayer}" style="object-fit: cover; height: 200px; width: 100%;">
                <div class="card-body">
                <h4 class="card-title">${element.strPlayer}</h4> 
                <p><strong>Nationality:</strong> ${element.strNationality}</p>
                 <p><strong>Team:</strong> ${element.strTeam}</p>
                <p><strong>Position:</strong> ${element.strPosition}</p> 
                <p><strong>Sports Man:</strong> ${element.strSport}</p>
                <p><strong><a href="${element.strFacebook}" target="_blank"><i class="fa-brands fa-facebook"></i> Facebook</a></strong></p>
                <p><strong><a href="${element.strTwitter}" target="_blank"><i class="fa-brands fa-square-twitter"></i>Twitter</a></strong></p>
                <p><strong><a href="${element.strYoutube}" target="_blank"><i class="fa-brands fa-youtube"></i>You Tube</a></strong></p>
                   
                    

                    
                    <button class="btn btn-primary add" onclick="addToCart('${element.idPlayer}')">Add To cart</button>
                    <button class="btn btn-secondary detail" onclick="fetchPlayerDetails('${element.idPlayer}')">Details</button>
                </div>
            </div>
        `;
        playerContainer.appendChild(div);
    });
};

const fetchPlayerDetails = (playerId) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.players) {
                displayPlayerDetails(data.players[0]);
            } else {
                document.getElementById("modal-body").innerHTML = "<p>Player details not found</p>";
            }
            const playerModal = new bootstrap.Modal(document.getElementById('playerModal'));
            playerModal.show();
        })
        .catch((error) => {
            console.error('Error fetching player details:', error);
        });
};

const displayPlayerDetails = (player) => {
    const playerDetailsContainer = document.getElementById("modal-body");
    playerDetailsContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${player.strPlayer}</h2>
                <p><strong>Position:</strong> ${player.strPosition}</p>
                <p><strong>Team:</strong> ${player.strTeam}</p>
                <p><strong>Nationality:</strong> ${player.strNationality}</p>
                <p><strong>Bio:</strong> ${player.strDescriptionEN}</p>
            </div>
        </div>
    `;
};

const addToCart = (playerId) => {
    const currentCount = document.querySelectorAll("#add2 .cart2").length;
    if (currentCount >= 11) {
        alert("You cannot add more than 11 players.");
        return;
    }
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.players) {
                const player = data.players[0];
                const cardcount = document.getElementById("add3").innerText;
                let convertedCount = parseInt(cardcount);
                convertedCount = convertedCount + 1;
                document.getElementById("add3").innerText = convertedCount;
                const add2Container = document.getElementById("add2");
                const div = document.createElement("div");
                div.classList.add("cart2", "col-md-4", "mb-4"); // Corrected line to add Bootstrap grid classes
                div.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${player.strPlayer}</h5>
                            
                        </div>
                    </div>
                `;
                add2Container.appendChild(div);
            }
        })
        .catch((error) => {
            console.error('Error adding player to cart:', error);
        });
};

document.getElementById("btn").addEventListener("click", () => {
    const userSearch = document.getElementById("user").value;
    allPlayers(userSearch);
});

// Initial call to display a default player
allPlayers();
