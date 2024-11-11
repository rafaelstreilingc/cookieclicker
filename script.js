// Variáveis para controle do jogo
let cookies = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 0;
let machines = 0;
let employees = 0;

// Elementos HTML
const cookieElement = document.getElementById("cookie");
const counterElement = document.getElementById("counter");
const shopBtn = document.getElementById("shopBtn");
const shopPopup = document.getElementById("shopPopup");
const closeShop = document.getElementById("closeShop");
const cheatBtn = document.getElementById("cheatBtn");

// Função para atualizar o contador de cookies na tela
function updateCounter() {
    counterElement.textContent = `Cookies: ${cookies}`;
}

// Função para iniciar a geração automática de cookies (através de máquinas e funcionários)
function startAutoGeneration() {
    setInterval(function() {
        cookies += cookiesPerSecond;
        updateCounter();
    }, 1000); // Atualiza a cada 1 segundo
}

// Abre o pop-up da loja
shopBtn.addEventListener("click", function() {
    shopPopup.style.display = "block"; // Mostra o pop-up da loja
});

// Fecha o pop-up da loja
closeShop.addEventListener("click", function() {
    shopPopup.style.display = "none"; // Esconde o pop-up
});

// Evento de clique no emoji de cookie
cookieElement.addEventListener("click", function() {
    cookies += cookiesPerClick;
    updateCounter();
});

// Ajustando os preços das máquinas e a quantidade de cookies gerados
const machinesPrice = [2000, 4000, 8000, 16000, 32000]; // Preços das máquinas mais altos
const machinesCookiesPerSecond = [10, 20, 40, 80, 160]; // Quantidade de cookies por segundo por máquina

// Função para comprar máquinas e funcionários (Agora geram cookies automaticamente)
document.querySelectorAll('.item').forEach((item, index) => {
    item.addEventListener("click", function() {
        const price = parseInt(item.getAttribute("data-price"));
        const type = item.getAttribute("data-type");

        // Verifica se o jogador tem cookies suficientes
        if (cookies >= price) {
            cookies -= price;
            if (type === "machine") {
                machines++;
                cookiesPerSecond += machinesCookiesPerSecond[index]; // Máquinas agora geram mais cookies
            } else if (type === "employee") {
                employees++;
                cookiesPerSecond += 2; // Funcionários continuam gerando 2 cookies por segundo
            }

            item.textContent = `${item.textContent.split(" (")[0]} (Comprado)`; // Atualiza o texto do botão
            updateCounter();
        } else {
            alert("Você não tem cookies suficientes para comprar este item.");
        }
    });
});

// Função para aplicar o código de cheat
function applyCheatCode(code) {
    if (code === "C00KIE") {
        const cookiesToAdd = parseInt(prompt("Quantos cookies você quer adicionar?", "1000"));
        if (isNaN(cookiesToAdd) || cookiesToAdd <= 0) {
            alert("Por favor, insira um número válido.");
        } else {
            cookies += cookiesToAdd;
            updateCounter();
        }
    } else if (code === "VOVO") {
        const boost = 2; // 200% de boost
        cookiesPerSecond *= boost; // Aumenta a geração de cookies por segundo em 200%
        alert("Você ganhou um boost de 200% de cookies por segundo graças à Vovó!");
    } else {
        alert("Código inválido!");
    }
}

// Função para abrir o pop-up de códigos
function openCheatCodePopup() {
    const code = prompt("Digite o código secreto:");
    if (code) {
        applyCheatCode(code.toUpperCase()); // Converte o código para maiúsculas
    }
}

// Estilo para o botão de código no canto inferior direito
cheatBtn.style.position = "fixed";
cheatBtn.style.bottom = "80px"; // Coloca o botão um pouco acima do botão da loja
cheatBtn.style.right = "20px";
cheatBtn.style.zIndex = "100";  // Garante que o botão fique em cima da loja

cheatBtn.addEventListener("click", openCheatCodePopup);

// Inicia a geração automática de cookies (máquinas e funcionários)
startAutoGeneration();
