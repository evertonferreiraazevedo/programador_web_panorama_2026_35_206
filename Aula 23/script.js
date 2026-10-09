// // Criando uma lista de frutas
// const frutas = ['Maçã', 'Banana', 'Melancia'];
// let varaivel = 0
// console.log(varaivel)
// varaivel = 1
// console.log(varaivel)
// console.log(frutas[0]);
// console.log(frutas[1]);
// console.log(frutas[2]);
// frutas.push('Uva');
// console.log(frutas);

function adicionarTarefa() {
    const listaTarefas = document.getElementById('ListaTarefas');
    const input = document.getElementById('tarefaInput');
    const valorTarefa = input.value;
    //verificar se tem caractere especial ou se é vazio
    const caracteresEspeciais = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/;
    if (caracteresEspeciais.test(valorTarefa)) {
        alert("Não são permitidos caracteres especiais!");
        return;
    }
    if (valorTarefa.trim() === "") {
        alert("Digite uma tarefa válida!");
        return;
    }
    const novaTarefa = document.createElement('li');
    novaTarefa.textContent = valorTarefa;
    listaTarefas.appendChild(novaTarefa);
    input.value = '';
}

