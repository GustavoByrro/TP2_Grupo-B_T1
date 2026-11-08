let telaAnterior = ''; 

function mudarTela(telaDesejada) {
    let secoes = document.querySelectorAll('.tela');

    if (telaDesejada === 'pausa') {
        secoes.forEach(secao => {
            if (secao.style.display === 'block') {
                telaAnterior = secao.id;
            }
        });
    }

    secoes.forEach(secao =>  {
        secao.style.display = 'none';
    });

    document.getElementById(telaDesejada).style.display = 'block';
}

function retomarJogo() {
    if (telaAnterior != '')
        mudarTela(telaAnterior);
}

let contador = document.querySelector('#pontuacao');
let pontos = 0; 

function iniciarNovoJogo() {
    pontos = 0; // Zera a pontuação
    contador.textContent = pontos; // Atualiza o texto na tela
    mudarTela('jogo'); // Vai para a tela do jogo
}

function retomarJogo() {
    if (telaAnterior != '')
        mudarTela(telaAnterior); // Mantém os pontos atuais
}

function aumentarPontos() {
    pontos += 1;
    contador.textContent = pontos;
}

document.addEventListener('keydown', function(e){
    let telaJogo = document.querySelector('#jogo');
    let telaRanking = document.querySelector('#ranking');
    let telaTutorial = document.querySelector('#tutorial');
    let telaInicial = document.querySelector('#inicial');
    let telaPausa = document.querySelector('#pausa');

    if (e.key === 'Escape'){
        if(telaJogo.style.display === 'block')
            mudarTela('pausa');
        else if(telaRanking.style.display === 'block' || telaTutorial.style.display === 'block')
            mudarTela('inicial');
        else if(telaPausa.style.display === 'block')
            mudarTela('inicial');  
    }

    if(e.key === 'Enter'){
        if(telaInicial.style.display === 'block')
            iniciarNovoJogo(); // Se vier da inicial, zera e começa
        else if(telaPausa.style.display === 'block')
            retomarJogo(); // Se vier da pausa, mantém os pontos
    }
})
let jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
function finalizarJogo() {
    document.querySelector("#pontuacaoFinal").textContent =
        "Pontuação: " + pontuacao;
    mudarTela("resultado");
}

function salvarPontuacao() {
    let nome = document.querySelector("#nome").value.trim();

    if (nome === "") {
        alert("Digite seu nome!");
        return;
    }
    let jogador = jogadores.find(j => j.nome.toLowerCase() === nome.toLowerCase());

    if (jogador) {
        if (pontuacao > jogador.pontos) {
            jogador.pontos = pontuacao;
        }
    } else {
        jogadores.push({
            nome: nome,
            pontos: pontuacao
        });
    }

    localStorage.setItem("jogadores", JSON.stringify(jogadores));
    document.querySelector("#nome").value = "";
    atualizarRanking();
    mudarTela("inicial");
}
function atualizarRanking() {

    jogadores.sort((a, b) => b.pontos - a.pontos);
    let lista = document.querySelector("#lista-ranking");
    lista.innerHTML = "";

    for (let i = 0; i < jogadores.length; i++) {
        let item = document.createElement("li");
        item.textContent = `${i + 1}º - ${jogadores[i].nome} - ${jogadores[i].pontos} pontos`;
        lista.appendChild(item);
    }
}