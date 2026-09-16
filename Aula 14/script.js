// PASSO 1: SELECIONAR OS ELEMENTOS
const caixaTexto = document.querySelector('#campoNome');
const botaoDia = document.querySelector('#btnDia');
const botaoNoite = document.querySelector('#btnNoite');
const areaResultado = document.querySelector('#painelResultado');
// PASSO 2 & 3: ESCUTAR E MODIFICAR
botaoDia.addEventListener('click', function() {
    let nomeUsuario = caixaTexto.value; // Pega o texto do input
    areaResultado.textContent = `Bom dia ${nomeUsuario}!`;
});
botaoNoite.addEventListener('click', function() {
    let nomeUsuario = caixaTexto.value; // Pega o texto do input
    areaResultado.textContent = `Boa noite ${nomeUsuario}!`;
});
