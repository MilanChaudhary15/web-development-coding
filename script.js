let currentSong = new Audio();
let songs;
let currFolder;
let isShuffle = false;
let shuffledOrder = []; // will hold shuffled indices
let currentIndex = 0; // index in either songs[] or shuffledOrder[]

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

function getShuffledOrder() {
  const indices = [...Array(songs.length).keys()];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

function getShuffledSong(currentIndex) {
  let remainingSongs = songs.filter((_, index) => index !== currentIndex);
  let randomIndex = Math.floor(Math.random() * remainingSongs.length);
  return remainingSongs[randomIndex];
}

async function fetchSongsFromDirectory(folder) {
  currFolder = folder;
  let a = await fetch(
    `http://127.0.0.1:5500/java%20script/spotify_clone/${folder}/`
  );
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }

  // show all the songs in the playlist
  let songul = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];

  songul.innerHTML = "";
  for (const song of songs) {
    songul.innerHTML =
      songul.innerHTML +
      `<li>
                            <img src="img/music.svg" class = "invert" alt="">
                            <div class="info">
                                <div class="song-name">${song}</div>
                                <div>Milan</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img src="img/play.svg" class="invert" alt="">
                            </div>                  
    </li>`;
  }

  //attach an event listener to each song
  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  return songs;
}

function playMusic(track, pause = false) {
  currentSong.src = `/java%20script/spotify_clone/${currFolder}/` + track;

  // Determine correct index for current song
  currentIndex = songs.indexOf(track);

  if (!pause) {
    currentSong.play();
    play.src = "img/pause.svg";
  } else {
    play.src = "img/play.svg";
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}


async function displayAlbum() {
  console.log("displaying albums");
  let a = await fetch(
    `http://127.0.0.1:5500/java%20script/spotify_clone/songs/`
  );
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".cardContainer");
  let array = Array.from(anchors);

  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
      let folder = new URL(e.href).pathname.split("/").filter(Boolean).pop();
      // Skip if folder is actually 'songs' (root), to avoid 404 on /songs/songs/info.json
      if (folder === "songs") continue;
      try {
        // console.log(folder)
        let a = await fetch(
          `http://127.0.0.1:5500/java%20script/spotify_clone/songs/${folder}/info.json`
        );
        if (!a.ok) throw new Error("No info.json");
        let response = await a.json();

        cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
          <div class="play">
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="32" fill="#74ca94" />
        <g transform="translate(20, 20) scale(1.1)">
          <path
            d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
            stroke="black" stroke-width="1.5" stroke-linejoin="round" fill="black" />
        </g>
      </svg>
    </div>
    <img src="/java%20script/spotify_clone/songs/${folder}/cover.jpg" alt="">
    <h2>${response.title}</h2>
    <p>${response.description}</p>
  </div>`;
      } catch (err) {
        // Optionally log or skip folders without info.json
        console.warn(`Skipping folder ${folder}: ${err.message}`);
      }
    }
  }

  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      console.log("Fetching Songs");
      songs = await fetchSongsFromDirectory(
        `songs/${item.currentTarget.dataset.folder}`
      );

      // Check if the user clicked on the .play circle
      const clickedPlayCircle = item.target.closest(".play");

      // Load the first song
      if (clickedPlayCircle) {
        playMusic(songs[0], false); // autoplay
      } else {
        playMusic(songs[0], true); // load only
      }

      // Reset playback position and seekbar
      currentSong.currentTime = 0;
      document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
      document.querySelector(".circle").style.left = "0%";
    });
  });

  Array.from(document.getElementsByClassName(".play circle")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      console.log("Fetching Songs");
      songs = await fetchSongsFromDirectory(
        `songs/${item.currentTarget.dataset.folder}`
      );

      // Load the first song without playing it
      playMusic(songs[0]);

      // Reset current time and seekbar position
      currentSong.currentTime = 0;
      document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
      document.querySelector(".circle").style.left = "0%";
    });
  });
}

async function main() {
  currFolder = "songs/aashiqui";
  //get the list of songs
  songs = await fetchSongsFromDirectory(currFolder);
  // Set up the first song but do not play it automatically
  currentSong.src = `/java%20script/spotify_clone/${currFolder}/` + songs[0];
  document.querySelector(".songinfo").innerHTML = decodeURI(songs[0]);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

  // display all the albums on the page
  displayAlbum();

  //attach an event listener to the play , next and previous buttons
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "img/play.svg";
    }
  });

  // Add an event listener to previous
  previous.addEventListener("click", () => {
  currentSong.pause();
  if (isShuffle) {
    if (currentIndex - 1 >= 0) {
      currentIndex--;
      playMusic(songs[shuffledOrder[currentIndex]]);
    }
  } else {
    if (currentIndex - 1 >= 0) {
      currentIndex--;
      playMusic(songs[currentIndex]);
    }
  }
});


  // Add an event listener to next
  next.addEventListener("click", () => {
  currentSong.pause();
  if (isShuffle) {
    if (currentIndex + 1 < shuffledOrder.length) {
      currentIndex++;
      playMusic(songs[shuffledOrder[currentIndex]]);
    }
  } else {
    if (currentIndex + 1 < songs.length) {
      currentIndex++;
      playMusic(songs[currentIndex]);
    }
  }
});


  // Listen for timeupdate event
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // Listen for ended event
  currentSong.addEventListener("ended", () => {
  if (isShuffle) {
    if (currentIndex + 1 < shuffledOrder.length) {
      currentIndex++;
      playMusic(songs[shuffledOrder[currentIndex]]);
    }
  } else {
    if (currentIndex + 1 < songs.length) {
      currentIndex++;
      playMusic(songs[currentIndex]);
    }
  }
});



  // Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // Add an event to volume
  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log("Setting volume to", e.target.value, "/ 100");
      currentSong.volume = parseInt(e.target.value) / 100;
      if (currentSong.volume > 0) {
        document.querySelector(".volume>img").src = document
          .querySelector(".volume>img")
          .src.replace("mute.svg", "volume.svg");
      }
    });

  // Add an event listener to the hamburger menu
  document
    .querySelector(".hamburgerContainer")
    .addEventListener("click", () => {
      document.querySelector(".left").style.left = "0px";
    });

  // Add an event listener to the close button
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });

  // Add event listener to mute the track
  document.querySelector(".volume>img").addEventListener("click", (e) => {
    if (e.target.src.includes("volume.svg")) {
      e.target.src = e.target.src.replace("volume.svg", "mute.svg");
      currentSong.volume = 0;
      document
        .querySelector(".range")
        .getElementsByTagName("input")[0].value = 0;
    } else {
      e.target.src = e.target.src.replace("mute.svg", "volume.svg");
      currentSong.volume = 0.2;
      document
        .querySelector(".range")
        .getElementsByTagName("input")[0].value = 20;
    }
  });

  // Add event listener to shuffle button
  document.getElementById("shuffle").addEventListener("click", () => {
  isShuffle = !isShuffle;

  const shuffleBtn = document.getElementById("shuffle");
  const shuffleIcon = shuffleBtn.querySelector("img");

  if (shuffleIcon) {
    if (isShuffle) {
      shuffledOrder = getShuffledOrder();
      currentIndex = shuffledOrder.indexOf(currentIndex);
      shuffleIcon.classList.add("green-filter");
      console.log("Shuffle mode: ON");
    } else {
      currentIndex = shuffledOrder[currentIndex];
      shuffledOrder = [];
      shuffleIcon.classList.remove("green-filter");
      console.log("Shuffle mode: OFF");
    }
  } else {
    console.warn("Shuffle icon image not found inside #shuffle.");
  }
});



}

main();
