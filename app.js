let listaNumerosSorteados = [];

let limite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function gerarNumAleatorio(){
    let numeroEscolhido = parseInt(Math.random()*limite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if(quantidadeElementosLista == limite){
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)){ // o includes vai ver se já está na lista
        return gerarNumAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido); // o push adiciona ao fim da lista
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; //deixar o campo vazio
}

/*let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do Número Secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
*/

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e ' + limite);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', `O número secreto é ${numeroSecreto}, e você descobriu com ${tentativas} ${palavraTentativas}!`);

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute < numeroSecreto){
            exibirTextoNaTela('h1', 'Tente Novamente!');
            exibirTextoNaTela('p', 'O número secreto é maior do que ' + chute);
        } else {
            exibirTextoNaTela('h1', 'Tente Novamente!');
            exibirTextoNaTela('p', 'O número secreto é menor do que ' + chute);
        }
        tentativas++;
        limparCampo();
    }

}

function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}