/* =========================================================
   CONFIGURAÇÃO DA LOJA
   ---------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para
   adaptar o template a uma nova loja (nome, contatos,
   cores, endereço, textos principais).
   Os carros e as marcas ficam em js/data.js
   ========================================================= */

window.CONFIG = {
  /* ---------- Identidade ---------- */
  nome: "Prime Veículos",
  // Logo em texto: a parte "destaque" aparece na cor principal.
  // Se preferir uma imagem, preencha "logoImagem" (ex.: "assets/img/logo.png").
  logoTexto: { antes: "Prime", destaque: "", depois: " Veículos" },
  logoImagem: "",
  slogan: "Seminovos selecionados, do popular ao premium.",

  /* ---------- Cores (qualquer cor CSS) ---------- */
  cores: {
    principal: "#5B8DEF", // botões, links e destaques
    escuro: "#0B0B0D",    // seções escuras e textos fortes
  },

  /* ---------- Contatos ---------- */
  whatsapp: "5511999999999",          // somente números, com DDI + DDD
  whatsappExibicao: "(11) 99999-9999",
  telefone: "(11) 3333-3333",
  instagram: "primeveiculos",         // usuário sem @
  email: "contato@primeveiculos.com.br",

  /* ---------- Endereço ---------- */
  endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
  horarios: [
    { dias: "Segunda a Sexta", horas: "09h às 19h" },
    { dias: "Sábado", horas: "09h às 15h" },
    { dias: "Domingo", horas: "Fechado" },
  ],

  /* ---------- Mensagem padrão do WhatsApp ---------- */
  mensagemWhatsapp: "Olá! Vim pelo site e gostaria de mais informações.",

  /* ---------- Simulação de financiamento ---------- */
  financiamento: {
    taxaMensal: 1.49,              // % ao mês (apenas ilustrativo)
    entradaPercentual: 30,         // entrada sugerida inicial (%)
    prazos: [12, 24, 36, 48, 60],  // opções de parcelas
    prazoPadrao: 48,
  },

  /* ---------- Textos da página inicial ---------- */
  home: {
    titulo: "Seu próximo<br>carro está aqui",
    subtitulo:
      "Carros populares e modelos premium revisados, com procedência garantida, financiamento facilitado e avaliação justa do seu usado na troca.",
    imagemHero: "assets/img/hero.jpg",
  },

  /* ---------- Números da loja (página Sobre) ---------- */
  numeros: [
    { valor: "12+", label: "anos de mercado" },
    { valor: "4.800", label: "carros entregues" },
    { valor: "98%", label: "clientes satisfeitos" },
    { valor: "60x", label: "para financiar" },
  ],
};

