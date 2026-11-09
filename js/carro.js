/* =========================================================
   PÁGINA DO CARRO (carro.html?id=...)
   Estrutura baseada na tela Stitch "Detalhes do Veículo":
   galeria > título > card de preço/financiamento > ficha técnica
   > laudo de procedência > histórico de mercado > semelhantes
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const S = window.Site;
  const C = S.C;
  const root = document.getElementById("vehicleRoot");
  const id = new URLSearchParams(location.search).get("id");
  const car = window.CARROS.find((c) => c.id === id);

  /* ---------- Carro não encontrado ---------- */
  if (!car) {
    root.innerHTML = `
      <div class="empty-state" style="margin-top:24px">
        <h3>Veículo não encontrado</h3>
        <p>Este anúncio pode ter sido vendido ou removido. Veja outras opções no nosso estoque.</p>
        <a class="btn btn--dark" href="comprar.html">Ver estoque</a>
      </div>`;
    return;
  }

  const name = S.carName(car);
  const brand = S.marca(car);
  const cat = window.CATEGORIAS[car.categoria] || { nome: "Estoque" };
  const fotos = car.fotos.length ? car.fotos : [S.PLACEHOLDER];
  const f = C.financiamento;
  const entradaPadrao = Math.round((car.preco * f.entradaPercentual) / 100 / 1000) * 1000;
  const parcelaPadrao = S.parcela(car.preco - entradaPadrao, f.prazoPadrao);
  const ficha = car.ficha || {};

  document.title = `${name} ${S.anos(car)} | ${C.nome}`;
  document.querySelector('meta[name="description"]').setAttribute(
    "content",
    `${name} ${car.versao} ${S.anos(car)}, ${S.km(car.km)}, ${car.cambio}. ${S.brl(car.preco)} à vista.`
  );

  /* ---------- Blocos ---------- */
  const specCards = [
    ["calendar", "Ano", S.anos(car)],
    ["road", "Quilometragem", S.km(car.km)],
    ["gear", "Câmbio", car.cambio],
    ["fuel", "Combustível", car.combustivel],
    ["zap", "Potência", ficha.potencia],
    ["gauge", "0 a 100 km/h", ficha.aceleracao],
  ].filter((s) => s[2]);

  const techRows = [
    ["Marca", brand.nome],
    ["Modelo", car.modelo],
    ["Versão", car.versao],
    ["Motor", ficha.motor],
    ["Torque", ficha.torque],
    ["Consumo", ficha.consumo],
    ["Porta-malas", ficha.portaMalas],
    ["Carroceria", car.carroceria],
    ["Cor", car.cor],
    ["Portas", car.portas],
  ].filter((r) => r[1] !== undefined && r[1] !== "");

  const laudo = car.laudo || [
    ["Características conferem com o documento", "Chassi OK"],
    [`Histórico de revisões${car.revisoes ? " em concessionária" : ""}`, car.revisoes ? `${car.revisoes} revisões` : "Em dia"],
    ["Sem registro de leilão, roubo ou sinistro", "Nada consta"],
    ["Pintura e estrutura originais", "Vistoria aprovada"],
  ];

  const thumbs = fotos
    .slice(0, 5)
    .map((src, i) => {
      const extra = i === 4 && fotos.length > 5 ? fotos.length - 5 : 0;
      return `<button class="gallery__thumb ${i === 0 ? "is-active" : ""}" data-index="${i}" aria-label="Foto ${i + 1}">
          <img src="${src}" alt="" loading="lazy">
          ${extra ? `<span style="position:absolute;inset:0;background:rgba(11,11,13,.6);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--f-label);font-weight:700;font-size:18px">+${extra + 1}</span>` : ""}
        </button>`;
    })
    .join("");

  const fipeHTML = car.fipe
    ? `<div class="price-card__fipe">
         <span class="price-card__label">FIPE referência</span>
         <strong ${car.fipe <= car.preco ? 'style="text-decoration:none"' : ""}>${S.brl(car.fipe)}</strong>
       </div>`
    : "";

  root.innerHTML = `
    <div class="vehicle__top">
      <nav class="breadcrumb" aria-label="Você está em">
        <a href="comprar.html">Comprar</a>${S.icon("chevronRight")}
        <a href="comprar.html?categoria=${car.categoria}">${S.esc(cat.nome)}</a>${S.icon("chevronRight")}
        <a href="comprar.html?marca=${car.marca}">${S.esc(brand.nome)}</a>${S.icon("chevronRight")}
        <strong>${S.esc(car.modelo)}</strong>
      </nav>
      <span class="vehicle__code">Cód. ${S.esc(car.id.toUpperCase())}</span>
    </div>

    <div class="vehicle__layout">
      <div class="vehicle__left">
        <!-- Galeria -->
        <section class="gallery" aria-label="Fotos">
          <div class="gallery__main" id="galleryMain">
            <img id="galleryImg" src="${fotos[0]}" alt="${S.esc(name)} - foto 1">
            ${fotos.length > 1 ? `
              <button class="gallery__arrow gallery__arrow--prev" data-dir="-1" aria-label="Foto anterior">${S.icon("chevronLeft")}</button>
              <button class="gallery__arrow gallery__arrow--next" data-dir="1" aria-label="Próxima foto">${S.icon("chevronRight")}</button>` : ""}
          </div>
          ${fotos.length > 1 ? `<div class="gallery__thumbs" id="galleryThumbs">${thumbs}</div>` : ""}
        </section>

        <!-- Conteúdo -->
        <div class="vehicle__main">
        <section>
          <div class="block__head">
            <h2>Ficha técnica &amp; destaques</h2>
            <span class="block__aside">${S.esc(car.carroceria)} · ${S.esc(car.cor)}</span>
          </div>
          <div class="specs">
            ${specCards
              .map(
                ([ic, label, value]) => `
              <div class="spec">
                <div class="spec__icon">${S.icon(ic)}</div>
                <div style="min-width:0">
                  <span class="spec__label">${label}</span>
                  <span class="spec__value" title="${S.esc(value)}">${S.esc(value)}</span>
                </div>
              </div>`
              )
              .join("")}
          </div>
        </section>

        <section>
          <div class="block__head"><h2>Sobre este carro</h2></div>
          <p class="description">${S.esc(car.descricao)}</p>
        </section>

        ${car.opcionais?.length ? `
        <section>
          <div class="block__head"><h2>Itens e opcionais</h2></div>
          <ul class="features">
            ${car.opcionais.map((o) => `<li>${S.icon("check")}<span>${S.esc(o)}</span></li>`).join("")}
          </ul>
        </section>` : ""}

        <section class="card report">
          <div class="report__title">${S.icon("shield")}<h2>Laudo de procedência</h2></div>
          <p>Vistoria cautelar realizada e histórico verificado pela nossa equipe.</p>
          <div class="report__list">
            ${laudo.map(([t, s]) => `<div class="report__item">${S.icon("check")}<p>${S.esc(t)}</p><span>${S.esc(s)}</span></div>`).join("")}
          </div>
          <a class="btn btn--outline btn--block btn--square" target="_blank" rel="noopener"
             href="${S.waLink(`Olá! Gostaria de receber o laudo cautelar completo do ${name} ${S.anos(car)}.`)}">
             ${S.icon("file")} Solicitar laudo cautelar completo
          </a>
        </section>

        <section id="simular" style="scroll-margin-top:110px">
          <div class="block__head">
            <div>
              <h2>Simule seu financiamento</h2>
              <p>Ajuste a entrada e o prazo para ver o valor aproximado da parcela.</p>
            </div>
          </div>
          <div class="card simulator">
            <div class="simulator__controls">
              <div>
                <div class="range-row"><label for="simEntrada">Entrada</label><output id="simEntradaOut"></output></div>
                <input type="range" id="simEntrada" min="0" max="${Math.round(car.preco * 0.8)}" step="1000" value="${entradaPadrao}">
              </div>
              <div>
                <div class="range-row"><label>Prazo</label><output id="simPrazoOut"></output></div>
                <div class="term-options" id="simPrazos">
                  ${f.prazos.map((p) => `<button type="button" data-p="${p}" class="${p === f.prazoPadrao ? "is-active" : ""}">${p}x</button>`).join("")}
                </div>
              </div>
            </div>
            <div class="simulator__result">
              <div>
                <small>Parcela estimada</small>
                <strong id="simParcela"></strong>
              </div>
              <div class="simulator__lines">
                <div><span>Valor do veículo</span><b>${S.brl(car.preco)}</b></div>
                <div><span>Valor financiado</span><b id="simFinanciado"></b></div>
                <div><span>Taxa</span><b>${String(f.taxaMensal).replace(".", ",")}% a.m.</b></div>
              </div>
              <a class="btn btn--whatsapp btn--block" id="simWhats" target="_blank" rel="noopener">${S.icon("whatsapp")} Enviar simulação</a>
            </div>
          </div>
          <p class="simulator__note">Simulação ilustrativa. Valores, taxas e aprovação sujeitos à análise de crédito da instituição financeira.</p>
        </section>

        ${C.mostrarHistoricoMercado !== false && car.fipe ? `
        <section class="card market">
          <div class="block__head" style="margin-bottom:8px">
            <div>
              <h2>Histórico de mercado</h2>
              <p>Variação estimada do modelo nos últimos 6 meses</p>
            </div>
          </div>
          <div class="market__values">
            <div><small>Valor anunciado</small><strong>${S.brl(car.preco)}</strong></div>
            <div class="market__avg"><small>Média de mercado</small><strong id="marketAvg"></strong></div>
          </div>
          <div class="market__chart" id="marketChart"></div>
          <div class="market__months" id="marketMonths"></div>
        </section>` : ""}

        <section>
          <div class="block__head"><h2>Ficha completa</h2></div>
          <table class="tech-table">
            <tbody>${techRows.map(([k, v]) => `<tr><th>${k}</th><td>${S.esc(v)}</td></tr>`).join("")}</tbody>
          </table>
        </section>
        </div>
      </div>

      <!-- Coluna lateral: título, preço e contato -->
      <aside class="vehicle__aside">
        <div class="vehicle__title">
          <span class="eyebrow">${S.esc(car.versao)}</span>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">
            <h1>${S.esc(name)}</h1>
            <button class="icon-btn icon-btn--light" id="shareBtn" aria-label="Compartilhar" style="flex-shrink:0;margin-top:6px">${S.icon("share")}</button>
          </div>
          <p class="vehicle__subtitle">
            <span>${S.anos(car)}</span><span>${S.km(car.km)}</span><span>${S.esc(car.combustivel)}</span><span>${S.esc(car.cambio)}</span>
          </p>
        </div>

        <div class="card price-card" id="priceCard">
          <div class="price-card__row">
            <div>
              <span class="price-card__label">Valor à vista</span>
              <span class="price-card__value">${S.brl(car.preco)}</span>
            </div>
            ${fipeHTML}
          </div>
          <div class="finance-strip">
            <div class="finance-strip__icon">${S.icon("money")}</div>
            <div class="finance-strip__text">
              <strong>A partir de ${S.brl(parcelaPadrao)} / mês</strong>
              <span>Entrada de ${f.entradaPercentual}% + ${f.prazoPadrao}x · sujeito à análise</span>
            </div>
            <a href="#simular" class="btn btn--dark btn--sm btn--square">Simular</a>
          </div>
          <div class="price-card__actions">
            <a class="btn btn--whatsapp btn--block" href="${S.waLink(S.carMessage(car))}" target="_blank" rel="noopener">${S.icon("whatsapp")} Falar com vendedor</a>
            <div class="price-card__actions-row">
              <a class="btn btn--outline" href="${S.igLink()}" target="_blank" rel="noopener">${S.icon("instagram")} Instagram</a>
              <a class="btn btn--outline" href="${S.mailLink(`Interesse: ${name} ${S.anos(car)}`, S.carMessage(car))}">${S.icon("mail")} E-mail</a>
            </div>
          </div>
        </div>

        <div class="card seller-card">
          <div class="seller-card__icon">${S.icon("mapPin")}</div>
          <div>
            <strong>Visite a ${S.esc(C.nome)}</strong>
            <span>${S.esc(C.endereco)}</span>
          </div>
        </div>
      </aside>
    </div>`;

  /* ---------- Galeria ---------- */
  let current = 0;
  const img = document.getElementById("galleryImg");
  const thumbsEl = document.getElementById("galleryThumbs");
  function show(i) {
    current = (i + fotos.length) % fotos.length;
    img.classList.add("is-fading");
    setTimeout(() => {
      img.src = fotos[current];
      img.alt = `${name} - foto ${current + 1}`;
      img.classList.remove("is-fading");
    }, 180);
    thumbsEl && thumbsEl.querySelectorAll(".gallery__thumb").forEach((t) => t.classList.toggle("is-active", Number(t.dataset.index) === Math.min(current, 4)));
  }
  document.querySelectorAll(".gallery__arrow").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      show(current + Number(b.dataset.dir));
    })
  );
  thumbsEl &&
    thumbsEl.addEventListener("click", (e) => {
      const t = e.target.closest(".gallery__thumb");
      if (!t) return;
      const i = Number(t.dataset.index);
      if (i === 4 && fotos.length > 5) openLightbox(4);
      else show(i);
    });

  /* Swipe no celular */
  let touchX = null;
  const main = document.getElementById("galleryMain");
  main.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  main.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40 && fotos.length > 1) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCounter = document.getElementById("lightboxCounter");
  let lbIndex = 0;
  const lbShow = (i) => {
    lbIndex = (i + fotos.length) % fotos.length;
    lbImg.src = fotos[lbIndex];
    lbImg.alt = `${name} - foto ${lbIndex + 1}`;
    lbCounter.textContent = `${lbIndex + 1} / ${fotos.length}`;
  };
  function openLightbox(i = current) {
    lbShow(i);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  if (car.fotos.length) main.addEventListener("click", () => openLightbox(current));
  else main.style.cursor = "default";
  lb.addEventListener("click", (e) => {
    const a = e.target.closest("[data-lb]")?.dataset.lb;
    if (a === "close" || e.target === lb) closeLightbox();
    if (a === "prev") lbShow(lbIndex - 1);
    if (a === "next") lbShow(lbIndex + 1);
  });
  lb.querySelectorAll(".lightbox__arrow").forEach((b) => (b.hidden = fotos.length < 2));
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
    if (e.key === "ArrowRight") lbShow(lbIndex + 1);
  });

  /* ---------- Compartilhar ---------- */
  document.getElementById("shareBtn").addEventListener("click", async () => {
    const data = { title: `${name} ${S.anos(car)}`, text: `${name} ${S.anos(car)} por ${S.brl(car.preco)}`, url: location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(location.href);
        const btn = document.getElementById("shareBtn");
        btn.innerHTML = S.icon("check");
        setTimeout(() => (btn.innerHTML = S.icon("share")), 1600);
      }
    } catch (_) { /* usuário cancelou */ }
  });

  /* ---------- Simulador ---------- */
  const range = document.getElementById("simEntrada");
  let prazo = f.prazoPadrao;
  function simulate() {
    const entrada = Number(range.value);
    const financiado = Math.max(car.preco - entrada, 0);
    const valor = financiado > 0 ? S.parcela(financiado, prazo) : 0;
    const pct = Math.round((entrada / car.preco) * 100);
    range.style.setProperty("--fill", `${(entrada / Number(range.max)) * 100}%`);
    document.getElementById("simEntradaOut").textContent = `${S.brl(entrada)} (${pct}%)`;
    document.getElementById("simPrazoOut").textContent = `${prazo} meses`;
    document.getElementById("simParcela").textContent = `${S.brl(valor)}`;
    document.getElementById("simFinanciado").textContent = S.brl(financiado);
    document.getElementById("simWhats").href = S.waLink(
      `Olá! Fiz uma simulação no site para o ${name} ${S.anos(car)} (${S.brl(car.preco)}): entrada de ${S.brl(entrada)} em ${prazo}x de aproximadamente ${S.brl(valor)}. Podemos conversar?`
    );
  }
  range.addEventListener("input", simulate);
  document.getElementById("simPrazos").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    prazo = Number(b.dataset.p);
    document.querySelectorAll("#simPrazos button").forEach((x) => x.classList.toggle("is-active", x === b));
    simulate();
  });
  simulate();

  /* ---------- Histórico de mercado (SVG) ---------- */
  const chartEl = document.getElementById("marketChart");
  if (chartEl) {
    // Usa car.historicoMercado (6 valores) se existir; senão estima a partir da FIPE.
    let series = car.historicoMercado;
    if (!series || series.length < 2) {
      let seed = [...car.id].reduce((a, ch) => a + ch.charCodeAt(0), 0);
      const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
      series = Array.from({ length: 6 }, (_, i) => Math.round((car.fipe * (1.035 - i * 0.006 + (rnd() - 0.5) * 0.03)) / 100) * 100);
    }
    const avg = series.reduce((a, b) => a + b, 0) / series.length;
    document.getElementById("marketAvg").textContent = S.brl(Math.round(avg / 100) * 100);

    const W = 600, H = 200, pad = 14;
    const all = [...series, car.preco];
    const min = Math.min(...all) * 0.99, max = Math.max(...all) * 1.01;
    const x = (i) => pad + (i * (W - pad * 2)) / (series.length - 1);
    const y = (v) => pad + (1 - (v - min) / (max - min)) * (H - pad * 2);
    const pts = series.map((v, i) => [x(i), y(v)]);
    // curva suave (Catmull-Rom -> Bézier)
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
    }
    const last = pts[pts.length - 1];
    const yPrice = y(car.preco);
    chartEl.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico do histórico de preço de mercado">
        <defs>
          <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#735c00" stop-opacity="0.22"/>
            <stop offset="100%" stop-color="#735c00" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${[0.25, 0.5, 0.75].map((g) => `<line x1="0" x2="${W}" y1="${H * g}" y2="${H * g}" stroke="#e3e2df" stroke-dasharray="4 6"/>`).join("")}
        <path d="${d} L${last[0]},${H} L${pts[0][0]},${H} Z" fill="url(#mg)"/>
        <path d="${d}" fill="none" stroke="#735c00" stroke-width="3" stroke-linecap="round"/>
        <line x1="0" x2="${W}" y1="${yPrice}" y2="${yPrice}" stroke="var(--accent)" stroke-width="2" stroke-dasharray="6 6"/>
        <line x1="${last[0]}" x2="${last[0]}" y1="${pad}" y2="${H}" stroke="#1a1c1a" stroke-dasharray="3 4"/>
        <circle cx="${last[0]}" cy="${last[1]}" r="7" fill="#fff" stroke="#1a1c1a" stroke-width="3"/>
      </svg>
      <div style="display:flex;gap:20px;flex-wrap:wrap;margin-top:14px;font-size:13px;color:var(--muted)">
        <span style="display:flex;align-items:center;gap:8px"><i style="width:18px;height:3px;background:#735c00;border-radius:2px"></i>Média de mercado</span>
        <span style="display:flex;align-items:center;gap:8px"><i style="width:18px;border-top:2px dashed var(--accent)"></i>Valor anunciado</span>
      </div>`;
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const m = dt.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
      months.push(m.charAt(0).toUpperCase() + m.slice(1));
    }
    document.getElementById("marketMonths").innerHTML = months
      .map((m, i) => `<span class="${i === 5 ? "is-current" : ""}">${m}${i === 5 ? " (atual)" : ""}</span>`)
      .join("");
  }

  /* ---------- Barra fixa mobile ---------- */
  const bar = document.getElementById("mobileBar");
  bar.innerHTML = `
    <div><small>Valor à vista</small><strong>${S.brl(car.preco)}</strong></div>
    <div class="mobile-bar__actions">
      <a class="btn btn--whatsapp btn--sm" href="${S.waLink(S.carMessage(car))}" target="_blank" rel="noopener">${S.icon("whatsapp")} Falar com vendedor</a>
    </div>`;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => bar.classList.toggle("is-visible", !en.isIntersecting && en.boundingClientRect.top < 0)).observe(
      document.getElementById("priceCard")
    );
  }

  /* ---------- Semelhantes ---------- */
  const similar = window.CARROS.filter((c) => c.id !== car.id)
    .sort((a, b) => (b.categoria === car.categoria) - (a.categoria === car.categoria) || Math.abs(a.preco - car.preco) - Math.abs(b.preco - car.preco))
    .slice(0, 6);
  if (similar.length) {
    document.getElementById("similarSection").hidden = false;
    document.getElementById("similarAll").href = `comprar.html?categoria=${car.categoria}`;
    document.getElementById("similarTrack").innerHTML = similar.map(S.carCard).join("");
    S.initCarousel(document.getElementById("similarCarousel"));
    S.reveal(document.getElementById("similarSection"));
  }
});

