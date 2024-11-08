// Definindo as variáveis do jogo
let cookieCount = 0;
let cookiesPerClick = 1;
let upgrade1Cost = 50;
let upgrade2Cost = 200;
let upgrade1Enabled = false;
let upgrade2Enabled = false;

// Selecionando os elementos do DOM
const cookieButton = document.getElementById("cookie");
const cookieCountElement = document.getElementById("cookie-count");
const upgrade1Button = document.getElementById("upgrade1");
const upgrade2Button = document.getElementById("upgrade2");

// Função para atualizar a contagem de cookies no display
function updateCookieCount() {
  cookieCountElement.textContent = `Cookies: ${cookieCount}`;
  checkUpgrades();
}

// Função para lidar com o clique no cookie
cookieButton.addEventListener("click", () => {
  cookieCount += cookiesPerClick;
  updateCookieCount();
});

// Função para ativar o primeiro upgrade (Farmer)
upgrade1Button.addEventListener("click", () => {
  if (cookieCount >= upgrade1Cost) {
    cookieCount -= upgrade1Cost;
    cookiesPerClick += 2;  // Aumento nos cookies por clique
    upgrade1Cost = Math.floor(upgrade1Cost * 1.5); // Aumento no custo do upgrade
    upgrade1Enabled = true;
    upgrade1Button.textContent = `Farmer Purchased!`;
    updateCookieCount();
  }
});

// Função para ativar o segundo upgrade (Factory)
upgrade2Button.addEventListener("click", () => {
  if (cookieCount >= upgrade2Cost) {
    cookieCount -= upgrade2Cost;
    cookiesPerClick += 5;  // Aumento nos cookies por clique
    upgrade2Cost = Math.floor(upgrade2Cost * 1.5); // Aumento no custo do upgrade
    upgrade2Enabled = true;
    upgrade2Button.textContent = `Factory Purchased!`;
    updateCookieCount();
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
}

// Atualiza a contagem inicial de cookies
updateCookieCount();
