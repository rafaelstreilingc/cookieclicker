// Definindo as variáveis do jogo
let cookieCount = 0;
let cookiesPerClick = 1;
let energy = 100; // Energia inicial
let maxEnergy = 100; // Energia máxima
let energyConsumption = 10; // Quantidade de energia consumida por clique (inicialmente 10%)
let energyRegenerationRate = 1; // Regeneração de energia por segundo
let upgrade1Cost = 50;
let upgrade2Cost = 200;
let upgrade3Cost = 100; // Custo para o upgrade de aumentar a energia
let upgrade4Cost = 100; // Custo para o upgrade de padeiro (Farmer)
let upgrade1Enabled = false;
let upgrade2Enabled = false;
let upgrade3Enabled = false;
let upgrade4Enabled = false; // Controle de estado do upgrade do padeiro (Farmer)

// Selecionando os elementos do DOM
const cookieButton = document.getElementById("cookie");
const cookieCountElement = document.getElementById("cookie-count");
const energyStatusElement = document.getElementById("energy-status");
const energyRegenerationElement = document.getElementById("energy-regeneration");
const upgrade1Button = document.getElementById("upgrade1");
const upgrade2Button = document.getElementById("upgrade2");
const upgrade3Button = document.getElementById("upgrade3");
const upgrade4Button = document.getElementById("upgrade4"); // Novo upgrade

// Função para atualizar a contagem de cookies e a energia no display
function updateGameStatus() {
  cookieCountElement.textContent = `Cookies: ${cookieCount}`;
  energyStatusElement.textContent = `Energia: ${energy}%`;
  energyRegenerationElement.textContent = `Energia regenerando... ${energy}/${maxEnergy}`;

  checkUpgrades();
}

// Função para lidar com o clique no cookie
cookieButton.addEventListener("click", () => {
  if (energy >= energyConsumption) {
    cookieCount += cookiesPerClick;
    energy -= energyConsumption;
    updateGameStatus();
  }
});

// Função para ativar o primeiro upgrade (Farmer)
upgrade1Button.addEventListener("click", () => {
  if (cookieCount >= upgrade1Cost) {
    cookieCount -= upgrade1Cost;
    cookiesPerClick += 2;
    upgrade1Cost = Math.floor(upgrade1Cost * 1.5);
    upgrade1Enabled = true;
    upgrade1Button.textContent = `Fazendeiro Comprado!`;
    updateGameStatus();
  }
});

// Função para ativar o segundo upgrade (Factory)
upgrade2Button.addEventListener("click", () => {
  if (cookieCount >= upgrade2Cost) {
    cookieCount -= upgrade2Cost;
    cookiesPerClick += 5;
    upgrade2Cost = Math.floor(upgrade2Cost * 1.5);
    upgrade2Enabled = true;
    upgrade2Button.textContent = `Fábrica Comprada!`;
    updateGameStatus();
  }
});

// Função para ativar o upgrade de aumento de energia
upgrade3Button.addEventListener("click", () => {
  if (cookieCount >= upgrade3Cost) {
    cookieCount -= upgrade3Cost;
    maxEnergy += 50; // Aumenta o limite máximo de energia
    upgrade3Cost = Math.floor(upgrade3Cost * 1.5); // Aumenta o custo do upgrade
    upgrade3Enabled = true;
    upgrade3Button.textContent = `Energia Máxima Aumentada!`;
    updateGameStatus();
  }
});

// Função para ativar o upgrade do Padeiro (Farmer) - Reduz consumo de energia
upgrade4Button.addEventListener("click", () => {
  if (cookieCount >= upgrade4Cost) {
    cookieCount -= upgrade4Cost;
    energyConsumption = Math.max(energyConsumption - 2, 2); // Reduz o consumo de energia por clique (não pode ir abaixo de 2%)
    upgrade4Cost = Math.floor(upgrade4Cost * 1.5); // Aumenta o custo do upgrade
    upgrade4Enabled = true;
    upgrade4Button.textContent = `Padeiro Comprado! Consumo de Energia Reduzido!`;
    updateGameStatus();
  }
});

// Função para verificar se os upgrades estão habilitados
function checkUpgrades() {
  if (cookieCount >= upgrade1Cost && !upgrade1Enabled) {
    upgrade1Button.disabled = false;
  } else {
    upgrade1Button.disabled = true;
  }

  if (cookieCount >= upgrade2Cost && !upgrade2Enabled) {
    upgrade2Button.disabled = false;
  } else {
    upgrade2Button.disabled = true;
  }

  if (cookieCount >= upgrade3Cost && !upgrade3Enabled) {
    upgrade3Button.disabled = false;
  } else {
    upgrade3Button.disabled = true;
  }

  if (cookieCount >= upgrade4Cost && !upgrade4Enabled) {
    upgrade4Button.disabled = false;
  } else {
    upgrade4Button.disabled = true;
  }
}

// Função para regenerar energia automaticamente
function regenerateEnergy() {
  if (energy < maxEnergy) {
    energy += energyRegenerationRate;
    if (energy > maxEnergy) energy = maxEnergy;
    updateGameStatus();
  }

  // Habilita o botão de clique quando a energia estiver disponível
  if (energy >= energyConsumption) {
    cookieButton.disabled = false;
  } else {
    cookieButton.disabled = true;
  }
}

// Chama a regeneração de energia a cada segundo
setInterval(regenerateEnergy, 1000);

// Atualiza o status inicial do jogo
updateGameStatus();
