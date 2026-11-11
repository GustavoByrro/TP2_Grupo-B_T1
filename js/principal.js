const listaPokemons = [
    {
        nome: 'Dragonite',
        vida: 2,
        srcImg: 'imgs/dragonite.png'
    },
    {
        nome: 'Pikachu',
        vida: 1,
        srcImg: 'imgs/pikachu.png'
    },
    {
        nome: 'Rattata',
        vida: 1,
        srcImg: 'imgs/rattata-f.png'
    },
    {
        nome: 'Arcanine',
        vida: 2,
        srcImg: 'imgs/arcanine.png'
    },
    {
        nome: 'Rhydom',
        vida: 2,
        srcImg: 'imgs/rhydon.png'
    },

];

function mudarTela(telaDesejada) {
    let secoes = document.querySelectorAll('.tela');
    let topo = document.querySelector('.transicao-metade.topo');
    let baixo = document.querySelector('.transicao-metade.baixo');

    if (telaDesejada === 'pausa') {
        secoes.forEach(secao => {
            if (secao.style.display === 'block') {
                telaAnterior = secao.id;
            }
        });
    }

    if(telaDesejada != 'pausa'){
        topo.classList.remove('animar-topo');
        baixo.classList.remove('animar-baixo');

        void topo.offsetWidth;

        topo.classList.add('animar-topo');
        baixo.classList.add('animar-baixo');

        secoes.forEach(secao =>  {
            secao.style.display = 'none';
        });
    
        setTimeout(() => {
                document.getElementById(telaDesejada).style.display = 'block';
            }, 100);
        
            return;
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

let intervaloJogo = null;

function iniciarNovoJogo() {
    pontos = 0;
    contador.textContent = pontos;
    mudarTela('jogo');

    if(intervaloJogo) clearInterval(intervaloJogo);

    intervaloJogo = setInterval(sortearE_DeslizarPokemon, 1000);
}

function sortearE_DeslizarPokemon() {
    let telaJogo = document.querySelector('#jogo');

    if (telaJogo.style.display !== 'block') return;

    let indiceAleatorio = Math.floor(Math.random() * listaPokemons.length);
    let pokemonEscolhido = listaPokemons[indiceAleatorio];

    let ladoAleatorio = Math.random() < 0.5 ? 'esquerda' : 'direita';

    let img = document.createElement('img');
    img.src = pokemonEscolhido.srcImg;
    img.classList.add('pokemon-spawn');

    if (ladoAleatorio === 'esquerda') {
        img.classList.add('spawn-esquerda');
    } else {
        img.classList.add('spawn-direita');
    }

    telaJogo.appendChild(img);

    setTimeout(() => {
        if (ladoAleatorio === 'esquerda') {
            img.style.transform = 'translateX(calc(50vw - 60px))'; 
        } else {
            img.style.transform = 'translateX(calc(-50vw + 60px))';
        }
    }, 50);

    setTimeout(() => {
        img.remove();
    }, 3500);
}

function retomarJogo() {
    if (telaAnterior != '')
        mudarTela(telaAnterior);
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
            iniciarNovoJogo();
        else if(telaPausa.style.display === 'block')
            retomarJogo();
    }
});


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