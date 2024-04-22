const username = "ItzApipAjalah"; // Ganti dengan nama pengguna GitHub Anda
    
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
    projectDescElement.textContent = project.description || "(Tidak Ada Deskripsi)";

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

    projectElement.appendChild(linkElement);

    return projectElement;
}

async function renderProjects() {
    const projectsContainer = document.getElementById("projects-container");
    const projects = await fetchGitHubProjects(username);

    // Urutkan proyek-proyek berdasarkan waktu terakhir diperbarui (diurutkan secara descending)
    projects.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // Ambil lima proyek pertama
    const firstFiveProjects = projects.slice(0, 5);

    firstFiveProjects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsContainer.appendChild(projectElement);
    });
}


renderProjects();
// Fungsi untuk mengambil dan memperbarui data dari API
function updateData() {
    fetch('https://api.lanyard.rest/v1/users/481734993622728715')
    .then(response => response.json())
    .then(data => {
        const nameElement = document.getElementById("name");
        const statusElement = document.getElementById("status");
        const activityElement = document.getElementById("activity");
        const detailsElement = document.getElementById("details");
        const details2Element = document.getElementById("details2");
        const timestampElement = document.getElementById("timestamp");
        const largeImageElement = document.getElementById("large_image");

        const username = data.data.discord_user.username;
        const status = data.data.discord_status;
        const listeningToSpotify = data.data.listening_to_spotify;

        // Menyisipkan username ke dalam elemen HTML
        nameElement.innerText = username;
        // Menyisipkan status ke dalam elemen HTML
        statusElement.innerText = status;

        if (listeningToSpotify) {
            const albumName = data.data.spotify.album;
            const albumArtUrl = data.data.spotify.album_art_url;

            // Menyisipkan kegiatan ke dalam elemen HTML
            activityElement.innerText = "Listening To " + albumName;
            // Menyisipkan detail ke dalam elemen HTML
            detailsElement.innerText = "Listening To " + albumName;
            // Menyisipkan detail2 ke dalam elemen HTML
            details2Element.innerText = "By " + albumName;

            // Membuat elemen gambar baru
            const imgElement = document.createElement("img");
            // Mengatur atribut src elemen gambar ke URL gambar album Spotify
            imgElement.setAttribute("src", albumArtUrl);
            // Menambahkan properti CSS untuk mengatur ukuran gambar
            imgElement.style.width = "80px"; // Ganti dengan lebar yang diinginkan
            imgElement.style.height = "80px"; // Ganti dengan tinggi yang diinginkan
            // Menambahkan elemen gambar ke dalam elemen HTML large_image
            largeImageElement.innerHTML = ""; // Clear sebelum menambahkan gambar baru
            largeImageElement.appendChild(imgElement);
        } else {
            // Jika tidak sedang mendengarkan Spotify
            const activities = data.data.activities;
            if (activities.length > 0) {
                // Ambil nama kegiatan pertama
                const detailsName = activities[0].name;
                // Menyisipkan kegiatan ke dalam elemen HTML dengan menambahkan "Playing"
                detailsElement.innerText = "Playing " + detailsName;
                
                // Taruh URL gambar berdasarkan nama kegiatan
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
                        largeImageElement.innerHTML = "";
                        break;
                }

                // Jika ada URL gambar yang sesuai, tambahkan gambar ke dalam elemen HTML large_image
                if (imageUrl !== "") {
                    const imgElement = document.createElement("img");
                    imgElement.setAttribute("src", imageUrl);
                    imgElement.style.width = "80px";
                    imgElement.style.height = "80px";
                    largeImageElement.innerHTML = "";
                    largeImageElement.appendChild(imgElement);
                }
                
                // Kosongkan elemen detail2
                details2Element.innerText = "";
                // Ambil state dan details dari kegiatan pertama
                const state = activities[0].state;
                const details = activities[0].details;
                // Menyisipkan state ke dalam elemen HTML
                details2Element.innerText = state;
                // Menyisipkan details ke dalam elemen HTML
                timestampElement.innerText = details;
            } else {
                // Jika tidak ada kegiatan, kosongkan semua elemen
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





// Memanggil fungsi updateData secara berkala setiap 5 detik
// Memanggil fungsi updateData untuk pertama kali saat halaman dimuat
updateData();

// Memanggil fungsi updateData secara berkala setiap 5 detik
setInterval(updateData, 10000);

(window.setScroll = () => document.body.style.setProperty('--scroll', scrollY / innerHeight))();
['scroll', 'resize'].forEach(e => addEventListener(e, setScroll));

const bg = document.querySelector('#bg');

addEventListener('touchstart', () => bg.style.setProperty('--multiplier', '0'));
addEventListener('mousemove', ({ clientX, clientY }) => {
    bg.style.setProperty('--tx', `${20 * (clientX - innerWidth / 2) / innerWidth}px`);
    bg.style.setProperty('--ty', `${20 * (clientY - innerHeight / 2) / innerHeight}px`);
});

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
