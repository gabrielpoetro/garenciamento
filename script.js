const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxiPtAP6dIBK8P5GTQxD-mcjFyl3sJ0c9pT2bSfJHm6ExU8vD_s0ypngc2hg018dF-2Ew/exec";
const API_KEY = "gabriel123";

const elNota = document.getElementById("nota");
const elStatus = document.getElementById("status");

function salvar() {
  const texto = elNota.value;
  if (!texto.trim()) {
    elStatus.textContent = "⚠️ Escreva algo antes de salvar.";
    return;
  }

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ texto, chave: API_KEY }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => elStatus.textContent = "✅ Salvo com sucesso!")
  .catch(err => elStatus.textContent = "❌ Erro ao salvar.");
}

function carregar() {
  fetch(`${SCRIPT_URL}?chave=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      elNota.value = data.texto || "";
      elStatus.textContent = "📥 Anotação carregada.";
    })
    .catch(err => elStatus.textContent = "❌ Erro ao carregar.");
}

function limpar() {
  elNota.value = "";
  elStatus.textContent = "🧹 Campo limpo.";
}
