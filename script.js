// TRACK STATE
let isPlaying = false; // Starts paused by default
const audio = new Audio("audio/Low Fadee.mp3"); // Initial default track

// TOGGLE PLAY/PAUSE FUNCTION
function togglePlay() {
  const mainPlayBtn = document.getElementById("main-play-btn");

  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    mainPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
  } else {
    audio.play();
    mainPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
  }
}

// CHANGE TRACK FUNCTION (Configured with default 'Low Fade' image and 'Low Fadee' audio)
function playTrack(
  title = "Low Fade", 
  artist = "Unknown Artist", 
  imgSrc = "images/Low Fade.jpg", 
  audioSrc = "audio/Low Fadee.mp3"
) {
  document.getElementById("player-title").textContent = title;
  document.getElementById("player-artist").textContent = artist;
  document.getElementById("player-img").src = imgSrc;
  
  // Update audio source and play
  audio.src = audioSrc;
  audio.play();
  
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
const htmlCode = `<!DOCTYPE html>...`; 
const cssCode = `/* CSS Stylesheet */...`;
const jsCode = `/* JS Script */...`;