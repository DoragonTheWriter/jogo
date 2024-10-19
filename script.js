/*criar uma variável para cada elemento no gameboard, utilizando a palavra const*/

const persona = document.getElementById('mario');
const obstaculo = document.getElementById('pipe');
const rastro = document.getElementById('rastro');
const obstaculo2 = document.getElementById('heli');
const gameboard = document.getElementById('game-board');
const fundo = document.getElementById('fundo');
const obstaculo3 = document.getElementById('skull');
const nuvem = document.getElementById('clouds');
const pontuacao = document.getElementById('pontuacao');
const gameover = document.getElementById('game-over');
const tema = document.getElementById('tema');
const pulo = document.getElementById('pulo');
let fase = 0;
const display = document.getElementById('gameover');
const goodend = document.getElementById('goodend');
const victory = document.getElementById('vic');
//menu
function Start(){
    fase = 1;
    obstaculo.style.display='block';
    persona.style.display='block';
    nuvem.style.display='block';
    nuvem.classList.add('animanuvem');
    obstaculo.classList.add('animapipe');
    tema.play();
    document.getElementById("modal").style.display='none';
}

//Inicia o pulo
document.addEventListener('keydown', jump)
function jump(){
    pulo.play();
    persona.classList.add('jump');
    setTimeout(jumpout,500);
}
function jumpout(){
    persona.classList.remove('jump');
}
//inicia a função loop
const loop = setInterval(verifica,10);
let gameOver = false; 

function verifica() {
    if (gameOver) return; 

    const posicaoObstaculo1 = obstaculo.offsetLeft;
    const posicaoObstaculo2 = obstaculo2.offsetLeft; 
    const posicaoObstaculo3 = obstaculo3.offsetLeft;
    const personaPosition = +getComputedStyle(persona).bottom.replace('px', ''); 
    const posNuvem = nuvem.offsetLeft;

    
    const colisaoObstaculo1 = (posicaoObstaculo1 < 85 && posicaoObstaculo1 > 0 && personaPosition < 60);
    const colisaoObstaculo3 = (posicaoObstaculo3 < 85 && posicaoObstaculo3 > 0 && personaPosition < 60 && personaPosition < 200);

     
    const colisaoHelicoptero = (posicaoObstaculo2 < 85 && posicaoObstaculo2 > 0 && personaPosition > 100 && personaPosition < 200);

    if (colisaoObstaculo1 || colisaoHelicoptero || colisaoObstaculo3) {
        // Indicar que o jogo acabou
        gameOver = true;

        // Parar animações e elementos
        nuvem.style.animation = 'none';
        nuvem.style.left = posNuvem + 'px';
        obstaculo.style.animation = 'none';
        obstaculo.style.left = posicaoObstaculo1 + 'px';
        obstaculo2.style.animation = 'none'; // Parar helicóptero
        obstaculo2.style.left = posicaoObstaculo2 + 'px';
        obstaculo3.style.animation = 'none';
        obstaculo3.style.left = posicaoObstaculo3 + 'px';
        clearInterval(loop); // Parar loop do jogo

        // Parar animação do personagem
        persona.style.bottom = personaPosition + 'px';
        persona.style.animation = 'none';

        // Definir animações diferentes dependendo da fase
        if (fase == 1) {
            persona.src = 'ninja vic.gif';
            persona.style.width = '100px';
            persona.style.bottom = '-10px';
        } else if (fase == 2) {
            persona.src = 'codigos/imgs/f10dccfc82f6f3aa7388b2177729bee7.gif';
            persona.style.width = '150px';
        } else if (fase == 3) {
            persona.src = 'codigos/imgs/dbp6qj1-eaae0ccf-b87c-4509-895a-995cd53bafbe.gif';
            persona.style.width = '200px';
            persona.style.bottom = '-10px';

        }

        // Parar música tema e tocar música de game over
        tema.pause();
        musicaover.play();

        // Exibir a mensagem de game over na tela
        display.style.display = 'block';
        rastro.style.animation = 'none';

    } else {
        // Atualizar pontuação e verificar avanço de fase, se o jogo não acabou
        if (!gameOver && fase >= 1) {
            pontuacao.textContent = +pontuacao.textContent + 0.5;

            // Avançar fase ao atingir 200 pontos, até a fase 3
            if (+pontuacao.textContent >= 300 && fase < 3) {
                fase++;
                nfase(fase); // Chama nova fase
            }
            else if (+pontuacao.textContent >= 300 && fase == 3){
                nuvem.style.animation = 'none';
                nuvem.style.left = posNuvem + 'px';
                obstaculo.style.animation = 'none';
                obstaculo.style.left = posicaoObstaculo1 + 'px';
                obstaculo2.style.animation = 'none'; // Parar helicóptero
                obstaculo2.style.left = posicaoObstaculo2 + 'px';
                obstaculo3.style.animation = 'none';
                obstaculo3.style.left = posicaoObstaculo3 + 'px';
                obstaculo.style.display = 'none'; // Parar positional
                obstaculo2.style.display = 'none'; // Parar positional
                obstaculo3.style.display = 'none'; // Parar positional
                rastro.style.display = 'none';
                gameOver= true;
                clearInterval(loop); // Parar loop do jogo
        
                // Parar animação do personagem
                persona.style.bottom = personaPosition + 'px';
                persona.style.animation = 'none';
                persona.style.display = 'none';
                goodend.style.display = 'block';
                victory.style.display = 'block';
            }
        }
    }
}

function nfase(fases){
    // Exibir o número da fase
    textofase.style.display = 'block';
    textofase.innerHTML = `<p>Fase ${fase}</p>`;
        // Fase 2
        if (fases == 2) {
            textofase.style.display = 'block';
            textofase.innerHTML = '<p>Fase 2</p>';
            pontuacao.textContent = 0;
            fundo.src = 'codigos/imgs/background fase2.jpg';
            gameboard.style.borderBottom = '50px solid black';
            persona.src = 'codigos/imgs/oie_M3reoiffni4A.gif';
            persona.style.width = '200px';
            persona.style.bottom = '-18px';
    
            // Exibir e animar novos obstáculos
            obstaculo2.style.display = 'block';
            obstaculo2.classList.add('animaheli');
            // Exibir o rastro
            rastro.style.display = 'block';
            rastro.classList.add('animarastro');
            
            const loop = setInterval(verifica, 10); // Verifica colisões
        }
    
        // Fase 3
        else if (fases == 3) {
            textofase.style.display = 'block';
            textofase.innerHTML = '<p>Fase 3</p>';
            pontuacao.textContent = 0;
            fundo.src = 'codigos/imgs/background fase3.jpg';
            gameboard.style.borderBottom = '50px solid green';
            persona.src = 'codigos/imgs/7ea660_c288795d9f2d476a96d797c1ad6d1e4a~mv2.gif';
            persona.style.width = '300px';
            obstaculo3.src = 'codigos/imgs/download.gif'
            
            // Exibir e animar obstáculos
            obstaculo.src = 'codigos/imgs/slime.gif';
            obstaculo.style.width = '150px';
            obstaculo.style.bottom = '-25px';
            obstaculo3.style.display = 'block';
            obstaculo3.classList.add('animachuva');
            rastro.style.display = 'block';
            rastro.src = 'codigos/imgs/folha.gif';
            rastro.classList.add('animarastro');
    
            const loop = setInterval(verifica, 10); // Verifica colisões

            }
}

function restart(){
    location.reload();
}