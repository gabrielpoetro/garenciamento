const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyPQ0hVjngPViHzcMIhnHGosHmjBVoXjcZX6fHCRoL8lxzdYtWsD8XueiTGpAW5JiJVyw/exec";
const CHAVE = "gabriel123";

function salvar() {
  const texto = document.getElementById("texto").value;
  const status = document.getElementById("status");

  status.textContent = "Salvando...";

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ texto, key: CHAVE }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    status.textContent = "Salvo com sucesso!";
  })
  .catch(err => {
    status.textContent = "Erro ao salvar.";
    console.error(err);
  });
}

function carregar() {
  fetch(`${SCRIPT_URL}?key=${CHAVE}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("texto").value = data.texto || "";
    })
    .catch(err => {
      console.error("Erro ao carregar:", err);
    });
}

window.onload = carregar;
