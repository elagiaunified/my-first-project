# 🎮 Number Guessing Game

An interactive game where players guess a secret number with multiple difficulty levels and scoring.

![Game Preview](https://img.shields.io/badge/Status-Complete-success) ![Technology](https://img.shields.io/badge/Tech-HTML/CSS/JS-blue) ![Difficulty](https://img.shields.io/badge/Difficulty-Easy/Medium/Hard-orange)

## 🚀 Live Demo
**[Play the game!](https://elagiaunified.github.io/my-first-project/number-guess/)**

## ✨ Features

- **Three Difficulty Levels**: Easy (1-50), Medium (1-100), Hard (1-200)
- **Intelligent Hints**: "Too High/Too Low" with temperature indicators
- **Attempt Tracking**: Counts your guesses
- **High Score System**: Best score saved in localStorage
- **Visual Feedback**: Color-coded guess history
- **Celebration Effects**: Confetti animation on win
- **Responsive Design**: Play on any device
- **Accessibility**: Full keyboard support

## 🎯 How to Play

1. **Choose Difficulty**: Select Easy, Medium, or Hard
2. **Guess the Number**: Enter a number in the input field
3. **Get Hints**: Game tells if your guess is too high or low
4. **Win**: Guess the correct number in fewest attempts
5. **New Game**: Start over with a new secret number

### **Difficulty Settings**
- **Easy**: Numbers 1-50, 10 attempts
- **Medium**: Numbers 1-100, 7 attempts
- **Hard**: Numbers 1-200, 5 attempts

## 🏗️ Project Structure
- number-guess/
- ├── index.html # Game interface
- ├── style.css # Game styling and animations
- └── script.js # Game logic and scoring

## 🔧 Technical Implementation

### **HTML**
- Semantic game layout
- Input forms for guesses
- Statistics display areas
- Responsive containers

### **CSS**
- Gaming-inspired gradient backgrounds
- Animated elements and transitions
- Responsive grid layouts
- Celebration animations (confetti)
- Mobile-first design

### **JavaScript**
- **Random Number Generation**: Secure random number selection
- **Game State Management**: Track attempts, difficulty, score
- **Input Validation**: Ensure valid number guesses
- **Hint System**: Intelligent feedback based on proximity
- **localStorage**: Save high scores between sessions
- **Animation Control**: Confetti effects on win

## 🔄 Future Improvements
- Potential enhancements:
-  Add sound effects
-  Implement multiplayer mode
-  Add achievements/badges
-  Include number range customization
-  Add timed challenges
-  Implement leaderboards
-  Add tutorial for new players

## 📚 What I Learned
- Game Development: Core game loop and state management
- Randomization: Generating and working with random numbers
- User Feedback: Providing clear, helpful game feedback
- Scoring Systems: Designing fair and engaging scoring
- Animation: Creating visual effects with CSS and JavaScript
- Difficulty Balancing: Adjusting game parameters for different skill levels

## 🤝 Contributing
- Have ideas to improve the game? Open an issue or submit a pull request!

## 📄 License
- This project is open source and available under the MIT License.
- Part of my beginner web development portfolio. Check out the other projects in the main repository!

## 🎲 Game Logic

```javascript
// Generate secret number based on difficulty
function generateSecretNumber(difficulty) {
    const settings = difficultySettings[difficulty];
    return Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
}

// Calculate hint based on difference
function getHint(guess, secret) {
    const difference = Math.abs(secret - guess);
    if (difference > 50) return "Ice Cold ❄️";
    if (difference > 25) return "Cold 🥶";
    if (difference > 10) return "Warm 🔥";
    if (difference > 5) return "Hot 🔥🔥";
    return "Very Hot 🔥🔥🔥";
}
```

## 🏆 Scoring System
- Attempts: Fewer attempts = better score
- Difficulty Bonus: Harder levels give higher potential scores
- High Score: Best score saved per difficulty level
- Visual Rewards: Celebration effects for good performance

## 📱 Responsive Design
- Desktop: Full game interface with side stats
- Tablet: Condensed layout, larger touch targets
- Mobile: Vertical layout, simplified controls
- All devices: Readable text, appropriate button sizes

## 🎨 Gaming Experience
- Visual Progression: Guess history shows pattern
- Audio-like Feedback: Temperature hints (🔥/❄️)
- Victory Celebration: Confetti animation
- Progressive Difficulty: Unlock harder challenges
- Clear Feedback: Immediate response to actions

## 🧪 Testing
Tested game scenarios:
- ✅ All difficulty levels work correctly
- ✅ Hint system provides accurate feedback
- ✅ High score saves and loads properly
- ✅ Game resets correctly for new game
- ✅ Input validation prevents errors
- ✅ Celebration triggers on win
- ✅ Mobile responsiveness

## 🚀 Running Locally
1. Clone the repository:
```
bash
git clone https://github.com/yourusername/my-first-project.git
```
2. Navigate to number-guess folder:
```
bash
cd my-first-project/number-guess
```
3. Open index.html in your browser

## 📝 Code Highlights
Celebration Function
```javascript
function celebrate() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#2ecc71', '#3498db', '#9b59b6', '#f1c40f', '#e74c3c'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        // ... animation setup
        confettiContainer.appendChild(confetti);
    }
}
```
