// ============================================================
//  IMAGENS — troque pelos seus arquivos PNG
// ============================================================
const PET_IMAGES = {
  idle:     "idle.png",
  eating:   "eating.png",
  sleeping: "sleeping.png",
};

// ============================================================
//  MENSAGENS
// ============================================================
const MESSAGES = {
  idle:     ["Estou aqui! 😊", "Me cuide bem! 💖", "Que bom te ver!"],
  eating:   ["Nhammm! Que delícia! 😋", "Obrigado pela comida! 🥰", "Tô com tanta fome! 🍔"],
  sleeping: ["Zzzzz... 💤", "Boa noite... 😴", "Tô sonhando com você... 💭"],
};

// ============================================================
//  ESTADO
// ============================================================
let state = "idle";
let sleepInterval = null;
let actionTimeout = null;

const petImage     = document.getElementById("petImage");
const nameDisplay  = document.getElementById("nameDisplay");
const nameInput    = document.getElementById("nameInput");
const stateBadge   = document.getElementById("stateBadge");
const messageBubble= document.getElementById("messageBubble");
const wakeBtn      = document.getElementById("wakeBtn");

// ============================================================
//  NOME
// ============================================================
function setName() {
  const val = nameInput.value.trim();
  if (!val) return;
  nameDisplay.textContent = val;
  nameInput.value = "";
  showBubble(`Oi! Me chamam de ${val}! 😄`);
}

document.getElementById("nameInput").addEventListener("keydown", e => {
  if (e.key === "Enter") setName();
});

// ============================================================
//  AÇÕES
// ============================================================
function feedPet() {
  if (state === "sleeping") return;
  setState("eating");
  showBubble(pick(MESSAGES.eating));
  clearTimeout(actionTimeout);
  actionTimeout = setTimeout(() => returnToIdle(), 3000);
}

function sleepPet() {
  if (state === "sleeping") return;
  setState("sleeping");
  showBubble(pick(MESSAGES.sleeping));
}

function wakePet() {
  clearInterval(sleepInterval);
  returnToIdle();
  showBubble("Bom dia! ☀️😊");
}

function returnToIdle() {
  setState("idle");
  showBubble(pick(MESSAGES.idle));
}

// ============================================================
//  MUDAR ESTADO
// ============================================================
function setState(newState) {
  state = newState;

  // Troca imagem com fade
  petImage.style.opacity = "0";
  setTimeout(() => {
    petImage.src = PET_IMAGES[newState] || PET_IMAGES.idle;
    petImage.style.opacity = "1";
  }, 150);

  // Animação
  petImage.classList.toggle("sleeping", newState === "sleeping");

  // Badge
  const badges = { idle: "😊 Feliz", eating: "🍔 Comendo", sleeping: "😴 Dormindo" };
  stateBadge.textContent = badges[newState] || "😊 Feliz";

  // Botão acordar
  wakeBtn.style.display = (newState === "sleeping") ? "inline-block" : "none";

  // Desabilitar botões durante o sono
  document.querySelector(".feed-btn").disabled  = (newState === "sleeping");
  document.querySelector(".sleep-btn").disabled = (newState === "sleeping");
}

// ============================================================
//  BOLHA DE MENSAGEM
// ============================================================
let bubbleTimeout;
function showBubble(text) {
  messageBubble.textContent = text;
  messageBubble.classList.add("visible");
  clearTimeout(bubbleTimeout);
  bubbleTimeout = setTimeout(() => messageBubble.classList.remove("visible"), 3000);
}

// ============================================================
//  UTILITÁRIO
// ============================================================
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================================
//  INÍCIO
// ============================================================
setTimeout(() => showBubble(pick(MESSAGES.idle)), 800);
