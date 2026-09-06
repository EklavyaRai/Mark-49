// TRACK STATE
let isPlaying = false; // Starts paused by default
const audio = new Audio("audio/Low Fadee.mp3"); // Initial default track

// DOM ELEMENTS
const mainPlayBtn = document.getElementById("main-play-btn");
const volumeSlider = document.querySelector(".volume-slider");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");
const timeDisplays = document.querySelectorAll(".playback-bar .time"); // [0] = current time, [1] = duration

// Set initial volume to match default slider position (70%)
audio.volume = 0.7;

// TOGGLE PLAY/PAUSE FUNCTION
function togglePlay() {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    if (mainPlayBtn) mainPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
  } else {
    audio.play();
    if (mainPlayBtn) mainPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
  }
}

// CHANGE TRACK FUNCTION
function playTrack(
  title = "Low Fade", 
  artist = "Unknown Artist", 
  imgSrc = "images/Low Fade.jpg", 
  audioSrc = "audio/Low Fadee.mp3"
) {
  const titleEl = document.getElementById("player-title");
  const artistEl = document.getElementById("player-artist");
  const imgEl = document.getElementById("player-img");

  if (titleEl) titleEl.textContent = title;
  if (artistEl) artistEl.textContent = artist;
  if (imgEl) imgEl.src = imgSrc;
  
  // Update audio source and play
  audio.src = audioSrc;
  audio.play();
  
  // Reset state to playing
  isPlaying = true;
  if (mainPlayBtn) mainPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

// --- AUDIO EVENT LISTENERS & CONTROL LOGIC ---

// 1. Update Progress Bar & Current Time during playback
audio.addEventListener("timeupdate", () => {
  if (audio.duration && progressBar && timeDisplays.length > 0) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    timeDisplays[0].textContent = formatTime(audio.currentTime);
  }
});

// 2. Display total track duration once media is loaded
audio.addEventListener("loadedmetadata", () => {
  if (timeDisplays.length > 1) {
    timeDisplays[1].textContent = formatTime(audio.duration);
  }
});

// 3. Click anywhere on progress bar container to Seek
if (progressContainer) {
  progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    if (audio.duration) {
      audio.currentTime = (clickX / width) * audio.duration;
    }
  });
}

// 4. Adjust Volume via Range Slider
if (volumeSlider) {
  volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
  });
}

// 5. Automatically reset UI when track completes
audio.addEventListener("ended", () => {
  isPlaying = false;
  if (mainPlayBtn) mainPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  if (progressBar) progressBar.style.width = "0%";
  if (timeDisplays.length > 0) timeDisplays[0].textContent = "0:00";
});

// Helper function to format seconds to M:SS
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// DOWNLOAD FILE UTILITY FOR USER
function downloadFile(filename, textContent, mimeType) {
  const blob = new Blob([textContent], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// STRINGIFIED CODES FOR CLIENT-SIDE DOWNLOADING
const htmlCode = `<!DOCTYPE html>...`; 
const cssCode = `/* CSS Stylesheet */...`;
const jsCode = `/* JS Script */...`;