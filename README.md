# Uma conta, três perfis, um pedido

Maquete de um marketplace de delivery com três perfis vivendo na mesma conta: cliente, vendedor e
motorista. A página segue **um pedido só**, do carrinho até o dinheiro cair, e usa esse pedido para
responder à única pergunta que decide a arquitetura de uma plataforma de três lados:

> a troca de perfil é uma tela, ou é qual carteira responde?

Neste pedido a mesma pessoa vende pela loja e entrega a corrida. É o caso que quase todo produto
desse tipo pede e é exatamente o caso que quebra a carteira quando ela está pendurada na conta em
vez de estar pendurada no perfil.

## O que dá para fazer aqui

- Mexer no carrinho no celular do cliente e ver o painel do dinheiro recalcular item por item.
- Andar pela linha do tempo do pedido: carrinho, PIX, aceite da loja, rota, entrega, repasse.
- Trocar entre os três perfis com o mesmo login e ver a mesma noite de três ângulos.
- Aprovar o documento da subconta do motorista e ver o valor retido ser liberado.
- Virar a chave da carteira e ver as duas receitas virarem um número só, com o erro explicado.

## Como rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

Deploy: qualquer host que rode Next.js. Não há variável de ambiente, chave de API nem passo de
configuração.

## O que existe por baixo

Nada. Não há backend, banco de dados, API route, gateway de pagamento nem Google Maps. Todo o
estado vive no navegador e todos os dados saem de um arquivo só, `lib/data.js`. O mapa é uma malha
viária desenhada à mão em SVG e a posição do motorista é interpolada ao longo de uma polilinha.
O QR do PIX é um desenho determinístico e não codifica nada.

Todos os nomes, valores, documentos e subcontas são inventados, e nenhum número da página é
proposta comercial ou estimativa de preço.

## Estrutura

```
app/
  layout.js        Poppins, metadados, ícone
  page.js          entrada
  globals.css      paleta, animações e todo o estilo
  icon.svg         favicon
components/
  Demo.js          estado da página, linha do tempo, troca de perfil
  Cliente.js       celular de quem compra: cardápio, busca, sacola, PIX, rastreio, avaliação
  Vendedor.js      painel desktop da loja: pedido, estoque, motorista chegando, equipe, financeiro
  Motorista.js     celular de quem entrega: online, corrida, rota, carteira, subconta
  Dinheiro.js      custódia e split por documento
  Carteira.js      a faixa escura, carteira no perfil contra carteira na conta
  Mapa.js          malha viária e posição do motorista em SVG
  ui.js            celular, contadores de valor, estrelas, QR
  icons.js         ícones SVG desenhados à mão
lib/
  data.js          todos os dados inventados e a matemática do split
  hooks.js         animação numérica, pílula medida, relógio da linha do tempo
```

## Decisões de interface

- Fonte Poppins em três pesos, 400, 500 e 600.
- Paleta fechada em quatro cores: tinta, papel, verde e laranja. O verde é a marca e é dinheiro no
  lugar certo, o laranja só aparece quando algo está retido ou errado. Todos os cinzas são a
  própria tinta em opacidades diferentes.
- Nenhum gradiente em lugar nenhum.
- Ícones desenhados à mão em SVG, sem biblioteca de ícones.
- Animações em CSS e requestAnimationFrame, respeitando `prefers-reduced-motion`.
- Desktop e celular no mesmo código, e o formato do aparelho segue o perfil: cliente e motorista
  aparecem em celular, a loja aparece em painel de desktop.
