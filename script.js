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
let displayIsErrored = false;

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
    if (num2 === 0) {
        return "DIV BY 0";
    }
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
        console.log(`convertInputToNumber returning ${-1 * inputAsNumber}`);
        return -1 * inputAsNumber;
    }
    console.log(`convertInputToNumber returning ${inputAsNumber}`);
    return inputAsNumber;
}

function convertNumberToString(number) {
    let returnString = number.toString();
    let validLength = number < 0 ? 11 : 10;
    console.log(`returnString = ${returnString}`);
    console.log(`validLength = ${validLength}`);

    if (returnString.length <= validLength) {
        return returnString;
    }

    if (returnString.charAt() === ".") {
        return returnString.substring(0, validLength + 1);
    }

    for (let i = 0; i < validLength; i++) {
        if (returnString.charAt(i) === ".") {
            return returnString.substring(0, validLength + 1);
        }
    }

    disableButtons();
    return "ERROR";
}

function disableButtons() {
    for (let i = 0; i < 10; i++) {
        let button = CALC_BUTTONS_NUMBERS[i];
        button.disabled = true;
    }
    CALC_BUTTON_ADD.disabled = true;
    CALC_BUTTON_SUBTRACT.disabled = true;
    CALC_BUTTON_MULTIPLY.disabled = true;
    CALC_BUTTON_DIVIDE.disabled = true;

    CALC_BUTTON_NEGATE.disabled = true;
    CALC_BUTTON_EQUALS.disabled = true;
    CALC_BUTTON_DOT.disabled = true;
}

function displayVariables() {
    console.log(`num1 = ${num1}`);
    console.log(`operator = ${operator}`);
    console.log(`currentInput = ${currentInput}`);
    console.log(`numEquals = ${numEquals}`);
}

function enableButtons() {
    for (let i = 0; i < 10; i++) {
        let button = CALC_BUTTONS_NUMBERS[i];
        button.disabled = false;
    }
    CALC_BUTTON_ADD.disabled = false;
    CALC_BUTTON_SUBTRACT.disabled = false;
    CALC_BUTTON_MULTIPLY.disabled = false;
    CALC_BUTTON_DIVIDE.disabled = false;

    CALC_BUTTON_NEGATE.disabled = false;
    CALC_BUTTON_EQUALS.disabled = false;
    CALC_BUTTON_DOT.disabled = false;
}

function executeOperation() {
    console.log(`typeof num1 = ${typeof num1} typeof num2 = ${typeof num2}`);
    // First time calling operation after all clear or equals
    if (operator === null) {
        num1 = convertInputToNumber();
        return;
    }

    // We already have an operation, do operation and save result in num1
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

function operate(op) {
    if (num1 != null && operator != null) { 
        if (operator === "+" || operator === "-") {
            num2 = currentInput === null ? 0 : convertInputToNumber()
        } else {
            num2 = currentInput === null ? 1 : convertInputToNumber();
        }
        currentInput = convertNumberToString(executeOperation(num1, num2));
        num1 = convertInputToNumber();
        num2 = null;
        isNegated = currentInput < 0;
        if (isNegated) {
            currentInput = -1 * currentInput;
        }
        updateCalculatorDisplay();
    } else if (num1 != null && numEquals != null && currentInput === null) {
        num1 = numEquals;
        numEquals = null;
    } else {
        num1 = convertInputToNumber();
    }
    operator = op;
    currentInput = null;
    resetInput();
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

function resetInput() {
    hasDecimal = false;
    isNegated = false;
    currentInput = null;
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
    enableButtons();
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
    operate("+");
});

CALC_BUTTON_SUBTRACT.addEventListener("click", () => {
    operate("-");
});

CALC_BUTTON_MULTIPLY.addEventListener("click", () => {
    operate("*");
});

CALC_BUTTON_DIVIDE.addEventListener("click", () => {
    operate("/");
});

CALC_BUTTON_EQUALS.addEventListener("click", () => {
    if (num1 != null && operator != null) { 
        num2 = currentInput === null ? 0 : convertInputToNumber();
        numEquals = executeOperation(num1, num2);
        currentInput = convertNumberToString(numEquals);
        num1 = currentInput;
        num2 = null;
        isNegated = currentInput < 0;
        if (isNegated) {
            currentInput = -1 * currentInput;
        }
        updateCalculatorDisplay();
    } else if (num1 === null && operator === null) {
        num1 = convertInputToNumber();
    }
    operator = null;
    resetInput();
});

////////////
//  MAIN  //
////////////

updateCalculatorDisplay();