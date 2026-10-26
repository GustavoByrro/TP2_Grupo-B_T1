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