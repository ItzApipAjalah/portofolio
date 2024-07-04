function updateData() {
    fetch('https://api.lanyard.rest/v1/users/481734993622728715')
    .then(response => response.json())
    .then(data => {
        const nameElement = document.getElementById("name");
        const statusElement = document.getElementById("status");
        const dotElement = document.getElementById("dot");
        const activityElement = document.getElementById("activity");
        const detailsElement = document.getElementById("details");
        const details2Element = document.getElementById("details2");
        const timestampElement = document.getElementById("timestamp");
        const largeImageElement = document.getElementById("large_image");
        const iconElement = document.querySelector(".lanyard img");

        const username = data.data.discord_user.display_name;
        const avatarId = data.data.discord_user.id;
        const status = data.data.discord_status;
        const listeningToSpotify = data.data.listening_to_spotify;

        nameElement.innerText = username;
        statusElement.innerText = status;
        
        // Update background-color berdasarkan discord_status
        switch (status) {
            case 'online':
                dotElement.style.backgroundColor = '#4b8';
                break;
            case 'idle':
                dotElement.style.backgroundColor = '#fa1';
                break;
            case 'dnd':
                dotElement.style.backgroundColor = '#f44';
                break;
            case 'offline':
                dotElement.style.backgroundColor = '#778';
                break;
            default:
                dotElement.style.backgroundColor = '#000'; // Jika status tidak valid, gunakan warna default
        }

        // Update avatar image
        const avatarUrl = `https://api.lanyard.rest/${avatarId}.jpg`;
        iconElement.setAttribute("src", avatarUrl);

        if (listeningToSpotify) {
            const song_name = data.data.spotify.song;
            const albumArtUrl = data.data.spotify.album_art_url;
            const artistName = data.data.spotify.artist;

            detailsElement.innerText = "Listening To " + song_name;
            details2Element.innerText = "By " + artistName;

            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", albumArtUrl);
            imgElement.style.width = "80px"; 
            imgElement.style.height = "80px"; 
            largeImageElement.innerHTML = ""; // Clear sebelum menambahkan gambar baru
            largeImageElement.appendChild(imgElement);
        } else {
            const activities = data.data.activities;
            let youtubeMusicFound = false;

            // Prioritize YouTube Music if it's in the activities
            for (let i = 0; i < activities.length; i++) {
                if (activities[i].name === "YouTube Music") {
                    const songName = activities[i].details;
                    const artistName = activities[i].state;
                    const rawImageUrl = activities[i].assets.large_image;
                    let imageUrl;

                    if (rawImageUrl.includes("i.ytimg.com")) {
                        imageUrl = "https://i.ytimg.com/" + rawImageUrl.split("i.ytimg.com/")[1];
                    } else if (rawImageUrl.includes("lh3.googleusercontent.com")) {
                        imageUrl = "https://lh3.googleusercontent.com/" + rawImageUrl.split("lh3.googleusercontent.com/")[1];
                    }

                    detailsElement.innerText = "Listening To " + songName;
                    details2Element.innerText = "By " + artistName;

                    const imgElement = document.createElement("img");
                    imgElement.setAttribute("src", imageUrl);
                    imgElement.style.width = "80px";
                    imgElement.style.height = "80px";
                    largeImageElement.innerHTML = ""; // Clear sebelum menambahkan gambar baru
                    largeImageElement.appendChild(imgElement);

                    youtubeMusicFound = true;
                    break;
                }
            }

            if (!youtubeMusicFound && activities.length > 0) {
                const detailsName = activities[0].name;

                if (detailsName === "Feather") {
                    detailsElement.innerText = "Playing Feather (Minecraft)";
                } else {
                    detailsElement.innerText = "Playing " + detailsName;
                }
                
                let imageUrl = "";
                switch (detailsName) {
                    case "Visual Studio Code":
                        imageUrl = "https://cdn.thenewstack.io/media/2021/10/4f0ac3e0-visual_studio_code.png";
                        break;
                    case "VALORANT":
                        imageUrl = "https://seeklogo.com/images/V/valorant-logo-FAB2CA0E55-seeklogo.com.png";
                        break;
                    case "Roblox":
                        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png";
                        break;
                    case "Palworld":
                        imageUrl = "https://pwmodding.wiki/ru/img/palworld.png";
                        break;
                    default:
                        imageUrl = "";
                        break;
                }

                if (imageUrl !== "") {
                    const imgElement = document.createElement("img");
                    imgElement.setAttribute("src", imageUrl);
                    imgElement.style.width = "80px";
                    imgElement.style.height = "80px";
                    largeImageElement.innerHTML = "";
                    largeImageElement.appendChild(imgElement);
                }

                // Menyisipkan state ke dalam elemen HTML
                const state = activities[0].state;
                details2Element.innerText = state || ""; // Menyisipkan details ke dalam elemen HTML, kosongkan jika undefined
                // Menyisipkan details ke dalam elemen HTML
                timestampElement.innerText = activities[0].details || ""; // Menyisipkan details ke dalam elemen HTML, kosongkan jika undefined
            } else if (activities.length === 0) {
                activityElement.innerText = "";
                detailsElement.innerText = "";
                details2Element.innerText = "";
                timestampElement.innerText = "";
                largeImageElement.innerHTML = "";
            }
        }
    })
    .catch(error => console.error('Error fetching data:', error));
}

  
  
  
  
  
  updateData();
  
  // Memanggil fungsi updateData secara berkala setiap 5 detik
  setInterval(updateData, 5000);