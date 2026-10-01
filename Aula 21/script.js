function executarFor() {
    const listaFor = document.getElementById('listaFor');
    listaFor.innerHTML = "";
    for (let dias = 10; dias >= 1; dias--) {
        const item = document.createElement('li');
        item.innerText = `Faltam ${dias} dias para a viagem! ✈️`;
        listaFor.appendChild(item)
    }
    const itemFinal = document.createElement('li');
    itemFinal.innerHTML = "<strong>Chegou o dia! Decolando! 🛫</strong>";
    listaFor.appendChild(itemFinal);
}

function executarWhile() {
    const listaWhile = document.getElementById('listaWhile');
    listaWhile.innerHTML = "";
    let pesoMala = 0;
    const limitePeso = 23;
    while (pesoMala < limitePeso) {
        pesoMala += 3;
        const item = document.createElement('li');
        item.innerText = `Adicionando roupas... Peso atual: ${pesoMala}kg`;
        listaWhile.appendChild(item);
    }
    const itemFinal = document.createElement('li');
    itemFinal.innerHTML = "<strong>Mala cheia e pronta para o embarque! 🧳</strong>";
    listaWhile.appendChild(itemFinal);
}