//////////////
//  GLOBALS //
//////////////

// Display
const CALC_DISPLAY_NUMBER = document.querySelector(".calculator #number");
const CALC_DISPLAY_SIGN = document.querySelector(".calculator #sign");

// Buttons with numbers
const CALC_BUTTON_ZERO = document.querySelector(".calculator #zero");
const CALC_BUTTON_ONE = document.querySelector(".calculator #one");
const CALC_BUTTON_TWO = document.querySelector(".calculator #two");
const CALC_BUTTON_THREE = document.querySelector(".calculator #three");
const CALC_BUTTON_FOUR = document.querySelector(".calculator #four");
const CALC_BUTTON_FIVE = document.querySelector(".calculator #five");
const CALC_BUTTON_SIX = document.querySelector(".calculator #six");
const CALC_BUTTON_SEVEN = document.querySelector(".calculator #seven");
const CALC_BUTTON_EIGHT = document.querySelector(".calculator #eight");
const CALC_BUTTON_NINE = document.querySelector(".calculator #nine");

const CALC_BUTTONS_NUMBERS =
[
    CALC_BUTTON_ZERO, CALC_BUTTON_ONE, CALC_BUTTON_TWO,
    CALC_BUTTON_THREE, CALC_BUTTON_FOUR, CALC_BUTTON_FIVE,
    CALC_BUTTON_SIX, CALC_BUTTON_SEVEN, CALC_BUTTON_EIGHT,
    CALC_BUTTON_NINE
]

// Buttons other
const CALC_BUTTON_ADD = document.querySelector(".calculator #add");
const CALC_BUTTON_SUBTRACT = document.querySelector(".calculator #subtract");
const CALC_BUTTON_MULTIPLY = document.querySelector(".calculator #multiply");
const CALC_BUTTON_DIVIDE = document.querySelector(".calculator #divide");

const CALC_BUTTON_EQUALS = document.querySelector(".calculator #equals");
const CALC_BUTTON_DOT = document.querySelector(".calculator #dot");
const CALC_BUTTON_ALL_CLEAR = document.querySelector(".calculator #all-clear");
const CALC_BUTTON_NEGATE = document.querySelector(".calculator #negate");

////////////////////////////
//  VARIABLE DECLARATION  //
////////////////////////////

let num1 = null;
let num2 = null;
let numEquals = null;
let operator = null;
let currentInput = null;
let isNegated = false;
let hasDecimal = false;

/////////////////
//  FUNCTIONS  //
/////////////////

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function addDigitToDisplay(toAdd) {
    if ((currentInput != null && currentInput.length === 10) || 
        (currentInput === null && toAdd === 0)) {
        return currentInput;
    }
    
    if (currentInput === null) {
        return "" + toAdd;
    }

    return currentInput + toAdd;
}

function convertInputToNumber() {
    let inputAsNumber;
    
    if (hasDecimal) {
        inputAsNumber = Number.parseFloat(currentInput);
    } else {
        inputAsNumber = Number.parseInt(currentInput);
    }

    if (isNegated) {
        return -1 * inputAsNumber;
    }
    return inputAsNumber;
}

function displayVariables() {
    console.log(`num1 = ${num1}`);
    console.log(`operator = ${operator}`);
    console.log(`currentInput = ${currentInput}`);
}

function executeOperation() {
    // First time calling operation after all clear or equals
    if (operator === null) {
        num1 = convertInputToNumber();
        return op;
    }

    // We already have an operation, do operation and save result in num1
    switch (operator) {
        case "+":
            num1 = add(num1, num2);
            break;
        case "-":
            num1 = subtract(num1, num2);
            break;
    }
}

function resetCalculatorVariables() {
    currentInput = null;
    num1 = null;
    num2 = null;
    numEquals = null;
    operator = null;
    isNegated = false;
    hasDecimal = false;
}

function updateCalculatorDisplay() {
    CALC_DISPLAY_NUMBER.textContent = currentInput === null ? "0" : currentInput;
    CALC_DISPLAY_SIGN.textContent = isNegated ? "-" : "";
}

///////////////////////
//  EVENT LISTENERS  //
///////////////////////

for (let i = 0; i < 10; i++) {
    let button = CALC_BUTTONS_NUMBERS[i];
    button.addEventListener("click", () => {
        currentInput = addDigitToDisplay(i);
        updateCalculatorDisplay();
    });
}

CALC_BUTTON_ALL_CLEAR.addEventListener("click", () => {
    resetCalculatorVariables();
    updateCalculatorDisplay();
});

CALC_BUTTON_NEGATE.addEventListener("click", () => {
    if (currentInput === null) {
        return;
    }

    isNegated = !isNegated;
    updateCalculatorDisplay();
});

CALC_BUTTON_DOT.addEventListener("click", () => {
    if (!hasDecimal) {
        hasDecimal = true;
        if (currentInput === null) {
            currentInput = addDigitToDisplay("0");
        }
        currentInput = addDigitToDisplay(".");
        updateCalculatorDisplay();
    }
});

CALC_BUTTON_ADD.addEventListener("click", () => {
    displayVariables();
    if (num1 != null && operator != null) { 
        num2 = convertInputToNumber();
        num1 = executeOperation(num1, num2);
    } else {
        num1 = convertInputToNumber();
    }
    operator = "+";
    currentInput = null;
    displayVariables()
});

// CALC_BUTTON_EQUALS.addEventListener("click", () => {
//     if (num2 === null && num1 === null && currentInput === null) {
//         return;
//     }

//     if (num2 === null && num1 === null) {
        
//     }
// });

////////////
//  MAIN  //
////////////

updateCalculatorDisplay();