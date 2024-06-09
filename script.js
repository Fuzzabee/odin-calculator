//////////////
//  GLOBALS //
//////////////

const CALC_DISPLAY = document.querySelector(".calculator #display");

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

////////////////////////////
//  VARIABLE DECLARATION  //
////////////////////////////

let num1 = 0;
let num2 = 0;
let operator = "";

///////////////////////
//  EVENT LISTENERS  //
///////////////////////