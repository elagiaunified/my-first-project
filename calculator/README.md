# 🧮 Calculator App

A fully functional calculator web application with keyboard support and clean UI.

![Calculator Preview](https://img.shields.io/badge/Status-Complete-success) ![Technology](https://img.shields.io/badge/Tech-HTML/CSS/JS-blue)

## 🚀 Live Demo
**[Try it here!](https://elagiaunified.github.io/my-first-project/calculator/)**

## ✨ Features

- **Basic Operations**: Addition, subtraction, multiplication, division
- **Advanced Functions**: Percentage calculations, decimal support
- **Keyboard Support**: Use your keyboard to enter numbers and operations
- **Responsive Design**: Works perfectly on mobile and desktop
- **Clear & Delete**: Clear all (C) or delete last digit (⌫)
- **Error Handling**: Prevents invalid operations (division by zero)

## 🎯 How to Use

### **Using Mouse/Touch**
1. Click number buttons (0-9) to enter values
2. Click operation buttons (+, -, ×, ÷)
3. Click `=` or press Enter to calculate
4. Use `C` to clear or `⌫` to delete last digit

### **Using Keyboard**
- **Numbers**: 0-9 keys
- **Operations**: +, -, *, /
- **Enter**: Calculate result
- **Escape**: Clear display
- **Backspace**: Delete last digit

## 🏗️ Project Structure

- calculator/
- ├── index.html # Main HTML structure
- ├── style.css # Styling and layout
- └── script.js # Calculator logic

## 🔧 Technical Implementation

### **HTML**
- Semantic structure with proper labeling
- Input field for display
- Grid layout for buttons

### **CSS**
- Flexbox and Grid for responsive layout
- Gradient backgrounds and shadows
- Hover and active states for buttons
- Smooth transitions and animations

### **JavaScript**
- **DOM Manipulation**: Updating display based on button clicks
- **Event Handling**: Click events and keyboard events
- **Math Operations**: Using `eval()` with safety checks
- **Input Validation**: Preventing invalid expressions

## 📱 Responsive Design

The calculator adapts to different screen sizes:
- **Desktop**: Full-sized calculator with hover effects
- **Tablet**: Slightly reduced button sizes
- **Mobile**: Stacked layout, touch-friendly buttons

## 🎨 Design Elements

- **Color Scheme**: Gradient background with clean white calculator
- **Typography**: Clear, readable fonts
- **Spacing**: Comfortable padding for touch targets
- **Feedback**: Visual feedback on button press

## 🧪 Testing

Tested with various scenarios:
- ✅ Basic arithmetic: `5 + 3 = 8`
- ✅ Decimal operations: `3.14 + 2.86 = 6`
- ✅ Percentage calculations: `100 + 10% = 110`
- ✅ Error prevention: `5 / 0 = Error`
- ✅ Keyboard input works correctly

## 🚀 Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://elagiaunified.github.io/my-first-project.git
   ```
2. Navigate to calculator folder:

```bash
cd my-first-project/calculator
```
3. Open index.html in your browser

## 📝 Code Highlights
Key Function
```javascript
function calculate() {
    try {
        let expression = display.value.replace('×', '*');
        let result = eval(expression);
        
        if (!isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
}
```
🔄 Future Improvements
Potential enhancements:

Add memory functions (M+, M-, MR, MC)

Include scientific calculator features

Add calculation history

Implement theme switcher (light/dark mode)

Add sound effects for button presses

📚 What I Learned
DOM Manipulation: How to update HTML elements with JavaScript

Event Handling: Click events, keyboard events, event listeners

CSS Grid: Creating complex layouts with CSS Grid

JavaScript Functions: Writing reusable, modular functions

Error Handling: Preventing and catching errors in user input

🤝 Contributing
Found a bug or have a suggestion? Feel free to open an issue or submit a pull request!

📄 License
This project is open source and available under the MIT License.

Part of my beginner web development portfolio. Check out the other projects in the main repository!
