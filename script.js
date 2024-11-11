// Variáveis para controle do jogo
let cookies = 0;  // Armazena o número de cookies do jogador
let cookiesPerClick = 1;  // Número de cookies gerados por clique no emoji de cookie
let cookiesPerSecond = 0;  // Número de cookies gerados automaticamente por segundo
let machines = 0;  // Quantidade de máquinas compradas
let employees = 0;  // Quantidade de funcionários contratados

// Elementos HTML para interação
const cookieElement = document.getElementById("cookie");  // Emoji de cookie (elemento clicável)
const counterElement = document.getElementById("counter");  // Contador de cookies na tela
const shopBtn = document.getElementById("shopBtn");  // Botão para abrir a loja
const shopPopup = document.getElementById("shopPopup");  // Pop-up da loja
const closeShop = document.getElementById("closeShop");  // Botão para fechar o pop-up da loja
const cheatBtn = document.getElementById("cheatBtn");  // Botão para abrir o código de cheat

// Função para atualizar o contador de cookies na tela
function updateCounter() {
    counterElement.textContent = `Cookies: ${cookies}`;  // Atualiza o texto do contador com o valor atual de cookies
}

// Função para iniciar a geração automática de cookies (através de máquinas e funcionários)
function startAutoGeneration() {
    setInterval(function() {
        cookies += cookiesPerSecond;  // Aumenta os cookies gerados automaticamente
        updateCounter();  // Atualiza o contador na tela
    }, 1000); // Atualiza a cada 1 segundo
}

// Abre o pop-up da loja quando o botão da loja é clicado
shopBtn.addEventListener("click", function() {
    shopPopup.style.display = "block";  // Exibe o pop-up da loja
});

// Fecha o pop-up da loja quando o botão de fechar é clicado
closeShop.addEventListener("click", function() {
    shopPopup.style.display = "none";  // Esconde o pop-up da loja
});

// Evento de clique no emoji de cookie: aumenta o número de cookies por clique
cookieElement.addEventListener("click", function() {
    cookies += cookiesPerClick;  // Aumenta os cookies com base na quantidade de cookies por clique
    updateCounter();  // Atualiza o contador na tela
});

// Ajustando os preços das máquinas e a quantidade de cookies gerados
const machinesPrice = [2000, 4000, 8000, 16000, 32000];  // Preços das máquinas em ordem crescente
const machinesCookiesPerSecond = [10, 20, 40, 80, 160];  // Quantidade de cookies gerados por segundo por máquina

// Função para comprar máquinas e funcionários, que geram cookies automaticamente
document.querySelectorAll('.item').forEach((item, index) => {
    item.addEventListener("click", function() {
        const price = parseInt(item.getAttribute("data-price"));  // Obtém o preço do item clicado
        const type = item.getAttribute("data-type");  // Obtém o tipo de item (máquina ou funcionário)

        // Verifica se o jogador tem cookies suficientes para comprar o item
        if (cookies >= price) {
            cookies -= price;  // Subtrai o preço dos cookies do jogador
            if (type === "machine") {
                machines++;  // Aumenta o número de máquinas compradas
                cookiesPerSecond += machinesCookiesPerSecond[index];  // Aumenta a geração de cookies por segundo com base no tipo de máquina
            } else if (type === "employee") {
                employees++;  // Aumenta o número de funcionários contratados
                cookiesPerSecond += 2;  // Cada funcionário gera 2 cookies por segundo
            }

            item.textContent = `${item.textContent.split(" (")[0]} (Comprado)`;  // Atualiza o texto do botão para indicar que o item foi comprado
            updateCounter();  // Atualiza o contador de cookies
        } else {
            alert("Você não tem cookies suficientes para comprar este item.");  // Exibe um alerta caso o jogador não tenha cookies suficientes
        }
    });
});

// Função para aplicar o código de cheat, alterando a quantidade de cookies ou o boost
function applyCheatCode(code) {
    if (code === "C00KIE") {
        const cookiesToAdd = parseInt(prompt("Quantos cookies você quer adicionar?", "1000"));  // Pede ao jogador quantos cookies adicionar
        if (isNaN(cookiesToAdd) || cookiesToAdd <= 0) {
            alert("Por favor, insira um número válido.");  // Verifica se o número inserido é válido
        } else {
            cookies += cookiesToAdd;  // Adiciona a quantidade de cookies fornecida ao total do jogador
            updateCounter();  // Atualiza o contador de cookies
        }
    } else if (code === "VOVO") {
        const boost = 2;  // Um boost de 200% de aumento na geração de cookies por segundo
        cookiesPerSecond *= boost;  // Aplica o boost, multiplicando a geração de cookies por 2
        alert("Você ganhou um boost de 200% de cookies por segundo graças à Vovó!");  // Exibe uma mensagem de sucesso
    } else {
        alert("Código inválido!");  // Exibe uma mensagem caso o código seja inválido
    }
}

// Função para abrir o pop-up de códigos e aplicar o cheat inserido
function openCheatCodePopup() {
    const code = prompt("Digite o código secreto:");  // Pede ao jogador para inserir um código de cheat
    if (code) {
        applyCheatCode(code.toUpperCase());  // Converte o código para maiúsculas e aplica o cheat
    }
}

// Estilo para o botão de código no canto inferior direito
cheatBtn.style.position = "fixed";  // Fixa a posição do botão na tela
cheatBtn.style.bottom = "80px";  // Coloca o botão um pouco acima do botão da loja
cheatBtn.style.right = "20px";  // Coloca o botão um pouco afastado da borda direita da tela
cheatBtn.style.zIndex = "100";  // Garante que o botão fique sobre os outros elementos

cheatBtn.addEventListener("click", openCheatCodePopup);  // Evento para abrir o pop-up de códigos quando o botão for clicado

// Inicia a geração automática de cookies (máquinas e funcionários)
startAutoGeneration();  // Chama a função para iniciar a geração automática de cookies a cada segundo
