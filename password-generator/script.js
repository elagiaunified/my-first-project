// Character sets
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// DOM Elements
const lengthSlider = document.getElementById('lengthSlider');
const currentLength = document.getElementById('currentLength');
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const lengthValue = document.getElementById('lengthValue');
const entropyValue = document.getElementById('entropyValue');
const combinationsValue = document.getElementById('combinationsValue');
const passwordList = document.getElementById('passwordList');
const historyList = document.getElementById('historyList');

// Character checkboxes
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const customCharsInput = document.getElementById('customChars');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set up slider
    lengthSlider.addEventListener('input', function() {
        currentLength.textContent = this.value;
        lengthValue.textContent = this.value;
        updatePasswordStats();
    });
    
    // Set up character checkboxes
    [uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck].forEach(checkbox => {
        checkbox.addEventListener('change', updatePasswordStats);
    });
    
    customCharsInput.addEventListener('input', updatePasswordStats);
    
    // Load history
    loadHistory();
    
    // Generate initial password
    generatePassword();
    
    // Toastr configuration
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "timeOut": "3000"
    };
});

// Generate password
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const charPool = getCharacterPool();
    
    if (charPool.length === 0) {
        passwordOutput.textContent = "Select at least one character type!";
        passwordOutput.style.color = "#e74c3c";
        updateStrength(0);
        return;
    }
    
    let password = '';
    const poolLength = charPool.length;
    
    // Generate password using cryptographically secure random if available
    if (window.crypto && window.crypto.getRandomValues) {
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);
        
        for (let i = 0; i < length; i++) {
            password += charPool[randomValues[i] % poolLength];
        }
    } else {
        // Fallback to Math.random()
        for (let i = 0; i < length; i++) {
            password += charPool[Math.floor(Math.random() * poolLength)];
        }
    }
    
    // Display password
    passwordOutput.textContent = password;
    passwordOutput.style.color = "#2d3748";
    
    // Update stats and strength
    updatePasswordStats();
    
    // Add to history
    addToHistory(password);
}

// Get character pool based on selections
function getCharacterPool() {
    let pool = '';
    
    if (uppercaseCheck.checked) pool += charSets.uppercase;
    if (lowercaseCheck.checked) pool += charSets.lowercase;
    if (numbersCheck.checked) pool += charSets.numbers;
    if (symbolsCheck.checked) pool += charSets.symbols;
    
    // Add custom characters
    const customChars = customCharsInput.value.trim();
    if (customChars) {
        pool += customChars;
    }
    
    return pool;
}

// Copy password to clipboard
function copyPassword() {
    const password = passwordOutput.textContent;
    
    if (password === "Click Generate" || password === "Select at least one character type!") {
        toastr.warning('Generate a password first!');
        return;
    }
    
    navigator.clipboard.writeText(password).then(() => {
        toastr.success('Password copied to clipboard!');
        
        // Visual feedback
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
            copyBtn.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
        }, 2000);
    }).catch(err => {
        toastr.error('Failed to copy password');
        console.error('Copy failed:', err);
    });
}

// Generate multiple passwords
function generateMultiple(count) {
    passwordList.innerHTML = '';
    const charPool = getCharacterPool();
    const length = parseInt(lengthSlider.value);
    
    if (charPool.length === 0) {
        toastr.warning('Select at least one character type!');
        return;
    }
    
    for (let i = 0; i < count; i++) {
        let password = '';
        const poolLength = charPool.length;
        
        for (let j = 0; j < length; j++) {
            password += charPool[Math.floor(Math.random() * poolLength)];
        }
        
        const passwordItem = document.createElement('div');
        passwordItem.className = 'password-item';
        passwordItem.textContent = password;
        passwordItem.onclick = () => {
            passwordOutput.textContent = password;
            updatePasswordStats();
            toastr.info('Password loaded!');
        };
        
        passwordList.appendChild(passwordItem);
    }
}

// Update password strength and stats
function updatePasswordStats() {
    const length = parseInt(lengthSlider.value);
    const charPool = getCharacterPool();
    const poolSize = charPool.length;
    
    if (poolSize === 0) {
        updateStrength(0);
        return;
    }
    
    // Calculate entropy
    const entropy = Math.log2(Math.pow(poolSize, length));
    entropyValue.textContent = entropy.toFixed(1);
    
    // Calculate possible combinations
    const combinations = Math.pow(poolSize, length);
    combinationsValue.textContent = formatNumber(combinations);
    
    // Calculate strength score (0-100)
    let strengthScore = 0;
    
    // Length contribution (max 40 points)
    strengthScore += Math.min(length * 2, 40);
    
    // Character variety contribution
    let typeCount = 0;
    if (uppercaseCheck.checked) typeCount++;
    if (lowercaseCheck.checked) typeCount++;
    if (numbersCheck.checked) typeCount++;
    if (symbolsCheck.checked) typeCount++;
    if (customCharsInput.value.trim()) typeCount++;
    
    strengthScore += typeCount * 15; // max 75 points
    
    // Cap at 100
    strengthScore = Math.min(strengthScore, 100);
    
    updateStrength(strengthScore);
}

// Update strength meter
function updateStrength(score) {
    strengthBar.style.width = score + '%';
    
    // Update color and text based on score
    let color, text;
    
    if (score < 30) {
        color = '#e74c3c';
        text = 'Very Weak';
    } else if (score < 50) {
        color = '#f39c12';
        text = 'Weak';
    } else if (score < 70) {
        color = '#f1c40f';
        text = 'Moderate';
    } else if (score < 90) {
        color = '#2ecc71';
        text = 'Strong';
    } else {
        color = '#27ae60';
        text = 'Very Strong';
    }
    
    strengthBar.style.background = color;
    strengthText.textContent = text;
    strengthText.style.color = color;
}

// Apply preset templates
function applyPreset(preset) {
    // Remove active class from all buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    switch(preset) {
        case 'memorable':
            lengthSlider.value = 8;
            currentLength.textContent = '8';
            lengthValue.textContent = '8';
            uppercaseCheck.checked = true;
            lowercaseCheck.checked = true;
            numbersCheck.checked = false;
            symbolsCheck.checked = false;
            customCharsInput.value = '';
            break;
            
        case 'pin':
            lengthSlider.value = 6;
            currentLength.textContent = '6';
            lengthValue.textContent = '6';
            uppercaseCheck.checked = false;
            lowercaseCheck.checked = false;
            numbersCheck.checked = true;
            symbolsCheck.checked = false;
            customCharsInput.value = '';
            break;
            
        case 'strong':
            lengthSlider.value = 16;
            currentLength.textContent = '16';
            lengthValue.textContent = '16';
            uppercaseCheck.checked = true;
            lowercaseCheck.checked = true;
            numbersCheck.checked = true;
            symbolsCheck.checked = true;
            customCharsInput.value = '';
            break;
            
        case 'all':
            lengthSlider.value = 32;
            currentLength.textContent = '32';
            lengthValue.textContent = '32';
            uppercaseCheck.checked = true;
            lowercaseCheck.checked = true;
            numbersCheck.checked = true;
            symbolsCheck.checked = true;
            customCharsInput.value = '~`[]\\;:\'",./';
            break;
    }
    
    updatePasswordStats();
    generatePassword();
}

// Reset settings
function resetSettings() {
    lengthSlider.value = 12;
    currentLength.textContent = '12';
    lengthValue.textContent = '12';
    uppercaseCheck.checked = true;
    lowercaseCheck.checked = true;
    numbersCheck.checked = true;
    symbolsCheck.checked = true;
    customCharsInput.value = '';
    
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.preset-btn:nth-child(3)').classList.add('active');
    
    updatePasswordStats();
    generatePassword();
    toastr.info('Settings reset to default');
}

// Add password to history
function addToHistory(password) {
    const timestamp = new Date().toLocaleString();
    const historyItem = {
        password: password,
        timestamp: timestamp,
        length: password.length
    };
    
    // Get existing history
    let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    
    // Add new item at the beginning
    history.unshift(historyItem);
    
    // Keep only last 20 items
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    
    // Save to localStorage
    localStorage.setItem('passwordHistory', JSON.stringify(history));
    
    // Update display
    loadHistory();
}

// Load history from localStorage
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    historyList.innerHTML = '';
    
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="password-text">${item.password}</div>
            <div class="history-date">${item.timestamp} • ${item.length} chars</div>
        `;
        
        historyItem.onclick = () => {
            passwordOutput.textContent = item.password;
            updatePasswordStats();
            toastr.info('Password loaded from history!');
        };
        
        historyList.appendChild(historyItem);
    });
}

// Clear history
function clearHistory() {
    if (confirm('Are you sure you want to clear all password history?')) {
        localStorage.removeItem('passwordHistory');
        historyList.innerHTML = '';
        toastr.info('History cleared');
    }
}

// Helper function to format large numbers
function formatNumber(num) {
    if (num >= 1e18) return (num / 1e18).toFixed(1) + ' quintillion';
    if (num >= 1e15) return (num / 1e15).toFixed(1) + ' quadrillion';
    if (num >= 1e12) return (num / 1e12).toFixed(1) + ' trillion';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + ' billion';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + ' million';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + ' thousand';
    return num.toString();
}

// Click on password to copy
passwordOutput.addEventListener('click', copyPassword);
