// Forma literal (a mais usada)
const frutas = ['maçã', 'banana', 'uva'];
// Array vazio
const vazio = [];
// Tipos misturados (possível, mas use com critério)
const misto = ['Ana', 25, true, null];

//////////////////////////////////////////////////////////////////////////////////////////
const cores = ['azul', 'verde', 'vermelho'];
console.log(cores[0]); // 'azul'
console.log(cores[2]); // 'vermelho'
console.log(cores[10]); // undefined (não existe)
console.log(cores.length); // 3
console.log(cores[cores.length - 1]); // 'vermelho' (último)
console.log(cores.at(-1)); // 'vermelho' (forma moderna)
cores[1] = 'amarelo'; // altera
console.log(cores); // ['azul', 'amarelo', 'vermelho']

//////////////////////////////////////////////////////////////////////////////////////////
const fila = ['Ana', 'Bruno'];
fila.push('Carla'); // ['Ana', 'Bruno', 'Carla']
fila.unshift('Zeca'); // ['Zeca', 'Ana', 'Bruno', 'Carla']
fila.pop(); // remove 'Carla'
fila.shift(); // remove 'Zeca'
console.log(fila); // ['Ana', 'Bruno']


///////////////////////////////////////////////////////////////////////////////////////////
const letras = ['a', 'b', 'c', 'd', 'e'];
letras.splice(2, 1); // remove 1 item a partir do índice 2 ->
['a','b','d','e']
letras.splice(1, 0, 'X'); // insere 'X' no índice 1 ->
['a','X','b','d','e']
letras.splice(3, 1, 'Y', 'Z'); // troca 'd' por 'Y' e 'Z' ->
['a','X','b','Y','Z','e']


////////////////////////////////////////////////////////////////////////////////////////////
const nums = [10, 20, 30, 20, 40];
nums.indexOf(20); // 1 (primeira posição) | -1 se não achar
nums.lastIndexOf(20); // 3
nums.includes(30); // true
nums.slice(1, 3); // [20, 30] (do índice 1 até antes do 3)
nums.slice(-2); // [20, 40] (últimos dois)
nums.slice(); // cópia do array inteiro
[1, 2].concat([3, 4]); // [1, 2, 3, 4]
['HTML', 'CSS', 'JS'].join(' | '); // 'HTML | CSS | JS'
'a,b,c'.split(','); // ['a', 'b', 'c'] (método de string)

//////////////////////////////////////////////////////////////////////////////////

const itens = ['pão', 'leite', 'ovos'];
// 1) for clássico: controle total do índice
for (let i = 0; i < itens.length; i++) {
console.log(i, itens[i]);
}
// 2) for...of: simples, quando só precisa do valor
for (const item of itens) {
console.log(item);
}
// 3) forEach: executa uma função para cada elemento
itens.forEach((item, indice) => {
console.log(`${indice + 1}. ${item}`);
});
// 4) entries: índice e valor juntos
for (const [i, item] of itens.entries()) {
console.log(i, item);
}
