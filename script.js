const tracks = [
  {
    id: 1,
    title: "Acoustic Breeze",
    artist: "Benjamin Tissot",
    badge: "Overall Pick",
    rating: "⭐⭐⭐⭐⭐ (1,240)",
    cover: "https://picsum.photos/seed/track1/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Electronic Groove",
    artist: "Creative Sounds",
    badge: "#1 Best Seller",
    rating: "⭐⭐⭐⭐☆ (850)",
    cover: "https://picsum.photos/seed/track2/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Urban Rhythm",
    artist: "Street Beats Studio",
    badge: "Prime Exclusive",
    rating: "⭐⭐⭐⭐⭐ (3,110)",
    cover: "https://picsum.photos/seed/track3/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Ambient Horizon",
    artist: "Lunar Wave",
    badge: "New Release",
    rating: "⭐⭐⭐⭐☆ (420)",
    cover: "https://picsum.photos/seed/track4/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  }
];

let currentTrackIndex = 0;
let isPlaying = false;

const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const seekBar = document.getElementById('seek-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const currentCover = document.getElementById('current-cover');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const catalogContainer = document.getElementById('catalog');

// Render Product Cards
function renderCatalog() {
  catalogContainer.innerHTML = tracks.map((track, index) => `
    <div class="product-card">
      <div>
        <img src="${track.cover}" class="product-img" alt="${track.title}">
        <span class="badge">${track.badge}</span>
        <div class="product-title">${track.title}</div>
        <div class="product-artist">By ${track.artist}</div>
        <div class="rating">${track.rating}</div>
      </div>
      <button class="play-btn" onclick="loadAndPlayTrack(${index})">Listen Now</button>
    </div>
  `).join('');
}

function loadAndPlayTrack(index) {
  currentTrackIndex = index;
  const track = tracks[currentTrackIndex];
  
  audio.src = track.src;
  currentTitle.textContent = track.title;
  currentArtist.textContent = track.artist;
  currentCover.src = track.cover;

  playTrack();
}

function playTrack() {
  if (!audio.src) {
    loadAndPlayTrack(0);
    return;
  }
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸';
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = '▶';
}

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

prevBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadAndPlayTrack(currentTrackIndex);
});

nextBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadAndPlayTrack(currentTrackIndex);
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100;
    seekBar.value = progress;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationTimeEl.textContent = formatTime(audio.duration);
  }
});

seekBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});

volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value / 100;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Initialize
renderCatalog();
