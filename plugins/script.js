document.addEventListener('DOMContentLoaded', function () {
    const popupContainer = document.getElementById('popupContainer');
    const closePopup = document.getElementById('closePopup');

    popupContainer.style.display = 'flex';

    closePopup.addEventListener('click', function () {
        popupContainer.style.display = 'none';
        
        // Start playing background music and quotes (lyrics) after closing the popup.
        playBackgroundMusic();
        startQuotes();
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
const quoteElement = document.querySelector('.quote');


function typeText(element, text) {
    let index = 0;
    const intervalId = setInterval(() => {
        element.textContent += text[index];
        index++;
        if (index === text.length) {
            clearInterval(intervalId);

            currentFontIndex = fonts.findIndex(font => font.includes('Dancing Script'));
        }
    }, 200);
}

const heroTextContent = 'Zhuldyz is Love';
typeText(heroText, heroTextContent);

const fontChangeInterval = setInterval(() => {
    if (heroText.textContent.length === heroTextContent.length) {
        clearInterval(fontChangeInterval);
    } else {
        changeFont();
    }
}, 1500);


const bgMusic = document.getElementById('bgMusic');
const musicButton = document.getElementById('musicButton');

document.addEventListener("DOMContentLoaded", function () {
    playBackgroundMusic();
});

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

const quotes = [
    "Heaven",
    "When I held you again",
    "How could",
    "We ever just be friends?",
    "I would rather die than let you go",
    "Juliet to your Romeo",
    "How I heard you say",
    "I would never fall in love again",
    "until I found her",
    "I said, 'I would never fall unless it's you I fall into'",
    "I was lost within the darkness,",
    "but then I found her",
    "I found you",
];

let currentQuoteIndex = 0;

function getNextQuote() {
    const nextQuote = quotes[currentQuoteIndex];
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    return nextQuote;
}

function updateQuote() {
    const quoteElement = document.querySelector('.quote');
    const newQuote = getNextQuote();
    quoteElement.textContent = newQuote;
    setTimeout(updateQuote, 4300);
}

updateQuote();
function createRain() {
    const heartCatcher = document.querySelector('.click-catcher');

    const heart = document.createElement("div");
    heart.classList.add("heart");

    const size = Math.floor(Math.random() * (100 - 40 + 1)) + 40;

    const blur = Math.floor(Math.random() * 7) + 1;
    heart.style.width = size + "px";
    heart.style.height = size + "px";
    heart.style.filter = `blur(${blur}px)`;
    const opacity = Math.random() * 0.4 + 0.6;
    heart.style.opacity = opacity;

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";

    const heartImage = document.createElement("img");
    heartImage.src = "https://cdn.discordapp.com/attachments/1035231349180747826/1190672860776255598/heart_6.PNG";
    heartImage.alt = "Heart";
    heartImage.style.width = "100%";
    heart.appendChild(heartImage);

    heartCatcher.appendChild(heart);

    heart.addEventListener('click', () => {
        const popSound = document.getElementById('popSound');
        popSound.play();

        setTimeout(() => {
            heart.remove();
        }, 0);
    });

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createRain, 160);
