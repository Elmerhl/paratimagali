const audio = document.getElementById("audio");
const lyricsContainer = document.getElementById("lyrics");
const playBtn = document.getElementById("playBtn");

let currentLine = -1;
let audioReady = false;

// Precargar el audio cuando la página carga
audio.addEventListener("canplaythrough", () => {
  audioReady = true;
  playBtn.textContent = "▶ Reproducir";
});

// Mostrar estado de carga
audio.addEventListener("loadstart", () => {
  playBtn.textContent = "⏳ Cargando...";
});

playBtn.addEventListener("click", () => {
  if (!audioReady) {
    playBtn.textContent = "⏳ Cargando...";
    return;
  }
  
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸ Pausar";
  } else {
    audio.pause();
    playBtn.textContent = "▶ Reproducir";
  }
});

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  for (let i = 0; i < lyricsData.length; i++) {
    if (currentTime >= lyricsData[i].time && (i === lyricsData.length - 1 || currentTime < lyricsData[i + 1].time)) {
      if (currentLine !== i) {
        currentLine = i;
        lyricsContainer.innerHTML = "";
        lyricsData.forEach((line, index) => {
          const p = document.createElement("p");
          p.textContent = line.text;
          if (index === i) p.classList.add("highlight");
          lyricsContainer.appendChild(p);
        });
      }
    }
  }
});