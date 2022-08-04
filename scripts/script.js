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
equals.addEventListener('click', () => {
    if (!currOp.includes('') && currOp.length === 3) {
        const result = operate(...currOp);
        currOp = [result.toString(),'',''];
        display();
    }
});

function display() {
    resultDiv.textContent = currOp.join('');
}


function addOperand() {
    if (!currOp[1]) currOp[0] += this.textContent; //adds first operand
    else currOp[2] += this.textContent;//adds second operand only when operator has been selected 

    resultDiv.textContent += this.textContent;
}

function addOperator() {
    if (currOp[0] && !currOp[2]) {
        // if (!currOp[1]) resultDiv.textContent += this.textContent;
        // else resultDiv.textContent =
        //     resultDiv.textContent.slice(0,-1) + this.textContent; //this allows to change operator for another one        
        
        currOp[1] = this.textContent;
        display();
    }
}

//CLEAR
const clear = document.querySelector('.clear');
clear.onclick = () => {
    currOp = ['','',''];
    resultDiv.textContent = '';
};

//BACKSPACE
const deleteBtn = document.querySelector('.delete');
deleteBtn.onclick = () => {
    // resultDiv.textContent = resultDiv.textContent.slice(0,-1);
    if (currOp[2]) currOp[2] = currOp[2].slice(0,-1);
    else if (currOp[1]) currOp[1] = '';
    else currOp[0] = currOp[0].slice(0,-1);
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

// fix 0 and multiple 0's at the beginning. It should only be allowed if followed by a dot