// Seleciona os elementos do HTML que precisamos manipular via código
const formulario = document.getElementById('formularioUsuario');
const listaVisual = document.getElementById('listaVisual');

// Variável de controle essencial para o sistema saber se estamos criando ou editando alguém.
// Se for null, estamos criando (POST). Se tiver um nome, estamos editando (PUT).
let nomeUsuarioSendoEditado = null;

// FUNÇÃO: BUSCAR E DESENHAR OS USUÁRIOS (GET)
function carregarUsuarios() {
    // Faz uma requisição GET para o backend pedindo a lista de usuários atualizada
    fetch('http://localhost:3000/usuarios')
        .then(function (resposta) {
            // Transforma a resposta de texto JSON vinda do servidor em um array JavaScript utilizável
            return resposta.json();
        })
        .then(function (listaDeUsuarios) {
            // Limpa o conteúdo visual antigo da lista para evitar que os dados acumulem na tela
            listaVisual.innerHTML = '';
            // Varre o array de usuários recebido do servidor
            listaDeUsuarios.forEach(function (user) {
                // Cria um elemento de lista (li) na memória do navegador
                const itemLista = document.createElement('li');
                // Preenche o HTML interno do li com os dados do usuário atual (user)
                // Nota: Corrigido de 'usuario' para 'user' para bater com o parâmetro do forEach
                itemLista.innerHTML = `
                <span><strong>${user.nome}</strong> - ${user.cargo}</span>
                <div class="lista-user">
                    <!-- Botão de editar que envia os dados atuais desta linha para a função de preparação -->
                    <button class="btn-editar" onclick="prepararEdicao('${user.nome}', '${user.cargo}')">Editar</button>
                    <!-- Botão de excluir que passa o nome do usuário a ser removido -->
                    <button class="btn-deletar" onclick="deletarUsuario('${user.nome}')">Excluir</button>
                </div>
            `;
                // Insere o elemento li criado dentro da nossa lista ul principal da página
                listaVisual.appendChild(itemLista);
            });
        })
        .catch(function (erro) {
            // Captura e exibe no console do navegador caso o servidor esteja desligado ou dê erro de rede
            console.error('Erro ao buscar usuários:', erro);
        });
}

// EVENTO: Envia o formulário para o backend (Pode salvar ou atualizar dependendo do contexto)
formulario.addEventListener('submit', function (evento) {
    // Impede que o HTML recarregue a página inteira, que é o comportamento padrão de formulários
    evento.preventDefault();
    // Captura os valores atuais digitados pelo usuário nos campos de texto
    const dadosUsuario = {
        nome: document.getElementById('campoNome').value,
        cargo: document.getElementById('campoCargo').value
    };
    // Estrutura de decisão: Verifica se o sistema está em modo de edição ou de criação
    if (nomeUsuarioSendoEditado !== null) {
        // MODO EDIÇÃO (PUT): O usuário clicou previamente em editar
        // encodeURIComponent garante que nomes com espaços ou caracteres especiais não quebrem o endereço da URL
        fetch(`http://localhost:3000/usuarios/${(nomeUsuarioSendoEditado)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosUsuario)
        }) // Converte os novos dados para texto JSON
            .then(function () {
                nomeUsuarioSendoEditado = null; // Reseta a variável para voltar ao modo padrão (criação)
                formulario.querySelector('button').innerText = 'Salvar no Sistema'; // Restaura o texto original do botão
                formulario.reset(); // Limpa as caixas de texto do formulário
                carregarUsuarios();
            }) // Atualiza a lista na tela imediatamente com as alterações
            .catch(function (erro) {
                alert('Erro ao atualizar usuário.');
            });
    }
    else {
        // MODO CRIAÇÃO (POST): Fluxo normal de cadastro de um novo registro
        fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosUsuario)
        })
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (usuarioSalvo) {
                formulario.reset(); // Limpa os campos após o sucesso
                carregarUsuarios(); // Atualiza a lista na tela imediatamente
            })
            .catch(function (erro) {
                alert('Erro ao salvar usuário.');
            });
    }
});

// FUNÇÃO: Prepara a interface gráfica para o modo de edição
function prepararEdicao(nome, cargo) {
    // Pega os dados do usuário clicado e joga de volta para dentro dos inputs do formulário
    document.getElementById('campoNome').value = nome;
    document.getElementById('campoCargo').value = cargo;
    // Altera o texto do botão do formulário para dar um feedback visual de alteração ao usuário
    formulario.querySelector('button').innerText = 'Atualizar Usuário';
    // Salva o nome atual nesta variável global para que o evento submit saiba qual rota e nome buscar no PUT
    nomeUsuarioSendoEditado = nome;
}


// FUNÇÃO: Deleta um usuário enviando uma requisição DELETE com o nome informado
function deletarUsuario(nome) {
    // Exibe uma caixa de confirmação nativa do navegador para evitar exclusões acidentais
    if (confirm(`Tem certeza que deseja excluir ${nome}?`)) {
        fetch(`http://localhost:3000/usuarios/${encodeURIComponent(nome)}`, {
            method: 'DELETE'
        })
            .then(function () {
                // Após a exclusão bem-sucedida no backend, atualiza a listagem da tela
                carregarUsuarios();
            })
            .catch(function (erro) {
                alert('Erro ao deletar usuário.');
            });
    }
}

// EVENTO: Dispara automaticamente a busca e renderização dos usuários assim que a página HTML terminar de carregar
window.addEventListener('DOMContentLoaded', carregarUsuarios);
