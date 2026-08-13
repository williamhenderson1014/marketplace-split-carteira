'use client'

import { useEffect, useRef, useState } from 'react'

function menosMovimento() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const suave = (t) => 1 - Math.pow(1 - t, 3)

// Persegue um número alvo com requestAnimationFrame. Serve tanto para o motorista
// andando pela rota quanto para os valores em reais subindo no painel.
export function useNumero(alvo, duracao = 900, deMontagem = null) {
  const [valor, setValor] = useState(deMontagem === null ? alvo : deMontagem)
  const ref = useRef({ de: deMontagem === null ? alvo : deMontagem, para: alvo, t0: 0, raf: 0 })

  useEffect(() => {
    const estado = ref.current
    if (estado.para === alvo && estado.de === alvo) return
    if (menosMovimento() || duracao <= 0) {
      estado.de = alvo
      estado.para = alvo
      setValor(alvo)
      return
    }
    estado.de = valorAtual(estado)
    estado.para = alvo
    estado.t0 = performance.now()

    const passo = (agora) => {
      const p = Math.min(1, (agora - estado.t0) / duracao)
      const v = estado.de + (estado.para - estado.de) * suave(p)
      setValor(v)
      if (p < 1) estado.raf = requestAnimationFrame(passo)
    }
    cancelAnimationFrame(estado.raf)
    estado.raf = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(estado.raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alvo, duracao])

  useEffect(() => () => cancelAnimationFrame(ref.current.raf), [])

  return valor
}

function valorAtual(estado) {
  if (!estado.t0) return estado.de
  const p = Math.min(1, (performance.now() - estado.t0) / 900)
  return estado.de + (estado.para - estado.de) * suave(p)
}

// Vira verdadeiro depois da hidratação, para as animações de entrada não brigarem com o SSR.
export function useMontado() {
  const [pronto, setPronto] = useState(false)
  useEffect(() => setPronto(true), [])
  return pronto
}

// Mede o botão ativo e devolve o estilo da pílula que desliza atrás dele.
// Medir em vez de chutar largura é o que faz a pílula continuar certa quando a
// fonte carrega, quando a tela encolhe e quando o texto muda de tamanho.
export function usePilula(ativo) {
  const caixa = useRef(null)
  const [estilo, setEstilo] = useState({ width: 0, transform: 'translateX(0px)', opacity: 0 })

  useEffect(() => {
    const medir = () => {
      const c = caixa.current
      if (!c) return
      const alvo = c.querySelectorAll('[data-pilula]')[ativo]
      if (!alvo) return
      setEstilo({
        width: alvo.offsetWidth,
        transform: `translateX(${alvo.offsetLeft}px)`,
        opacity: 1,
      })
    }
    medir()
    const atraso = setTimeout(medir, 240)
    window.addEventListener('resize', medir)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir).catch(() => {})
    return () => {
      clearTimeout(atraso)
      window.removeEventListener('resize', medir)
    }
  }, [ativo])

  return [caixa, estilo]
}

export function useRelogio(ativo, intervalo, aoBater) {
  const guardado = useRef(aoBater)
  guardado.current = aoBater
  useEffect(() => {
    if (!ativo) return
    const id = setInterval(() => guardado.current(), intervalo)
    return () => clearInterval(id)
  }, [ativo, intervalo])
}
