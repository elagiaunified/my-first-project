// Unit Definitions
const unitCategories = {
    length: {
        name: "Length",
        units: [
            { name: "Meter", symbol: "m", type: "metric" },
            { name: "Kilometer", symbol: "km", type: "metric" },
            { name: "Centimeter", symbol: "cm", type: "metric" },
            { name: "Millimeter", symbol: "mm", type: "metric" },
            { name: "Mile", symbol: "mi", type: "imperial" },
            { name: "Yard", symbol: "yd", type: "imperial" },
            { name: "Foot", symbol: "ft", type: "imperial" },
            { name: "Inch", symbol: "in", type: "imperial" },
            { name: "Nautical Mile", symbol: "nmi", type: "imperial" }
        ],
        conversions: {
            // Base: 1 meter
            m: 1,
            km: 0.001,
            cm: 100,
            mm: 1000,
            mi: 0.000621371,
            yd: 1.09361,
            ft: 3.28084,
            in: 39.3701,
            nmi: 0.000539957
        }
    },
    weight: {
        name: "Weight",
        units: [
            { name: "Kilogram", symbol: "kg", type: "metric" },
            { name: "Gram", symbol: "g", type: "metric" },
            { name: "Milligram", symbol: "mg", type: "metric" },
            { name: "Pound", symbol: "lb", type: "imperial" },
            { name: "Ounce", symbol: "oz", type: "imperial" },
            { name: "Stone", symbol: "st", type: "imperial" },
            { name: "Metric Ton", symbol: "t", type: "metric" }
        ],
        conversions: {
            // Base: 1 kilogram
            kg: 1,
            g: 1000,
            mg: 1000000,
            lb: 2.20462,
            oz: 35.274,
            st: 0.157473,
            t: 0.001
        }
    },
    temperature: {
        name: "Temperature",
        units: [
            { name: "Celsius", symbol: "°C", type: "metric" },
            { name: "Fahrenheit", symbol: "°F", type: "imperial" },
            { name: "Kelvin", symbol: "K", type: "scientific" }
        ],
        special: true // Temperature needs special handling
    },
    volume: {
        name: "Volume",
        units: [
            { name: "Liter", symbol: "L", type: "metric" },
            { name: "Milliliter", symbol: "mL", type: "metric" },
            { name: "Gallon", symbol: "gal", type: "imperial" },
            { name: "Quart", symbol: "qt", type: "imperial" },
            { name: "Pint", symbol: "pt", type: "imperial" },
            { name: "Cup", symbol: "cup", type: "imperial" },
            { name: "Fluid Ounce", symbol: "fl oz", type: "imperial" },
            { name: "Cubic Meter", symbol: "m³", type: "metric" }
        ],
        conversions: {
            // Base: 1 liter
            L: 1,
            mL: 1000,
            gal: 0.264172,
            qt: 1.05669,
            pt: 2.11338,
            cup: 4.22675,
            "fl oz": 33.814,
            "m³": 0.001
        }
    },
    digital: {
        name: "Digital Storage",
        units: [
            { name: "Byte", symbol: "B", type: "digital" },
            { name: "Kilobyte", symbol: "KB", type: "digital" },
            { name: "Megabyte", symbol: "MB", type: "digital" },
            { name: "Gigabyte", symbol: "GB", type: "digital" },
            { name: "Terabyte", symbol: "TB", type: "digital" },
            { name: "Petabyte", symbol: "PB", type: "digital" },
            { name: "Bit", symbol: "b", type: "digital" }
        ],
        conversions: {
            // Base: 1 byte
            B: 1,
            KB: 1/1024,
            MB: 1/(1024*1024),
            GB: 1/(1024*1024*1024),
            TB: 1/(1024*1024*1024*1024),
            PB: 1/(1024*1024*1024*1024*1024),
            b: 8
        }
    },
    time: {
        name: "Time",
        units: [
            { name: "Second", symbol: "s", type: "base" },
            { name: "Minute", symbol: "min", type: "common" },
            { name: "Hour", symbol: "hr", type: "common" },
            { name: "Day", symbol: "day", type: "common" },
            { name: "Week", symbol: "wk", type: "common" },
            { name: "Month", symbol: "mo", type: "common" },
            { name: "Year", symbol: "yr", type: "common" }
        ],
        conversions: {
            // Base: 1 second
            s: 1,
            min: 1/60,
            hr: 1/3600,
            day: 1/86400,
            wk: 1/604800,
            mo: 1/2592000, // 30 days
            yr: 1/31536000 // 365 days
        }
    }
};

// Unit Information
const unitInfo = {
    // Length units
    m: "The meter is the base unit of length in the International System of Units (SI).",
    km: "One kilometer equals 1000 meters. Commonly used for measuring distances between cities.",
    cm: "One centimeter equals 0.01 meters. About the width of a fingernail.",
    mm: "One millimeter equals 0.001 meters. Used for precise measurements.",
    mi: "One mile equals 1609.34 meters. Commonly used in the United States.",
    yd: "One yard equals 0.9144 meters. Used in American football.",
    ft: "One foot equals 0.3048 meters. About the length of a standard ruler.",
    in: "One inch equals 0.0254 meters. About the width of a thumb.",
    
    // Weight units
    kg: "The kilogram is the base unit of mass in the International System of Units (SI).",
    g: "One gram equals 0.001 kilograms. About the mass of a paperclip.",
    mg: "One milligram equals 0.000001 kilograms. Used for small measurements.",
    lb: "One pound equals 0.453592 kilograms. Commonly used in the United States.",
    oz: "One ounce equals 0.0283495 kilograms. Used for small weights.",
    
    // Temperature units
    "°C": "Celsius scale: Water freezes at 0°C and boils at 100°C at sea level.",
    "°F": "Fahrenheit scale: Water freezes at 32°F and boils at 212°F at sea level.",
    K: "Kelvin scale: Absolute zero is 0K. Used in scientific contexts.",
    
    // Volume units
    L: "One liter equals 0.001 cubic meters. Used for liquid volumes.",
    mL: "One milliliter equals 0.001 liters. Used for small liquid volumes.",
    gal: "One US gallon equals 3.78541 liters. Used in the United States.",
    
    // Digital units
    B: "One byte equals 8 bits. Basic unit of digital information.",
    KB: "One kilobyte equals 1024 bytes.",
    MB: "One megabyte equals 1024 kilobytes.",
    GB: "One gigabyte equals 1024 megabytes.",
    
    // Time units
    s: "The second is the base unit of time in the International System of Units (SI).",
    min: "One minute equals 60 seconds.",
    hr: "One hour equals 3600 seconds.",
    day: "One day equals 86400 seconds."
};

// Global Variables
let currentCategory = 'length';
let fromValue = document.getElementById('fromValue');
let toValue = document.getElementById('toValue');
let fromUnit = document.getElementById('fromUnit');
let toUnit = document.getElementById('toUnit');
let formulaText = document.getElementById('formulaText');
let unitInfoDiv = document.getElementById('unitInfo');

// Initialize the converter
function initConverter() {
    // Set up category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current category
            currentCategory = this.dataset.category;
            
            // Update unit dropdowns
            updateUnitDropdowns();
            
            // Update quick conversions
            updateQuickConversions();
            
            // Update unit info
            updateUnitInfo();
            
            // Convert with new units
            convert();
        });
    });
    
    // Set up input event listeners
    fromValue.addEventListener('input', convert);
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);
    
    // Set up swap button
    document.getElementById('swapBtn').addEventListener('click', swapUnits);
    
    // Set up common conversions
    document.querySelectorAll('.common-item').forEach(item => {
        item.addEventListener('click', function() {
            const [category, from, to] = this.dataset.conv.split('|');
            
            // Switch to the right category
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === category) {
                    btn.classList.add('active');
                }
            });
            
            currentCategory = category;
            updateUnitDropdowns();
            
            // Set the units
            fromUnit.value = from;
            toUnit.value = to;
            
            // Convert
            convert();
            
            // Show notification
            showToast(`Set to ${category} conversion: ${from} → ${to}`);
        });
    });
    
    // Set up quick action buttons
    fromValue.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convert();
        }
    });
    
    // Initialize Toastr
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "timeOut": "3000"
    };
    
    // Load history and favorites
    loadHistory();
    loadFavorites();
    
    // Initialize with first category
    updateUnitDropdowns();
    updateQuickConversions();
    convert();
}

// Update unit dropdowns based on current category
function updateUnitDropdowns() {
    const category = unitCategories[currentCategory];
    const units = category.units;
    
    // Clear current options
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    // Add options to both dropdowns
    units.forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit.symbol;
        option1.textContent = `${unit.name} (${unit.symbol})`;
        
        const option2 = document.createElement('option');
        option2.value = unit.symbol;
        option2.textContent = `${unit.name} (${unit.symbol})`;
        
        fromUnit.appendChild(option1);
        toUnit.appendChild(option2);
    });
    
    // Set default selections
    if (currentCategory === 'length') {
        fromUnit.value = 'm';
        toUnit.value = 'km';
    } else if (currentCategory === 'weight') {
        fromUnit.value = 'kg';
        toUnit.value = 'lb';
    } else if (currentCategory === 'temperature') {
        fromUnit.value = '°C';
        toUnit.value = '°F';
    } else if (currentCategory === 'volume') {
        fromUnit.value = 'L';
        toUnit.value = 'gal';
    } else if (currentCategory === 'digital') {
        fromUnit.value = 'MB';
        toUnit.value = 'GB';
    } else if (currentCategory === 'time') {
        fromUnit.value = 'hr';
        toUnit.value = 'min';
    }
}

// Update quick conversion buttons
function updateQuickConversions() {
    const quickButtons = document.querySelector('.quick-buttons');
    quickButtons.innerHTML = '';
    
    // Add quick conversion buttons based on category
    if (currentCategory === 'length') {
        addQuickButton('1 m → cm', 1, 'm', 'cm');
        addQuickButton('1 km → mi', 1, 'km', 'mi');
        addQuickButton('1 ft → m', 1, 'ft', 'm');
        addQuickButton('10 in → cm', 10, 'in', 'cm');
    } else if (currentCategory === 'weight') {
        addQuickButton('1 kg → lb', 1, 'kg', 'lb');
        addQuickButton('1 lb → kg', 1, 'lb', 'kg');
        addQuickButton('100 g → oz', 100, 'g', 'oz');
        addQuickButton('1 t → kg', 1, 't', 'kg');
    } else if (currentCategory === 'temperature') {
        addQuickButton('0°C → °F', 0, '°C', '°F');
        addQuickButton('100°C → °F', 100, '°C', '°F');
        addQuickButton('32°F → °C', 32, '°F', '°C');
        addQuickButton('0K → °C', 0, 'K', '°C');
    } else if (currentCategory === 'volume') {
        addQuickButton('1 L → gal', 1, 'L', 'gal');
        addQuickButton('1 gal → L', 1, 'gal', 'L');
        addQuickButton('500 mL → cup', 500, 'mL', 'cup');
        addQuickButton('1 m³ → L', 1, 'm³', 'L');
    } else if (currentCategory === 'digital') {
        addQuickButton('1 MB → KB', 1, 'MB', 'KB');
        addQuickButton('1 GB → MB', 1, 'GB', 'MB');
        addQuickButton('1 TB → GB', 1, 'TB', 'GB');
        addQuickButton('1024 B → KB', 1024, 'B', 'KB');
    } else if (currentCategory === 'time') {
        addQuickButton('1 hr → min', 1, 'hr', 'min');
        addQuickButton('1 day → hr', 1, 'day', 'hr');
        addQuickButton('1 wk → day', 1, 'wk', 'day');
        addQuickButton('1 yr → day', 1, 'yr', 'day');
    }
}

// Add a quick conversion button
function addQuickButton(label, value, fromUnitSymbol, toUnitSymbol) {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', function() {
        fromValue.value = value;
        fromUnit.value = fromUnitSymbol;
        toUnit.value = toUnitSymbol;
        convert();
        showToast(`Quick conversion: ${label}`);
    });
    document.querySelector('.quick-buttons').appendChild(button);
}

// Main conversion function
function convert() {
    const value = parseFloat(fromValue.value);
    
    if (isNaN(value)) {
        toValue.value = '';
        formulaText.textContent = 'Enter a valid number';
        return;
    }
    
    const fromSymbol = fromUnit.value;
    const toSymbol = toUnit.value;
    
    // Special handling for temperature
    if (currentCategory === 'temperature') {
        convertTemperature(value, fromSymbol, toSymbol);
    } else {
        convertStandard(value, fromSymbol, toSymbol);
    }
    
    // Add to history
    addToHistory(value, fromSymbol, toSymbol, parseFloat(toValue.value));
    
    // Update unit info
    updateUnitInfo();
}

// Standard conversion (for all except temperature)
function convertStandard(value, fromSymbol, toSymbol) {
    const category = unitCategories[currentCategory];
    
    // Convert from input unit to base unit
    const inBase = value / category.conversions[fromSymbol];
    
    // Convert from base unit to output unit
    const result = inBase * category.conversions[toSymbol];
    
    // Format result (limit decimal places)
    let formattedResult;
    if (Math.abs(result) < 0.000001) {
        formattedResult = result.toExponential(6);
    } else if (Math.abs(result) >= 1000000) {
        formattedResult = result.toExponential(6);
    } else {
        // Determine appropriate decimal places
        const decimalPlaces = Math.abs(result) < 1 ? 6 : 
                             Math.abs(result) < 10 ? 4 : 
                             Math.abs(result) < 100 ? 3 : 2;
        formattedResult = result.toFixed(decimalPlaces);
    }
    
    toValue.value = formattedResult;
    
    // Update formula display
    formulaText.textContent = `${value} ${fromSymbol} × (${category.conversions[toSymbol]} / ${category.conversions[fromSymbol]}) = ${formattedResult} ${toSymbol}`;
}

// Temperature conversion
function convertTemperature(value, fromSymbol, toSymbol) {
    let result;
    let formula;
    
    // Convert to Celsius first
    let inCelsius;
    switch(fromSymbol) {
        case '°C':
            inCelsius = value;
            break;
        case '°F':
            inCelsius = (value - 32) * 5/9;
            break;
        case 'K':
            inCelsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target
    switch(toSymbol) {
        case '°C':
            result = inCelsius;
            formula = `${value} ${fromSymbol}`;
            break;
        case '°F':
            result = (inCelsius * 9/5) + 32;
            formula = `(${value} ${fromSymbol} - ${fromSymbol === '°F' ? '32' : '0'}) × ${fromSymbol === '°C' ? '9/5 + 32' : 'conversion factor'}`;
            break;
        case 'K':
            result = inCelsius + 273.15;
            formula = `${value} ${fromSymbol} ${fromSymbol === 'K' ? '' : fromSymbol === '°C' ? '+ 273.15' : 'converted via Celsius'}`;
            break;
    }
    
    // Format result
    toValue.value = result.toFixed(2);
    formulaText.textContent = `Formula: ${formula} = ${result.toFixed(2)} ${toSymbol}`;
}

// Swap units
function swapUnits() {
    const tempValue = fromValue.value;
    const tempUnit = fromUnit.value;
    
    // Swap values
    fromValue.value = toValue.value;
    fromUnit.value = toUnit.value;
    
    // Set the swapped values
    toValue.value = tempValue;
    toUnit.value = tempUnit;
    
    // Convert with swapped units
    convert();
    
    // Show notification
    showToast('Units swapped!');
}

// Clear all inputs
function clearAll() {
    fromValue.value = '1';
    toValue.value = '';
    formulaText.textContent = 'Enter values to see formula';
    unitInfoDiv.textContent = 'Select a unit to see information here...';
    showToast('All fields cleared');
}

// Copy result to clipboard
function copyResult() {
    if (!toValue.value) {
        showToast('Nothing to copy!', 'warning');
        return;
    }
    
    const textToCopy = `${fromValue.value} ${fromUnit.value} = ${toValue.value} ${toUnit.value}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Result copied to clipboard!');
    }).catch(err => {
        showToast('Failed to copy: ' + err, 'error');
    });
}

// Add to favorites
function addToFavorites() {
    if (!fromValue.value || !toValue.value) {
        showToast('Convert something first!', 'warning');
        return;
    }
    
    const favorite = {
        category: currentCategory,
        fromValue: fromValue.value,
        fromUnit: fromUnit.value,
        toValue: toValue.value,
        toUnit: toUnit.value,
        timestamp: new Date().toLocaleString()
    };
    
    // Get existing favorites
    let favorites = JSON.parse(localStorage.getItem('unitConverterFavorites')) || [];
    
    // Check if already exists
    const exists = favorites.some(fav => 
        fav.category === favorite.category &&
        fav.fromUnit === favorite.fromUnit &&
        fav.toUnit === favorite.toUnit
    );
    
    if (exists) {
        showToast('This conversion is already in favorites!', 'info');
        return;
    }
    
    // Add to beginning of array
    favorites.unshift(favorite);
    
    // Keep only last 10 favorites
    if (favorites.length > 10) {
        favorites = favorites.slice(0, 10);
    }
    
    // Save to localStorage
    localStorage.setItem('unitConverterFavorites', JSON.stringify(favorites));
    
    // Update display
    loadFavorites();
    
    showToast('Added to favorites!');
}

// Load favorites from localStorage
function loadFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = JSON.parse(localStorage.getItem('unitConverterFavorites')) || [];
    
    favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<div class="no-items">No favorites yet. Convert something and click the star!</div>';
        return;
    }
    
    favorites.forEach((fav, index) => {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.innerHTML = `
            <div class="conversion">${fav.fromValue} ${fav.fromUnit} → ${fav.toValue} ${fav.toUnit}</div>
            <div class="category">${unitCategories[fav.category].name} • ${fav.timestamp}</div>
            <button class="remove-favorite" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Click to load this conversion
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.remove-favorite')) {
                // Switch to the right category
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.category === fav.category) {
                        btn.classList.add('active');
                    }
                });
                
                currentCategory = fav.category;
                updateUnitDropdowns();
                
                // Set the values
                fromValue.value = fav.fromValue;
                fromUnit.value = fav.fromUnit;
                toUnit.value = fav.toUnit;
                
                // Convert
                convert();
                
                showToast('Favorite loaded!');
            }
        });
        
        // Remove button
        const removeBtn = item.querySelector('.remove-favorite');
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeFavorite(parseInt(this.dataset.index));
        });
        
        favoritesList.appendChild(item);
    });
}

// Remove a favorite
function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('unitConverterFavorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('unitConverterFavorites', JSON.stringify(favorites));
    loadFavorites();
    showToast('Removed from favorites');
}

// Add to history
function addToHistory(fromValue, fromUnit, toUnit, toValue) {
    const historyItem = {
        category: currentCategory,
        fromValue: fromValue,
        fromUnit: fromUnit,
        toUnit: toUnit,
        toValue: toValue,
        timestamp: new Date().toLocaleTimeString()
    };
    
    // Get existing history
    let history = JSON.parse(localStorage.getItem('unitConverterHistory')) || [];
    
    // Add to beginning of array
    history.unshift(historyItem);
    
    // Keep only last 20 items
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    
    // Save to localStorage
    localStorage.setItem('unitConverterHistory', JSON.stringify(history));
    
    // Update display
    loadHistory();
}

// Load history from localStorage
function loadHistory() {
    const historyList = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('unitConverterHistory')) || [];
    
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="no-items">No conversion history yet.</div>';
        return;
    }
    
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="conversion">${item.fromValue} ${item.fromUnit} → ${item.toValue} ${item.toUnit}</div>
            <div class="time">${unitCategories[item.category].name} • ${item.timestamp}</div>
        `;
        
        // Click to load this conversion
        historyItem.addEventListener('click', function() {
            // Switch to the right category
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === item.category) {
                    btn.classList.add('active');
                }
            });
            
            currentCategory = item.category;
            updateUnitDropdowns();
            
            // Set the values
            fromValue.value = item.fromValue;
            fromUnit.value = item.fromUnit;
            toUnit.value = item.toUnit;
            
            // Convert
            convert();
            
            showToast('History item loaded!');
        });
        
        historyList.appendChild(historyItem);
    });
}

// Clear history
function clearHistory() {
    if (confirm('Are you sure you want to clear all conversion history?')) {
        localStorage.removeItem('unitConverterHistory');
        loadHistory();
        showToast('History cleared');
    }
}

// Update unit information
function updateUnitInfo() {
    const unitSymbol = fromUnit.value;
    const info = unitInfo[unitSymbol] || `No information available for ${unitSymbol}.`;
    unitInfoDiv.textContent = info;
}

// Show toast notification
function showToast(message, type = 'success') {
    toastr[type](message);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initConverter);
