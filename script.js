const animeList = document.getElementById("animeList");
const detailPage = document.getElementById("detailPage");
const homeSection = document.getElementById("homeSection");

const detailPoster = document.getElementById("detailPoster");
const detailTitle = document.getElementById("detailTitle");
const detailDesc = document.getElementById("detailDesc");
const detailMeta = document.getElementById("detailMeta");
const episodeList = document.getElementById("episodeList");

const backBtn = document.getElementById("backBtn");
const homeBtn = document.getElementById("homeBtn");

const landingPage = document.getElementById("landingPage");
const enterBtn = document.getElementById("enterBtn");

/* LOAD HOME ANIME */
fetch("https://api.jikan.moe/v4/top/anime?limit=12")
  .then(res => res.json())
  .then(data => {
    data.data.forEach(anime => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${anime.images.jpg.large_image_url}">
        <div class="card-title">${anime.title}</div>
      `;

      card.addEventListener("click", () => openDetail(anime));
      animeList.appendChild(card);
    });
  });

/* DETAIL PAGE */
function openDetail(anime) {
  homeSection.classList.add("hidden");
  detailPage.classList.remove("hidden");

  detailPoster.src = anime.images.jpg.large_image_url;
  detailTitle.textContent = anime.title;
  detailMeta.textContent = `${anime.type} • ⭐ ${anime.score || "N/A"}`;
  detailDesc.textContent = anime.synopsis || "No description.";

  loadEpisodes(anime.mal_id);
}

backBtn.addEventListener("click", () => {
  detailPage.classList.add("hidden");
  homeSection.classList.remove("hidden");
});

homeBtn.addEventListener("click", () => {
  detailPage.classList.add("hidden");
  homeSection.classList.remove("hidden");
});

/* EPISODES */
function loadEpisodes(id) {
  episodeList.innerHTML = "Loading episodes...";

  fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`)
    .then(res => res.json())
    .then(data => {
      episodeList.innerHTML = "";

      if (!data.data || data.data.length === 0) {
        episodeList.innerHTML = "No episodes found.";
        return;
      }

      data.data.forEach(ep => {
        const el = document.createElement("div");
        el.className = "episode";
        el.textContent = ep.mal_id;
        episodeList.appendChild(el);
      });
    })
    .catch(() => {
      episodeList.innerHTML = "Failed to load episodes.";
    });
}

/* SEARCH */
const searchBtn = document.querySelector(".search-btn");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchBtn.addEventListener("click", () => {
  searchOverlay.classList.remove("hidden");
  searchInput.focus();
});

closeSearch.addEventListener("click", () => {
  searchOverlay.classList.add("hidden");
  searchInput.value = "";
  searchResults.innerHTML = "";
});

let searchTimeout;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  const q = searchInput.value.trim();
  if (q.length < 3) return;

  searchTimeout = setTimeout(() => {
    fetch(`https://api.jikan.moe/v4/anime?q=${q}&limit=12`)
      .then(res => res.json())
      .then(data => {
        searchResults.innerHTML = "";
        data.data.forEach(anime => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img src="${anime.images.jpg.large_image_url}">
            <div class="card-title">${anime.title}</div>
          `;
          card.onclick = () => {
            searchOverlay.classList.add("hidden");
            openDetail(anime);
          };
          searchResults.appendChild(card);
        });
      });
  }, 400);
});
enterBtn.addEventListener("click", () => {
  landingPage.style.display = "none";
});
