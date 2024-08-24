let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let durationDisplay = document.getElementById("duration");

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
    updateDuration();
}

function playPause() {
    if (ctrlIcon.classList.contains("bx-pause")) {
        song.pause();
        ctrlIcon.classList.remove("bx-pause");
        ctrlIcon.classList.add("bx-play");
    }
    else {
        song.play();
        ctrlIcon.classList.add("bx-pause");
        ctrlIcon.classList.remove("bx-play");
    }
}

function updateDuration() {
    let currentMinutes = Math.floor(song.currentTime / 60);
    let currentSeconds = Math.floor(song.currentTime % 60);
    let durationMinutes = Math.floor(song.duration / 60);
    let durationSeconds = Math.floor(song.duration % 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }

    durationDisplay.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
}


if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
        updateDuration();
    }, 500);
}

progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("bx-pause");
    ctrlIcon.classList.remove("bx-play");
}

