document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8081/getUserId')
    .then(response => response.json())
    .then(data2 => loadHTMLTable(data2['data2']));   
    
   })


   function loadHTMLTable(data2){

    var idUser = data2[0].id;  
    console.log(data2[0].id);
    document.getElementById('id_jogador').value = idUser;



}
const date = new Date();

let day = date.getDate();

const grid = document.querySelector('.grid'); /*SELECIONA TODOS SEUS FILHOS*/ 

const timer = document.querySelector('.timer');  // 

const pontuacao = document.querySelector('.pontuacao');
let pont = 0;

let timerend = 0;


/*ARRAY PARA ARMAZENAR AS IMAGENS*/ 
const numbers = [
    'numero1Carta',
    'numero2Carta',
    'numero3Carta',
    'numero4Carta',
    'numero5Carta',
    'numero6Carta',
];

/*FUNÇÃO PARA CRIAR OS ELEMENTOS AUTOMATICAMENTE*/
const createElement = (tag, className) => {
    const element = document.createElement(tag);    /*PARA O JS CRIAR ELEMENTOS HTML*/
    element.className = className;                 /*ASSOCIAR A DIV COM SUA CLASSE (div card com classe card) */
    return element;
}

let firstCard = '';
let secondCard = '';

/*FUNÇÃO DE VERIFICAÇÃO DE FIM DE JOGO*/ 
const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card'); /*PROCURA TODAS AS CARTAS QUE TEM '.disable-card' ATIVADO, SALVA TODOS OS ELEMENTOS QUE TEM 'disable-card' NO ARRAY 'disableCards'*/

    if(disableCards.length == 12){

        timerend = `${timer.innerHTML}`;

        console.log (timerend);

       clearInterval(this.loop);

       getAndSetText(); /*Define o valor da pontuacao para o formulario NN APAGA FOI O LU Q FEZ*/


        setTimeout(() => { /*DELAY PARA DESVIRAR AS CARTAS */

        openForm();

        }, 200);
    }
}

function getAndSetText(){
    document.getElementById('setText').value= pont;
    document.getElementById('modo').value= "Numeros";
    document.getElementById('timer').value= timerend;
    document.getElementById('dia').value= day + "-11";
    }




/*VERIFICAÇÃO DE PARES */
const checkCards = () => {
    const firstNumber = firstCard.getAttribute('data-number'); /*FUNÇÃO PARA PEGAR O ATRIBUTO DA PRIMEIRA CARTA*/ 
    const secondNumber = secondCard.getAttribute('data-number');

    if(firstNumber == secondNumber){

        animation();

        firstCard.firstChild.classList.add('disable-card');   /*DEIXA A CARTA DESABILITADA (escura)*/ 
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        pont = +pontuacao.innerHTML;
        pontuacao.innerHTML = pont += 3;

        checkEndGame();

    }
    else{
        setTimeout(() => { /*DELAY PARA DESVIRAR AS CARTAS */

            firstCard.classList.remove('reveal-card'); /*REMOVER A CLASSE 'reavel-card' DA PRIMEIRA CARTA (desvirar a carta)*/
            secondCard.classList.remove('reveal-card'); 

            firstCard = '';
            secondCard = '';

            if(pont > 0){
                pontuacao.innerHTML = pont += -1;
            }
            else{
                pontuacao.innerHTML = pont = pont;
            }

        }, 700);
    }
}

/*FUNÇÃO PARA REVELAR A CARTA QUANDO CLICA (é o que vai acontecer) */

const revealCard = ({target}) =>{
    if(target.parentNode.className.includes("reveal-card")){
        return;
    }
    if(firstCard == "" && !target.parentNode.className.includes("grid")){
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
        console.log(target.parentNode)
    }else if(secondCard === "" && !target.parentNode.className.includes("grid")){
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;
        console.log(target.parentNode)

        checkCards();
    }
}

// const revealCard = ({target}) => { /*target: diz o alvo em que você clicou*/

//     if(target.parentNode.className.includes('reveal-card')){ /*Se o card que você clicou já foi atribuido o reavel-card (se vc clicou em uma carta não pode clicar de novo)*/
//         return;
//     }  

//     /*RESTRIÇÃO DE QUANTAS CARTAS POSSO CLICAR E SALVAMENTO DAS CARTAS NAS VARIÁVEIS */
//     if(firstCard == ''){
//         target.parentNode.classList.add('reveal-card'); /*parentNode: chamar o pai da tag, adiciona uma classList(acessa a lista de classes do css), 'reavel-card': nome da classe*/ 
//         firstCard = target.parentNode;
//     } 
//     else if(secondCard == '') {
//         target.parentNode.classList.add('reveal-card');
//         secondCard = target.parentNode;

//         checkCards();
//     }
// }


/*FUNÇÃO PARA CRIAR AS CARTAS AUTOMATICAMENTE*/ 
const createCard = (number) =>{
    const card = createElement('div', 'card');     /*RECEBE 2 PARÂMETROS*/     
    const front = createElement('div', 'face front'); 
    const back = createElement('div', 'face back'); 

    front.style.backgroundImage = `url('../images/gameNumbers/${number}.png')`; /*PARA NÃO REPETIR IMAGENS IGUAIS, ` e ${}: PARA CONSEGUIR PASSSAR VARIÁVEIS DENTRO DE STRING */ 

    card.appendChild(front);  /* DAR UM FILHO PARA A DIV (colocar uma div dentro da outra / no caso front está dentro do card)*/
    card.appendChild(back);

    card.addEventListener('click', revealCard);  /*EVENTO DO CARD, parâmetro de click e o que vai acontecer*/
    card.setAttribute('data-number', number) /*CONFIGURA UM ATRIBUTO DE ACORDO COM CADA CARTA (no caso é o nome dela que nós demos no array)*/ 

    return card;
}

/*FUNÇÃO PARA CARREGAR O JOGO*/ 
const loadGame = () => {

    const duplicateNumbers = [...numbers, ...numbers];  /*COLOCAR UMA LISTA DENTRO DA OUTRA E DUPLICAR*/ 

    const shuffledArray = duplicateNumbers.sort(() => Math.random() - 0.5); /*RANDOMIZAR AS CARTAS, sort: precisa de números positivos ou negativos para randomizar, Math.random(): gera somente números entre 0 e 1 (mas não chega a ser 1), -0.5: para conseguir gerar números negativos */

    shuffledArray.forEach((number) => {    /*forEach: PARA PERCORRER TODOS OS ELEMENTOS DO ARRAY*/

        const card = createCard(number);
        grid.appendChild(card);

    });  
}

// TIMER
const startTimer = () => {
    
    // LOOPING
    this.loop = setInterval(() => {
        // innerHTML: retorna o conteúdo de um elemento HTML
        const currentTime = +timer.innerHTML; // +: converte a string em int para poder fazer cálculos
        timer.innerHTML = currentTime + 1;

    }, 1000); // 1000 = 1 seg
}

const animation = () => {

    document.getElementById("alzhyT").hidden = true;
    document.getElementById("alzhyS").hidden = false; 

    setTimeout(() => {  
        document.getElementById("alzhyH").hidden = false;
        document.getElementById("alzhyS").hidden = true;

            setTimeout(() => { 
                document.getElementById("alzhyH").hidden = true;
                document.getElementById("alzhyS").hidden = false;

                setTimeout(() => { 
                    document.getElementById("alzhyH").hidden = false;
                    document.getElementById("alzhyS").hidden = true;

                    setTimeout(() => { 
                        document.getElementById("alzhyT").hidden = false;
                        document.getElementById("alzhyH").hidden = true;
                        
                }, 500);
                    
            }, 500);
        }, 500);
    }, 500);
}

//LÓGICA DO OVERLAY
function openForm(){
    document.getElementById("myOverlay").style.display = "block";
}

function closeForm(){
    document.getElementById("myOverlay").style.display = "none";
}

// Quando carregar todos os elementos, inicia o jogo
window.onload = () => {
    startTimer();
    loadGame();
}


const btsaveg = document.getElementById(id= "savegame");

btsaveg.onclick = function(){
    const pontuacao = document.getElementById("setText").value;
    const modo_jogo = "Numeros";
    const timer = document.getElementById("timer").value;
    const id_jogador = document.getElementById("id_jogador").value;
    const dia = document.getElementById("dia").value;

  
    fetch('http://localhost:8081/add', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ timer : timer, modo_jogo : modo_jogo, pontuacao : pontuacao, id_jogador : id_jogador, dia : dia})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
  }
  
  function insertRowIntoTable(data){
    
  }




const btsaveg2 = document.getElementById(id= "savegame2");

btsaveg2.onclick = function(){
  const pontuacao = document.getElementById("setText").value;
  const modo_jogo = "Numeros";
  const timer = document.getElementById("timer").value;
  const id_jogador = document.getElementById("id_jogador").value;
  const dia = document.getElementById("dia").value;


  fetch('http://localhost:8081/add', {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ timer : timer, modo_jogo : modo_jogo, pontuacao : pontuacao, id_jogador : id_jogador, dia : dia})
  })
  .then(response => response.json())
  .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data){
  
}





