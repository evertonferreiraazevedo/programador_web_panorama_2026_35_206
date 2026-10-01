function analisarClima() {
    const corpo = document.getElementById('corpo');
    const txtInput = document.getElementById('tempInput').value.trim(); // .trim() remove espaços em branco acidentais
    const output = document.getElementById('output');
    const imgClima = document.getElementById('fotoClima');

    if (txtInput === "") {
        output.innerHTML = "Por favor, insira uma temperatura válida.";
        corpo.className = "padrao";
        return;
    }
    const temp = parseFloat(txtInput);
    corpo.className = "";
    if (temp < 0) {
        output.innerHTML = "Clima: Congelante. Na mala: Casaco térmico, luvas e touca!";
        imgClima.src = "./midias/gelo.jpeg";
        corpo.classList.add('gelo');

    } else if (temp <= 14) {
        output.innerHTML = "Clima: Frio. Na mala: Leve casacos grossos e calças.";
        imgClima.src = "./midias/frio.jpeg";
        corpo.classList.add('frio');

    } else if (temp <= 25) {
        output.innerHTML = "Clima: Agradável. Na mala: Roupas leves e um casaco leve para a noite.";
        imgClima.src = "./midias/ameno.jpeg";
        corpo.classList.add('ameno');

    } else {
        output.innerHTML = "Clima: Quente. Na mala: Roupas de banho, óculos de sol e protetor!";
        imgClima.src = "./midias/quente.jpeg";
        corpo.classList.add('quente');
    }
}
