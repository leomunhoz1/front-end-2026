const campo = document.getElementById('taskInput');
const lista = document.getElementById('taskList');
function criarBotao(texto, funcao) {
    const botao = document.createElement('button');

    botao.textContent = texto;

    botao.onclick = function () {
        funcao(botao);
    };

    return botao;
}

function adicionarItem() {

    let valor = campo.value.trim();

    if (!valor) {
        return;
    }

    const item = document.createElement('li');

    const texto = document.createElement('span');

    texto.textContent = valor;

    item.appendChild(texto);
    item.appendChild(criarBotao('Editar', editarItem));
    item.appendChild(criarBotao('Remover', removerItem));
    item.appendChild(criarBotao('Feito', concluirItem));
    lista.appendChild(item);
    campo.value = '';
}

function concluirItem(botao) {

    botao.parentElement.classList.toggle('completed');
}

function removerItem(botao) {

    botao.parentElement.remove();
}
function editarItem(botao) {

    const item = botao.parentElement;

    const texto = item.querySelector('span');

    let novoValor = prompt('Editar tarefa:', texto.textContent);

    if (novoValor && novoValor.trim() !== '') {
        texto.textContent = novoValor;
    }
}