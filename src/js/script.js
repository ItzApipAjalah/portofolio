const firefliesContainer = document.getElementById("fireflies");
let fireflyColor = "";

function createFirefly() {
  const firefly = document.createElement("div");
  firefly.classList.add("firefly");
  firefly.style.top = Math.random() * 100 + "%";
  firefly.style.left = Math.random() * 100 + "%";
  firefly.style.animationDuration = Math.random() * 3 + 2 + "s";
  firefly.style.backgroundColor = fireflyColor; // Set firefly color
  firefly.setAttribute("data-x", Math.random() * window.innerWidth);
  firefly.setAttribute("data-y", Math.random() * window.innerHeight);

  firefliesContainer.appendChild(firefly);

  // Remove firefly after animation completes
  firefly.addEventListener("animationiteration", () => {
    firefliesContainer.removeChild(firefly);
  });
}

// Create fireflies periodically
setInterval(createFirefly, 10);
  let isDarkTheme = false;

  // Function to toggle theme
  function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");
    const pageTitle = document.getElementById("pageTitle");
  
    // Toggle dark mode
    if (isDarkTheme) {
      body.classList.remove("bg-gray-900", "text-white", "dark");
      body.classList.add("bg-gray-100", "text-gray-800");
      themeIcon.innerHTML = "&#9728;&#xFE0E;"; // Sun icon
      themeText.textContent = "Toggle Theme";
      pageTitle.classList.remove("text-white");
      pageTitle.classList.add("text-gray-800");
      fireflyColor = "#000"; 
    } else {
      body.classList.remove("bg-gray-100", "text-gray-800");
      body.classList.add("bg-gray-900", "text-white", "dark");
      themeIcon.innerHTML = "&#127771;"; // Moon icon
      themeText.textContent = "Toggle Theme";
      pageTitle.classList.remove("text-gray-800");
      pageTitle.classList.add("text-white");
      fireflyColor = "#fff";
    }
  
    isDarkTheme = !isDarkTheme;
  }
  // Function to handle mousemove event
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Move fireflies away from cursor
  const fireflies = document.querySelectorAll(".firefly");
  fireflies.forEach((firefly) => {
    const fireflyX = parseFloat(firefly.getAttribute("data-x"));
    const fireflyY = parseFloat(firefly.getAttribute("data-y"));

    const distanceX = mouseX - fireflyX;
    const distanceY = mouseY - fireflyY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const maxDistance = 200; // Maximum distance for effect

    if (distance < maxDistance) {
      const moveX = (distanceX / distance) * maxDistance;
      const moveY = (distanceY / distance) * maxDistance;

      firefly.style.setProperty("--moveX", moveX + "px");
      firefly.style.setProperty("--moveY", moveY + "px");
    }
  });
});

const releaseDate = new Date(2024, 3, 30, 0, 0, 0).getTime();

  const countdownTimer = setInterval(() => {
    const now = new Date().getTime();

    const distance = releaseDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown
    document.getElementById("countdownTimer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // If the countdown is finished, display a message
    if (distance < 0) {
      clearInterval(countdownTimer);
      document.getElementById("countdownTimer").innerHTML = "EXPIRED";
    }
  }, 1000);

  document.getElementById("themeToggle").addEventListener("click", toggleTheme);