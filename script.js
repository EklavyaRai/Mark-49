// TRACK PLAYLIST DATA
const playlist = [
  {
    id: 0,
    title: "Low Fade",
    artist: "Karan Aujla",
    imgSrc: "images/Low Fade.jpg",
    audioSrc: "audio/Low Fadee.mp3",
    badge: "#1 Trending",
    rating: "(18,450)"
  },
  {
    id: 1,
    title: "Neon Pulse",
    artist: "Synthwave Collective",
    imgSrc: "https://picsum.photos/300/300?random=2",
    audioSrc: "audio/Low Fadee.mp3", // Replace with distinct audio file paths as available
    badge: "Top Release",
    rating: "(8,940)"
  },
  {
    id: 2,
    title: "Acoustic Sunsets",
    artist: "Clara Rivera",
    imgSrc: "https://picsum.photos/300/300?random=3",
    audioSrc: "audio/Low Fadee.mp3",
    badge: "",
    rating: "(3,112)"
  },
  {
    id: 3,
    title: "The Daily Tech Wire",
    artist: "Tech Media",
    imgSrc: "https://picsum.photos/300/300?random=4",
    audioSrc: "audio/Low Fadee.mp3",
    badge: "Popular Podcast",
    rating: "(45,100)"
  }
];

// STATE MANAGEMENT
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const audio = new Audio();

// DOM ELEMENTS
const mainPlayBtn = document.getElementById("main-play-btn");
const volumeSlider = document.getElementById("volume-slider");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationTimeEl = document.getElementById("duration-time");
const productGrid = document.getElementById("product-grid");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");

// INITIALIZE PLAYER & CARDS
function initApp() {
  renderCards();
  loadTrack(currentTrackIndex, false);
  audio.volume = 0.7;
}

// RENDER PRODUCT CARDS DYNAMICALLY
function renderCards() {
  productGrid.innerHTML = "";
  playlist.forEach((track, index) => {
    const card = document.createElement("div");
    card.className = `product-card ${index === currentTrackIndex ? 'active-track' : ''}`;
    card.innerHTML = `
      ${track.badge ? `<div class="badge">${track.badge}</div>` : ""}
      <img src="${track.imgSrc}" alt="${track.title} Cover" />
      <h3 class="song-title">${track.title}</h3>
      <p class="artist-name">${track.artist}</p>
      <div class="rating">
        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
        <span>${track.rating}</span>
      </div>
      <div class="price-tag"><span class="prime-badge"><i class="fa-solid fa-check"></i> prime</span> Included with Prime</div>
      <button class="play-btn" onclick="selectAndPlay(${index})">
        <i class="fa-solid ${index === currentTrackIndex && isPlaying ? 'fa-pause' : 'fa-play'}"></i> 
        ${index === currentTrackIndex && isPlaying ? 'Pause' : 'Play Now'}
      </button>
    `;
    productGrid.appendChild(card);
  });
}

// LOAD TRACK DATA
function loadTrack(index, autoPlay = true) {
  currentTrackIndex = index;
  const track = playlist[currentTrackIndex];

  document.getElementById("player-title").textContent = track.title;
  document.getElementById("player-artist").textContent = track.artist;
  document.getElementById("player-img").src = track.imgSrc;
  
  audio.src = track.audioSrc;

  if (autoPlay) {
    audio.play();
    isPlaying = true;
    updatePlayButton();
  }
  renderCards();
}

// TOGGLE PLAY / PAUSE
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }
  updatePlayButton();
  renderCards();
}

function selectAndPlay(index) {
  if (currentTrackIndex === index) {
    togglePlay();
  } else {
    loadTrack(index, true);
  }
}

function updatePlayButton() {
  if (isPlaying) {
    mainPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    mainPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

// NEXT & PREVIOUS TRACK CONTROLS
function nextTrack() {
  if (isShuffle) {
    currentTrackIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  }
  loadTrack(currentTrackIndex, true);
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex, true);
}

// AUDIO EVENT LISTENERS
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener("loadedmetadata", () => {
  durationTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextTrack();
  }
});

// SEEK CONTROL
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  if (audio.duration) {
    audio.currentTime = (clickX / width) * audio.duration;
  }
});

// VOLUME CONTROL
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

// SHUFFLE & REPEAT TOGGLES
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "#febd69" : "#ccc";
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.style.color = isRepeat ? "#febd69" : "#ccc";
});

// TIME FORMATTER UTILITY
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// RUN INITIALIZATION
window.addEventListener("DOMContentLoaded", initApp);