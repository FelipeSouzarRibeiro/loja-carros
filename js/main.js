/* =========================================================
   SCRIPT COMPARTILHADO (todas as páginas)
   - aplica cores do config
   - monta cabeçalho e rodapé
   - funções utilitárias (preço, links de contato, cards)
   - carrossel de marcas e animações
   ========================================================= */
(function () {
  const C = window.CONFIG;
  const PLACEHOLDER = "assets/img/placeholder.svg";

  /* ---------------- Ícones (SVG inline) ---------------- */
  const P = {
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    gauge: '<path d="M12 14 15.5 9"/><path d="M3.3 17a9 9 0 1 1 17.4 0"/><circle cx="12" cy="14" r="1.2" fill="currentColor"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    fuel: '<path d="M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17M2 22h14M7 8h4"/><path d="M15 12h2a2 2 0 0 1 2 2v3a1.5 1.5 0 0 0 3 0V9l-3-3"/>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
    road: '<path d="M5 21 9 3M19 21 15 3M12 4v3M12 10.5v3M12 17v3"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1" fill="currentColor"/><circle cx="17.5" cy="10.5" r="1" fill="currentColor"/><circle cx="8.5" cy="7.5" r="1" fill="currentColor"/><circle cx="6.5" cy="12.5" r="1" fill="currentColor"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7H16a6 6 0 0 0 6-6C22 6 17.5 2 12 2z"/>',
    car: '<path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/><path d="M9.5 17h5M3 12h18"/>',
    money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
    swap: '<path d="M17 3l4 4-4 4M21 7H9M7 21l-4-4 4-4M3 17h12"/>',
    handshake: '<path d="m11 17 2 2a1 1 0 0 0 1.4-1.4"/><path d="m14 14 2.5 2.5a1 1 0 0 0 1.4-1.4l-3.8-3.8a3 3 0 0 0-4.2 0l-.9.9a1 1 0 0 1-1.4-1.4L10.4 8a5 5 0 0 1 5.2-1.2l.6.2a4 4 0 0 0 2.2.2L21 6.5"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 0 0 1.4-1.4M3 4h8"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    engine: '<path d="M7 7h6v3h3l2 2h2v6h-2l-2 2H9l-2-2H5v-3H3v-4h2V9h2z"/><path d="M10 4h4M12 4v3"/>',
    door: '<path d="M4 21V9l8-6h7a1 1 0 0 1 1 1v17z"/><path d="M4 12h16M15 15h2"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    trending: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  };
  const WHATSAPP_PATH =
    '<path fill="currentColor" stroke="none" d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.2 12C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2A11.8 11.8 0 0 0 12 .1C5.5.1.1 5.5.1 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.7c1.7.9 3.7 1.4 5.7 1.4 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4z"/>';

  function icon(name, cls = "") {
    if (name === "whatsapp") {
      return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${WHATSAPP_PATH}</svg>`;
    }
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ""}</svg>`;
  }

  /* ---------------- Formatação ---------------- */
  const brlFmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const numFmt = new Intl.NumberFormat("pt-BR");
  const brl = (v) => brlFmt.format(Math.round(v)).replace(/\u00a0/g, " ");
  const km = (v) => `${numFmt.format(v)} km`;
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- Dados ---------------- */
  const marca = (car) => window.MARCAS[car.marca] || { nome: car.marca, logo: "" };
  const carName = (car) => `${marca(car).nome} ${car.modelo}`;
  const carUrl = (car) => `carro.html?id=${encodeURIComponent(car.id)}`;
  const photo = (car, i = 0) => (car.fotos && car.fotos[i]) || PLACEHOLDER;
  const anos = (car) => `${car.anoFabricacao}/${car.anoModelo}`;
  const brandsInStock = () => {
    const slugs = [...new Set(window.CARROS.map((c) => c.marca))];
    return slugs.map((slug) => {
      const cars = window.CARROS.filter((c) => c.marca === slug);
      const withPhoto = cars.find((c) => c.fotos && c.fotos.length);
      return { slug, ...window.MARCAS[slug], total: cars.length, foto: withPhoto ? withPhoto.fotos[0] : "" };
    });
  };

  /* ---------------- Contato ---------------- */
  const waLink = (msg = C.mensagemWhatsapp) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
  const igLink = () => `https://instagram.com/${C.instagram}`;
  const mailLink = (subject = `Contato pelo site - ${C.nome}`, body = "") =>
    `mailto:${C.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
  const carMessage = (car) =>
    `Olá! Tenho interesse no ${carName(car)} ${car.versao} ${anos(car)}, anunciado por ${brl(car.preco)} no site. Ainda está disponível?`;

  function contactButtons({ car = null, size = "", dark = false } = {}) {
    const msg = car ? carMessage(car) : C.mensagemWhatsapp;
    const subject = car ? `Interesse: ${carName(car)} ${anos(car)}` : undefined;
    const body = car ? carMessage(car) : "";
    const outline = dark ? "btn--ghost-light" : "btn--outline";
    return `
      <a class="btn btn--whatsapp ${size}" href="${waLink(msg)}" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a>
      <a class="btn ${outline} ${size}" href="${igLink()}" target="_blank" rel="noopener">${icon("instagram")} Instagram</a>
      <a class="btn ${outline} ${size}" href="${mailLink(subject, body)}">${icon("mail")} E-mail</a>`;
  }

  /* ---------------- Financiamento ---------------- */
  function parcela(valorFinanciado, meses, taxaMensal = C.financiamento.taxaMensal) {
    const i = taxaMensal / 100;
    if (i === 0) return valorFinanciado / meses;
    return (valorFinanciado * i) / (1 - Math.pow(1 + i, -meses));
  }

  /* ---------------- Card de carro ---------------- */
  function carCard(car) {
    return `
      <article class="car-card reveal">
        <a href="${carUrl(car)}" class="car-card__head">
          <span class="car-card__brand">${esc(marca(car).nome)}</span>
          <h3 class="car-card__title">${esc(car.modelo)}</h3>
          <p class="car-card__version">${esc(car.versao)}</p>
        </a>
        <a href="${carUrl(car)}" class="car-card__media" aria-label="Ver ${esc(carName(car))}">
          <img src="${photo(car)}" alt="${esc(carName(car))} ${anos(car)}" loading="lazy">
        </a>
        <div class="car-card__specs">
          <span>${anos(car)}</span><span>${km(car.km)}</span><span>${esc(car.cambio.split(" ")[0])}</span><span>${esc(car.combustivel)}</span>
        </div>
        <div class="car-card__foot">
          <div class="car-card__price">${brl(car.preco)}<small>à vista</small></div>
          <a href="${carUrl(car)}" class="btn btn--outline btn--sm">Ver detalhes</a>
        </div>
      </article>`;
  }

  /* ---------------- Cabeçalho / Rodapé ---------------- */
  function logoHTML() {
    if (C.logoImagem) return `<img src="${C.logoImagem}" alt="${esc(C.nome)}">`;
    const l = C.logoTexto || { antes: C.nome };
    return `${esc(l.antes || "")}${l.destaque ? `<span>${esc(l.destaque)}</span>` : ""}${esc(l.depois || "")}`;
  }

  const NAV = [
    { href: "index.html", label: "Início", page: "home" },
    { href: "comprar.html", label: "Comprar", page: "comprar" },
    { href: "sobre.html", label: "Sobre", page: "sobre" },
    { href: "contato.html", label: "Contato", page: "contato" },
  ];

  function renderHeader(page) {
    const el = document.getElementById("site-header");
    if (!el) return;
    const links = NAV.map((n) => `<a href="${n.href}" class="${n.page === page ? "is-active" : ""}">${n.label}</a>`).join("");
    el.outerHTML = `
      <header class="site-header" id="siteHeader">
        <div class="nav">
          <a href="index.html" class="logo" aria-label="${esc(C.nome)} - início">${logoHTML()}</a>
          <nav class="nav__links" aria-label="Principal">${links}</nav>
          <div class="nav__actions">
            <a class="icon-btn icon-btn--light nav__social" href="${igLink()}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
            <a class="icon-btn icon-btn--light nav__social" href="${mailLink()}" aria-label="E-mail">${icon("mail")}</a>
            <a class="icon-btn icon-btn--dark" href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("whatsapp")}</a>
            <button class="icon-btn icon-btn--light nav__toggle" id="navToggle" aria-label="Abrir menu" aria-expanded="false">${icon("menu")}</button>
          </div>
        </div>
      </header>
      <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
        <nav>${links}</nav>
        <div class="mobile-menu__contact">${contactButtons({ dark: true })}</div>
      </div>`;

    const header = document.getElementById("siteHeader");
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("mobileMenu");
    toggle.addEventListener("click", () => {
      const open = !menu.classList.contains("is-open");
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = icon(open ? "close" : "menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    const cats = Object.entries(window.CATEGORIAS)
      .map(([k, v]) => `<li><a href="comprar.html?categoria=${k}">${esc(v.nome)}</a></li>`)
      .join("");
    const brands = brandsInStock()
      .slice(0, 6)
      .map((b) => `<li><a href="comprar.html?marca=${b.slug}">${esc(b.nome)}</a></li>`)
      .join("");
    el.outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer__grid">
            <div>
              <a href="index.html" class="logo">${logoHTML()}</a>
              <p class="footer__about">${esc(C.slogan)}</p>
              <div class="footer__social">
                <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("whatsapp")}</a>
                <a href="${igLink()}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
                <a href="${mailLink()}" aria-label="E-mail">${icon("mail")}</a>
              </div>
            </div>
            <div>
              <h4>Navegação</h4>
              <ul class="footer__list">${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h4>Estoque</h4>
              <ul class="footer__list">${cats}${brands}</ul>
            </div>
            <div>
              <h4>Contato</h4>
              <ul class="footer__list">
                <li>${icon("whatsapp")}<a href="${waLink()}" target="_blank" rel="noopener">${esc(C.whatsappExibicao)}</a></li>
                <li>${icon("instagram")}<a href="${igLink()}" target="_blank" rel="noopener">@${esc(C.instagram)}</a></li>
                <li>${icon("mail")}<a href="${mailLink()}">${esc(C.email)}</a></li>
                <li>${icon("mapPin")}<span>${esc(C.endereco)}</span></li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© ${new Date().getFullYear()} ${esc(C.nome)}. Todos os direitos reservados.</span>
            <span>Preços e condições sujeitos a alteração sem aviso prévio.</span>
          </div>
        </div>
      </footer>`;
  }

  /* ---------------- Carrossel ---------------- */
  function initCarousel(root, { autoplay = 0 } = {}) {
    const track = root.querySelector(".carousel__track");
    const prev = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");
    if (!track) return;
    const step = () => {
      const item = track.firstElementChild;
      if (!item) return track.clientWidth;
      return item.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 20);
    };
    const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const update = () => {
      if (prev) prev.disabled = track.scrollLeft <= 4;
      if (next) next.disabled = atEnd();
    };
    prev && prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    next && next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    if (autoplay) {
      let timer = null;
      const play = () => {
        stop();
        timer = setInterval(() => {
          if (atEnd()) track.scrollTo({ left: 0, behavior: "smooth" });
          else track.scrollBy({ left: step(), behavior: "smooth" });
        }, autoplay);
      };
      const stop = () => timer && clearInterval(timer);
      root.addEventListener("mouseenter", stop);
      root.addEventListener("mouseleave", play);
      root.addEventListener("touchstart", stop, { passive: true });
      play();
    }
  }

  /* Carrossel de marcas (usado na Home e em Comprar)
     opts.onSelect(slug) -> se informado, filtra na própria página em vez de navegar */
  function brandCarousel(root, opts = {}) {
    const track = root.querySelector(".carousel__track");
    const brands = brandsInStock();
    track.innerHTML = brands
      .map((b) => {
        const media = b.foto
          ? `<img class="brand-card__img" src="${b.foto}" alt="" loading="lazy">`
          : `<img class="brand-card__bigLogo" src="${b.logo}" alt="">`;
        return `
          <a class="brand-card ${b.foto ? "" : "brand-card--empty"}" href="comprar.html?marca=${b.slug}" data-brand="${b.slug}">
            ${media}
            <div class="brand-card__top">
              ${b.logo ? `<img class="brand-card__logo" src="${b.logo}" alt="">` : ""}
              <span class="brand-card__name">${esc(b.nome)}</span>
            </div>
            <span class="brand-card__count">${b.total} ${b.total === 1 ? "veículo" : "veículos"}</span>
            <span class="brand-card__arrow">${icon("arrowUpRight")}</span>
          </a>`;
      })
      .join("");
    if (opts.onSelect) {
      track.addEventListener("click", (e) => {
        const card = e.target.closest("[data-brand]");
        if (!card) return;
        e.preventDefault();
        opts.onSelect(card.dataset.brand);
      });
    }
    initCarousel(root, { autoplay: opts.autoplay ?? 4500 });
  }

  function setActiveBrand(root, slug) {
    root.querySelectorAll("[data-brand]").forEach((el) => el.classList.toggle("is-active", el.dataset.brand === slug));
  }

  /* Faixa contínua de logos */
  function logoStrip(el) {
    const items = brandsInStock()
      .map((b) => `<a class="logo-strip__item" href="comprar.html?marca=${b.slug}"><img src="${b.logo}" alt="">${esc(b.nome)}</a>`)
      .join("");
    el.innerHTML = `<div class="logo-strip__track">${items}${items}</div>`;
  }

  /* ---------------- Animação de entrada ---------------- */
  let io = null;
  function reveal(scope = document) {
    const els = scope.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("is-visible"));
    io =
      io ||
      new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("is-visible");
              io.unobserve(en.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    els.forEach((e) => io.observe(e));
  }

  /* ---------------- Tema ---------------- */
  function applyTheme() {
    const r = document.documentElement.style;
    if (C.cores?.principal) r.setProperty("--accent", C.cores.principal);
    if (C.cores?.escuro) r.setProperty("--dark", C.cores.escuro);
  }

  /* Imagem quebrada -> placeholder */
  document.addEventListener(
    "error",
    (e) => {
      const t = e.target;
      if (t.tagName === "IMG" && !t.dataset.fallback && !t.classList.contains("brand-card__logo")) {
        t.dataset.fallback = "1";
        t.src = PLACEHOLDER;
      }
    },
    true
  );

  applyTheme();

  /* Preenche elementos com data-config="chave" (ex.: data-config="email") */
  function fillConfig() {
    document.querySelectorAll("[data-config]").forEach((el) => {
      const v = el.dataset.config.split(".").reduce((o, k) => (o ? o[k] : undefined), C);
      if (v !== undefined) el.innerHTML = v;
    });
  }

  /* Substitui <span data-icon="nome"></span> pelo ícone SVG */
  function hydrateIcons(scope = document) {
    scope.querySelectorAll("[data-icon]").forEach((el) => {
      el.outerHTML = icon(el.dataset.icon);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    renderHeader(page);
    renderFooter();
    fillConfig();
    hydrateIcons();
    document.title = document.title.replace("{loja}", C.nome);
    reveal();
  });

  /* Exporta utilidades para os scripts de cada página */
  window.Site = {
    C, PLACEHOLDER, icon, brl, km, esc, marca, carName, carUrl, photo, anos,
    brandsInStock, waLink, igLink, mailLink, carMessage, contactButtons, parcela,
    carCard, initCarousel, brandCarousel, setActiveBrand, logoStrip, reveal, hydrateIcons,
  };
})();
