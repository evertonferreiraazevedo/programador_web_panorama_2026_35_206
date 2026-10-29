const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Nossa lista de usuários na memória
let usuarios = [
    { nome: "Ana Costa", cargo: "Desenvolvedora" },
    { nome: "Carlos Souza", cargo: "Designer" }
];

// [GET] Listar todos
app.get('/usuarios', function (requisicao, response) {
    return response.json(usuarios);
});

// [POST] Criar um novo
app.post('/usuarios', function (requisicao, response) {
    const dadosRecebidos = requisicao.body;

    const novoUsuario = {
        nome: dadosRecebidos.nome,
        cargo: dadosRecebidos.cargo
    };

    usuarios.push(novoUsuario);
    return response.status(201).json(novoUsuario);
});

// [PUT] Atualizar pelo Nome
// Rota para o recebimento do parametro de texto
app.put('/usuarios/:nomeParametro', function (requisicao, response) {
    // AQUI VEM ROTA PUT 
});

// [DELETE] Remover pelo Nome
app.delete('/usuarios/:nomeParametro', function (requisicao, response) {
    // AQUI VEM ROTA DELETE
});

const PORTA = 3000;
app.listen(PORTA, function () {
    console.log(`🚀 Backend (Ajustado) rodando em http://localhost:${PORTA}`);
});
