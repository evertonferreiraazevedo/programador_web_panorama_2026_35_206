// O arquivo principal recebe o objeto todo
const calc = require('./calculadora.js');

// Usamos o ponto (.) para acessar a função desejada
console.log(calc.somar(5, 5));      // Exibe 10
console.log(calc.subtrair(10, 3));  // Exibe 7
