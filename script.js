
// Variável para armazenar a lista de compras
let listaDeCompras = [];
let reajuteList = [];

const itemInput = document.getElementById("item");
const precoInput = document.getElementById("preco");

// Função para adicionar um item à lista de compras
function adicionarItem() {

    const item = parseFloat(itemInput.value);
    const preco = parseFloat(precoInput.value);

    if (isNaN(item) || item <= 0 || isNaN(preco) || preco <= 0) {
        alert("Por favor, preecha todos os campos.");
        return;
    }

    // Adiciona o item à lista de compras
    listaDeCompras.push({ item, preco });
    reajuteList.push({item, preco });

    // Limpa os campos de entrada
    //itemInput.value = "";
    precoInput.value = "";

    // Atualiza a exibição da lista de compras
    exibirListaDeCompras();

    // Atualiza e exibe o total da compra
    exibirTotalDaCompra();
    calcularPercent();
}

// Função tecla Enter adicionar um item à lista de compras
precoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const item = parseFloat(itemInput.value);
        const preco = parseFloat(precoInput.value);

        if (isNaN(item) || item <= 0 || isNaN(preco) || preco <= 0) {
            alert("Por favor, preecha todos os campos.");
            return;
        }

        // Adiciona o item à lista de compras
        listaDeCompras.push({ item, preco });
        reajuteList.push({ preco });

        // Limpa os campos de entrada
        //itemInput.value = "";
        precoInput.value = "";

        // Atualiza a exibição da lista de compras
        exibirListaDeCompras();

        // Calcula e exibe o total da compra
        exibirTotalDaCompra();

        calcularPercent();

        calcularTotalReajustado();
        
    }
})

// Função para exibir a lista de compras
function exibirListaDeCompras() {
    const listaDeComprasElement = document.getElementById("listaDeCompras");
    listaDeComprasElement.innerHTML = "";

    listaDeCompras.forEach((itens) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Peso: ${itens.preco.toFixed()}`;
        listaDeComprasElement.appendChild(listItem);
    });
}

function calcularPercent() {
    //exibir a lista
    let reajuste = document.getElementById("reajuteList");
    reajuste.innerHTML = "";
    

    const valor_fixo = parseFloat(itemInput.value); 

    //Função para calcular e exibir o total
    const total = reajuteList.reduce((valorItem, valorLista) => valorItem + valorLista.preco, 0);
    let calc = valor_fixo / total;
    let totalElement = document.getElementById("totalReajustado");
    totalElement.textContent = calc.toFixed(3);
    

    //Calcula os valores entre as listas para achar o porcentual
    reajuteList.forEach((itens) => {
        let listReajust = document.createElement("li");
        listReajust.textContent = Math.round(`${(itens.preco * calc) / 100 * 125 + calc - 0.1}`) ;
        reajuste.appendChild(listReajust);   
    })

}

// Função para calcular e exibir o total da lista
function exibirTotalDaCompra() {
    const total = listaDeCompras.reduce((valorItem, valorLista) => valorItem + valorLista.preco, 0);
    const totalElement = document.getElementById("total");
    totalElement.textContent = total.toFixed();
}

//Função calcula e exibir o total da lista
function calcularTotalReajustado() {
    const valorFixo = parseFloat(itemInput.value);
    const total = listaDeCompras.reduce((valorItem, valorLista) => valorItem + valorLista.preco, 0);
    const calc = valorFixo / total;
    const totalReajustado = listaDeCompras.map((item) => (item.preco * calc) / 100 * 125 + calc - 0.1);
    const totalReajustadoElement = document.getElementById("totalCte");
    totalReajustadoElement.textContent = totalReajustado.reduce((a, b) => a + b, 0).toFixed();
  }
