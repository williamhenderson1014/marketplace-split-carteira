'use client'

import { useEffect, useState } from 'react'
import { catalogo, loja, cliente, motorista, etapas, reais, semAcento } from '../lib/data'
import { Celular, Valor, QrPix, Estrelas } from './ui'
import { Mapa } from './Mapa'
import {
  IconeBusca,
  IconeMais,
  IconeMenos,
  IconeSacola,
  IconePix,
  IconeCerto,
  IconeRelogio,
  IconeMoto,
  IconePino,
  IconeEstrela,
  IconeCartao,
  IconeSeta,
} from './icons'

export default function Cliente({ etapa, itens, mudarItem, c, t, pausar }) {
  const [busca, setBusca] = useState('')
  const [pagoAgora, setPagoAgora] = useState(false)
  const [nota, setNota] = useState(0)

  useEffect(() => {
    if (etapa !== 1) {
      setPagoAgora(false)
      return
    }
    const id = setTimeout(() => setPagoAgora(true), 2200)
    return () => clearTimeout(id)
  }, [etapa])

  const alvoBusca = semAcento(busca.trim())
  const filtrados = catalogo.filter((p) => semAcento(p.nome + ' ' + p.desc).includes(alvoBusca))

  return (
    <div className="par-celular cena">
      <Celular hora={etapas[etapa].hora}>
        {etapa === 0 && (
          <>
            <div className="celular-rolagem">
              <div className="capa">
                <img src={loja.capa} alt="fachada e balcão da Moura Burger" />
                <div className="capa-sombra" />
                <div className="capa-texto">
                  <h4>{loja.nome}</h4>
                  <p>
                    <IconeEstrela tamanho={12} cheia /> {loja.nota} ({loja.avaliacoes})
                    <span style={{ opacity: 0.5 }}>|</span>
                    <IconeRelogio tamanho={12} /> {loja.preparo}
                  </p>
                </div>
              </div>

              <div className="busca">
                <IconeBusca tamanho={16} />
                <input
                  value={busca}
                  onChange={(e) => {
                    if (pausar) pausar()
                    setBusca(e.target.value)
                  }}
                  placeholder="buscar no cardápio"
                  aria-label="buscar no cardápio"
                />
              </div>

              {filtrados.length === 0 && (
                <p style={{ padding: '26px 18px', color: 'var(--fraco)', fontSize: 13 }}>
                  Nada com esse nome no cardápio de hoje.
                </p>
              )}

              {filtrados.map((p, i) => (
                <div className="item" key={p.id} style={{ animationDelay: `${i * 55}ms` }}>
                  <img className="item-foto" src={p.img} alt={p.nome} />
                  <div className="item-txt">
                    <b>{p.nome}</b>
                    <small>{p.desc}</small>
                    <span className="num">R$ {reais(p.preco)}</span>
                  </div>
                  {itens[p.id] ? (
                    <div className="contador">
                      <button onClick={() => mudarItem(p.id, -1)} aria-label={`tirar um ${p.nome}`}>
                        <IconeMenos tamanho={14} />
                      </button>
                      <b className="num">{itens[p.id]}</b>
                      <button
                        onClick={() => mudarItem(p.id, 1)}
                        disabled={itens[p.id] >= 5}
                        aria-label={`somar um ${p.nome}`}
                      >
                        <IconeMais tamanho={14} />
                      </button>
                    </div>
                  ) : (
                    <button className="bt-add" onClick={() => mudarItem(p.id, 1)}>
                      Adicionar
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="rodape-celular">
              <div className="linha-valor">
                <span>
                  {c.linhas.reduce((s, l) => s + l.qtd, 0)} item(ns) na sacola
                </span>
                <Valor v={c.subtotal} />
              </div>
              <div className="linha-valor">
                <span>Entrega</span>
                <Valor v={c.entrega} />
              </div>
              <div className="linha-valor forte">
                <span>Total</span>
                <Valor v={c.total} />
              </div>
              <button className="bt-cheio" disabled={!c.linhas.length}>
                <IconeSacola tamanho={17} />
                {c.linhas.length ? 'Ir para o pagamento' : 'Sacola vazia'}
              </button>
            </div>
          </>
        )}

        {etapa === 1 && (
          <div className="celular-rolagem">
            <div className="pix-area">
              <span className="etiqueta verde">
                <IconePix tamanho={13} /> PIX
              </span>
              <QrPix />
              <div className="copia">
                <IconeCerto tamanho={13} />
                00020126580014BR.GOV.BCB.PIX0136demo00004471
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--suave)', margin: '14px 0 0' }}>
                Pagando <b className="num">R$ {reais(c.total)}</b> para Gateway Pagamentos, o valor
                fica retido no gateway até a entrega fechar.
              </p>
              <div
                style={{
                  marginTop: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {pagoAgora ? (
                  <span className="etiqueta verde surge">
                    <IconeCerto tamanho={13} /> confirmado em 4 segundos
                  </span>
                ) : (
                  <span className="etiqueta">
                    <IconeRelogio tamanho={13} /> aguardando confirmação
                  </span>
                )}
              </div>
            </div>
            <div style={{ padding: '0 20px 22px' }}>
              <span className="micro">Resumo do pedido</span>
              {c.linhas.map((l) => (
                <div className="linha-valor" key={l.id}>
                  <span>
                    {l.qtd}x {l.nome}
                  </span>
                  <span className="num">R$ {reais(l.total)}</span>
                </div>
              ))}
              <div className="linha-valor">
                <span>Entrega, 2,4 km</span>
                <span className="num">R$ {reais(c.entrega)}</span>
              </div>
              <div className="linha-valor forte">
                <span>Pago no PIX</span>
                <span className="num">R$ {reais(c.total)}</span>
              </div>
              <div className="linha-valor" style={{ marginTop: 10 }}>
                <span>
                  <IconeCartao tamanho={13} /> cartão salvo
                </span>
                <span style={{ color: 'var(--fraco)' }}>{cliente.cartao}</span>
              </div>
              <div className="linha-valor">
                <span>
                  <IconePino tamanho={13} /> entrega em
                </span>
                <span style={{ color: 'var(--fraco)', textAlign: 'right' }}>
                  {cliente.endereco.split(',')[0]}
                </span>
              </div>
            </div>
          </div>
        )}

        {etapa >= 2 && (
          <div className="celular-rolagem">
            <div style={{ padding: '14px 16px 10px' }}>
              <span className="micro">Pedido 4471</span>
              <h4 style={{ margin: '4px 0 0', fontSize: 17, letterSpacing: '-0.02em' }}>
                {etapa === 2 && 'A loja está preparando'}
                {etapa === 3 && 'Rafael saiu para entregar'}
                {etapa >= 4 && 'Entregue, bom apetite'}
              </h4>
              <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--suave)' }}>
                {etapa === 2 && 'previsão de 18 a 28 minutos'}
                {etapa === 3 && 'chega em 6 minutos, ele já está na rua'}
                {etapa >= 4 && 'entregue às 19:38, em 34 minutos'}
              </p>
            </div>

            <div style={{ padding: '0 16px' }}>
              <Mapa t={t} mostrarMotorista={etapa >= 2} />
            </div>

            <div style={{ padding: '14px 16px 0' }}>
              {[
                ['Pedido recebido', '19:05', 1],
                ['Loja aceitou e começou', '19:07', 2],
                ['Saiu para entrega', '19:21', 3],
                ['Entregue', '19:38', 4],
              ].map(([texto, hora, quando]) => (
                <div className="trecho" key={texto}>
                  <div className="marca-ponto">
                    <i
                      style={{
                        borderColor: etapa >= quando ? 'var(--verde)' : 'var(--linha-forte)',
                        background: etapa >= quando ? 'var(--verde)' : 'transparent',
                      }}
                    />
                    <span />
                  </div>
                  <div style={{ flex: 1 }}>
                    <b
                      style={{
                        fontWeight: 500,
                        color: etapa >= quando ? 'var(--tinta)' : 'var(--fraco)',
                      }}
                    >
                      {texto}
                    </b>
                  </div>
                  <span className="num" style={{ color: 'var(--fraco)' }}>
                    {etapa >= quando ? hora : ''}
                  </span>
                </div>
              ))}
            </div>

            {etapa >= 4 && (
              <div style={{ padding: '10px 16px 22px' }} className="surge">
                <div
                  style={{
                    border: '1px solid var(--linha)',
                    borderRadius: 12,
                    padding: '14px 15px',
                  }}
                >
                  <b style={{ fontSize: 13.5, fontWeight: 500 }}>Como foi a entrega?</b>
                  <p style={{ margin: '2px 0 10px', fontSize: 12, color: 'var(--fraco)' }}>
                    {motorista.nome}, {motorista.veiculo}, placa {motorista.placa}
                  </p>
                  <Estrelas escolhida={nota} aoEscolher={setNota} tamanho={26} />
                  {nota > 0 && (
                    <p
                      className="surge"
                      style={{ margin: '10px 0 0', fontSize: 12, color: 'var(--verde)' }}
                    >
                      Obrigado, a nota vai para a loja e para quem entregou, separadas.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Celular>

      <div className="ao-lado">
        <div className="caixa">
          <div className="caixa-cabeca">
            <IconeSacola tamanho={17} />
            <h3>O que o cliente vê</h3>
            <span className="etiqueta" style={{ marginLeft: 'auto' }}>
              celular
            </span>
          </div>
          <div className="caixa-corpo" style={{ fontSize: 13.5, color: 'var(--suave)' }}>
            {etapa === 0 && (
              <p style={{ margin: 0 }}>
                Cardápio, busca e sacola. Mexa nos itens e olhe o painel do dinheiro, cada número
                dele sai deste carrinho, não é imagem parada.
              </p>
            )}
            {etapa === 1 && (
              <p style={{ margin: 0 }}>
                O PIX é gerado contra o gateway, não contra a conta da plataforma. Enquanto o pedido não
                fecha, o valor não é de ninguém ainda.
              </p>
            )}
            {etapa === 2 && (
              <p style={{ margin: 0 }}>
                A partir daqui o cliente quer uma coisa só, saber onde está o pedido. É a tela que
                mais abre e a que mais derruba aplicativo de delivery.
              </p>
            )}
            {etapa === 3 && (
              <p style={{ margin: 0 }}>
                Quem entrega este pedido é o próprio dono da loja. Para o cliente é indiferente, para
                a carteira muda tudo.
              </p>
            )}
            {etapa >= 4 && (
              <p style={{ margin: 0 }}>
                Duas notas saem daqui, uma da loja e outra de quem entregou. Se as duas forem para o
                mesmo perfil, a média de motorista some dentro da média da loja.
              </p>
            )}
          </div>
        </div>

        <div className="caixa">
          <div className="caixa-cabeca">
            <IconeMoto tamanho={17} />
            <h3>Endereço e conta</h3>
          </div>
          <div className="caixa-corpo">
            <div className="linha-valor">
              <span>Cliente</span>
              <b style={{ fontWeight: 500 }}>{cliente.nome}</b>
            </div>
            <div className="linha-valor">
              <span>Entrega</span>
              <span style={{ textAlign: 'right', maxWidth: 200 }}>{cliente.endereco}</span>
            </div>
            <div className="linha-valor">
              <span>Referência</span>
              <span style={{ textAlign: 'right', maxWidth: 200 }}>{cliente.referencia}</span>
            </div>
            <div className="linha-valor">
              <span>Pagamento</span>
              <span>{cliente.pagamento}</span>
            </div>
            <p className="fora-escopo" style={{ marginTop: 12 }}>
              <IconeSeta tamanho={13} /> A conta de quem compra é uma conta comum da plataforma. É a
              mesma conta que pode virar loja ou motorista depois, sem cadastro novo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
