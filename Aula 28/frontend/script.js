// 1. Mapeamos o formulário do HTML para dentro do nosso código JavaScript
const formulario = document.getElementById('formularioUsuario');
// 2. Criamos um "ouvinte". Sempre que o botão de submit for clicado, essa função vai rodar
formulario.addEventListener('submit', function (evento) {
    // Impede o comportamento padrão do HTML de atualizar a página inteira ao enviar
    evento.preventDefault();
    // 3. Capturamos os valores exatos que foram digitados dentro das caixas de input
    const nomeDigitado = document.getElementById('campoNome').value;
    const cargoDigitado = document.getElementById('campoCargo').value;
    // 4. Estruturamos esses valores em um objeto JavaScript puro
    const dadosUsuario = {
        nome: nomeDigitado,
        cargo: cargoDigitado
    };
    // 5. O COMANDO FETCH: A ponte de comunicação com o Backend
    // Passamos o endereço da nossa rota POST como primeiro argumento
    fetch('http://localhost:3000/usuarios', {
        // Informamos que nossa intenção é ENVIAR/CRIAR um dado
        method: 'POST',
        // Avisamos o Express que o formato do texto é um JSON
        headers: { 'Content-Type': 'application/json' },
        // JSON.stringify() pega nosso objeto JavaScript e o transforma em texto puro JSON para viajar pela rede
        body: JSON.stringify(dadosUsuario)
    })
        // O primeiro .then pega a resposta bruta da rede e a converte de volta em Objeto JavaScript
        .then(function (respostaDoServidor) {
            return respostaDoServidor.json();
        })
        // O segundo .then recebe os dados já mastigados e prontos para usarmos na tela
        .then(function (usuarioSalvo) {
            // Exibe uma mensagem de sucesso na tela mostrando o ID que o Node gerou automaticamente
            alert(`Sucesso! ${usuarioSalvo.nome} foi cadastrado`);
            formulario.reset(); // Limpa as caixas de texto do formulário para o próximo cadastro
        })
        // Caso o servidor esteja desligado ou aconteça algum erro de rede, o .catch captura o erro aqui
        .catch(function (erro) {
            console.error('Houve um erro ao se comunicar com o backend:', erro);
            alert('Erro: Não foi possível conectar ao servidor backend.');
        });
});