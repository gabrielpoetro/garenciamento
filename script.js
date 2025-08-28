const form = document.getElementById("form");
const lista = document.getElementById("lista");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroStatus = document.getElementById("filtroStatus");
const busca = document.getElementById("busca");
const exportar = document.getElementById("exportar");
const listaSites = document.getElementById("meus-sites");
const toggleTema = document.getElementById("toggleTema");

let itens = JSON.parse(localStorage.getItem("painelGabriel")) || [];

function salvar() {
  localStorage.setItem("painelGabriel", JSON.stringify(itens));
}

function renderizar() {
  lista.innerHTML = "";
  const categoria = filtroCategoria.value;
  const status = filtroStatus.value;
  const textoBusca = busca.value.toLowerCase();

  const favoritos = itens.filter(i => i.favorito);
  const normais = itens.filter(i => !i.favorito);

  [...favoritos, ...normais]
    .filter(item =>
      (categoria === "todos" || item.categoria === categoria) &&
      (status === "todos" || item.status === status) &&
      (item.titulo.toLowerCase().includes(textoBusca) || item.descricao.toLowerCase().includes(textoBusca))
    )
    .forEach((item, index) => {
      const li = document.createElement("li");
      li.className = `${item.status === "concluido" ? "concluido" : ""} ${item.favorito ? "favorito" : ""}`;
      li.innerHTML = `
        <strong>${item.titulo}</strong> (${item.categoria})<br/>
        <em>${item.descricao}</em><br/>
        <small>Tags: ${item.tags || "—"}</small><br/>
        <button onclick="alternar(${index})">✔️ ${item.status === "pendente" ? "Concluir" : "Reabrir"}</button>
        <button onclick="favoritar(${index})">⭐ ${item.favorito ? "Desfavoritar" : "Favoritar"}</button>
        <button onclick="remover(${index})">🗑️ Remover</button>
      `;
      lista.appendChild(li);
    });
}

function alternar(index) {
  itens[index].status = itens[index].status === "pendente" ? "concluido" : "pendente";
  salvar();
  renderizar();
}

function favoritar(index) {
  itens[index].favorito = !itens[index].favorito;
  salvar();
  renderizar();
}

function remover(index) {
  itens.splice(index, 1);
  salvar();
  renderizar();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const novoItem = {
    titulo: form.titulo.value,
    descricao: form.descricao.value,
    categoria: form.categoria.value,
    tags: form.tags.value,
    status: "pendente",
    favorito: false
  };
  itens.push(novoItem);
  salvar();
  renderizar();
  form.reset();
});

filtroCategoria.addEventListener("change", renderizar);
filtroStatus.addEventListener("change", renderizar);
busca.addEventListener("input", renderizar);

exportar.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(itens, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "painel-gabriel.json";
  a.click();
  URL.revokeObjectURL(url);
});

toggleTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function renderizarSites() {
  const sitesFixos = [
    { nome: "Equilibra", url: "https://gabrielpoetro.github.io/equilibra/", icone: "⚖️", tipo: "Emocional" },
    { nome: "Lista de Compras", url: "https://gabrielpoetro.github.io/lista-de-compras/", icone: "🛒", tipo: "Utilitário" },
    { nome: "Receitas da Vovó", url: "https://gabrielpoetro.github.io/Receitas-da-Vov-/", icone: "👵🍲", tipo: "Culinária" },
    { nome: "Gerador de Poemas", url: "https://gabrielpoetro.github.io/poema/", icone: "🌸", tipo: "Criatividade" },
    { nome: "Atemporal", url: "https://gabrielpoetro.github.io/atemporal/", icone: "⏳", tipo: "Reflexão" }
  ];

  listaSites.innerHTML = "";

  sitesFixos.forEach(site => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${site.icone} <a href="${site.url}" target="_blank">${site.nome}</a>
      <small>(${site.tipo})</small>
    `;
    listaSites.appendChild(li);
  });
}

renderizar();
renderizarSites();
