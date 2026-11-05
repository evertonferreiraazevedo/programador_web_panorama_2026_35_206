const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MÓDULO ANTIGO: LISTA DE USUÁRIOS EM MEMÓRIA RAM 
let usuarios = [
    { nome: "Ana Costa", cargo: "Desenvolvedora" },
    { nome: "Carlos Souza", cargo: "Designer" }
];

// [GET] LISTAR TODOS OS USUÁRIOS
// CÓDIGO SEM BANCO DE DADOS
app.get('/usuarios', function (requisicao, response) {
    return response.json(usuarios);
});

// [POST] CRIAR UM NOVO USUÁRIO
// CÓDIGO SEM BANCO DE DADOS
app.post('/usuarios', function (requisicao, response) {
    const dadosRecebidos = requisicao.body;
    const novoUsuario = {
        nome: dadosRecebidos.nome,
        cargo: dadosRecebidos.cargo
    };
    usuarios.push(novoUsuario);
    return response.status(201).json(novoUsuario);
});

// [PUT] ATUALIZAR UM USUÁRIO PELO NOME
// CÓDIGO SEM BANCO DE DADOS:
app.put('/usuarios/:nomeParametro', function (requisicao, response) {
    const nomeParametro = decodeURIComponent(requisicao.params.nomeParametro);
    const dadosNovos = requisicao.body;
    const usuarioEncontrado = usuarios.find(function (u) {
        return u.nome.toLowerCase() === nomeParametro.toLowerCase();
    });
    if (!usuarioEncontrado) {
        return response.status(404).json({ erro: "Usuário não encontrado no sistema" });
    }
    usuarioEncontrado.nome = dadosNovos.nome;
    usuarioEncontrado.cargo = dadosNovos.cargo;
    return response.json(usuarioEncontrado);
});

// [DELETE] REMOVER UM USUÁRIO PELO NOME
// CÓDIGO SEM BANCO DE DADOS:
app.delete('/usuarios/:nomeParametro', function (requisicao, response) {
    const nomeParametro = decodeURIComponent(requisicao.params.nomeParametro);
    const listaFiltrada = usuarios.filter(function (u) {
        return u.nome.toLowerCase() !== nomeParametro.toLowerCase();
    });
    if (listaFiltrada.length === usuarios.length) {
        return response.status(404).json({ erro: "Usuário não encontrado" });
    }
    usuarios = listaFiltrada;
    return response.status(204).send();
});

const PORTA = 3000;
app.listen(PORTA, function () {
    console.log(`🚀 Backend rodando e pronto em http://localhost:${PORTA}`);
});
