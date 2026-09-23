function verificarIdade() {
    // Pega o valor digitado no input do HTML
    let idade = document.getElementById("campoIdade").value;
    let textoResultado = document.getElementById("resultado");
    if (idade < 18) {
        textoResultado.innerText = "Você é menor de idade.";
    }
    else {
        textoResultado.innerText = "Liberado! Você é maior de idade.";
    }
}

function calcularMedia() {
    let textoResultado = document.getElementById("resultado");
    let nota1 = Number(document.getElementById("media1").value)
    let nota2 = Number(document.getElementById("media2").value)
    let nota3 = Number(document.getElementById("media3").value)
    let nota4 = Number(document.getElementById("media4").value)
    let media = (nota1 + nota2 + nota3 + nota4) / 4
    // alert(media)

    if (media >= 7) {
        textoResultado.innerText = "Parabens!";
    }
    else {
        textoResultado.innerText = "Estude mais!";
    }
}
