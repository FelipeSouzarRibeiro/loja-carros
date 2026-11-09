/* Página inicial */
document.addEventListener("DOMContentLoaded", () => {
  const S = window.Site;
  const C = S.C;
  const cars = window.CARROS;

  /* Imagem do hero vinda do config */
  if (C.home?.imagemHero) document.getElementById("heroImg").src = C.home.imagemHero;

  /* ---- Busca ---- */
  const sMarca = document.getElementById("sMarca");
  S.brandsInStock().forEach((b) => sMarca.insertAdjacentHTML("beforeend", `<option value="${b.slug}">${S.esc(b.nome)}</option>`));
  const sAno = document.getElementById("sAno");
  [...new Set(cars.map((c) => c.anoModelo))].sort((a, b) => b - a).forEach((a) => sAno.insertAdjacentHTML("beforeend", `<option value="${a}">${a}</option>`));

  const catInput = document.getElementById("searchCat");
  document.querySelectorAll(".search__tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      document.querySelectorAll(".search__tab").forEach((t) => t.classList.toggle("is-active", t === tab));
      catInput.value = tab.dataset.cat;
    })
  );
  // remove campos vazios da URL
  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    new FormData(e.target).forEach((v, k) => v && params.set(k, v));
    location.href = `comprar.html${params.toString() ? "?" + params : ""}`;
  });

  /* ---- Carrossel de marcas ---- */
  S.brandCarousel(document.getElementById("brandCarousel"));

  /* ---- Destaques ---- */
  let featured = cars.filter((c) => c.destaque);
  if (featured.length < 4) featured = featured.concat(cars.filter((c) => !c.destaque && c.fotos.length)).slice(0, 4);
  document.getElementById("featuredGrid").innerHTML = featured.slice(0, 4).map(S.carCard).join("");

  /* ---- Faixa escura ---- */
  const f = C.financiamento;
  document.getElementById("maxPrazo").textContent = `${Math.max(...f.prazos)}x`;
  document.getElementById("taxaMin").textContent = `${String(f.taxaMensal).replace(".", ",")}%`;

  /* ---- Categorias ---- */
  document.getElementById("categoryCards").innerHTML = Object.entries(window.CATEGORIAS)
    .map(([slug, cat]) => {
      const list = cars.filter((c) => c.categoria === slug);
      const cover = list.find((c) => c.fotos.length);
      const min = Math.min(...list.map((c) => c.preco));
      return `
        <a class="category-card reveal" href="comprar.html?categoria=${slug}">
          <img src="${cover ? cover.fotos[0] : S.PLACEHOLDER}" alt="" loading="lazy">
          <h3>${S.esc(cat.nome)}</h3>
          <p>${S.esc(cat.descricao)}</p>
          <div class="category-card__foot">
            <span>${list.length} ${list.length === 1 ? "veículo" : "veículos"} · a partir de ${S.brl(min)}</span>
            <span class="brand-card__arrow" style="position:static">${S.icon("arrowUpRight")}</span>
          </div>
        </a>`;
    })
    .join("");

  /* ---- CTA ---- */
  document.getElementById("ctaButtons").innerHTML = S.contactButtons();

  S.reveal();
});

