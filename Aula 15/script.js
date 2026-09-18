// PASSO 1: SELECIONAR OS ELEMENTOS
const caixaTexto = document.querySelector('#campoNome');
const botaoDia = document.querySelector('#btnDia');
const botaoNoite = document.querySelector('#btnNoite');
const areaResultado = document.querySelector('#painelResultado');
const botaoTema = document.querySelector('#btnTema');
const corpo = document.querySelector('#corpo');

// PASSO 2 & 3: ESCUTAR E MODIFICAR

// Evento de Bom Dia
botaoDia.addEventListener('click', function () {
    let nomeUsuario = caixaTexto.value;
    areaResultado.innerHTML = `<h1>Bom dia ${nomeUsuario}!</h1>`;
    areaResultado.style.backgroundColor = '#eef971';
    // Altera as classes para destacar apenas este botão
    botaoDia.classList.add('botao-clicado');
    botaoNoite.classList.remove('botao-clicado');
});

// Evento de Boa Noite
botaoNoite.addEventListener('click', function () {
    let nomeUsuario = caixaTexto.value;
    areaResultado.textContent = `Boa noite ${nomeUsuario}!`;
    areaResultado.style.backgroundColor = '#7197f9';
    // Altera as classes para destacar apenas este botão
    botaoNoite.classList.add('botao-clicado');
    botaoDia.classList.remove('botao-clicado');
});
// Evento do Modo Escuro (Toggle)
botaoTema.addEventListener('click', function () {
    corpo.classList.toggle('modo-escuro');
});
