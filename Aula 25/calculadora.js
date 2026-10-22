function somar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}
function dividir(a, b) {
    return a / b;
}

// Exportamos um objeto contendo as três funções
module.exports = {
    somar,
    subtrair,
    multiplicar,
    dividir
};
