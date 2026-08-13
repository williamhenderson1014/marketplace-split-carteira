'use client'

import { useNumero } from '../lib/hooks'
import { reais } from '../lib/data'

export function Valor({ v, moeda = true, duracao = 900, doZero = false }) {
  const n = useNumero(v, duracao, doZero ? 0 : null)
  return (
    <span className="num">
      {moeda ? 'R$ ' : ''}
      {reais(n)}
    </span>
  )
}

export function ValorGrande({ v, doZero = true }) {
  const n = useNumero(v, 1100, doZero ? 0 : null)
  return (
    <>
      <small>R$</small>
      {reais(n)}
    </>
  )
}

export function Celular({ hora, children }) {
  return (
    <div className="celular">
      <div className="celular-tela">
        <div className="celular-status">
          <span className="num">{hora}</span>
          <span className="sinais">
            <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
              <rect x="0" y="7" width="2.6" height="4" rx="0.8" />
              <rect x="4" y="5" width="2.6" height="6" rx="0.8" />
              <rect x="8" y="2.6" width="2.6" height="8.4" rx="0.8" />
              <rect x="12" y="0" width="2.6" height="11" rx="0.8" opacity=".3" />
            </svg>
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <path d="M1 4.1a8.6 8.6 0 0 1 12 0" />
              <path d="M3.4 6.6a5.2 5.2 0 0 1 7.2 0" />
              <circle cx="7" cy="9.2" r=".9" fill="currentColor" stroke="none" />
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none" aria-hidden="true">
              <rect x="0.6" y="0.6" width="18" height="9.8" rx="2.6" stroke="currentColor" strokeWidth="1.1" opacity=".5" />
              <rect x="2.4" y="2.4" width="12.4" height="6.2" rx="1.4" fill="currentColor" />
              <path d="M20.4 4v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".5" />
            </svg>
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Estrelas({ nota = 5, tamanho = 15, aoEscolher = null, escolhida = 0 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3, color: 'var(--laranja)' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={tamanho}
          height={tamanho}
          viewBox="0 0 24 24"
          fill={i <= (escolhida || nota) ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          onClick={aoEscolher ? () => aoEscolher(i) : undefined}
          style={aoEscolher ? { cursor: 'pointer' } : undefined}
          aria-hidden="true"
        >
          <path d="m12 3.6 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 10l6-.9Z" />
        </svg>
      ))}
    </span>
  )
}

// QR desenhado a partir de uma semente fixa. Não codifica nada, é enfeite honesto.
export function QrPix({ semente = 7 }) {
  const n = 25
  let s = semente
  const aleatorio = () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
  const marcador = (x, y) =>
    (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8)
  const celulas = []
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (marcador(x, y)) continue
      if (aleatorio() > 0.54) celulas.push([x, y])
    }
  }
  const olho = (ox, oy) => (
    <g key={`${ox}-${oy}`}>
      <rect x={ox} y={oy} width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x={ox + 2} y={oy + 2} width="3" height="3" rx="0.7" fill="currentColor" />
    </g>
  )
  return (
    <svg className="qr" viewBox={`-1 -1 ${n + 2} ${n + 2}`} style={{ color: 'var(--tinta)' }} aria-label="código PIX de demonstração">
      {olho(0, 0)}
      {olho(n - 7, 0)}
      {olho(0, n - 7)}
      {celulas.map(([x, y], i) => (
        <rect
          key={`${x}-${y}`}
          className="cel"
          x={x}
          y={y}
          width="1"
          height="1"
          rx="0.22"
          fill="currentColor"
          style={{ animationDelay: `${Math.min(600, i * 1.6)}ms` }}
        />
      ))}
    </svg>
  )
}
