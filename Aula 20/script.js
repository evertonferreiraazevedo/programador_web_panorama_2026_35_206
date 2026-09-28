function verificarNumero() {
    const valorInput = document.getElementById('numero').value;
    const numero = parseFloat(valorInput);
    const campoResultado = document.getElementById('resultado');
    if (numero > 0) {
        campoResultado.innerHTML = `<H1>O número ${numero} é Positivo.</H1>`;
        campoResultado.style.color = "green";
    } else if (numero < 0) {
        campoResultado.innerHTML = `<H1>O número ${numero} é Negativo.</H1>`;
        campoResultado.style.color = "red";
    } else if (numero === 0) {
        campoResultado.innerHTML = `<H1>O número é Zero.</H1>`;
        campoResultado.style.color = "blue";
    }
    else {
        campoResultado.innerHTML = "<H1>Por favor, digite um número.</H1>";
        campoResultado.style.color = "orange";
    }
}