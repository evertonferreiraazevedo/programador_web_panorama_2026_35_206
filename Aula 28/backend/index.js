const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// =========================================================================
// MÓDULO ANTIGO: LISTA DE USUÁRIOS EM MEMÓRIA RAM (Para fins didáticos)
// =========================================================================
// let usuarios = [
//     { nome: "Ana Costa", cargo: "Desenvolvedora" },
//     { nome: "Carlos Souza", cargo: "Designer" }
// ];
// =========================================================================

// // CONFIGURAÇÃO DO BANCO: Substitua SUA_SENHA_REAL pela senha criada no Atlas
// const LINK_DO_BANCO = "mongodb+srv://professor:aula1234@cluster0.kjwk8tr.mongodb.net/meuBanco?retryWrites=true&w=majority";

//  NOVA VERSÃO CORRIGIDA (Utiliza a rota direta sem consultar o SRV do DNS):
const LINK_DO_BANCO = "mongodb://professor:aula1234@ac-90l4uls-shard-00-00.kjwk8tr.mongodb.net:27017,ac-90l4uls-shard-00-01.kjwk8tr.mongodb.net:27017,ac-90l4uls-shard-00-02.kjwk8tr.mongodb.net:27017/meuBanco?ssl=true&replicaSet=atlas-p9zrc5-shard-0&authSource=admin&retryWrites=true&w=majority";


// Inicializa a conexão com o servidor do MongoDB na nuvem
mongoose.connect(LINK_DO_BANCO)
    .then(function () {
        console.log("Conectado com sucesso ao MongoDB na Nuvem!");
    })
    .catch(function (erro) {
        console.error("Erro ao conectar ao MongoDB:", erro);
    });

// MODELO DE DADOS (SCHEMA): Molde estrutural para o MongoDB NoSQL
const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cargo: { type: String, required: true }
});

// Modelo operacional baseado no molde criado acima
const Usuario = mongoose.model('Usuario', UsuarioSchema);


// =========================================================================
// [GET] LISTAR TODOS OS USUÁRIOS
// =========================================================================
// CÓDIGO ANTIGO (SEM BANCO DE DADOS):
// app.get('/usuarios', function (requisicao, response) {
//     return response.json(usuarios);
// });

// CÓDIGO ATUAL (COM BANCO DE DADOS):
app.get('/usuarios', function (requisicao, response) {
    Usuario.find()
        .then(function (listaDeUsuarios) {
            return response.json(listaDeUsuarios);
        })
        .catch(function (erro) {
            return response.status(500).json({ erro: "Erro ao buscar dados do banco" });
        });
});


// =========================================================================
// [POST] CRIAR UM NOVO USUÁRIO
// =========================================================================
// CÓDIGO ANTIGO (SEM BANCO DE DADOS):
// app.post('/usuarios', function (requisicao, response) {
//     const dadosRecebidos = requisicao.body;
//     const novoUsuario = {
//         nome: dadosRecebidos.nome,
//         cargo: dadosRecebidos.cargo
//     };
//     usuarios.push(novoUsuario);
//     return response.status(201).json(novoUsuario);
// });

// CÓDIGO ATUAL (COM BANCO DE DADOS):
app.post('/usuarios', function (requisicao, response) {
    const dadosRecebidos = requisicao.body;

    Usuario.create({
        nome: dadosRecebidos.nome,
        cargo: dadosRecebidos.cargo
    })
        .then(function (novoUsuario) {
            return response.status(201).json(novoUsuario);
        })
        .catch(function (erro) {
            return response.status(400).json({ erro: "Erro ao salvar usuário no banco" });
        });
});


// =========================================================================
// [PUT] ATUALIZAR UM USUÁRIO PELO NOME
// =========================================================================
// CÓDIGO ANTIGO (SEM BANCO DE DADOS):
// app.put('/usuarios/:nomeParametro', function (requisicao, response) {
//     const nomeParametro = decodeURIComponent(requisicao.params.nomeParametro);
//     const dadosNovos = requisicao.body;
//     const usuarioEncontrado = usuarios.find(function (u) {
//         return u.nome.toLowerCase() === nomeParametro.toLowerCase(); 
//     });
//     if (!usuarioEncontrado) {
//         return response.status(404).json({ erro: "Usuário não encontrado no sistema" });
//     }
//     usuarioEncontrado.nome = dadosNovos.nome;
//     usuarioEncontrado.cargo = dadosNovos.cargo;
//     return response.json(usuarioEncontrado);
// });

// CÓDIGO ATUAL (COM BANCO DE DADOS):
app.put('/usuarios/:nomeParametro', function (requisicao, response) {
    const nomeParametro = decodeURIComponent(requisicao.params.nomeParametro);
    const dadosNovos = requisicao.body;

    Usuario.findOneAndUpdate(
        { nome: { $regex: new RegExp("^" + nomeParametro + "$", "i") } },
        { nome: dadosNovos.nome, cargo: dadosNovos.cargo },
        { new: true }
    )
        .then(function (usuarioAtualizado) {
            if (!usuarioAtualizado) {
                return response.status(404).json({ erro: "Usuário não encontrado para atualizar" });
            }
            return response.json(usuarioAtualizado);
        })
        .catch(function (erro) {
            return response.status(500).json({ erro: "Erro ao processar a atualização no banco" });
        });
});


// =========================================================================
// [DELETE] REMOVER UM USUÁRIO PELO NOME
// =========================================================================
// CÓDIGO ANTIGO (SEM BANCO DE DADOS):
// app.delete('/usuarios/:nomeParametro', function (requisicao, response) {
//     const nomeParametro = decodeURIComponent(requisicao.params.nomeParametro);
//     const listaFiltrada = usuarios.filter(function (u) {
//         return u.nome.toLowerCase() !== nomeParametro.toLowerCase();
//     });
//     if (listaFiltrada.length === usuarios.length) {
//         return response.status(404).json({ erro: "Usuário não encontrado" });
//     }
//     usuarios = listaFiltrada;
//     return response.status(204).send();
// });

// CÓDIGO ATUAL (COM BANCO DE DADOS):
app.delete('/usuarios/:nomeParametro', function (requisicao, response) {
    const nomeParametro = decodeURIComponent(requisicao.params.nomeParametro);

    Usuario.findOneAndDelete({ nome: { $regex: new RegExp("^" + nomeParametro + "$", "i") } })
        .then(function (usuarioDeletado) {
            if (!usuarioDeletado) {
                return response.status(404).json({ erro: "Usuário não encontrado para deletar" });
            }
            return response.status(204).send();
        })
        .catch(function (erro) {
            return response.status(500).json({ erro: "Erro ao processar a exclusão no banco" });
        });
});


const PORTA = 3000;
app.listen(PORTA, function () {
    console.log(`🚀 Backend rodando e pronto em http://localhost:${PORTA}`);
});
