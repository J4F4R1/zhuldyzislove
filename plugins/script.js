document.addEventListener('DOMContentLoaded', function () {
    const popupContainer = document.getElementById('popupContainer');
    const closePopup = document.getElementById('closePopup');

    popupContainer.style.display = 'flex';

    closePopup.addEventListener('click', function () {
        popupContainer.style.display = 'none';
        
        // Start playing background music after closing the popup.
        playBackgroundMusic();
    });
});

let heartRateInterval;

function updateHeartRate() {
    const heartRate = document.getElementById('heartRateSlider').value;
    clearInterval(heartRateInterval);
    heartRateInterval = setInterval(createRain, heartRate);
}
updateHeartRate();

const waterCanvas = document.getElementById('waterCanvas');
const waterContext = waterCanvas.getContext('2d');

let mouseX = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
});

function drawWater() {
    waterCanvas.width = window.innerWidth;
    waterCanvas.height = 150;

    const gradient = waterContext.createLinearGradient(0, 0, window.innerWidth, 0);
    gradient.addColorStop(0, 'rgba(250, 250, 250)');
    gradient.addColorStop(0.5, 'rgba(250, 250, 250)');
    gradient.addColorStop(1, 'rgba(250, 250, 250)');
    waterContext.fillStyle = gradient;
    waterContext.beginPath();
    waterContext.moveTo(0, 150);
    waterContext.quadraticCurveTo(mouseX, 50, window.innerWidth, 150);
    waterContext.lineTo(window.innerWidth, 150);
    waterContext.lineTo(0, 150);
    waterContext.closePath();
    waterContext.fill();

    requestAnimationFrame(drawWater);
}

drawWater();

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
});

const heroText = document.querySelector('.hero-text');
const heroTextContent = 'Zhuldyz is Love';

function typeText(element, text) {
    let index = 0;
    const intervalId = setInterval(() => {
        element.textContent += text[index];
        index++;
        if (index === text.length) {
            clearInterval(intervalId);
        }
    }, 200);
}

typeText(heroText, heroTextContent);

const bgMusic = document.getElementById('bgMusic');
const musicButton = document.getElementById('musicButton');

function playBackgroundMusic() {
    bgMusic.play().then(() => {
        updateMusicButton();
        syncQuotesWithMusic(); // Start syncing quotes with the music
    }).catch((error) => {
        console.error("Auto-play prevented: ", error);
        musicButton.style.display = "inline-block";
    });
}

function updateMusicButton() {
    if (!bgMusic.paused) {
        musicButton.textContent = "⏸";
    } else {
        musicButton.textContent = "⏯";
    }
}

musicButton.addEventListener('click', toggleMusic);

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
    updateMusicButton();
}

// Define your quotes with their corresponding times (in seconds)
const timedQuotes = [
    { time: 0, quote: "Heaven" }, // Starts at 0 seconds
    { time: 4, quote: "When I held you again" }, // 4 seconds after start
    { time: 8, quote: "How could" }, // 4 seconds after previous
    { time: 11, quote: "We ever just be friends?" }, // 3 seconds after previous
    { time: 15, quote: "I would rather die than let you go" }, // 4 seconds after previous
    { time: 20, quote: "Juliet to your Romeo" }, // 5 seconds after previous
    { time: 24, quote: "How I heard you say" }, // 4 seconds after previous
    { time: 27, quote: "I would never fall in love again" }, // 3 seconds after previous
    { time: 30, quote: "until I found her" }, // 3 seconds after previous
    { time: 33, quote: "I said, 'I would never fall unless it's you I fall into'" }, // 3 seconds after previous
    { time: 40, quote: "I was lost within the darkness," }, // 7 seconds after previous
    { time: 43, quote: "but then I found her" }, // 3 seconds after previous
    { time: 46, quote: "I found you" } // 3 seconds after previous, stays for 20 seconds
];


let currentQuoteIndex = 0; // Keep track of the current quote

// Function to display the next quote
function displayNextQuote() {
    if (currentQuoteIndex < timedQuotes.length) {
        const quoteElement = document.querySelector('.quote');
        quoteElement.textContent = timedQuotes[currentQuoteIndex].quote;
        currentQuoteIndex++; // Move to the next quote
    }
}

// Listen for the timeupdate event to sync quotes with music
function syncQuotesWithMusic() {
    bgMusic.addEventListener('timeupdate', function() {
        if (currentQuoteIndex < timedQuotes.length && this.currentTime >= timedQuotes[currentQuoteIndex].time) {
            displayNextQuote();
        }
    });

    // Optionally, reset quote display when the music ends or is replayed
    bgMusic.addEventListener('ended', function() {
        currentQuoteIndex = 0; // Reset the quote index
        displayNextQuote(); // Display the first quote again if the music is replayed
    });
}

function createRain() {
    // The existing createRain function goes here
}

setInterval(createRain, 160);
