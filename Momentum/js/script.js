const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.getElementsByTagName('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let randomNum;
let isPlay = false;
let playNum = 0;
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const changeQuote = document.querySelector('.change-quote');
const author = document.querySelector('.author');
const options = { weekday: 'long', month: 'long', day: 'numeric' };
const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' }

function showTime(timeOptions) {
    const date = new Date();
    const currentTime = date.toLocaleString('ru', timeOptions);
    return currentTime;
}

function showDate(options) {
    const date = new Date();
    const currentDate = date.toLocaleDateString('ru', options);
    return currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if ( hours > 10 && hours <= 16 ) {
        const day = greeting.textContent = 'день';
        return day
    }
    if ( hours >= 17 && hours < 23 ) {
        const evening = greeting.textContent = 'вечер';
        return evening
    }
    if ( hours > 23 && hours < 4 ) {
        const night = greeting.textContent = 'ночь';
        return night
    }
    else {
        const morning = greeting.textContent = 'утро';
        return morning
    }
}

function getTimeOfDayBackgrounImage() {
    const date = new Date();
    const hours = date.getHours();
    if ( hours > 10 && hours <= 16 ) {
        const day = 'afternoon';
        return day
    }
    if ( hours >= 17 && hours < 23 ) {
        const evening = 'evening';
        return evening
    }
    if ( hours > 23 && hours < 4 ) {
        const night = 'night';
        return night
    }
    else {
        const morning = 'morning';
        return morning
    }
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    if ( timeOfDay == 'день' || timeOfDay == 'вечер' ) {
        const greetingText = `Отличный ${timeOfDay}`;
        return greetingText
    }
    if ( timeOfDay == 'ночь' ) {
        const greetingText = `Отличная ${timeOfDay}`;
        return greetingText
    }
    if ( timeOfDay == 'утро' ) {
        const greetingText = `Отличное ${timeOfDay}`;
        return greetingText
    }
}

function setLocalStorage(name) {
    localStorage.setItem('name', name.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage(name) {
    if ( localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)

function getRandomNum() {
    return Math.floor(Math.random() * 20)
}

function setBg() {
    const timeOfDay = getTimeOfDayBackgrounImage();
    const bgNum = getRandomNum();
    let v = String(bgNum).padStart(2, '0')
    if (String(bgNum).length < 2 & String(bgNum) != '0') {
        const img = new Image()
        const backgroundImageV = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${v}.jpg`
        img.src = backgroundImageV
        img.onload = () => {
           document.body.style.backgroundImage = `url(${backgroundImageV})`
        }
    } 
    if (String(bgNum).length > 1 & String(bgNum) != '00') {
        const img = new Image()
        const backgroundImageI = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
        img.src = backgroundImageI
        img.onload = () => {
            document.body.style.backgroundImage = `url(${backgroundImageI})`
        }
    }
}

console.log(setBg())

function getSlideNext() {
    let randomNum = getRandomNum();
    if (randomNum != 20 & randomNum > 0) {
        randomNum += 1;
        return setBg()
    }
}

function getSlidePrev() {
    let randomNum = getRandomNum();
    if (randomNum > 1) {
        randomNum -= 1;
        return setBg()
    }
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

setInterval(() => {
    time.innerHTML = showTime(timeOptions);
    date.innerHTML = showDate(options);
    greeting.innerHTML = showGreeting();
}, 1000)


async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=0714c4f04c63d35e814b018222a9b84b&units=metric`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${Math.floor(data.main.temp)} °C`
    weatherDescription.textContent = data.weather[0].description
}

function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        city.focus()
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);


const quoteApi = () => {
    fetch('https://favqs.com/api/qotd')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        quote.innerHTML = data.quote.body
        author.innerHTML = data.quote.author
    });
}
changeQuote.addEventListener('click', quoteApi)