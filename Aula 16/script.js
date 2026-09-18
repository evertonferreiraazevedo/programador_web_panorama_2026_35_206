// PASSO 1: SELECIONAR OS ELEMENTOS
const caixaTexto = document.querySelector('#campoNome');
const botaoDia = document.querySelector('#btnDia');
const botaoNoite = document.querySelector('#btnNoite');
const areaResultado = document.querySelector('#painelResultado');
const elemento = document.querySelector('#el');
const corpo = document.querySelector('#corpo');
// PASSO 2 & 3: ESCUTAR E MODIFICAR
botaoDia.addEventListener('click', function () {
    let nomeUsuario = caixaTexto.value; // Pega o texto do input
    areaResultado.innerHTML = `<h1>Bom dia ${nomeUsuario}!</h1>`;
    corpo.style.backgroundColor = '#eef971';
});
botaoNoite.addEventListener('click', function () {
    let nomeUsuario = caixaTexto.value; // Pega o texto do input
    areaResultado.textContent = `Boa noite ${nomeUsuario}!`;
    corpo.style.backgroundColor = '#7197f9';
});




// elemento.textContent = '<strong>Olá</strong>';
// elemento.innerHTML = '<strong>Olá</strong>';

