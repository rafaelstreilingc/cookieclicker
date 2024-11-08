// Variáveis de controle
let cookieCount = 0;
let upgradeCount = 0;
let autoCount = 0;
let energy = 100;
let cookiesPerClick = 1;
let autoGenerationRate = 1;
let upgradeCost = 50;
let autoCost = 100;
let dailyChallengeCompleted = false;

// Elementos HTML
const cookieCountElement = document.getElementById('cookieCount');
const upgradeCountElement = document.getElementById('upgradeCount');
const farmerCountElement = document.getElementById('farmerCount');
const energyElement = document.getElementById('energy');
const progressElement = document.getElementById('progress');
const welcomeMessage = document.getElementById('welcomeMessage');
const challengeText = document.getElementById('challengeText');
const dailyChallengeButton = document.getElementById('dailyChallengeButton');

// Verifica se há dados salvos
if(localStorage.getItem("cookieCount")) {
    cookieCount = parseInt(localStorage.getItem("cookieCount"));
    upgradeCount = parseInt(localStorage.getItem("upgradeCount"));
    autoCount = parseInt(localStorage.getItem("autoCount"));
    energy = parseInt(localStorage.getItem("energy"));
    dailyChallengeCompleted = localStorage.getItem("dailyChallengeCompleted") === 'true';
}

// Função de clique no cookie
function clickCookie() {
    if(energy > 0) {
        cookieCount += cookiesPerClick;
        energy -= 1;
        updateProgressBar();
        updateEnergyBar();
    } else {
        alert('Você precisa descansar um pouco! A energia está no fim.');
    }
    updateGame();
}

// Função para comprar upgrades
function buyUpgrade() {
    if(cookieCount >= upgradeCost) {
        cookieCount -= upgradeCost;
        upgradeCount += 1;
        cookiesPerClick += 1;
        upgradeCost = Math.floor(upgradeCost * 1.5);
        updateGame();
    } else {
        alert('Você não tem cookies suficientes!');
    }
}

// Função para comprar assistentes automáticos
function buyAutoGenerator() {
    if(cookieCount >= autoCost) {
        cookieCount -= autoCost;
        autoCount += 1;
        autoCost = Math.floor(autoCost * 1.5);
        updateGame();
    } else {
        alert('Você não tem cookies suficientes!');
    }
}

// Função para gerar cookies automaticamente
function autoGenerateCookies() {
    if(energy > 0) {
        cookieCount += autoCount * autoGenerationRate;
        updateGame();
    }
}

// Atualiza a barra de progresso
function updateProgressBar() {
    const progress = (cookieCount / 1000) * 100;
    progressElement.style.width = `${progress}%`;
}

// Atualiza a barra de energia
function updateEnergyBar() {
    const energyPercent = energy;
    energyElement.style.width = `${energyPercent}%`;
}

// Função para completar o desafio diário
function completeDailyChallenge() {
    if(!dailyChallengeCompleted) {
        cookieCount += 500;
        dailyChallengeCompleted = true;
        challengeText.textContent = "Desafio Completo! Você ganhou 500 cookies!";
        localStorage.setItem("dailyChallengeCompleted", 'true');
        updateGame();
    } else {
        alert('Você já completou o desafio de hoje!');
    }
}

// Função de atualização geral do jogo
function updateGame() {
    localStorage.setItem("cookieCount", cookieCount);
    localStorage.setItem("upgradeCount", upgradeCount);
    localStorage.setItem("autoCount", autoCount);
    localStorage.setItem("energy", energy);
    
    cookieCountElement.textContent = cookieCount;
    upgradeCountElement.textContent = upgradeCount;
    farmerCountElement.textContent = autoCount;
    updateEnergyBar();
}

// Função de reiniciar o jogo
function resetGame() {
    localStorage.clear();
    location.reload();
}

// Intervalo para gerar cookies automaticamente
setInterval(autoGenerateCookies, 1000);
