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
