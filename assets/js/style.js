let player1Health = 100;
let player2Health = 100;
let player1SpecialAttackUsed = false;
let player2SpecialAttackUsed = false;

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const player1HealthDisplay = document.getElementById('player1-health');
const player2HealthDisplay = document.getElementById('player2-health');
const player1AttackBtn = document.getElementById('player1-attack');
const player1SpecialAttackBtn = document.getElementById('player1-special-attack');
const gameMessage = document.getElementById('game-message');
const restartBtn = document.getElementById('restart-button');

let player1Position = 0;
let player2Position = 0;

player1AttackButton.addeventListener('click', () => player1AttackButton('player1'));

player1SpecialAttackButton.addEventListener('click', () => specialAttack('player1'));

restartButton.addEventListener('click', restartGame);

function attack(player) {
    if (player === 'player1') {
        const damage = getRandomDamage(10); 
        player2Health -= damage;
        player2HealthDisplay.textContent = `Health: ${player2Health}`;
        moveCharacter('player1');
        if (player2Health <= 0) {
            endGame('Player 1');
        } else {
            gameMessage.textContent = "CPU's turn";
            disablePlayerControls(true);
            setTimeout(cpuTurn, 1000); 
        }
    }
}
