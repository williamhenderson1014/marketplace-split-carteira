'use client'

import { catalogo, loja, cliente, reais, subcontas } from '../lib/data'
import { Valor } from './ui'
import { Mapa } from './Mapa'
import {
  IconeLoja,
  IconeSino,
  IconeCaixa,
  IconeMoto,
  IconePessoa,
  IconeCerto,
  IconeRelogio,
  IconeCarteira,
  IconeAlerta,
} from './icons'

export default function Vendedor({ etapa, itens, c, t, minutosAte }) {
  const aceito = etapa >= 2
  const estoqueDe = (p) => (aceito ? p.estoque - (itens[p.id] || 0) : p.estoque)

  return (
    <div className="painel cena">
      <div className="painel-topo">
        <span className="pontos">
          <i />
          <i />
          <i />
        </span>
        <IconeLoja tamanho={18} />
        <div>
          <b style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>{loja.nome}</b>
          <div style={{ fontSize: 11, color: 'var(--fraco)' }}>{loja.endereco}</div>
        </div>
        <span className="etiqueta verde" style={{ marginLeft: 'auto' }}>
          loja aberta
        </span>
        <span className="etiqueta">
          <IconeSino tamanho={12} /> 1 novo
        </span>
      </div>

      <div className="kpis">
        <div className="kpi">
          <span className="micro">Pedidos hoje</span>
          <b className="num">{etapa >= 1 ? 27 : 26}</b>
        </div>
        <div className="kpi">
          <span className="micro">Faturamento do dia</span>
          <b>
            <Valor v={1284.6 + (etapa >= 1 ? c.subtotal : 0)} />
          </b>
        </div>
        <div className="kpi">
          <span className="micro">A receber no repasse</span>
          <b style={{ color: etapa >= 5 ? 'var(--verde)' : undefined }}>
            <Valor v={etapa >= 5 ? c.aoVendedor : 0} />
          </b>
        </div>
      </div>

      <div className="painel-grade">
        <div className="painel-cel larga">
          <span className="micro">Pedido que entrou agora</span>
          {etapa === 0 ? (
            <p style={{ margin: '10px 0 0', fontSize: 13.5, color: 'var(--fraco)' }}>
              Nenhum pedido novo. O da Bruna ainda está no carrinho dela.
            </p>
          ) : (
            <div className="pedido-novo" style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <b style={{ fontSize: 15, fontWeight: 600 }}>#4471</b>
                <span style={{ fontSize: 12.5, color: 'var(--suave)' }}>
                  {cliente.nome}, {cliente.endereco.split(',')[0]}
                </span>
                <span className="etiqueta verde" style={{ marginLeft: 'auto' }}>
                  <IconeCerto tamanho={12} /> PIX pago
                </span>
              </div>
              {c.linhas.map((l) => (
                <div className="linha-item" key={l.id}>
                  <span>
                    {l.qtd}x {l.nome}
                  </span>
                  <span className="num">R$ {reais(l.total)}</span>
                </div>
              ))}
              <div
                className="linha-item"
                style={{ borderTop: '1px dashed var(--linha)', marginTop: 6, paddingTop: 8 }}
              >
                <b style={{ fontWeight: 600 }}>Total do cliente</b>
                <b className="num" style={{ fontWeight: 600 }}>
                  R$ {reais(c.total)}
                </b>
              </div>

              <div style={{ marginTop: 12 }}>
                {aceito ? (
                  <span className="etiqueta tinta">
                    <IconeRelogio tamanho={12} />
                    {etapa === 2 ? 'em preparo, 18 min' : 'saiu da loja às 19:21'}
                  </span>
                ) : (
                  <button className="bt-cheio" style={{ marginTop: 0 }}>
                    <IconeCerto tamanho={16} /> Aceitar e começar o preparo
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="painel-cel">
          <span className="micro">Estoque, baixa no aceite</span>
          <div style={{ marginTop: 8 }}>
            {catalogo.map((p) => {
              const q = estoqueDe(p)
              const caiu = aceito && (itens[p.id] || 0) > 0
              return (
                <div className="estoque-linha" key={p.id}>
                  <span style={{ minWidth: 118, fontSize: 12.5 }}>{p.nome}</span>
                  <span className="barra">
                    <i style={{ width: `${Math.max(4, (q / 34) * 100)}%` }} />
                  </span>
                  <span className={`qtd${caiu ? ' caindo' : ''}`}>{q}</span>
                </div>
              )
            })}
          </div>
          <p className="fora-escopo">
            Se o estoque baixasse no carrinho, carrinho abandonado derrubaria item que ninguém
            comprou. Por isso ele baixa aqui, no aceite.
          </p>
        </div>

        <div className="painel-cel">
          <span className="micro">Quem está entregando</span>
          {etapa < 2 ? (
            <p style={{ margin: '10px 0 0', fontSize: 13, color: 'var(--fraco)' }}>
              Nenhum motorista na corrida ainda.
            </p>
          ) : (
            <>
              <div className="chegando" style={{ marginTop: 10 }}>
                <IconeMoto tamanho={20} />
                <div>
                  <b style={{ fontSize: 13.5, fontWeight: 500, display: 'block' }}>
                    {etapa === 2 ? 'Rafael está vindo buscar' : 'Rafael saiu com o pedido'}
                  </b>
                  <small style={{ fontSize: 11.5, color: 'var(--suave)' }}>
                    Honda CG 160, placa QNB 4E71
                  </small>
                </div>
                <span className="relogio">
                  {etapa === 2 ? `${minutosAte} min` : 'a caminho'}
                </span>
              </div>
              <div style={{ marginTop: 12 }}>
                <Mapa t={t} mostrarMotorista />
              </div>
              <p className="fora-escopo">
                Isto não estava na lista de vocês. A posição já está sendo gravada para o cliente, e
                apontar ela também para a loja é o que faz o pedido sair embalado na hora certa, em
                vez de esfriar no balcão esperando alguém que ninguém sabia onde estava.
              </p>
            </>
          )}
        </div>

        <div className="painel-cel">
          <span className="micro">Equipe</span>
          <div style={{ marginTop: 8 }}>
            {loja.equipe.map((m) => (
              <div className="equipe-linha" key={m.nome}>
                <span className="bolinha-nome">
                  {m.nome
                    .split(' ')
                    .map((x) => x[0])
                    .join('')}
                </span>
                <span>{m.nome}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--fraco)' }}>
                  {m.papel}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="painel-cel">
          <span className="micro">Financeiro da loja</span>
          <div style={{ marginTop: 10 }}>
            <div className="linha-valor">
              <span>
                <IconeCarteira tamanho={13} /> Recebedor
              </span>
              <span style={{ textAlign: 'right', fontSize: 12 }}>{subcontas.vendedor.titular}</span>
            </div>
            <div className="linha-valor">
              <span>Documento</span>
              <span className="num" style={{ fontSize: 12 }}>
                {subcontas.vendedor.documento}
              </span>
            </div>
            <div className="linha-valor">
              <span>Subconta</span>
              <span className="etiqueta verde">
                <IconeCerto tamanho={12} /> {subcontas.vendedor.status}
              </span>
            </div>
          </div>
          <p className="fora-escopo">
            <IconeAlerta tamanho={13} /> Este recebedor é o CNPJ da loja. O mesmo Rafael, quando
            entrega, recebe por outro documento e em outra subconta.
          </p>
        </div>

        <div className="painel-cel">
          <span className="micro">Anúncios e catálogo</span>
          <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {catalogo.map((p) => (
              <img
                key={p.id}
                src={p.img}
                alt={p.nome}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                  objectFit: 'cover',
                  border: '1px solid var(--linha)',
                }}
              />
            ))}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 10,
                border: '1px dashed var(--linha-forte)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--fraco)',
              }}
            >
              <IconeCaixa tamanho={17} />
            </div>
          </div>
          <p className="fora-escopo">
            Quatro itens no ar, um em rascunho. A loja virtual é o mesmo catálogo, com endereço
            próprio.
          </p>
        </div>
      </div>
    </div>
  )
}
