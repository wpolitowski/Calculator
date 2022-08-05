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


//EVALUATE EXPRESSION 
equals.addEventListener('click', evaluateExpression);
operators.forEach(operator => operator.addEventListener('click', evaluateExpression));

function evaluateExpression() {
    if (!currOp.includes('') && currOp.length === 3 && !currOp[2].endsWith('.')) {
        const result = operate(...currOp);
        currOp = [result.toString(),'',''];

        if (this.textContent !== '=') {
            currOp[1] = this.textContent;
        } //add operator for next calculation
        
        display();
    }
}


function display() {
    resultDiv.textContent = currOp.join('');
}


function addOperand() {
    if (!currOp[1]) {
        currOp[0] += this.textContent; //adds first operand        
        if (currOp[0] === '0' || currOp[0] === '-0') disableNumbers();
    }
    else {//adds second operand only when operator has been selected 
        currOp[2] += this.textContent;
        if (currOp[2] === '0' || currOp[2] === '-0') disableNumbers();
    }
    display();    
}

function addOperator() {
    if (currOp[0] && !currOp[2] && !currOp[0].endsWith('.')) {        
        currOp[1] = this.textContent;
        display();
    }
}

//CLEAR
const clear = document.querySelector('.clear');
clear.onclick = () => {
    currOp = ['','',''];
    resultDiv.textContent = '';
    enableNumbers();
};

//BACKSPACE
const deleteBtn = document.querySelector('.delete');
deleteBtn.onclick = () => {
    if (currOp[2]) currOp[2] = currOp[2].slice(0,-1);
    else if (currOp[1]) currOp[1] = '';
    else currOp[0] = currOp[0].slice(0,-1);

    //if left with '0' - disable numbers again, after deleting '0' make sure numbers are enabled
    if (currOp[0] === '0' || currOp[2] === '0' || currOp[0] === '-0' || currOp[2] === '-0') disableNumbers()
    else if (currOp[0] === '' || currOp[2] === '') enableNumbers();

    display();
};

//PLUS/MINUS
const plusMinus = document.querySelector('.plus-minus');
plusMinus.onclick = () => {
    if (currOp[2]) {
        if (currOp[2].startsWith('-')) currOp[2] = currOp[2].slice(1);
        else currOp[2] = '-' + currOp[2];
    }
    else if (currOp[0] && !currOp[1]) {
        if (currOp[0].startsWith('-')) currOp[0] = currOp[0].slice(1);
        else currOp[0] = '-' + currOp[0];
    }
    display();
};

//DECIMALS
const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    if (currOp[2] && !currOp[2].includes('.')) {
        currOp[2] += '.';
        
        if (currOp[2] === '0.' || currOp[2] === '-0.') {
            //enable 1-9 digits if "0." has been entered
            enableNumbers();
        }
    }
    else if (currOp[0] && !currOp[1] && !currOp[0].includes('.')) {
        currOp[0] += '.';

        if (currOp[0] === '0.' || currOp[2] === '-0.') {
            //enable 1-9 digits if "0." has been entered
            enableNumbers();
        }        
    }    

    display(); 
});

//DISABLE/ENABLE NUMBERS

function disableNumbers() {
    numbers.forEach(number => number.disabled = true);
}

function enableNumbers() {
    numbers.forEach(number => number.disabled = false);    
}

