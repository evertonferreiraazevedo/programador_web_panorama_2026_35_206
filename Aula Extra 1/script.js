// Array que irá armazenar os produtos
let produtos = [];


// Pegando os elementos do HTML
const formulario = document.getElementById("formProduto");

const campoNome = document.getElementById("nome");

const campoPreco = document.getElementById("preco");

const listaProdutos = document.getElementById("listaProdutos");

const campoTotal = document.getElementById("total");


// Evento de envio do formulário
formulario.addEventListener("submit", function(event) {

    // Impede o formulário de recarregar a página
    event.preventDefault();


    // Pegando os valores digitados
    const nome = campoNome.value;

    const preco = Number(campoPreco.value);


    // Validação
    if (nome === "" || preco <= 0) {

        alert("Preencha os dados corretamente!");

        return;
    }


    // Criando um objeto produto
    const produto = {

        nome: nome,

        preco: preco

    };


    // Adicionando o produto ao array
    produtos.push(produto);


    // Atualizando a tela
    mostrarProdutos();


    // Limpando os campos
    campoNome.value = "";

    campoPreco.value = "";

    campoNome.focus();

});


// Função responsável por mostrar os produtos
function mostrarProdutos() {

    // Limpa a lista antes de recriá-la
    listaProdutos.innerHTML = "";


    // Percorre o array de produtos
    produtos.forEach(function(produto, indice) {

        // Criando o elemento <li>
        const item = document.createElement("li");

        item.classList.add("produto");


        // Criando a área de informações
        const informacoes = document.createElement("div");

        informacoes.classList.add("produto-info");


        // Criando o nome
        const nomeProduto = document.createElement("strong");

        nomeProduto.textContent = produto.nome;


        // Criando o preço
        const precoProduto = document.createElement("span");

        precoProduto.classList.add("preco");

        precoProduto.textContent =
            `R$ ${produto.preco.toFixed(2)}`;


        // Adicionando nome e preço
        informacoes.appendChild(nomeProduto);

        informacoes.appendChild(precoProduto);


        // Criando botão remover
        const botaoRemover = document.createElement("button");

        botaoRemover.textContent = "Remover";

        botaoRemover.classList.add("btn-remover");


        // Evento do botão remover
        botaoRemover.addEventListener("click", function() {

            removerProduto(indice);

        });


        // Montando o item
        item.appendChild(informacoes);

        item.appendChild(botaoRemover);


        // Adicionando o item na lista
        listaProdutos.appendChild(item);

    });


    // Atualiza o total
    calcularTotal();

}


// Função para remover produto
function removerProduto(indice) {

    produtos.splice(indice, 1);

    mostrarProdutos();

}


// Função para calcular o total
function calcularTotal() {

    let total = 0;


    produtos.forEach(function(produto) {

        total += produto.preco;

    });


    campoTotal.textContent = total.toFixed(2);

}