function add(a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {     
    a = parseFloat(a);
    b = parseFloat(b);
    switch(operator) {
        case '+':
            return add(a, b);
            break;
        case '-': 
            return subtract(a, b);
            break;
        case '*':

            return multiply(a, b);
            break;
        case '÷':
            return divide(a, b);
            break;
        default:
            alert("No such operation");
            break;
    }    
}

let currOp = ['','','']; // array for storing current operation - two operands and one operator between

const resultDiv = document.querySelector('.result');
const buttons = document.querySelectorAll('button');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');

const numbers = Array.from(buttons)
    .filter(button => /[0-9]/.test(button.textContent));

numbers.forEach(number => number.addEventListener('click', addOperand));
operators.forEach(operator => operator.addEventListener('click', addOperator));


equals.addEventListener('click', () => {
    if (!currOp.includes('') && currOp.length === 3) {
        const result = operate(...currOp);
        resultDiv.textContent = result;
        currOp = [result,'',''];
    }
});

function addOperand() {
    if (!currOp[1]) currOp[0] += this.textContent; //adds first operand
    else currOp[2] += this.textContent;//adds second operand only when operator has been selected 
    // else return;

    resultDiv.textContent += this.textContent;
}

function addOperator() {
    if (currOp[0] && !currOp[2]) {
        if (!currOp[1]) resultDiv.textContent += this.textContent;
        else resultDiv.textContent =
            resultDiv.textContent.slice(0,-1) + this.textContent; //this allows to change operator for another one      
        
        currOp[1] = this.textContent;
    }
}
