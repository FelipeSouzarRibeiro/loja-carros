/* Página Comprar: filtros, ordenação e carrossel de marcas */
document.addEventListener("DOMContentLoaded", () => {
  const S = window.Site;
  const cars = window.CARROS;
  const $ = (id) => document.getElementById(id);

  const fields = {
    busca: $("fBusca"),
    marca: $("fMarca"),
    preco: $("fPreco"),
    ano: $("fAno"),
    carroceria: $("fCarroceria"),
    cambio: $("fCambio"),
    combustivel: $("fCombustivel"),
    ordem: $("fOrdem"),
  };
  const segCategoria = $("fCategoria");
  let categoria = "";

  /* ---- Opções dos selects a partir do estoque ---- */
  const uniq = (arr) => [...new Set(arr)];
  const addOptions = (sel, values, label = (v) => v) =>
    values.forEach((v) => sel.insertAdjacentHTML("beforeend", `<option value="${S.esc(v)}">${S.esc(label(v))}</option>`));

  addOptions(fields.marca, S.brandsInStock().map((b) => b.slug), (slug) => window.MARCAS[slug]?.nome || slug);
  addOptions(fields.ano, uniq(cars.map((c) => c.anoModelo)).sort((a, b) => b - a));
  addOptions(fields.carroceria, uniq(cars.map((c) => c.carroceria)).sort());
  addOptions(fields.combustivel, uniq(cars.map((c) => c.combustivel)).sort());

  /* ---- Estado inicial pela URL (vindo da Home) ---- */
  const params = new URLSearchParams(location.search);
  Object.entries(fields).forEach(([k, el]) => params.has(k) && (el.value = params.get(k)));
  categoria = params.get("categoria") || "";

  /* ---- Carrossel de marcas (filtra sem sair da página) ---- */
  const carousel = $("brandCarousel");
  S.brandCarousel(carousel, {
    autoplay: 0,
    onSelect: (slug) => {
      fields.marca.value = fields.marca.value === slug ? "" : slug;
      render();
      $("estoque").scrollIntoView({ behavior: "smooth", block: "start" });
    },
  });

  /* ---- Segmentado de categoria ---- */
  const syncSeg = () =>
    segCategoria.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b.dataset.value === categoria));
  segCategoria.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    categoria = b.dataset.value;
    render();
  });

  /* ---- Filtragem ---- */
  const norm = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  function filtered() {
    const q = norm(fields.busca.value.trim());
    const preco = Number(fields.preco.value) || Infinity;
    const ano = Number(fields.ano.value) || 0;
    let list = cars.filter(
      (c) =>
        (!categoria || c.categoria === categoria) &&
        (!fields.marca.value || c.marca === fields.marca.value) &&
        c.preco <= preco &&
        c.anoModelo >= ano &&
        (!fields.carroceria.value || c.carroceria === fields.carroceria.value) &&
        (!fields.cambio.value || c.cambio.startsWith(fields.cambio.value)) &&
        (!fields.combustivel.value || c.combustivel === fields.combustivel.value) &&
        (!q || norm(`${S.carName(c)} ${c.versao} ${c.carroceria} ${c.cor}`).includes(q))
    );
    const sorters = {
      menor: (a, b) => a.preco - b.preco,
      maior: (a, b) => b.preco - a.preco,
      novos: (a, b) => b.anoModelo - a.anoModelo || a.km - b.km,
      km: (a, b) => a.km - b.km,
      relevancia: (a, b) => (b.destaque - a.destaque) || (b.fotos.length > 0) - (a.fotos.length > 0),
    };
    return list.sort(sorters[fields.ordem.value] || sorters.relevancia);
  }

  function syncUrl() {
    const p = new URLSearchParams();
    if (categoria) p.set("categoria", categoria);
    Object.entries(fields).forEach(([k, el]) => {
      if (el.value && !(k === "ordem" && el.value === "relevancia")) p.set(k, el.value);
    });
    history.replaceState(null, "", `${location.pathname}${p.toString() ? "?" + p : ""}`);
  }

  function render() {
    syncSeg();
    S.setActiveBrand(carousel, fields.marca.value);
    const list = filtered();
    $("resultsCount").innerHTML = `<strong>${list.length}</strong> ${list.length === 1 ? "veículo encontrado" : "veículos encontrados"}`;
    $("carsGrid").innerHTML = list.length
      ? list.map(S.carCard).join("")
      : `<div class="empty-state">
           <h3>Nenhum veículo encontrado</h3>
           <p>Tente ajustar os filtros ou fale com a gente: encontramos o carro certo para você.</p>
           <button class="btn btn--dark" type="button" id="emptyClear">Limpar filtros</button>
         </div>`;
    const emptyClear = $("emptyClear");
    emptyClear && emptyClear.addEventListener("click", clearAll);
    syncUrl();
    S.reveal($("carsGrid"));
  }

  function clearAll() {
    Object.entries(fields).forEach(([k, el]) => (el.value = k === "ordem" ? "relevancia" : ""));
    categoria = "";
    render();
  }

  Object.values(fields).forEach((el) => el.addEventListener(el.tagName === "INPUT" ? "input" : "change", render));
  $("clearFilters").addEventListener("click", clearAll);

  /* ---- Filtros no mobile (painel inferior) ---- */
  const panel = $("filters");
  const backdrop = $("filtersBackdrop");
  const toggle = (open) => {
    panel.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  $("openFilters").addEventListener("click", () => toggle(true));
  $("applyFilters").addEventListener("click", () => toggle(false));
  backdrop.addEventListener("click", () => toggle(false));

  $("ctaButtons").innerHTML = S.contactButtons();
  render();
});

