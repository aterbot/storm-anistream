// ===== DATA (OFFICIAL YOUTUBE UPLOADS ONLY) =====
const animeListData = [
  {
    id: "one-punch-man",
    title: "One Punch Man",
    poster: "https://i.imgur.com/J5LVHEL.jpg",
    description: "A hero who defeats enemies with a single punch.",
    episodes: [
      {
        ep: 1,
        title: "Episode 1",
        youtubeId: "Poo5lqoWSGw" // OFFICIAL Muse Asia
      },
      {
        ep: 2,
        title: "Episode 2",
        youtubeId: "kQ1Q2gGvF0M"
      }
    ]
  },
  {
    id: "death-note",
    title: "Death Note",
    poster: "https://i.imgur.com/UePbdph.jpg",
    description: "A notebook that kills anyone whose name is written in it.",
    episodes: [
      {
        ep: 1,
        title: "Episode 1",
        youtubeId: "N6h3c8H9U6o" // OFFICIAL Ani-One Asia
      }
    ]
  }
];

// ===== ELEMENTS =====
const homeSection = document.getElementById("homeSection");
const detailPage = document.getElementById("detailPage");
const watchPage = document.getElementById("watchPage");

const animeList = document.getElementById("animeList");
const episodeList = document.getElementById("episodeList");
const watchEpisodeList = document.getElementById("watchEpisodeList");

const detailPoster = document.getElementById("detailPoster");
const detailTitle = document.getElementById("detailTitle");
const detailDesc = document.getElementById("detailDesc");

const ytPlayer = document.getElementById("ytPlayer");
const watchTitle = document.getElementById("watchTitle");

const backBtn = document.getElementById("backBtn");
const watchBack = document.getElementById("watchBack");
const homeBtn = document.getElementById("homeBtn");

// ===== HELPERS =====
function show(section) {
  homeSection.classList.add("hidden");
  detailPage.classList.add("hidden");
  watchPage.classList.add("hidden");
  section.classList.remove("hidden");
}

// ===== LOAD HOME =====
function loadHome() {
  animeList.innerHTML = "";

  animeListData.forEach(anime => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${anime.poster}">
      <div class="card-title">${anime.title}</div>
    `;

    card.onclick = () => openDetail(anime);
    animeList.appendChild(card);
  });

  show(homeSection);
}

// ===== DETAIL PAGE =====
function openDetail(anime) {
  detailPoster.src = anime.poster;
  detailTitle.textContent = anime.title;
  detailDesc.textContent = anime.description;

  episodeList.innerHTML = "";

  anime.episodes.forEach(ep => {
    const epDiv = document.createElement("div");
    epDiv.className = "episode";
    epDiv.textContent = ep.ep;

    epDiv.onclick = () => openWatch(anime, ep);
    episodeList.appendChild(epDiv);
  });

  show(detailPage);
}

// ===== WATCH PAGE =====
function openWatch(anime, episode) {
  watchTitle.textContent = `${anime.title} - ${episode.title}`;

  ytPlayer.src = `https://www.youtube.com/embed/${episode.youtubeId}?autoplay=1`;

  watchEpisodeList.innerHTML = "";
  anime.episodes.forEach(ep => {
    const epDiv = document.createElement("div");
    epDiv.className = "episode";
    epDiv.textContent = ep.ep;
    epDiv.onclick = () => openWatch(anime, ep);
    watchEpisodeList.appendChild(epDiv);
  });

  show(watchPage);
}

// ===== NAV =====
backBtn.onclick = () => show(homeSection);
watchBack.onclick = () => show(detailPage);
homeBtn.onclick = () => loadHome();

// ===== START =====
loadHome();
