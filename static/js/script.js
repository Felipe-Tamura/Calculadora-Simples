const tecladoNumerico = document.querySelector(".teclado_numerico");
const tecladoAcao = document.querySelector(".teclado_acao");
const tecladoLimpar = document.querySelector(".teclado_limpar");
const telaConsole = document.querySelector(".tela_calc");
const telaOperacao = document.querySelector(".tela_simbolo");
const historico = document.querySelector(".tabela_historico");
const tabelaHistorico = document.querySelector(".linhas_historico");
const btnHistorico = document.querySelector(".btn_historico");
let operacoes = [];
let verHistorico = false;

function start() {
    /*
     * Inicializando calculadora
     */

    criarTeclas(); //Criando teclas

    //Visibilidade do histórico
    btnHistorico.addEventListener("click", () => {
        historico.classList.toggle("escondido");
    });
}

function criarTeclas() {
    /*
     * Criando as teclas para a calculadora
     * teclas numéricas, de ação e de limpeza do console
     */

    var linha = 4;
    var coluna = 3;

    const teclasAcao = ["/", "*", "-", "+"];
    const teclasLimpar = ["CE", "C", "&#8656;"];

    // Criando teclas numéricas
    for (let i = 1; i <= linha * coluna; i++) {
        let temporario = i == 10 ? "." : i == 12 ? "," : i == 11 ? 0 : i; // Variável temporaria para guardar informações
        tecladoNumerico.innerHTML += `<button
                id="botao_numerico"
                class="tecla"
                type="button"
                onclick="getValue(this.value)"
                value="${temporario}">
                    ${temporario}
                </button>`;
    }

    // Criando teclas de ação (-, +, *, ...)
    teclasAcao.forEach((tecla) => {
        let simbolo = document.createElement("button"); //Criando um botão
        simbolo.type = "button"; //Definindo tipo do botão
        simbolo.className = "tecla"; //Nome da classe
        simbolo.textContent = tecla; //Conteudo do botão
        simbolo.value = tecla; //Valor do botão
        simbolo.onclick = () => {
            getSymbol(simbolo.value);
        }; //Ação do botão
        tecladoAcao.appendChild(simbolo); //Adicionando o botão no HTML
    });

    // Criando teclas de limpeza do console(CE, C, backspace)
    teclasLimpar.forEach((tecla) => {
        let simbolo = document.createElement("button"); //Criando um botão
        simbolo.type = "button"; //Definindo o tipo do botão
        simbolo.className = "tecla"; //Nome da classe
        if (tecla === "&#8656;") {
            simbolo.innerHTML = tecla;
            simbolo.value = "backspace";
        } else {
            simbolo.textContent = tecla; //Conteudo do botão
            simbolo.value = tecla; //Valor do botão
        }
        simbolo.onclick = () => {
            limpar(simbolo.value);
        }; //Ação do botão
        tecladoLimpar.appendChild(simbolo); //Adicionando o botão no HTML
    });

    // Criando tecla para calcular
    let teclaCalcular = document.createElement("button");
    teclaCalcular.type = "button";
    teclaCalcular.className = "tecla";
    teclaCalcular.textContent = "=";
    teclaCalcular.onclick = () => {
        calcular();
    };
    tecladoAcao.appendChild(teclaCalcular);
}

function limpar(value) {
    /*
     * Limpando a tela do console e de operações com base no parâmetro
     * Args:
     *  - value: Valor para verificar o tipo de limpeza
     */

    if (value == "C") {
        // Limpando as duas telas
        telaConsole.innerText = "";
        telaOperacao.innerText = "";
    } else if (value == "CE") {
        // Limpando apenas o console
        telaConsole.innerText = "";
    } else if (value == "backspace") {
        // Backspace
        let temp = telaConsole.innerText;
        if (temp.length > 0) {
            telaConsole.innerText = temp.slice(0, -1);
        }
    }
}

function calcular() {
    /*
     * Calculando os valores da calculadora, caso ocorra erro ele mostra no console o erro
     */

    try {
        if(telaConsole.innerText == "") return // Evitando valores vazios na tabela e no console
        // Calculando operações
        telaOperacao.innerText += telaConsole.innerText;
        let resultado = eval(telaOperacao.innerText);

        if (resultado == "Infinity") {
            // Verificando se há divisão por zero

            alert("Divisão por zero não é válido!");
            limpar("C");
        } else {
            // Adicionando dados a lista de operações
            operacoes.push({ equacao: telaOperacao.innerText, resultado: resultado });

            // Limpando as telas e mostrando resultado na tela
            limpar("C");
            telaConsole.innerText = resultado;

            // Atualizando historico de operacoes
            generateTable();
        }
    } catch (error) {
        console.error("Erro ao calcular: ", error);
    }
}

function getValue(value) {
    /*
     * Pegando o valor do botão e adicionando no console
     */

    telaConsole.innerText += value;
}

function getSymbol(value) {
    /*
     * Pegando simbolos de equações e adicionando na tela de operaçoes
     * junto com valores do console
     */

    telaOperacao.innerText = telaConsole.innerText;
    telaOperacao.innerText += value;
    telaConsole.innerText = "";
}

function generateTable() {
    /*
     * Adicionando valores na tabela caso exista alguma operação na lista
     */

    // Limpando tabela de histórico
    tabelaHistorico.innerHTML = "";

    if (operacoes.length > 0) {
        // Adicionando valores

        // Iterando sobre elementos
        operacoes.forEach((dados) => {
            let row = tabelaHistorico.insertRow(); // Criando linhas
            let equacaoCell = row.insertCell(0); // Criando linhas da equação
            let resultadoCell = row.insertCell(1); // Criando linhas do resultado

            equacaoCell.innerText = dados.equacao; // Adicionando equação a tabela
            resultadoCell.innerText = dados.resultado; // Adicionando resultado a tabela
        });
    }
}

start();
