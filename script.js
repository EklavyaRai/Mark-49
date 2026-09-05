// TRACK STATE
let isPlaying = true;

// TOGGLE PLAY/PAUSE FUNCTION
function togglePlay() {
  const mainPlayBtn = document.getElementById("main-play-btn");
  if (isPlaying) {
    mainPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
  } else {
    mainPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
  }
}

// CHANGE TRACK FUNCTION
function playTrack(title, artist, imgSrc) {
  document.getElementById("player-title").textContent = title;
  document.getElementById("player-artist").textContent = artist;
  document.getElementById("player-img").src = imgSrc;
  
  // Reset state to playing
  isPlaying = true;
  document.getElementById("main-play-btn").innerHTML = '<i class="fa-solid fa-pause"></i>';
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
const htmlCode = `<!DOCTYPE html>...`; // Stores index.html content dynamically when needed
const cssCode = `/* CSS Stylesheet */...`;
const jsCode = `/* JS Script */...`;
