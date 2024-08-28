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

player1AttackBtn.addEventListener('click', () => attack('player1'));

player1SpecialAttackBtn.addEventListener('click', () => specialAttack('player1'));

restartBtn.addEventListener('click', restartGame);

function showDamage(player, damage) {
    const damageIndicator = document.createElement('div');
    damageIndicator.className = 'damage-indicator';
    damageIndicator.textContent = '${damage}';

    const playerElement = player === 'player1' ? player1 : player2;
    playerElement.appendChild(damageIndicator);
    
    setTimeout(() => {
        damageIndicator.remove();
    }, 1000);
}


function attack(player) {
    if (player === 'player1') {
        const damage = getRandomDamage(15); 
        player2Health -= damage;
        player2HealthDisplay.textContent = `Health: ${player2Health}`;
        moveCharacter('player1');
        showDamage('player2', damage); // Show damage near player 2
        gameMessage.textContent = `Player 1 attacks! Damage dealt: ${damage}`;
        if (player2Health <= 0) {
            endGame('Player 1');
        } else {
            gameMessage.textContent = "CPU's turn";
            disablePlayerControls(true);
            setTimeout(cpuTurn, 1000); 
        }
    }
}

function specialAttack(player) {
    if (player === 'player1' && !player1SpecialAttackUsed) {
        const damage = getRandomDamage(20) + 10;
        player2Health -= damage;
        player2HealthDisplay.textContent = `Health: ${player2Health}`;
        moveCharacter('player1');
        showDamage('player2', damage); 
        gameMessage.textContent = `Player 1 uses a Special Attack! Damage dealt: ${damage}`;
        player1SpecialAttackUsed = true;
        player1SpecialAttackBtn.disabled = true;
        console.log(player1SpecialAttackBtn.disabled);
        if (player2Health <= 0) {
            endGame('Player 1');
        } else {
            gameMessage.textContent = "CPU's turn";
            disablePlayerControls(true);
            setTimeout(cpuTurn, 1000); 
        }
    }
}
function cpuTurn() {
    if (Math.random() < 0.3 && !player2SpecialAttackUsed) {
        cpuSpecialAttack();
    } else {
        cpuAttack();
    }
}

function cpuAttack() {
    const damage = getRandomDamage(15); 
    player1Health -= damage;
    player1HealthDisplay.textContent = `Health: ${player1Health}`;
    moveCharacter('player2');
    showDamage('player1', damage); 
    gameMessage.textContent = `CPU attacks! Damage dealt: ${damage}`;
    if (player1Health <= 0) {
        endGame('CPU');
    } else {
        gameMessage.textContent = "Player 1's turn";
        disablePlayerControls(false);
    }
}

function cpuSpecialAttack() {
    const damage = getRandomDamage(20) + 10; 
    player1Health -= damage;
    player1HealthDisplay.textContent = `Health: ${player1Health}`;
    moveCharacter('player2');
    showDamage('player1', damage); 
    player2SpecialAttackUsed = true;
    gameMessage.textContent = `CPU uses a Special Attack! Damage dealt: ${damage}`;
    gameMessage.textContent = "CPU used a special attack!";
    if (player1Health <= 0) {
        endGame('CPU');
    } else {
        setTimeout(() => {
            gameMessage.textContent = "Player 1's turn";
            disablePlayerControls(false);
        }, 1000);
    }
}

function getRandomDamage(max) {
    return Math.floor(Math.random() * max) + 1;
}

function moveCharacter(player) {
    const moveDistance = 20;
    if (player === 'player1') {
        player1Position += moveDistance;
        player1.style.transform = `translateX(${player1Position}px)`;
        setTimeout(() => {
            player1Position -= moveDistance;
            player1.style.transform = `translateX(${player1Position}px)`;
        }, 300);
    } else if (player === 'player2') {
        player2Position -= moveDistance;
        player2.style.transform = `translateX(${player2Position}px)`;
        setTimeout(() => {
            player2Position += moveDistance;
            player2.style.transform = `translateX(${player2Position}px)`;
        }, 300);
    }
}

function disablePlayerControls(disable) {
    player1AttackBtn.disabled = disable;
    player1SpecialAttackBtn.disabled = disable;
}


function endGame(winner) {
    gameMessage.textContent = `${winner} wins!`;
    disablePlayerControls(true);
    restartBtn.classList.remove('hidden');
}


function restartGame() {
    player1Health = 100;
    player2Health = 100;
    player1SpecialAttackUsed = false;
    player2SpecialAttackUsed = false;
    player1HealthDisplay.textContent = `Health: ${player1Health}`;
    player2HealthDisplay.textContent = `Health: ${player2Health}`;
    disablePlayerControls(false);
    gameMessage.textContent = "Player 1's turn";
    player1Position = 0;
    player2Position = 0;
    player1.style.transform = `translateX(${player1Position}px)`;
    player2.style.transform = `translateX(${player2Position}px)`;
    restartBtn.classList.add('hidden');
}