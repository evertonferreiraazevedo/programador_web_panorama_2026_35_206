// 1. Importamos os módulos necessários
const express = require('express');
const cors = require('cors'); // O módulo que permite a conexão externa segura
const app = express();

// 2. Configurações de Intermediários (Middlewares)
app.use(cors());          // Liberamos o servidor para receber requisições de outros locais (como nosso HTML)
app.use(express.json());  // Ensinamos o Express a ler dados enviados em formato JSON
// Nosso "Banco de Dados" fictício armazenado na memória RAM
const usuarios = [
    {nome: "Ana Costa", cargo: "Desenvolvedora" },
    {nome: "Carlos Souza", cargo: "Designer" }
];
// ROTA GET: Envia a lista atual de usuários para quem solicitar
app.get('/usuarios', function (requisicao, resposta) {
    return resposta.json(usuarios);});
// ROTA POST: Recebe novos dados do Frontend e insere na nossa lista
app.post('/usuarios', function (requisicao, resposta) {
    const dadosRecebidos = requisicao.body; // Pega o que o usuário preencheu no formulário
    // Monta o novo objeto de usuário com um ID automático incremental
    const novoUsuario = {
        nome: dadosRecebidos.nome,
        cargo: dadosRecebidos.cargo    };
    usuarios.push(novoUsuario); // Adiciona na nossa lista/banco
    // Devolve o status 201 (Criado) e o objeto do usuário que acabou de ser salvo
    return resposta.status(201).json(novoUsuario);
});
// Inicialização do servidor na porta 3000
const PORTA = 3000;
app.listen(PORTA, function () {
    console.log(`🚀 Backend rodando em http://localhost:${PORTA}`);
});
