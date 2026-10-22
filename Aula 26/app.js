const http = require('http');
const meuServidor = http.createServer(function (requisicao, resposta) {
    resposta.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    if (requisicao.url === '/') {
        resposta.end('Você está na Página Inicial do servidor!');
    } else if (requisicao.url === '/contato') {
        resposta.end('Esta é a página de Contato: contato@empresa.com');
    } else {
        // Se o usuário tentar acessar qualquer link que não existe, enviamos o famoso Erro 404
        resposta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        resposta.end('Erro 404: Página não encontrada!');
    }
});
const PORTA = 3000;
meuServidor.listen(PORTA, function () {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});