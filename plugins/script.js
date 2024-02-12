document.addEventListener('DOMContentLoaded', function () {
    const popupContainer = document.getElementById('popupContainer');
    const closePopup = document.getElementById('closePopup');

    popupContainer.style.display = 'flex';

    closePopup.addEventListener('click', function () {
        popupContainer.style.display = 'none';
        
        // Start playing background music and syncing quotes after closing the popup
        playBackgroundMusic();
        syncQuotesWithMusic();
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
    drawWater();
});

function drawWater() {
    waterCanvas.width = window.innerWidth;
    waterCanvas.height = 150;

    const gradient = waterContext.createLinearGradient(0, 0, window.innerWidth, 0);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
    waterContext.fillStyle = gradient;
    waterContext.beginPath();
    waterContext.moveTo(0, 150);
    waterContext.quadraticCurveTo(mouseX, 50, window.innerWidth, 150);
    waterContext.lineTo(window.innerWidth, 150);
    waterContext.lineTo(0, 150);
    waterContext.closePath();
    waterContext.fill();
}

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

const timedQuotes = [
    { time: 0, quote: "Heaven" },
    { time: 4, quote: "When I held you again" },
    { time: 8, quote: "How could" },
    { time: 10, quote: "We ever just be friends?" },
    { time: 15, quote: "I would rather die than let you go" },
    { time: 20, quote: "Juliet to your Romeo" },
    { time: 24, quote: "How I heard you say" },
    { time: 27, quote: "I would never fall in love again" },
    { time: 31, quote: "until I found her" },
    { time: 34, quote: "I said, 'I would never fall unless it's you I fall into'" },
    { time: 42, quote: "I was lost within the darkness," },
    { time: 45, quote: "but then I found her" },
    { time: 48, quote: "I found you" }
];

let currentQuoteIndex = 0;

function syncQuotesWithMusic() {
    bgMusic.addEventListener('timeupdate', function() {
        if (currentQuoteIndex < timedQuotes.length && this.currentTime >= timedQuotes[currentQuoteIndex].time) {
            displayNextQuote();
        }
    });
}

function displayNextQuote() {
    if (currentQuoteIndex < timedQuotes.length) {
        const quoteElement = document.querySelector('.quote');
        quoteElement.textContent = timedQuotes[currentQuoteIndex].quote;
        currentQuoteIndex++; // Move to the next quote
    }
}

function createRain() {
    // Implementation of the createRain function
}

// Set an initial call to createRain to start the effect when the page loads
setInterval(createRain, 300);
