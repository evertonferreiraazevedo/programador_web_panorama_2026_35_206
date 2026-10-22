// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
//   res.end('Servidor Node.js rodando com sucesso!\n');
// });

// const PORTA = 3000;
// server.listen(PORTA, () => {
//   console.log(`Servidor ativo em http://localhost:${PORTA}`);
// });
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para processar corpos de requisições em JSON
app.use(express.json());

// Dados fictícios (Simulando um banco de dados em memória)
let produtos = [
  { id: 1, nome: 'Teclado Mecânico', preco: 350.00 },
  { id: 2, nome: 'Mouse Gamer', preco: 180.00 }
];

// AJUSTE: Adicionada rota para a raiz para evitar o erro "Cannot GET /"
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'Bem-vindo à nossa API REST de Produtos!',
    status: 'Online',
    endpoints: {
      listarProdutos: 'GET /produtos',
      criarProduto: 'POST /produtos',
      atualizarProduto: 'PUT /produtos/:id',
      deletarProduto: 'DELETE /produtos/:id'
    }
  });
});

app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ erro: 'Nome e preço são obrigatórios.' });
  }

  // 🚀 AJUSTE: Garante que o ID será único mesmo se o array mudar de tamanho
  const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;

  const novoProduto = {
    id: novoId,
    nome,
    preco
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  const produto = produtos.find(p => p.id === parseInt(id));

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  produto.nome = nome || produto.nome;
  produto.preco = preco || produto.preco;

  res.status(200).json(produto);
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  produtos.splice(index, 1);
  res.status(204).send(); // Sem conteúdo na resposta após sucesso
});

app.listen(PORT, () => {
  console.log(`API REST rodando em http://localhost:${PORT}`);
});
