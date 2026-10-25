function mudarTela(telaDesejada){

    let secoes = document.querySelectorAll('.tela');

    secoes.forEach(secao =>  {
        secao.style.display = 'none';
    })

    document.getElementById(telaDesejada).style.display = 'block';
}