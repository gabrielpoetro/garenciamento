const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyPQ0hVjngPViHzcMIhnHGosHmjBVoXjcZX6fHCRoL8lxzdYtWsD8XueiTGpAW5JiJVyw/exec";
const API_KEY = "gabriel123";

const elNota = document.getElementById("nota");
const elStatus = document.getElementById("status");

function setStatus(msg, ok = null) {
  elStatus.textContent = msg;
  elStatus.style.color = ok === true ? "#1b873f" : ok === false ? "#c62828" : "#555";
}

function salvar() {
  const texto = elNota.value;
  if (!texto.trim()) {
    setStatus("⚠️ Escreva algo antes de salvar.", false);
    return;
  }

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: new URLSearchParams({ texto, key: API_KEY })
  })
    .then(res => res.text())
    .then(msg => {
      if (msg.includes("Chave inválida")) {
        setStatus("🔒 Chave inválida no servidor.", false);
        return;
      }
      setStatus("✅ Salvo com sucesso!", true);
    })
    .catch(err => {
      console.error("Erro ao salvar:", err);
      setStatus("❌ Erro ao salvar.", false);
    });
}

function carregar() {
  fetch(`${SCRIPT_URL}?key=${API_KEY}`)
    .then(res => res.text())
    .then(raw => {
      if (raw.includes("Chave inválida")) {
        setStatus("🔒 Chave inválida no servidor.", false);
        return;
      }
      try {
        const data = JSON.parse(raw);
        elNota.value = data?.texto ?? "";
        setStatus("📥 Anotação carregada.", true);
      } catch (e) {
        console.error("Erro ao interpretar JSON:", e, raw);
        setStatus("❌ Erro ao carregar dados.", false);
      }
    })
    .catch(err => {
      console.error("Erro ao carregar:", err);
      setStatus("❌ Erro ao carregar.", false);
    });
}

function limpar() {
  elNota.value = "";
  setStatus("🧹 Campo limpo.");
}

document.addEventListener("DOMContentLoaded", carregar);
