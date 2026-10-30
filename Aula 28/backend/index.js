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
    // decodeURIComponent limpa os espaços e caracteres da URL (ex: "Ana%20Costa" vira "Ana Costa")
    const nomeParametro = decodeURIComponent(requisicao.params.nomeParametro);
    const dadosNovos = requisicao.body;
    // Procura o usuário na lista ignorando letras maiúsculas ou minúsculas
    const usuarioEncontrado = usuarios.find(function (u) {
        return u.nome.toLowerCase() === nomeParametro.toLowerCase(); });
    // Se o usuário não for encontrado no array, retorna o erro 404 explicitamente
    if (!usuarioEncontrado) {
        return response.status(404).json({ erro: "Usuário não encontrado no sistema" });}
    // Aplica os novos dados recebidos do formulário do frontend
    usuarioEncontrado.nome = dadosNovos.nome;
    usuarioEncontrado.cargo = dadosNovos.cargo;
    return response.json(usuarioEncontrado);
});


// [DELETE] Remover pelo Nome
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
    console.log(`🚀 Backend (Ajustado) rodando em http://localhost:${PORTA}`);
});
