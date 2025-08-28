function verificarSenha() {
  const senhaCorreta = "061723";
  const senhaDigitada = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem");

  if (senhaDigitada === senhaCorreta) {
    localStorage.setItem("autenticado", "true");
    mostrarProjetos();
  } else {
    mensagem.textContent = "Senha incorreta. Tente novamente.";
  }
}

function mostrarProjetos() {
  document.querySelector("input").style.display = "none";
  document.querySelector("button").style.display = "none";
  document.getElementById("mensagem").style.display = "none";
  document.getElementById("listaSites").style.display = "flex";
  document.querySelector("h1").textContent = "🌟 Meus Projetos Favoritos";

  const sitesFixos = [
    { nome: "⚖️ Equilibra 2.0", url: "https://gabrielpoetro.github.io/equilibra2.0/", tipo: "Emocional" },
    { nome: "🛒 Lista de Compras", url: "https://gabrielpoetro.github.io/lista-de-compras/", tipo: "Utilitário" },
    { nome: "👵🍲 Receitas da Vovó", url: "https://gabrielpoetro.github.io/Receitas-da-Vov-/", tipo: "Culinária" },
    { nome: "✍️ Poemas Infinitos", url: "https://gabrielpoetro.github.io/poema/", tipo: "Criatividade" },
    { nome: "⏳ Atemporal", url: "https://gabrielpoetro.github.io/atemporal/", tipo: "Reflexão" }
  ];

  const listaSites = document.getElementById("listaSites");
  listaSites.innerHTML = "";

  sitesFixos.forEach(site => {
    const link = document.createElement("a");
    link.href = site.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "botao-verde";
    link.textContent = `${site.nome} (${site.tipo})`;
    listaSites.appendChild(link);
  });
}

// Proteção contra acesso direto
if (localStorage.getItem("autenticado") === "true") {
  mostrarProjetos();
}
