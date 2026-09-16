// console.log("Olá")

// let num1 = Number(prompt("Primeiro numero:")); 
// let num2 = Number(prompt("Segundo numero:")); 
// console.log("Soma: " + (num1 + num2));
// console.log("Subtração: " + (num1 - num2));
// console.log("Multiplicação: " + (num1 * num2));
// console.log("Divisão: " + (num1 / num2));

// let valor = Number(prompt("Digite um valor:"));
// let desconto = valor * 0.15
// let valorFinal = valor - desconto;
// console.log("Valor final com desconto: " + valorFinal);
// alert("Valor final com desconto: " + valorFinal);

// let numero1 = Number(prompt("Digite o primeiro valor:"));
// let numero2 = Number(prompt("Digite o segundo valor:"));
// let valorDivisao = numero1 / numero2;
// alert(`O valor da divisão é: ${valorDivisao}`);

let kmRodados = Number(prompt("Qual a distancia pecorrida:"));
let gas = Number(prompt("Qual a qntd gasolina queimada:"));
let kmPorLitro = kmRodados/gas;
alert(`A media de consumo é ${kmPorLitro} km/L`)