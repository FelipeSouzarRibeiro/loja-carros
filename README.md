# Template — Loja de Carros

Template de site para loja de carros (populares e premium), sem dependências externas. Para colocar no ar, basta enviar todos os arquivos para qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, Hostinger etc.).

## Páginas

- `index.html` — Página inicial (hero, busca, carrossel de marcas, veículos em destaque, benefícios, categorias e contato)
- `comprar.html` — Estoque completo com carrossel de marcas, filtros e ordenação
- `carro.html?id=<id>` — Página individual de cada veículo (galeria, valores, simulador de financiamento, ficha técnica, laudo de procedência, histórico de mercado e semelhantes)
- `sobre.html` — História, números e diferenciais da loja
- `contato.html` — Botões diretos (WhatsApp, Instagram, e-mail), formulário, mapa e horários

## Como personalizar para uma nova loja

1. **Identidade, cores e contatos:** edite `js/config.js` (nome, slogan, cor principal, WhatsApp, Instagram, e-mail, endereço e horários).
2. **Carros e marcas:** edite `js/data.js`. Para cadastrar um carro novo, copie um bloco `{ ... }` dentro de `window.CARROS`, escolha um `id` único (ex.: `"honda-civic-2022"`) e coloque as fotos em `assets/img/cars/`. A página dele passa a existir automaticamente em `carro.html?id=honda-civic-2022`.
3. **Imagens gerais:** `assets/img/hero.jpg` (capa da página inicial) e `assets/img/sobre.jpg` (capa das páginas internas).

