const username = "ItzApipAjalah";
const CACHE_KEY = `github_projects_${username}`;
const CACHE_EXPIRATION_MS = 1000 * 60 * 60; // 1 hour

async function fetchGitHubProjects(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();
        
        if (data.message && data.message.includes("API rate limit exceeded")) {
            Swal.fire({
                title: 'Rate Limit Exceeded',
                text: 'API rate limit exceeded for your IP. Authenticated requests get a higher rate limit. Check out the documentation for more details.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return [];
        }

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

async function fetchLastCommitTitle() {
  try {
      const response = await fetch('https://api.github.com/repos/ItzApipAjalah/portofolio/commits');
      const data = await response.json();
      return data[0].commit.message;
  } catch (error) {
      console.error('Error fetching last commit title:', error);
      return null;
  }
}

async function updateLastDeploymentInfo() {
  const deployLink = document.getElementById('deploy-link');
  const deployInfo = document.getElementById('deploy-info');

  const lastCommitTitle = await fetchLastCommitTitle();
  if (lastCommitTitle) {
      deployInfo.textContent = `Last change: ${lastCommitTitle}`;
  } else {
      deployInfo.textContent = 'No recent changes found';
  }
}

function getCachedProjects() {
    const cache = localStorage.getItem(CACHE_KEY);
    if (!cache) return null;

    const { timestamp, data } = JSON.parse(cache);
    if (Date.now() - timestamp > CACHE_EXPIRATION_MS) {
        return null;
    }

    return data;
}

function saveProjectsToCache(projects) {
    const cache = {
        timestamp: Date.now(),
        data: projects
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

function compareProjects(newProjects, cachedProjects) {
    if (!cachedProjects) return true;
    if (newProjects.length !== cachedProjects.length) return true;

    for (let i = 0; i < newProjects.length; i++) {
        if (newProjects[i].id !== cachedProjects[i].id || 
            newProjects[i].updated_at !== cachedProjects[i].updated_at) {
            return true;
        }
    }
    return false;
}

async function renderProjects() {
    const projectsContainer = document.getElementById("projects-container");
    let cachedProjects = getCachedProjects();

    let newProjects = await fetchGitHubProjects(username);

    if (compareProjects(newProjects, cachedProjects)) {
        saveProjectsToCache(newProjects);
        cachedProjects = newProjects;
    }

    projectsContainer.innerHTML = ''; // Clear previous projects

    cachedProjects.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const firstFiveProjects = cachedProjects.slice(0, 5);

    firstFiveProjects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsContainer.appendChild(projectElement);
    });
}

updateLastDeploymentInfo();
renderProjects();
