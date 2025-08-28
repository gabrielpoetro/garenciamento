document.addEventListener("DOMContentLoaded", () => {
  const botaoLogin = document.getElementById("botaoLogin");
  const listaSites = document.getElementById("listaSites");
  const botaoLogout = document.getElementById("botaoLogout");
  const loginArea = document.getElementById("loginArea");
  const conteudo = document.getElementById("conteudo");
  const conteudoSites = document.getElementById("conteudoSites");

  if (botaoLogin) {
    botaoLogin.addEventListener("click", () => {
      loginArea.classList.add("hidden");
      conteudo.classList.remove("hidden");
      console.log("Login realizado com sucesso!");
    });
  }

  if (listaSites) {
    listaSites.addEventListener("click", () => {
      conteudoSites.innerHTML = `
        <ul>
          <li><a href="https://gabrielpoetro.github.io/equilibra2.0/" target="_blank">🌿 Equilibra 3.0</a></li>
          <li><a href="https://gabrielpoetro.github.io/lista-de-compras/" target="_blank">🛒 Lista de Compras</a></li>
          <li><a href="https://gabrielpoetro.github.io/Receitas-da-Vov-/" target="_blank">🍰 Receitas da Vovó</a></li>
          <li><a href="https://gabrielpoetro.github.io/poema/" target="_blank">🌙 Poemas Infinitos</a></li>
          <li><a href="https://gabrielpoetro.github.io/atemporal/" target="_blank">⏳ Atemporal</a></li>
        </ul>
      `;
      console.log("Lista de sites exibida.");
    });
  }

  if (botaoLogout) {
    botaoLogout.addEventListener("click", () => {
      conteudo.classList.add("hidden");
      loginArea.classList.remove("hidden");
      conteudoSites.innerHTML = "";
      console.log("Logout realizado.");
    });
  }
});
