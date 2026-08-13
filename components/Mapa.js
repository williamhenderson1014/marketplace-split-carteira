'use client'

import {
  mapa,
  caminhoRota,
  comprimentoTotal,
  pontoEm,
  rota,
  indiceLoja,
  pinoCliente,
} from '../lib/data'

function quadras() {
  const saida = []
  const { verticais, horizontais } = mapa
  for (let i = 0; i < verticais.length - 1; i++) {
    for (let j = 0; j < horizontais.length - 1; j++) {
      const x = verticais[i] + 9
      const y = horizontais[j] + 9
      const w = verticais[i + 1] - verticais[i] - 18
      const h = horizontais[j + 1] - horizontais[j] - 18
      if (w <= 0 || h <= 0) continue
      saida.push({ x, y, w, h, praca: i === 2 && j === 2 })
    }
  }
  return saida
}

const blocos = quadras()

export function Mapa({ t = 0, mostrarMotorista = false, faixa = null, altura = 'auto' }) {
  const p = pontoEm(t)
  return (
    <div className="mapa-caixa" style={{ height: altura }}>
      <svg viewBox={`0 0 ${mapa.largura} ${mapa.altura}`} role="img" aria-label="mapa do bairro, ilustrativo">
        {blocos.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="6"
            className={b.praca ? 'praca-verde' : 'quadra'}
          />
        ))}

        <path d={caminhoRota} className="rota-base" />
        <path
          d={caminhoRota}
          className="rota-feita"
          strokeDasharray={comprimentoTotal}
          strokeDashoffset={comprimentoTotal * (1 - Math.max(0, Math.min(1, t)))}
        />

        <g className="pino-mapa">
          <circle cx={rota[indiceLoja][0]} cy={rota[indiceLoja][1]} r="9" fill="#14181d" />
          <circle cx={rota[indiceLoja][0]} cy={rota[indiceLoja][1]} r="3.4" fill="#fff" />
          <text x={rota[indiceLoja][0] + 14} y={rota[indiceLoja][1] + 4}>
            Moura Burger
          </text>
        </g>

        <g className="pino-mapa">
          <circle cx={pinoCliente[0]} cy={pinoCliente[1]} r="9" fill="none" stroke="#14181d" strokeWidth="2.6" />
          <circle cx={pinoCliente[0]} cy={pinoCliente[1]} r="3.4" fill="#14181d" />
          <text x={pinoCliente[0] - 12} y={pinoCliente[1] - 16} textAnchor="end">
            Bruna
          </text>
        </g>

        {mostrarMotorista && (
          <g className="ponto-motorista" transform={`translate(${p.x} ${p.y})`}>
            <circle className="ping" r="9" />
            <circle r="10.5" fill="#0e7c58" stroke="#fff" strokeWidth="3" />
            <g transform="rotate(0)" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round">
              <circle cx="-3.2" cy="2.4" r="2.1" />
              <circle cx="3.6" cy="2.4" r="2.1" />
              <path d="M-3.2 2.4h2.2l2-3.2h1.7" />
              <path d="M1.8 -0.8 1 -2.6h-1.2" />
            </g>
          </g>
        )}
      </svg>
      {faixa}
    </div>
  )
}
