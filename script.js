let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let durationDisplay = document.getElementById("duration");
let songImg = document.getElementById("songImg");
let songTitle = document.getElementById("songTitle");
let songSinger = document.getElementById("songSinger");

let songs = [
    { src: "assets/Perfect.mp3", thumbnail: "assets/thumnail(perfect).png", title: "Perfect", singer: "Ed Sheeran" },
    { src: "assets/Night-Changes-One-Direction.mp3", thumbnail: "assets/thumbnail(night-changes).jpg", title: "Night Changes", singer: "One Direction" },
    { src: "assets/Until-I-Found-You.mp3", thumbnail: "assets/thumbnail(until-i).jpg", title: "Until I Found You", singer: "Stephen Sanchez" },
];

let defaultThumbnail = "assets/default-thumbnail.jpg";
let currentSongIndex = 0;

function loadSong(index) {
    let songData = songs[index];
    song.src = songData.src;
    songImg.src = songData.thumbnail || defaultThumbnail;
    songTitle.textContent = songData.title;
    songSinger.textContent = songData.singer;
    song.load();
    song.play();
    updateDuration();
    ctrlIcon.classList.add("bx-pause");
    ctrlIcon.classList.remove("bx-play");
}

function updateDuration() {
    let currentMinutes = Math.floor(song.currentTime / 60);
    let currentSeconds = Math.floor(song.currentTime % 60);
    let durationMinutes = Math.floor(song.duration / 60);
    let durationSeconds = Math.floor(song.duration % 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }

    document.getElementById("duration").textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
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

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
    updateDuration();
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

