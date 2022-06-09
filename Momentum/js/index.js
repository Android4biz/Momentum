import playList from "./playList.js";

let isPlay = false;
let playNum = 0;
const play = document.querySelector('.play');
const pause = document.querySelector('.pause')
const playlistContainer = document.querySelector('.play-list')
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');

const audio = new Audio();

function toggleBtn() {
    play.classList.toggle('pause');
}

function playAudio() {
    if(!isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
    } else {
        audio.pause();
        isPlay = false
    }
}

playList.forEach( (elem) => {
    const li = document.createElement('li');
    li.classList.add('play-item')
    li.textContent = elem.title;
    li.src = elem.src;
    playlistContainer.append(li);
})


function playNext() {
    if (playNum < playList.length) {
        playNum += 1;
        return playAudio()
    }
}

function playPrev() {
    if (playNum == playList.length) {
        playNum -= 1;
        return playAudio()
    }
}

play.addEventListener('click', toggleBtn);
play.addEventListener('click', playAudio);
playNextBtn.addEventListener('click', playNext)
playNextBtn.addEventListener('click', playPrev)