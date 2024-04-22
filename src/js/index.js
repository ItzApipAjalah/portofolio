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
    projects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsContainer.appendChild(projectElement);
    });
}

renderProjects();

// Mengambil elemen HTML yang akan diisi dengan data
const nameElement = document.getElementById("name");
const statusElement = document.getElementById("status");
const activityElement = document.getElementById("activity");
const detailsElement = document.getElementById("details");
const details2Element = document.getElementById("details2");
const largeImageElement = document.getElementById("large_image");

fetch('https://api.lanyard.rest/v1/users/481734993622728715')
.then(response => response.json())
.then(data => {
// Memeriksa apakah pengguna sedang mendengarkan Spotify
if (data.data.listening_to_spotify) {
// Jika sedang mendengarkan, ambil nama album Spotify
const artist = data.data.spotify.album;
// Menggabungkan "Listening To " dengan nama album
const details2Text = "By " + artist;
// Menyisipkan kegiatan ke dalam elemen HTML
details2Element.innerText = details2Text;
} else {
// Jika tidak sedang mendengarkan Spotify, kosongkan elemen HTML
details2Element.innerText = "";
}
})

// Mengambil data dari API
fetch('https://api.lanyard.rest/v1/users/481734993622728715')
.then(response => response.json())
.then(data => {
// Memeriksa apakah pengguna sedang mendengarkan Spotify
if (data.data.listening_to_spotify) {
// Jika sedang mendengarkan, ambil URL gambar album Spotify
const albumArtUrl = data.data.spotify.album_art_url;
// Membuat elemen gambar baru
const imgElement = document.createElement("img");
// Mengatur atribut src elemen gambar ke URL gambar album Spotify
imgElement.setAttribute("src", albumArtUrl);
// Menambahkan properti CSS untuk mengatur ukuran gambar
imgElement.style.width = "80px"; // Ganti dengan lebar yang diinginkan
imgElement.style.height = "80px"; // Ganti dengan tinggi yang diinginkan
// Menambahkan elemen gambar ke dalam elemen HTML large_image
largeImageElement.appendChild(imgElement);
}
})
.catch(error => console.error('Error fetching data:', error));

fetch('https://api.lanyard.rest/v1/users/481734993622728715')
.then(response => response.json())
.then(data => {
// Memeriksa apakah pengguna sedang mendengarkan Spotify
if (data.data.listening_to_spotify) {
// Jika sedang mendengarkan, ambil nama album Spotify
const albumName = data.data.spotify.album;
// Menggabungkan "Listening To " dengan nama album
const detailsText = "Listening To " + albumName;
// Menyisipkan kegiatan ke dalam elemen HTML
detailsElement.innerText = detailsText;
} else {
// Jika tidak sedang mendengarkan Spotify, kosongkan elemen HTML
detailsElement.innerText = "";
}
})


.catch(error => console.error('Error fetching data:', error));
// Mengambil data dari API
fetch('https://api.lanyard.rest/v1/users/481734993622728715')
.then(response => response.json())
.then(data => {
// Mengambil status dari data
const status = data.data.discord_status;
// Menyisipkan status ke dalam elemen HTML
statusElement.innerText = status;
})
.catch(error => console.error('Error fetching data:', error));

// Mengambil data dari API
fetch('https://api.lanyard.rest/v1/users/481734993622728715')
.then(response => response.json())
.then(data => {
// Mengambil username dari data
const username = data.data.discord_user.username;
// Menyisipkan username ke dalam elemen HTML
nameElement.innerText = username;
})
.catch(error => console.error('Error fetching data:', error));


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
