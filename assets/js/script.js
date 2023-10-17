let telaDetalhes = true;
let pagina = 1;

    // Retorna a tela principal
function telaPrincipal () {

    resetaCampoDigitacao('Digite ID/NOME (Após escolher a operação)');
    const backgroundTela = document.getElementById ('confifuracoesTela');

    backgroundTela.innerHTML = `
    <div id="fundoTelaBuscaNome" class="bg-secondary text-white" style="width: 100%; height: 170vh;">
        <main id="main"></main>
    </div>
    `;


    const codMain = `
    <div id="conteinerNavegacao" class="mx-4">
        <div class="corpoPersonagens"></div>
        <div id="botoesNavegacao" class="position-absolute" style="bottom: -85vh; left: 90vh;"></div>
    <div>
    `
    const main = document.getElementById('main');

    main.innerHTML = codMain; 

        // Chama funções complementares, botoes de navegação, renderizar personagens na tela principal e adiciona a função de trocar de tela
    botoesTelaPrincipal( main, codMain );
    renderizaPersonagens( pagina );
    tipoOperacao();
    console.log('ok');
    telaDetalhes = false;

}

    
    // Botoes referentes a navegação entre as paginas dos personagens
async function botoesTelaPrincipal( main, codMain ) {

    codMain = `
    <div class="mx-4" style="height: 170vh; width: 190vh;">
    <div class="corpoPersonagens"></div>
        <div id="botoesNavegacao" class="position-absolute" style="bottom: -90vh; left: 90vh;">
            <button id="retornar" class=""><</button>
            <button id="restalrar" class="" style="width: 77px; align-text: center;">Restalrar</button>
            <button id="avancar">></button>
            <div id="separaBotoes" class="d-flex justify-content-center align-items-center"></div>
        </div>
    </div>
    `

    main.innerHTML = codMain;

    const retornar = document.getElementById('retornar');
    const atualizar = document.getElementById('avancar');
    const restalrar = document.getElementById('restalrar');
    const personagens = document.querySelector('.corpoPersonagens');

    atualizar.addEventListener('click', async function(){

        pagina += 1;

        if ( pagina > 42 ) {

            pagina = 1;
        }

        telaDetalhes = true;
        personagens.innerHTML = '';
        renderizaPersonagens( pagina );

    });

    retornar.addEventListener('click', async function(){

        pagina -= 1;

        if ( pagina < 1 ) {

            pagina = 42;
        }

        telaDetalhes = true;
        personagens.innerHTML = '';
        renderizaPersonagens( pagina );

    });

    restalrar.addEventListener('click', async function(){

        pagina = 1;
        telaDetalhes = true;
        personagens.innerHTML = '';
        renderizaPersonagens( pagina );
        
    });
}


    // Realiza a troca da tela incial para a tela de detalhes de personagens
async function telaPersonagemId ( tipoOperacao, valor ) {

    const titulo = document.getElementById ('titulo')
    const backgroundTela = document.getElementById ('confifuracoesTela');

    titulo.innerHTML = `                  
    <div class="w-75 mb-4" style="position-relative; margin-left: 650px;">
        <h1>Rick and Morty - Characters</h1>
    </div>
    `

        // Limpa ta TAG main
    backgroundTela.innerHTML = `
    <div class="bg-secondary text-white" style="width: 100%; height: 110vh;">
        <main id="main"></main>
    </div>
    `;

    const main = document.getElementById ('main');

        // Faz a requisição dos dados da API
    const dados = await buildDataPersonagem ( tipoOperacao, valor );
    console.log(dados);
        const codMain = `
                <div id="corpo" class="bg-dark position-relative" style="">
                    <div>
                        <div id="personagemDetalhesIMG" class="pt-5 d-flex justify-content-center align-items-center">
                        <img src="${ dados.image }" alt="" id="img"></div>
                        <div class="d-flex justify-content-center align-items-center">
                            <h1>${ dados.name }</h1>
                        </div>
                        <div class="position-relative mb-3 mt-3" style="left: 100px;">
                            Estado: ${ dados.status }<br>
                            Genero: ${ dados.gender }<br>
                            Especie: ${ dados.species }<br>
                            Origem: ${ dados.origin.name }<br>
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <h4>Localização:</h4>
                        </div>
                        <div class="d-flex justify-content-center align-items-center">    
                            ${ dados.location.name }
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <h3>Episodios de Ocorrencia:</h3>
                        </div>
                        <div class="" id="personagemDados3"></div>
                    </div>
                </div>
            </div>
        `

    main.innerHTML = codMain;

    const dadosPersonagem = document.getElementById('personagemDados3')
    const array = dados.episode; 
    array.forEach(elemento => {
 
            getEpisodio(elemento)
            .then(episodio => {
                dadosPersonagem.innerHTML += `
                <div id="episodiosOcorrencias" class="float-left ml-5 mr-1">
                    ${episodio.episode}
                </div>
                `
            });

    });

        // Adiciona um botao para retorno a tela principal
    botaoVoltar();

}


    // Realiza a troca da tela incial para a tela de ocorrencias de personagens com o mesmo nome
async function telaPersonagemNome( tipoOperacao, valor ) {

    const ocorrencias = await buildDataPersonagem ( tipoOperacao, valor );

    if ( ocorrencias == 0 && tipoOperacao == 2 ) {

        return 0;

    }

    const titulo = document.getElementById ('titulo')
    const backgroundTela = document.getElementById ('confifuracoesTela');

    titulo.innerHTML = `                  
    <div class="w-75 mb-4" style="position-relative; margin-left: 650px;">
        <h1>Rick and Morty - Characters</h1>
    </div>
    `

    backgroundTela.innerHTML = `
    <div id="fundoTelaBuscaNome" class="bg-secondary text-white" style="width: 100%; height: 200vh;">
        <main id="main"></main>
    </div>
    `;

    const background = document.getElementById ('fundoTelaBuscaNome');
    const main = document.getElementById ('main');

        // Limpa ta TAG main
    main.innerHTML = '<div id="corpo" class="mx-4" style="height: 200vh; width: 190vh;"></div>';

    const elementosTela = document.getElementById('corpo');

    ocorrencias.forEach( ocorrencia => {

        elementosTela.innerHTML += `
        <div id="conteinerPersonagemNome" class="ml-4 mt-3 mb-3 pl-3 pr-3 pt-3 pb-3 float-left bg-dark">
            <img alt="" src="${ocorrencia.image}">
            <div class="personagemNomeDados">
                <div class="d-flex justify-content-center align-items-center">${ocorrencia.name}</div>
                ID: ${ocorrencia.id}<br>
                Status: ${ocorrencia.status}<br>
            </div>
            <div class="personagemNomeDados2">
                Localização: ${ocorrencia.location.name}<br>
            </div>
        </div>
        `
    });

        // Adiciona um botao para retorno a tela principal
    botaoVoltar();

}


    // Retorna a busca pelo nome ou ID
function tipoOperacao(){

        // Cria vinculo com o formulario da tela principal
    const formulario = document.getElementById('formulario');

        // Cria a geração de um avendo ao clicar no botao procurar
    formulario.addEventListener ('submit', async function(event){

        event.preventDefault();

            // Coleta os dados do formulario
        const textoErro = document.getElementById('campoTexto');
        const tipoOperacao = document.getElementById('tipoBusca').value;
        const valor = document.getElementById('campoTexto').value;

            // Por meio do tipoOperacao eu filtro a busca por nome ou id
        if (tipoOperacao == 1) {
  
            if ( ( isNaN( valor ) ) || ( valor < 1 || valor > 826 )) {

                const mensagem = 'Digite apenas IDs validos...';
                resetaCampoDigitacao(mensagem);
                return;

            } else {

                const mensagem = 'Digite ID/NOME (Após escolher a operação)';
                resetaCampoDigitacao(mensagem);
                telaPersonagemId( tipoOperacao, valor );

            }

        } else {

            if ( isNaN(valor) ) {

                const mensagem = 'Digite ID/NOME (Após escolher a operação)';
                resetaCampoDigitacao(mensagem);
                telaPersonagemNome( tipoOperacao, valor );

            } else {

                const mensagem = 'Digite apenas NOMEs validos...';
                resetaCampoDigitacao(mensagem);
                return;

            }
            

        }

        return;

    });
}


    // Retorna os dados de um unico personagem da API
async function buildDataPersonagem ( tipoOperacao, valor ) {

        let resultado = '';
        let resposta = '';

        if (tipoOperacao == 1) {

                // recebendo dados da api, a tranformando em .json e coletando os dados
            resultado = await fetch(`https://rickandmortyapi.com/api/character/${valor}`);
            return await resultado.json();

        } else {

            resultado = await fetch(`https://rickandmortyapi.com/api/character?name=${valor}`);
            
            if (resultado.status == 200) {

                const res = (await resultado.json()).results;
                return res;

            } else {

                 alert('Sem correspondencia...');
                return 0;
            }

        }
}


    // Retorna os dados de varios personagens da API
async function builDataPersonagens ( page ) {

    const resposta = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const personagens = await resposta.json();

    return personagens.results;

}


    //  Renderiza as imagens dos perosnagens na tela inicial
async function renderizaPersonagens( pagina ) {

    if (telaDetalhes) {

        const page = document.getElementById('separaBotoes');
        const conteinerPersonagens = document.querySelector('.corpoPersonagens');

        page.innerHTML = `
            <pagina>${pagina}</pagina>
        `

        async function renderiza ({ personagens }) {

            personagens.forEach (( personagem ) => {

                return conteinerPersonagens.innerHTML += `
                <div class="ml-4 mt-3 mb-3 pl-3 pr-3 pt-3 pb-3 float-left bg-dark">
                    <img src="${personagem.image}" alt="" />
                    <div class="d-flex justify-content-center align-items-center">${personagem.name}</div>
                </div>
                `;
            });

        }

        async function mostraPersonagens() {

            const personagens = await builDataPersonagens( pagina );
            renderiza({personagens});

        }

        mostraPersonagens();

    }
     
}


    // Adiciona um botao que tem a finalidade de "retornar a tela principal"
async function botaoVoltar () {

    const voltar = document.getElementById ('areaBotoesFuncionalidades');

    voltar.innerHTML = `
            <button id="voltar" class="position-relative btn btn-light">Voltar</button>
    `

    const botao = document.getElementById('voltar');

    botao.addEventListener('click', function(){

        voltar.innerHTML = '';
        telaDetalhes = true;
        telaPrincipal();

    });

}


    // Reseta os campos de digitação caso haja um erro na especificação do nome ou id
function resetaCampoDigitacao ( mensagem ) {

    const textoErro = document.getElementById('campoTexto');
    textoErro.value = '';
    textoErro.placeholder = mensagem;

}


    // Realiza uma request sobre determinado episodio
async function getEpisodio( link ) {

    const response = await fetch(link);
    const res = await (response).json();
    return res; 
}

telaPrincipal();