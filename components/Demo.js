'use client'

import { useMemo, useState } from 'react'
import {
  conta,
  perfis,
  etapas,
  contas,
  carrinhoInicial,
  progressoDaEtapa,
  tLoja,
} from '../lib/data'
import { useNumero, useRelogio, usePilula } from '../lib/hooks'
import Cliente from './Cliente'
import Vendedor from './Vendedor'
import Motorista from './Motorista'
import Dinheiro from './Dinheiro'
import Carteira from './Carteira'
import {
  IconeMarca,
  IconePessoa,
  IconeLoja,
  IconeMoto,
  IconeTocar,
  IconePausa,
  IconeVoltar,
  IconeSeta,
  IconeCerto,
  IconeRelogio,
  IconeAlerta,
} from './icons'

const iconePerfil = {
  cliente: IconePessoa,
  vendedor: IconeLoja,
  motorista: IconeMoto,
}

export default function Demo() {
  const [etapa, setEtapa] = useState(0)
  const [tocando, setTocando] = useState(true)
  const [perfil, setPerfil] = useState('cliente')
  const [itens, setItens] = useState(carrinhoInicial)
  const [docAprovado, setDocAprovado] = useState(false)

  const c = useMemo(() => contas(itens), [itens])
  const vazio = c.linhas.length === 0

  const t = useNumero(progressoDaEtapa(etapa), 2600)

  const indicePerfil = perfis.findIndex((p) => p.id === perfil)
  const [refPerfis, estiloPilula] = usePilula(indicePerfil)

  // A primeira etapa é a única em que dá para mexer no carrinho, então ela respira mais.
  useRelogio(tocando && !vazio, etapa === 0 ? 7200 : 3800, () => {
    setEtapa((e) => {
      if (e >= etapas.length - 1) {
        setTocando(false)
        return e
      }
      return e + 1
    })
  })

  // Assim que a pessoa encosta em alguma coisa, o relógio para e o controle é dela.
  function pausar() {
    setTocando(false)
  }

  function mudarItem(id, delta) {
    if (etapa > 0) return
    pausar()
    setItens((atual) => {
      const q = (atual[id] || 0) + delta
      const novo = { ...atual }
      if (q <= 0) delete novo[id]
      else novo[id] = Math.min(5, q)
      return novo
    })
  }

  const minutosAte = Math.max(1, Math.ceil((1 - Math.min(1, t / tLoja)) * 5))
  const Painel = perfil === 'cliente' ? Cliente : perfil === 'vendedor' ? Vendedor : Motorista

  return (
    <div className="pagina">
      <header className="topo">
        <div className="limite topo-linha">
          <span className="marca">
            <IconeMarca tamanho={30} />
            <span>
              <b>AinFast</b>
              <span>maquete de leitura do projeto</span>
            </span>
          </span>

          <span className="conta-chip">
            <span className="avatar">{conta.inicial}</span>
            <span>
              <strong>{conta.nome}</strong>
              <small>{conta.login}, três perfis</small>
            </span>
          </span>

          <nav className="perfis" ref={refPerfis} aria-label="perfis da mesma conta">
            <span className="pilula" style={estiloPilula} />
            {perfis.map((p) => {
              const Ico = iconePerfil[p.id]
              return (
                <button
                  key={p.id}
                  data-pilula
                  className={`perfil-bt${p.id === perfil ? ' ativo' : ''}`}
                  onClick={() => setPerfil(p.id)}
                  aria-pressed={p.id === perfil}
                >
                  <Ico tamanho={15} />
                  {p.nome}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <section className="limite abertura">
        <span className="selo">
          <i /> um pedido de verdade, do carrinho até o dinheiro cair
        </span>
        <h1>
          A troca de perfil não é uma tela. É <em>qual carteira responde</em>.
        </h1>
        <p>
          Esta é uma leitura do que vocês descreveram, montada para testar uma decisão só. O Rafael
          tem uma conta na AinFast. Nesta noite ele vende pela Moura Burger e entrega o próprio
          pedido, porque a Bruna mora a 2,4 km da loja. Acompanhe o pedido 4471 pelos três perfis e
          olhe o que acontece embaixo, no dinheiro.
        </p>
      </section>

      <section className="tempo">
        <div className="limite">
          <div className="tempo-cabeca">
            <h2>Pedido 4471</h2>
            <p>{etapas[etapa].titulo}</p>
            <div className="controles">
              <button
                className="bt-redondo"
                onClick={() => setTocando((v) => !v)}
                aria-label={tocando ? 'pausar' : 'continuar'}
                disabled={vazio}
              >
                {tocando ? <IconePausa tamanho={15} /> : <IconeTocar tamanho={15} />}
              </button>
              <button
                className="bt-redondo"
                onClick={() => {
                  setEtapa(0)
                  setDocAprovado(false)
                  setTocando(false)
                }}
                aria-label="voltar ao começo"
              >
                <IconeVoltar tamanho={15} />
              </button>
            </div>
          </div>

          <div className="trilho">
            <span
              className="trilho-preenche"
              style={{ width: `${(etapa / (etapas.length - 1)) * 100}%` }}
            />
            {etapas.map((e, i) => (
              <button
                key={e.id}
                className={`passo${i === etapa ? ' agora' : i < etapa ? ' feito' : ''}`}
                onClick={() => {
                  if (vazio && i > 0) return
                  setEtapa(i)
                  setTocando(false)
                }}
              >
                <b>{e.curto}</b>
                <small className="num">{e.hora}</small>
              </button>
            ))}
          </div>

          <p className="nota-etapa">
            <IconeSeta tamanho={14} />
            {vazio ? 'Coloque algo na sacola do celular para o pedido voltar a andar.' : etapas[etapa].nota}
          </p>
        </div>
      </section>

      <section className="limite">
        <p className="sob-perfis">
          Um login em cima, três perfis embaixo, e nenhum cadastro repetido. Neste pedido o{' '}
          <b>vendedor</b> e o <b>motorista</b> são a mesma pessoa, que é exatamente o caso que vocês
          pediram e exatamente o caso que quebra a carteira.
        </p>
      </section>

      <div className="limite palco">
        <div>
          <Painel
            key={perfil}
            etapa={etapa}
            itens={itens}
            mudarItem={mudarItem}
            c={c}
            t={t}
            docAprovado={docAprovado}
            minutosAte={minutosAte}
            pausar={pausar}
          />
        </div>
        <aside className="coluna-dir">
          <Dinheiro
            etapa={etapa}
            c={c}
            docAprovado={docAprovado}
            aprovar={() => setDocAprovado(true)}
          />
        </aside>
      </div>

      <Carteira c={c} docAprovado={docAprovado} />

      <section className="limite fechamento">
        <span className="micro">Antes de qualquer orçamento</span>
        <h2>O que uma maquete prova e o que ela não prova</h2>
        <p>
          Vocês pediram uma auditoria, e auditoria é uma palavra que muda de tamanho conforme quem
          responde. Esta página deixa claro de que tamanho eu falo.
        </p>

        <div className="grade-listas">
          <div className="lista-caixa">
            <h3>O que esta página prova</h3>
            <p>Está tudo funcionando aqui do lado, dá para clicar e conferir.</p>
            <ul>
              {[
                'Um login e três perfis, com o mesmo humano vendendo e entregando',
                'Um pedido inteiro, do carrinho ao repasse, com o valor batendo no centavo',
                'A divisão por documento, com uma subconta por recebedor',
                'A carteira no perfil contra a carteira na conta, com o erro visível',
                'A retenção por documento pendente, que é papel e não é código',
              ].map((x) => (
                <li className="pronto" key={x}>
                  <IconeCerto tamanho={14} />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="lista-caixa">
            <h3>O que está só desenhado</h3>
            <p>Aparece na tela para dar contexto, mas não tem nada atrás.</p>
            <ul>
              {[
                'Relatórios e módulo financeiro, aqui são três números fixos',
                'Gestão de equipe, é uma lista sem permissão nenhuma',
                'Avaliações, guardam a nota na tela e mais nada',
                'Notificação push, cartão de crédito e o gateway de verdade',
                'O mapa é desenhado à mão, não é Google Maps nem rota calculada',
              ].map((x) => (
                <li className="depois" key={x}>
                  <IconeRelogio tamanho={14} />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="lista-caixa">
            <h3>O que eu abriria primeiro no protótipo de vocês</h3>
            <p>Na ordem, seguindo um pedido só, não tela por tela.</p>
            <ul>
              {[
                'O pedido chega a existir fora do navegador, ou morre no estado da tela?',
                'Quem é o recebedor de cada centavo, hoje, no código que existe',
                'O que acontece com o estoque quando dois pedidos entram no mesmo segundo',
                'A posição do motorista sobrevive ao celular dele dormir na rua?',
                'Quantos cadastros a mesma pessoa precisa fazer para virar loja e motorista',
              ].map((x) => (
                <li className="depois" key={x}>
                  <IconeAlerta tamanho={14} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="rodape">
        <div className="limite">
          <p className="aviso-mock">
            <b>Isto é uma maquete.</b> Todos os nomes, valores, documentos, subcontas e fotos são
            inventados. Não existe banco de dados, servidor, gateway de pagamento nem Google Maps
            por trás desta página, e nenhum número aqui é proposta comercial nem estimativa de
            preço. Tudo roda no seu navegador.
          </p>
          <div className="rodape-linha">
            <strong>AinFast, maquete de leitura</strong>
            <span>uma conta, três perfis, um pedido</span>
            <span style={{ marginLeft: 'auto' }} className="num">
              2026
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
