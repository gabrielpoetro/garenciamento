function verificarSenha() {
  const senha = document.getElementById("senha").value;
  if (senha === "171923") {
    document.getElementById("login").style.display = "none";
    document.getElementById("painel").style.display = "block";
    atualizarCicloCeleste();
    carregarMelhorias();
  } else {
    alert("Senha incorreta.");
  }
}

function salvarMelhorias() {
  const texto = document.getElementById("melhorias").value;
  localStorage.setItem("melhoriasGabriel", texto);
  alert("Ideias salvas!");
}

function carregarMelhorias() {
  const salvas = localStorage.getItem("melhoriasGabriel");
  if (salvas) {
    document.getElementById("melhorias").value = salvas;
  }
}

function atualizarCicloCeleste() {
  const hora = new Date().getHours();
  const sol = document.getElementById('sol');
  const lua = document.getElementById('lua');
  const frase = document.getElementById('frase');
  const body = document.body;

  body.classList.remove("manha", "tarde", "noite");

  const largura = window.innerWidth;
  const altura = window.innerHeight;

  if (hora >= 5 && hora < 12) {
    body.classList.add("manha");
    frase.textContent = 'O dia desperta com promessas suaves.';
    sol.style.display = 'block';
    lua.style.display = 'none';
    const progresso = (hora - 5) / 7;
    sol.style.left = `${progresso * largura}px`;
    sol.style.top = `${(1 - Math.abs(progresso - 0.5) * 2) * altura * 0.5}px`;
  } else if (hora >= 12 && hora < 18) {
    body.classList.add("tarde");
    frase.textContent = 'A luz dança sobre os telhados e ideias.';
    sol.style.display = 'block';
    lua.style.display = 'none';
    const progresso = (hora - 12) / 6;
    sol.style.left = `${progresso * largura}px`;
    sol.style.top = `${(1 - Math.abs(progresso - 0.5) * 2) * altura * 0.5}px`;
  } else {
    body.classList.add("noite");
    frase.textContent = hora < 21
      ? 'O crepúsculo pinta o céu com saudade.'
      : 'A noite sussurra mistérios sob o véu das estrelas.';
    sol.style.display = 'none';
    lua.style.display = 'block';
    const progresso = hora >= 18 ? (hora - 18) / 6 : hora / 5;
    lua.style.left = `${progresso * largura}px`;
    lua.style.top = `${(1 - Math.abs(progresso - 0.5) * 2) * altura * 0.5}px`;
  }
}
