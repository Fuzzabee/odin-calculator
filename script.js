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

let num1 = 0;
let num2 = 0;
let operator = "";
let currentInput = "0";
let isNegated = false;

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
    if (currentInput.length === 10 || 
        (currentInput === "0" && toAdd === 0)) {
        return currentInput;
    }
    
    if (currentInput === "0") {
        return "" + toAdd;
    }

    return currentInput + toAdd;
}

///////////////////////
//  EVENT LISTENERS  //
///////////////////////

for (let i = 0; i < 10; i++) {
    let button = CALC_BUTTONS_NUMBERS[i];
    button.addEventListener("click", () => {
        currentInput = addDigitToDisplay(i);
        CALC_DISPLAY_NUMBER.textContent = currentInput;
    });
}

CALC_BUTTON_ALL_CLEAR.addEventListener("click", () => {
    currentInput = "0";
    num1 = 0;
    num2 = 0;
    operator = "";
    isNegated = false;
    CALC_DISPLAY_NUMBER.textContent = currentInput;
    CALC_DISPLAY_SIGN.textContent = isNegated ? "-" : "";
});

CALC_BUTTON_NEGATE.addEventListener("click", () => {
    if (currentInput === "0") {
        return;
    }

    isNegated = !isNegated;
    CALC_DISPLAY_SIGN.textContent = isNegated ? "-" : "";
});

////////////
//  MAIN  //
////////////

CALC_DISPLAY_NUMBER.textContent = currentInput;
CALC_DISPLAY_SIGN.textContent = isNegated ? "-" : "";