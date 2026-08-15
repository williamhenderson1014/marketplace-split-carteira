// Todos os dados desta demonstração são inventados e vivem neste arquivo.
// Não existe backend, banco, API nem gateway de verdade em lugar nenhum do projeto.

const BASE = process.env.BASE || ''

export const conta = {
  nome: 'Rafael Moura',
  inicial: 'RM',
  email: 'rafael@mouraburger.com.br',
  desde: 'março de 2026',
  login: 'um login',
}

export const perfis = [
  {
    id: 'cliente',
    nome: 'Cliente',
    linha: 'a tela de quem compra',
    aparelho: 'celular',
    documento: null,
  },
  {
    id: 'vendedor',
    nome: 'Vendedor',
    linha: 'o painel da loja',
    aparelho: 'desktop',
    documento: 'CNPJ 41.208.***/0001-09',
  },
  {
    id: 'motorista',
    nome: 'Motorista',
    linha: 'o app de quem entrega',
    aparelho: 'celular',
    documento: 'CPF ***.418.902-**',
  },
]

export const loja = {
  nome: 'Moura Burger',
  dono: 'Rafael Moura',
  razao: 'Moura Burger Alimentos LTDA',
  nota: '4,8',
  avaliacoes: 312,
  preparo: '18 a 28 min',
  endereco: 'Av. Sete de Abril, 980, Vila Rica',
  capa: `${BASE}/img/loja.jpg`,
  equipe: [
    { nome: 'Cátia S.', papel: 'cozinha', ativo: true },
    { nome: 'Jonas P.', papel: 'balcão', ativo: true },
    { nome: 'Rafael M.', papel: 'dono, entrega hoje', ativo: true },
  ],
}

export const catalogo = [
  {
    id: 'smash',
    nome: 'Smash duplo',
    desc: 'dois hambúrgueres de 90 g, queijo, picles e molho da casa',
    preco: 32.9,
    img: `${BASE}/img/burger.jpg`,
    estoque: 14,
  },
  {
    id: 'combo',
    nome: 'Combo cheddar com fritas',
    desc: 'burger de cheddar, fritas rústicas e refrigerante lata',
    preco: 26.5,
    img: `${BASE}/img/combo.jpg`,
    estoque: 9,
  },
  {
    id: 'acai',
    nome: 'Açaí 500 ml',
    desc: 'açaí batido na hora, granola, banana e leite condensado',
    preco: 21.9,
    img: `${BASE}/img/acai.jpg`,
    estoque: 22,
  },
  {
    id: 'pastel',
    nome: 'Pastel de queijo',
    desc: 'massa fina, queijo coalho, sai frito na hora do pedido',
    preco: 12.0,
    img: `${BASE}/img/pastel.jpg`,
    estoque: 31,
  },
]

export const carrinhoInicial = { smash: 1, combo: 1 }

export const taxaEntrega = 9.0
export const comissao = 0.12

export const cliente = {
  nome: 'Bruna Sales',
  inicial: 'BS',
  endereco: 'Rua das Palmeiras, 214, apto 71, Jardim Aurora',
  referencia: 'portão verde, interfone 71',
  pagamento: 'PIX',
  cartao: 'Visa final 4417',
}

export const motorista = {
  nome: 'Rafael Moura',
  veiculo: 'Honda CG 160, prata',
  placa: 'QNB 4E71',
  nota: '4,9',
  corridas: 1284,
  foto: `${BASE}/img/moto.jpg`,
}

export const etapas = [
  {
    id: 'carrinho',
    curto: 'Carrinho',
    titulo: 'Bruna monta o pedido',
    hora: '19:04',
    nota: 'ainda dá para mexer no carrinho, e o painel do dinheiro acompanha item por item',
  },
  {
    id: 'pagamento',
    curto: 'Pagamento',
    titulo: 'PIX confirmado em 4 segundos',
    hora: '19:05',
    nota: 'o valor entra em custódia no gateway, não na conta da plataforma',
  },
  {
    id: 'aceito',
    curto: 'Loja aceitou',
    titulo: 'Moura Burger aceitou e começou a preparar',
    hora: '19:07',
    nota: 'o estoque baixa aqui, não no carrinho, senão pedido não pago derruba item',
  },
  {
    id: 'rota',
    curto: 'Em rota',
    titulo: 'Rafael pegou a corrida da própria loja',
    hora: '19:21',
    nota: 'a mesma pessoa é o vendedor e o motorista deste pedido',
  },
  {
    id: 'entregue',
    curto: 'Entregue',
    titulo: 'Bruna recebeu e avaliou',
    hora: '19:38',
    nota: 'a entrega fecha o pedido, não fecha o dinheiro',
  },
  {
    id: 'repasse',
    curto: 'Repasse',
    titulo: 'O split cai nas subcontas',
    hora: '19:39',
    nota: 'é aqui que a carteira no lugar errado começa a doer',
  },
]

export const subcontas = {
  vendedor: {
    titular: 'Moura Burger Alimentos LTDA',
    documento: 'CNPJ 41.208.***/0001-09',
    id: 'sc_9f21c8',
    status: 'aprovada',
    desde: '02/04/2026',
  },
  motorista: {
    titular: 'Rafael A. Moura',
    documento: 'CPF ***.418.902-**',
    id: 'sc_b70455',
    status: 'em análise',
    pendencia: 'CNH aberta e selfie de conferência',
    fila: '2 a 5 dias úteis',
  },
}

// Almoço que o Rafael comprou no próprio app, como cliente, mais cedo.
export const compraDoDono = {
  hora: '12:40',
  valor: 34.9,
  onde: 'Cantina da Praça',
}

// ---------- mapa ----------
// Malha viária desenhada à mão, coordenadas em SVG. Sem mapa de verdade, sem chave de API.

export const mapa = {
  largura: 600,
  altura: 390,
  verticais: [-30, 60, 180, 300, 420, 540, 630],
  horizontais: [-30, 60, 150, 240, 330, 420],
  praca: { x: 300, y: 240 },
}

export const rota = [
  [60, 330],
  [60, 240],
  [180, 240],
  [180, 150],
  [420, 150],
  [420, 60],
  [540, 60],
  [540, 150],
]

export const indiceLoja = 2
export const pinoCliente = [540, 150]

function comprimentos(pontos) {
  const acc = [0]
  for (let i = 1; i < pontos.length; i++) {
    const dx = pontos[i][0] - pontos[i - 1][0]
    const dy = pontos[i][1] - pontos[i - 1][1]
    acc.push(acc[i - 1] + Math.hypot(dx, dy))
  }
  return acc
}

export const acumulado = comprimentos(rota)
export const comprimentoTotal = acumulado[acumulado.length - 1]
export const tLoja = acumulado[indiceLoja] / comprimentoTotal

export function pontoEm(t) {
  const alvo = Math.max(0, Math.min(1, t)) * comprimentoTotal
  for (let i = 1; i < acumulado.length; i++) {
    if (alvo <= acumulado[i] || i === acumulado.length - 1) {
      const trecho = acumulado[i] - acumulado[i - 1]
      const f = trecho === 0 ? 0 : (alvo - acumulado[i - 1]) / trecho
      return {
        x: rota[i - 1][0] + (rota[i][0] - rota[i - 1][0]) * f,
        y: rota[i - 1][1] + (rota[i][1] - rota[i - 1][1]) * f,
        angulo:
          (Math.atan2(rota[i][1] - rota[i - 1][1], rota[i][0] - rota[i - 1][0]) * 180) / Math.PI,
      }
    }
  }
  return { x: rota[0][0], y: rota[0][1], angulo: 0 }
}

export const caminhoRota = rota.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')

// Progresso do motorista em cada etapa: antes de aceitar ele não aparece,
// da aceitação até a loja é o primeiro trecho, e o resto é a entrega.
export function progressoDaEtapa(etapa) {
  if (etapa <= 1) return 0
  if (etapa === 2) return tLoja
  if (etapa === 3) return 1
  return 1
}

// ---------- dinheiro ----------

export function contas(itens) {
  const linhas = catalogo
    .filter((p) => (itens[p.id] || 0) > 0)
    .map((p) => ({ ...p, qtd: itens[p.id], total: p.preco * itens[p.id] }))
  const subtotal = linhas.reduce((s, l) => s + l.total, 0)
  const entrega = linhas.length ? taxaEntrega : 0
  const total = subtotal + entrega
  const taxaPlataforma = Math.round(subtotal * comissao * 100) / 100
  const aoVendedor = Math.round((subtotal - taxaPlataforma) * 100) / 100
  const aoMotorista = entrega
  return { linhas, subtotal, entrega, total, taxaPlataforma, aoVendedor, aoMotorista }
}

// Quem digita no celular quase nunca põe acento, então a busca também não exige.
export function semAcento(s) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function reais(v) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
