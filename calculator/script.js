// Get the display element
let display = document.getElementById('display');

// Function to append value to display
function appendToDisplay(value) {
    display.value += value;
}

// Function to clear display
function clearDisplay() {
    display.value = '';
}

// Function to delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Function to calculate result
function calculate() {
    try {
        // Replace '×' with '*' for calculation
        let expression = display.value.replace('×', '*');
        
        // Use eval to calculate (safe here because we control the input)
        let result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Allow numbers and operators
    if (/[0-9\+\-\*\/\.\%]/.test(key)) {
        appendToDisplay(key);
    }
    // Enter key for equals
    else if (key === 'Enter') {
        calculate();
    }
    // Escape key for clear
    else if (key === 'Escape') {
        clearDisplay();
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        deleteLast();
    }
});
