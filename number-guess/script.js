// Game Variables
let secretNumber;
let attempts;
let maxAttempts;
let gameActive;
let difficulty;
let highScore = null;

// DOM Elements
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('message');
const hint = document.getElementById('hint');
const attemptsDisplay = document.getElementById('attempts');
const rangeDisplay = document.getElementById('range');
const highScoreDisplay = document.getElementById('highScore');
const guessHistory = document.getElementById('guessHistory');
const secretNumberDisplay = document.getElementById('secretNumberDisplay');

// Difficulty Settings
const difficultySettings = {
    easy: { min: 1, max: 50, attempts: 10 },
    medium: { min: 1, max: 100, attempts: 7 },
    hard: { min: 1, max: 200, attempts: 5 }
};

// Initialize Game
function initGame() {
    difficulty = 'medium';
    setDifficulty('medium');
    startNewGame();
    loadHighScore();
    
    // Add event listener for Enter key
    guessInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            submitGuess();
        }
    });
}

// Set Difficulty
function setDifficulty(level) {
    difficulty = level;
    
    // Update button styles
    document.querySelectorAll('.difficulty-selector button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(level + 'Btn').classList.add('active');
    
    // Update display
    const settings = difficultySettings[level];
    rangeDisplay.textContent = `${settings.min} - ${settings.max}`;
    
    // If game is active, restart with new difficulty
    if (gameActive) {
        startNewGame();
    }
}

// Start New Game
function startNewGame() {
    const settings = difficultySettings[difficulty];
    secretNumber = Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
    attempts = 0;
    maxAttempts = settings.attempts;
    gameActive = true;
    
    // Reset UI
    secretNumberDisplay.textContent = '?';
    secretNumberDisplay.style.background = 'linear-gradient(135deg, #9b59b6, #8e44ad)';
    message.textContent = `Guess a number between ${settings.min} and ${settings.max}`;
    hint.textContent = '';
    attemptsDisplay.textContent = attempts;
    guessInput.value = '';
    guessHistory.innerHTML = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    
    // Focus on input
    guessInput.focus();
    
    console.log(`Secret number: ${secretNumber}`); // For testing
}

// Submit Guess
function submitGuess() {
    if (!gameActive) {
        message.textContent = 'Start a new game first!';
        return;
    }
    
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess)) {
        message.textContent = 'Please enter a valid number!';
        shakeInput();
        return;
    }
    
    const settings = difficultySettings[difficulty];
    if (guess < settings.min || guess > settings.max) {
        message.textContent = `Number must be between ${settings.min} and ${settings.max}!`;
        shakeInput();
        return;
    }
    
    // Process guess
    attempts++;
    attemptsDisplay.textContent = attempts;
    
    // Add to guess history
    const guessItem = document.createElement('div');
    guessItem.className = 'guess-item';
    guessItem.textContent = guess;
    
    // Check guess
    if (guess === secretNumber) {
        // Correct guess
        gameActive = false;
        guessItem.classList.add('correct');
        message.textContent = `🎉 Congratulations! You guessed it in ${attempts} attempts!`;
        secretNumberDisplay.textContent = secretNumber;
        secretNumberDisplay.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        hint.textContent = 'Perfect! You found the secret number!';
        
        // Celebrate!
        celebrate();
        
        // Update high score
        updateHighScore(attempts);
        
        // Disable input
        guessInput.disabled = true;
        submitBtn.disabled = true;
    } else {
        // Wrong guess
        const difference = Math.abs(secretNumber - guess);
        let feedback = '';
        let className = '';
        
        if (guess < secretNumber) {
            feedback = '📈 Too Low! Try a higher number.';
            className = 'low';
        } else {
            feedback = '📉 Too High! Try a lower number.';
            className = 'high';
        }
        
        // Add temperature hint
        let tempHint = '';
        if (difference > 50) {
            tempHint = ' (Ice Cold ❄️)';
        } else if (difference > 25) {
            tempHint = ' (Cold 🥶)';
        } else if (difference > 10) {
            tempHint = ' (Warm 🔥)';
        } else if (difference > 5) {
            tempHint = ' (Hot 🔥🔥)';
        } else {
            tempHint = ' (Very Hot 🔥🔥🔥)';
        }
        
        guessItem.classList.add(className);
        message.textContent = feedback;
        hint.textContent = `You're ${difference} away${tempHint}`;
        
        // Check if game over
        if (attempts >= maxAttempts) {
            gameActive = false;
            message.textContent = `Game Over! The secret number was ${secretNumber}`;
            secretNumberDisplay.textContent = secretNumber;
            secretNumberDisplay.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            hint.textContent = 'Better luck next time!';
            guessInput.disabled = true;
            submitBtn.disabled = true;
        }
    }
    
    // Add guess to history (at the beginning)
    guessHistory.insertBefore(guessItem, guessHistory.firstChild);
    
    // Clear input and focus
    guessInput.value = '';
    guessInput.focus();
}

// Give Hint
function giveHint() {
    if (!gameActive || attempts === 0) {
        hint.textContent = 'Make at least one guess first!';
        return;
    }
    
    const lastGuess = parseInt(guessHistory.firstChild?.textContent);
    if (isNaN(lastGuess)) return;
    
    if (lastGuess < secretNumber) {
        hint.textContent = `The number is higher than ${lastGuess}`;
    } else {
        hint.textContent = `The number is lower than ${lastGuess}`;
    }
}

// Show Answer
function showAnswer() {
    if (!gameActive) return;
    
    secretNumberDisplay.textContent = secretNumber;
    secretNumberDisplay.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
    message.textContent = `The secret number was ${secretNumber}`;
    hint.textContent = 'Cheater! 😉 Try again properly!';
    gameActive = false;
    guessInput.disabled = true;
    submitBtn.disabled = true;
}

// Update High Score
function updateHighScore(currentAttempts) {
    if (highScore === null || currentAttempts < highScore) {
        highScore = currentAttempts;
        highScoreDisplay.textContent = highScore;
        localStorage.setItem('numberGuessHighScore', highScore);
        message.textContent += ` 🏆 NEW HIGH SCORE!`;
    }
}

// Load High Score
function loadHighScore() {
    const savedScore = localStorage.getItem('numberGuessHighScore');
    if (savedScore) {
        highScore = parseInt(savedScore);
        highScoreDisplay.textContent = highScore;
    }
}

// Celebration Effect
function celebrate() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#2ecc71', '#3498db', '#9b59b6', '#f1c40f', '#e74c3c'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '15px';
        confetti.style.height = '15px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '100vh';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        confettiContainer.appendChild(confetti);
        
        // Animation
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(-${Math.random() * 100 + 50}vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 1000 + 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Shake Input Animation
function shakeInput() {
    guessInput.style.animation = 'none';
    setTimeout(() => {
        guessInput.style.animation = 'shake 0.5s';
    }, 10);
    
    // Add shake animation to CSS if not present
    if (!document.querySelector('#shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize game when page loads
window.onload = initGame;
