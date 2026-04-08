const produtos = {
	"123":{"nome": "macaco", "preco": 9.00},
	"456":{"nome": "flamingo", "preco": 12.00},
	"789":{"nome": "gato", "preco": 15.00},
	"147":{"nome": "leao", "preco": 90.50},
};

let carrinho = [];

const audio = new Audio("bip.mp3");

window.onload = () => {
	document.getElementById("cod").focus();
};

// ALERTA DE PRODUTO NÃO ENCONTRADO
function AlertItem(){
	alert("Produto não encontrado!");
}

// ATUALIZA TELA (LISTA + TOTAL)
function atualizarTela(){
	const lista = document.getElementById("lista");
	const totalHtml = document.querySelector(".total");

	lista.innerHTML = "";

	let total = 0;

	carrinho.forEach(item => {
		total += item.subtot;

		const li = document.createElement("li");
		li.className = "list-group-item d-flex justify-content-between";

		li.innerHTML = `
			<span>${item.nome} x${item.quantidade}</span>
			<span>R$ ${item.subtot.toFixed(2)}</span>
		`;

		lista.appendChild(li);
	});

	totalHtml.innerText = total.toFixed(2);
}

// CALCULAR SUBTOTAL EM TEMPO REAL
document.getElementById("cod").addEventListener("input", calcularSub);
document.getElementById("qtd").addEventListener("input", calcularSub);

function calcularSub(){
	const cod = document.getElementById("cod").value;
	const qtd = document.getElementById("qtd").value;
	const subHtml = document.getElementById("sub");

	if(produtos[cod]){
		const subtotal = produtos[cod].preco * qtd;
		subHtml.innerText = subtotal.toFixed(2);
	}else{
		subHtml.innerText = "0.00";
	}
}

// FUNÇÃO PRINCIPAL
function addProduto(){
	const codHtml = document.getElementById("cod");
	const qtdHtml = document.getElementById("qtd");

	const valorCod = codHtml.value;
	const valorQtd = parseInt(qtdHtml.value);

	if(!produtos[valorCod]){
		AlertItem();
		return;
	}

	const infoProduto = produtos[valorCod];

	const item = {
		nome: infoProduto.nome,
		preco: infoProduto.preco,
		quantidade: valorQtd,
		subtot: infoProduto.preco * valorQtd
	};

	carrinho.push(item);

	audio.currentTime = 0;
	audio.play();

	atualizarTela();

	qtdHtml.value = 1;
	codHtml.value = "";
	document.getElementById("sub").innerText = "0.00";
	codHtml.focus();
}