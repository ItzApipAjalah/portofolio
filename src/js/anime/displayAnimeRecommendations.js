async function fetchAnimeRecommendations() {
    try {
        const response = await fetch('https://api.jikan.moe/v4/recommendations/anime');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching anime recommendations:', error);
        return null;
    }
  }

  async function displayAnimeRecommendations() {
    const animeListDiv = document.getElementById('animeList');
    const animeData = await fetchAnimeRecommendations();
    
    if (animeData && animeData.data && animeData.data.length > 0) {
        // Generate a random index within the range of available recommendations
        const randomIndex = Math.floor(Math.random() * animeData.data.length);
        
        // Get a random recommendation
        const recommendation = animeData.data[randomIndex];
        const entry = recommendation.entry[0];
        const title = entry.title;
        const imageUrl = entry.images.jpg.image_url;
  
        const widget = document.createElement('div');
        widget.classList.add('widget');
        
        widget.innerHTML = `
            <a href="${entry.url}" aria-label="${title}">
                <div class="content">
                    <div class="image" style="background-image: url('${imageUrl} ' )"></div>
                    <div class="meta" style="white-space: nowrap; text-align: center;">
                        <b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Recommendation Anime &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </b>
                        <p id="animeTitle">${title}</p>
                    </div>
                </div>
            </a>
        `;
        animeListDiv.appendChild(widget);
    } else {
        animeListDiv.innerHTML = '<p>No anime recommendations found.</p>';
    }
  }

  window.onload = displayAnimeRecommendations;