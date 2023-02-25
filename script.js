'use strict';

const optionsBlock = document.querySelector('.theme__options');
const options = optionsBlock.querySelectorAll('.option');
const calcPad = document.querySelector('.calc');
const calcResults = document.querySelector('.calc-results');



(function(){
    // // Reset input
    // calcResults.textContent = '0';

    // const data = localStorage.getItem('Theme');
    // if(!data) return;

    // // Remove classes
    // options.forEach(el => el.classList.remove('active'));
    // document.body.className = '';


    // console.log(data);
    // // Add classes
    // document.querySelector(`[data-theme="${data}"]`).classList.add('active');
    // document.body.classList.add(data);
})();

optionsBlock.addEventListener('click', function(e){
    // Remove classes
    options.forEach(el => el.classList.remove('active'));
    document.body.className = '';

    // Add classes
    e.target.classList.add('active');
    document.body.classList.add(e.target.dataset.theme);

    localStorage.setItem('Theme', e.target.dataset.theme);

});

const equal = function() {

        // Separate numbers and operators 
        const numbers = calcResults.textContent.split(/\+|\-|\x|\//g);
        const operators = calcResults.textContent.replace(/[0-9]|\./g, "").split("");

        let divide = operators.indexOf("/"); 
        while(divide != -1) {
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
            operators.splice(divide, 1);
            divide = operators.indexOf("/");
        }

        let multiply = operators.indexOf("x"); 
        while(multiply != -1) {
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
            operators.splice(multiply, 1);
            multiply = operators.indexOf("x");
        }

        let subtract = operators.indexOf("-"); 
        while(subtract != -1) {
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-");
        }

        let add = operators.indexOf("+"); 
        while(add != -1) {
            numbers.splice(add, 2, Number(numbers[add]) + Number(numbers[add + 1]));
            operators.splice(add, 1);
            add = operators.indexOf("+");
        }
        // Display result
        calcResults.textContent = numbers[0];
    
}

calcPad.addEventListener('click', function(e){
    // Add number
    if(e.target.classList.contains('number')) {

        if(calcResults.textContent === '0') calcResults.textContent = '';
        const getBtnValue = e.target.textContent;
        calcResults.textContent += getBtnValue;
    }

    // Add operator or replace it
    if(e.target.classList.contains('operator')){
        const lastCharacter = calcResults.textContent.slice(-1); 
        const opearators = ['/', '+', '-', 'x'];
        const getBtnValue = e.target.textContent;

        if( opearators.includes(lastCharacter)  ) {
            calcResults.textContent = `${calcResults.textContent.slice(0, -1)}${getBtnValue}`;
        } else {
            calcResults.textContent += getBtnValue;
        }
    }

    // Reset results
    if(e.target.classList.contains('reset')) {
        calcResults.textContent = '0';
    }

    // Remove number or operator
    if(e.target.classList.contains('delete')) {
        const del = calcResults.textContent.slice(0, -1);
        calcResults.textContent = del;
        // if result field is empty then display 0
        if(calcResults.textContent === '') return  calcResults.textContent = '0';
    } 

    if(e.target.classList.contains('equal')) {
        equal();
    }
   
});

addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        equal();
    };
});
