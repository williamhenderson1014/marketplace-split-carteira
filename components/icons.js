// Ícones desenhados à mão em SVG, todos no mesmo traço de 1,6 e na mesma caixa de 24.
// Nenhuma biblioteca de ícones, nenhum arquivo de fonte de ícone.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ tamanho = 18, children, ...resto }) {
  return (
    <svg width={tamanho} height={tamanho} aria-hidden="true" {...base} {...resto}>
      {children}
    </svg>
  )
}

export const IconePessoa = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M4.6 20c.9-3.4 3.8-5.2 7.4-5.2s6.5 1.8 7.4 5.2" />
  </Svg>
)

export const IconeLoja = (p) => (
  <Svg {...p}>
    <path d="M4 9.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.5" />
    <path d="M3 6.2 4.3 4h15.4L21 6.2c.4 2-.9 3.5-2.6 3.5-1.4 0-2.4-.9-2.6-2-.2 1.1-1.2 2-2.6 2s-2.4-.9-2.6-2c-.2 1.1-1.2 2-2.6 2-1.7 0-3-1.5-2.6-3.5Z" />
    <path d="M9.6 20v-4.6h4.8V20" />
  </Svg>
)

export const IconeMoto = (p) => (
  <Svg {...p}>
    <circle cx="5.4" cy="16.6" r="3" />
    <circle cx="18.6" cy="16.6" r="3" />
    <path d="M5.4 16.6h4.2l4-6.4h3.2" />
    <path d="M13.6 10.2 12 6.6h-2" />
    <path d="M16.8 10.2l1.8 6.4" />
  </Svg>
)

export const IconeCarteira = (p) => (
  <Svg {...p}>
    <path d="M3.5 7.6A2.1 2.1 0 0 1 5.6 5.5h11a1.4 1.4 0 0 1 1.4 1.4v1.4" />
    <rect x="3.5" y="7.6" width="17" height="11.4" rx="2.1" />
    <circle cx="16.3" cy="13.3" r="1.2" />
  </Svg>
)

export const IconePix = (p) => (
  <Svg {...p}>
    <path d="M12 3.4 20.6 12 12 20.6 3.4 12Z" />
    <path d="M8.4 8.4 12 12l3.6-3.6" />
    <path d="M8.4 15.6 12 12l3.6 3.6" />
  </Svg>
)

export const IconeCartao = (p) => (
  <Svg {...p}>
    <rect x="2.8" y="5.4" width="18.4" height="13.2" rx="2.2" />
    <path d="M2.8 10h18.4" />
    <path d="M6.4 14.6h3.2" />
  </Svg>
)

export const IconeBusca = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.4" />
    <path d="m16 16 4.2 4.2" />
  </Svg>
)

export const IconeSacola = (p) => (
  <Svg {...p}>
    <path d="M5.6 8h12.8l-1 11.2a1.6 1.6 0 0 1-1.6 1.4H8.2a1.6 1.6 0 0 1-1.6-1.4Z" />
    <path d="M9 8V6.4a3 3 0 0 1 6 0V8" />
  </Svg>
)

export const IconeMais = (p) => (
  <Svg {...p}>
    <path d="M12 6v12M6 12h12" />
  </Svg>
)

export const IconeMenos = (p) => (
  <Svg {...p}>
    <path d="M6 12h12" />
  </Svg>
)

export const IconeCerto = (p) => (
  <Svg {...p}>
    <path d="m5 12.6 4.6 4.4L19 7" />
  </Svg>
)

export const IconeRelogio = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.4V12l3 1.8" />
  </Svg>
)

export const IconePino = (p) => (
  <Svg {...p}>
    <path d="M12 21c4.2-4.4 6.3-7.6 6.3-10.4A6.3 6.3 0 0 0 5.7 10.6C5.7 13.4 7.8 16.6 12 21Z" />
    <circle cx="12" cy="10.4" r="2.3" />
  </Svg>
)

export const IconeSeta = (p) => (
  <Svg {...p}>
    <path d="M4.6 12h14" />
    <path d="m13.4 6.6 5.2 5.4-5.2 5.4" />
  </Svg>
)

export const IconeEstrela = ({ tamanho = 18, cheia = false, ...resto }) => (
  <svg
    width={tamanho}
    height={tamanho}
    viewBox="0 0 24 24"
    fill={cheia ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinejoin="round"
    aria-hidden="true"
    {...resto}
  >
    <path d="m12 3.6 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 10l6-.9Z" />
  </svg>
)

export const IconeDocumento = (p) => (
  <Svg {...p}>
    <path d="M6.4 3.6h7l4.2 4.2v12.6H6.4Z" />
    <path d="M13.4 3.6v4.2h4.2" />
    <path d="M9.2 13h5.6M9.2 16.4h4" />
  </Svg>
)

export const IconeAlerta = (p) => (
  <Svg {...p}>
    <path d="M12 4.4 21 19.6H3Z" />
    <path d="M12 10v3.8" />
    <circle cx="12" cy="16.6" r=".9" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconeCadeado = (p) => (
  <Svg {...p}>
    <rect x="5" y="10.4" width="14" height="9.6" rx="2" />
    <path d="M8.4 10.4V8a3.6 3.6 0 0 1 7.2 0v2.4" />
  </Svg>
)

export const IconeTocar = (p) => (
  <Svg {...p}>
    <path d="M8 5.4 18.6 12 8 18.6Z" />
  </Svg>
)

export const IconePausa = (p) => (
  <Svg {...p}>
    <path d="M9.4 5.6v12.8M14.6 5.6v12.8" />
  </Svg>
)

export const IconeVoltar = (p) => (
  <Svg {...p}>
    <path d="M4.4 5.6v5.2h5.2" />
    <path d="M5.4 14a7.2 7.2 0 1 0 1.2-6" />
  </Svg>
)

export const IconeCaixa = (p) => (
  <Svg {...p}>
    <path d="m12 3.4 8 4v9.2l-8 4-8-4V7.4Z" />
    <path d="m4 7.4 8 4 8-4" />
    <path d="M12 11.4v9.2" />
  </Svg>
)

export const IconeSino = (p) => (
  <Svg {...p}>
    <path d="M6.4 10.4a5.6 5.6 0 0 1 11.2 0c0 3.4.9 5 1.8 6H4.6c.9-1 1.8-2.6 1.8-6Z" />
    <path d="M10 19.6a2.2 2.2 0 0 0 4 0" />
  </Svg>
)

export const IconeTroca = (p) => (
  <Svg {...p}>
    <path d="M4.4 8.4h13.2l-3.2-3.2" />
    <path d="M19.6 15.6H6.4l3.2 3.2" />
  </Svg>
)

export const IconeMarca = ({ tamanho = 26, ...resto }) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 32 32" fill="none" aria-hidden="true" {...resto}>
    <rect width="32" height="32" rx="9" fill="currentColor" />
    <path
      d="M9 21.4 15.2 9.6h1.9l6.2 11.8h-3.3l-1.1-2.3h-5.4l-1.1 2.3Z"
      fill="#fff"
      opacity=".95"
    />
    <path d="M14.7 16.6h3.1l-1.5-3.2Z" fill="currentColor" />
  </svg>
)
