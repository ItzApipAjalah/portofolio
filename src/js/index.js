const username = "ItzApipAjalah"; 
    
async function fetchGitHubProjects(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        return [];
    }
}

function createProjectElement(project) {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    const linkElement = document.createElement("a");
    linkElement.href = project.html_url;

    const projectNameElement = document.createElement("b");
    projectNameElement.textContent = project.name;

    const projectDescElement = document.createElement("p");
    projectDescElement.textContent = project.description || "(No description provided)";

    const metaElement = document.createElement("div");
    metaElement.classList.add("meta");

    const starsElement = document.createElement("div");
    starsElement.innerHTML = `<span style="font-size: 1.5em;">&#9733;</span> <span class="star">${project.stargazers_count}</span>`;

    const langElement = document.createElement("div");
    langElement.classList.add("lang");

    const colorElement = document.createElement("div");
    colorElement.classList.add("color");
    colorElement.style.backgroundColor = "#e42"; // Ganti dengan warna yang sesuai

    const langTextElement = document.createTextNode(project.language || "(Unknown)");
    langElement.appendChild(colorElement);
    langElement.appendChild(langTextElement);

    metaElement.appendChild(starsElement);
    metaElement.appendChild(langElement);

    linkElement.appendChild(projectNameElement);
    linkElement.appendChild(projectDescElement);
    linkElement.appendChild(metaElement);

    if (project.name === "TebakGambar") {
        linkElement.addEventListener("click", function (event) {
            event.preventDefault();
            Swal.fire({
                title: 'Pilihan',
                text: 'Ingin menuju repository atau Game TebakGambar?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Repository',
                cancelButtonText: 'Halaman Web'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = project.html_url;
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    window.location.href = 'https://itzapipajalah.github.io/TebakGambar/';
                }
            });
        });
    }

    

    projectElement.appendChild(linkElement);

    return projectElement;
}


async function renderProjects() {
    const projectsContainer = document.getElementById("projects-container");
    const projects = await fetchGitHubProjects(username);

    projects.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const firstFiveProjects = projects.slice(0, 5);

    firstFiveProjects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsContainer.appendChild(projectElement);
    });
}


renderProjects();
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

        const username = data.data.discord_user.username;
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

        if (listeningToSpotify) {
            const albumName = data.data.spotify.album;
            const albumArtUrl = data.data.spotify.album_art_url;
            const artistName = data.data.spotify.artist;

            detailsElement.innerText = "Listening To " + albumName;
            details2Element.innerText = "By " + artistName;

            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", albumArtUrl);
            imgElement.style.width = "80px"; 
            imgElement.style.height = "80px"; 
            largeImageElement.innerHTML = ""; // Clear sebelum menambahkan gambar baru
            largeImageElement.appendChild(imgElement);
        } else {
            const activities = data.data.activities;
            if (activities.length > 0) {
                const detailsName = activities[0].name;
                detailsElement.innerText = "Playing " + detailsName;
                
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
                    default:
                        imageUrl = "https://w0.peakpx.com/wallpaper/778/9/HD-wallpaper-404-error-404-error-glitch-glitch.jpg";
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
                
                details2Element.innerText = "";
                // Ambil state dan details dari kegiatan pertama
                const state = activities[0].state;
                const details = activities[0].details;
                // Menyisipkan state ke dalam elemen HTML
                details2Element.innerText = state;
                // Menyisipkan details ke dalam elemen HTML
                timestampElement.innerText = details;
            } else {
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

(window.setScroll = () => document.body.style.setProperty('--scroll', scrollY / innerHeight))();
['scroll', 'resize'].forEach(e => addEventListener(e, setScroll));

['mouseenter', 'mouseleave'].forEach(e => document.addEventListener(e, () => {
    if (e === 'mouseleave') bg.removeAttribute('style');
    bg.style.transition = 'transform .1s linear';
    setTimeout(() => bg.style.transition = '', 100);
}));

document.querySelector('#arrow svg').addEventListener('click', () => {
    const start = performance.now();

    !function step() {
        const progress = (performance.now() - start) / 200;
        scrollTo({ top: (innerWidth > 880 ? .3 : .8) * innerHeight * easeOutCubic(progress) });
        if (progress < 1) requestAnimationFrame(step);
    }();

    function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }
});

window.addEventListener('scroll', function() {
    var bg = document.getElementById('bg');
    var scrollPos = window.scrollY;

    var threshold = 180;

    if (scrollPos > threshold) {
        bg.classList.add('blur');
    } else {
        bg.classList.remove('blur');
    }
});

var audio = document.getElementById("myAudio");
var firstTrack = "src/sound/odoriko.mp3";
  var secondTrack = "src/sound/踊り子.mp3";
  audio.volume = 0.5; // Set volume to 50% (0.0 to 1.0)

  var isPlaying = true;

  function toggleMusic() {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
    } else {
      audio.play();
      isPlaying = true;
    }
  }

  document.addEventListener("keydown", function(event) {
    if (event.key === "1") {
      toggleMusic();
    }
  });

  function playAudio() {
    audio.play().catch(function(error) {
      // Autoplay was prevented, possibly due to browser restrictions
      // You can handle this situation here, e.g., by displaying a play button for the user
      console.error("Autoplay prevented: " + error);
    });
  }

  // Call the playAudio function when the page loads
  window.addEventListener("load", playAudio);

  var audio = document.getElementById("myAudio");
  
  // Function to show Toastr alert when music is loading
  audio.addEventListener('loadstart', function() {
    toastr.info('Music Sedang memuat');
  });

  // Function to show Toastr alert when music starts playing
  audio.addEventListener('play', function() {
    toastr.info('Press 1 to toggle music on/off', '', {
      timeOut: 10000 // Set timeout to 10 seconds (10000 milliseconds)
    });
  });

  // Function to play audio
  function handleAutoplayError(error) {
    console.error("Autoplay prevented: " + error);
    toastr.error('Music tidak dapat dimainkan otomatis. Klik di sini untuk menyalakan music.', '', {
      onclick: function() {
        audio.play().catch(function(error) {
          console.error("Manual play failed: " + error);
        });
      },
      timeOut: 20000, // Set timeout to 0 to prevent auto hide
      extendedTimeOut: 20000 // Set extended timeout to 0 to prevent auto hide
    });
  }

  // Function to play audio
  function playAudio() {
    audio.play().catch(handleAutoplayError);
  }

  // Function to switch to the next music track
  function switchTrack() {
    if (audio.src.includes(firstTrack)) {
      audio.src = secondTrack;
    } else {
      audio.src = firstTrack;
    }
    audio.play().catch(handleAutoplayError);
  }

  // Call switchTrack function when the current track ends
  audio.addEventListener('ended', function() {
    switchTrack();
  });

  // Call playAudio function when the page loads
  window.addEventListener("load", playAudio);