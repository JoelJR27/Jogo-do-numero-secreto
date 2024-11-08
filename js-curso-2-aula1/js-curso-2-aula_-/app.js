const listaNumerosSorteados = [];
const numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
const btn = document.getElementById("chutar");
const btnReiniciar = document.getElementById("reiniciar");
console.log(btnReiniciar);

function exibirTextoNaTela(tag, texto) {
  const campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

function mensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10.");
}

mensagemInicial();

function gerarNumeroAleatorio() {
  let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeItensNaLista = listaNumerosSorteados.length;

  if (quantidadeDeItensNaLista == numeroLimite) {
    listaNumerosSorteados = [];
  }

  if (listaNumerosSorteados.includes(numeroSorteado)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroSorteado);
    console.log(listaNumerosSorteados);
    return numeroSorteado;
  }
}

function limparInput() {
  document.querySelector("input").value = "";
}

let tentativas = 1;
function chutar() {
  let chute = document.querySelector(".container__input").value;
  switch (true) {
    case chute < 1 || chute > 10:
      exibirTextoNaTela(
        "p",
        "Número inválido, escolha um número entre 1 e 10."
      );
      tentativas++;
      limparInput();
      break;
    case chute == 0:
      exibirTextoNaTela(
        "p",
        "Número inválido, escolha um número entre 1 e 10."
      );
      tentativas++;
      limparInput();
      break;
    case chute > numeroSecreto:
      exibirTextoNaTela("p", "O número secreto é menor");
      tentativas++;
      limparInput();
      break;
    case chute < numeroSecreto:
      exibirTextoNaTela("p", "O número secreto é maior");
      tentativas++;
      limparInput();
      break;
    case chute == numeroSecreto:
      const pluralOuSingular = tentativas == 1 ? "tentativa" : "tentativas";
      exibirTextoNaTela("h1", "Parabéns, você acertou!");
      exibirTextoNaTela(
        "p",
        `O número secreto era ${numeroSecreto}. Você acertou em ${tentativas} ${pluralOuSingular}.`
      );
      btnReiniciar.removeAttribute("disabled");
      break;
  }
}

function reiniciar() {
  numeroSecreto = gerarNumeroAleatorio();
  limparInput();
  tentativas = 1;
  mensagemInicial();
  btnReiniciar.setAttribute("disabled", true);
}

btn.addEventListener("click", chutar);
btnReiniciar.addEventListener("click", reiniciar);
