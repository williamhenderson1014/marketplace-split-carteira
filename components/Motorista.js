'use client'

import { useState } from 'react'
import { motorista, loja, cliente, etapas, subcontas, reais } from '../lib/data'
import { Celular, Valor } from './ui'
import { Mapa } from './Mapa'
import {
  IconeMoto,
  IconePino,
  IconeCarteira,
  IconeCerto,
  IconeDocumento,
  IconeCadeado,
  IconeEstrela,
  IconeTroca,
  IconeAlerta,
} from './icons'

export default function Motorista({ etapa, c, t, docAprovado }) {
  const [online, setOnline] = useState(true)
  const emCorrida = etapa >= 2
  const ganhouHoje = 74.5 + (etapa >= 4 ? c.aoMotorista : 0)

  return (
    <div className="par-celular cena">
      <Celular hora={etapas[etapa].hora}>
        <div className="celular-rolagem">
          <div className={`online-cartao${online ? '' : ' desligado'}`}>
            <img src={motorista.foto} alt="motoboy em rota de entrega" />
            <div className="capa-sombra" />
            <div className="capa-texto">
              <h4>{online ? 'Você está online' : 'Você está offline'}</h4>
              <p>
                <IconeEstrela tamanho={12} cheia /> {motorista.nota}
                <span style={{ opacity: 0.5 }}>|</span>
                {motorista.corridas} corridas
              </p>
            </div>
          </div>

          <div className="chave">
            <IconeMoto tamanho={18} />
            <div>
              <b style={{ fontSize: 13.5, fontWeight: 500, display: 'block' }}>
                Receber corridas
              </b>
              <small style={{ fontSize: 11.5, color: 'var(--fraco)' }}>
                {online ? 'aceitando pedidos da região' : 'ninguém consegue te chamar'}
              </small>
            </div>
            <button
              className={`interruptor${online ? ' on' : ''}`}
              onClick={() => setOnline((v) => !v)}
              aria-label="ficar online ou offline"
              aria-pressed={online}
            >
              <i />
            </button>
          </div>

          {!online && (
            <p style={{ padding: '26px 18px', fontSize: 13, color: 'var(--fraco)' }}>
              Offline. Ligue a chave acima para ver a corrida que está na fila.
            </p>
          )}

          {online && etapa <= 1 && (
            <div className="oferta">
              <span className="micro">Corrida disponível</span>
              <div className="valor num">R$ {reais(c.aoMotorista)}</div>
              <div style={{ fontSize: 12, color: 'var(--suave)', marginBottom: 8 }}>
                2,4 km, cerca de 11 minutos
              </div>
              <div className="trecho">
                <div className="marca-ponto">
                  <i />
                  <span />
                </div>
                <div>
                  <b style={{ fontWeight: 500 }}>{loja.nome}</b>
                  <div style={{ color: 'var(--fraco)' }}>{loja.endereco}</div>
                </div>
              </div>
              <div className="trecho">
                <div className="marca-ponto">
                  <i style={{ background: 'var(--tinta)' }} />
                </div>
                <div>
                  <b style={{ fontWeight: 500 }}>{cliente.nome}</b>
                  <div style={{ color: 'var(--fraco)' }}>{cliente.endereco}</div>
                </div>
              </div>
              <button className="bt-cheio" style={{ marginTop: 10 }}>
                Aceitar corrida
              </button>
              <p style={{ margin: '10px 0 0', fontSize: 11.5, color: 'var(--suave)' }}>
                Esta corrida é da sua própria loja. Você aceita como motorista, não como dono.
              </p>
            </div>
          )}

          {online && emCorrida && (
            <>
              <div style={{ padding: '14px 16px 0' }}>
                <span className="micro">
                  {etapa === 2 ? 'Indo buscar na loja' : etapa === 3 ? 'Levando até a Bruna' : 'Corrida encerrada'}
                </span>
                <div style={{ marginTop: 8 }}>
                  <Mapa t={t} mostrarMotorista />
                </div>
              </div>
              <div style={{ padding: '12px 16px 0' }}>
                <div className="linha-valor">
                  <span>
                    <IconePino tamanho={13} /> {etapa === 2 ? 'Coleta' : 'Entrega'}
                  </span>
                  <span style={{ textAlign: 'right', maxWidth: 190 }}>
                    {etapa === 2 ? loja.endereco : cliente.endereco}
                  </span>
                </div>
                <div className="linha-valor">
                  <span>Valor da corrida</span>
                  <b style={{ fontWeight: 600 }}>
                    <Valor v={c.aoMotorista} />
                  </b>
                </div>
              </div>
            </>
          )}

          <div className="ganhos">
            <span className="micro">Carteira do motorista</span>
            <div className="linha-valor" style={{ marginTop: 6 }}>
              <span>Ganhos de hoje</span>
              <b style={{ fontWeight: 600 }}>
                <Valor v={ganhouHoje} />
              </b>
            </div>
            <div className="linha-valor">
              <span>Disponível para saque</span>
              <b style={{ fontWeight: 600, color: docAprovado ? 'var(--verde)' : 'var(--laranja)' }}>
                <Valor v={docAprovado ? ganhouHoje : 74.5} />
              </b>
            </div>
            <button className="bt-cheio tinta" disabled={!docAprovado}>
              {docAprovado ? (
                <>
                  <IconeCarteira tamanho={16} /> Solicitar saque via PIX
                </>
              ) : (
                <>
                  <IconeCadeado tamanho={16} /> Saque bloqueado
                </>
              )}
            </button>
          </div>

          {!docAprovado && (
            <div className="retido">
              <b>
                <IconeDocumento tamanho={13} /> Subconta em análise
              </b>
              {subcontas.motorista.pendencia}. Enquanto o documento não sobe, o valor desta corrida
              fica retido no gateway, fila de {subcontas.motorista.fila}.
            </div>
          )}

          {docAprovado && (
            <div
              className="retido surge"
              style={{
                borderColor: 'var(--verde-linha)',
                background: 'var(--verde-leve)',
                color: 'var(--verde)',
                animation: 'none',
              }}
            >
              <b>
                <IconeCerto tamanho={13} /> Subconta aprovada
              </b>
              O saque agora sai direto para o {subcontas.motorista.documento}, sem passar pela conta
              da loja e sem passar pela AinFast.
            </div>
          )}
        </div>
      </Celular>

      <div className="ao-lado">
        <div className="caixa">
          <div className="caixa-cabeca">
            <IconeTroca tamanho={17} />
            <h3>A mesma pessoa, o outro lado</h3>
            <span className="etiqueta" style={{ marginLeft: 'auto' }}>
              celular
            </span>
          </div>
          <div className="caixa-corpo" style={{ fontSize: 13.5, color: 'var(--suave)' }}>
            <p style={{ margin: 0 }}>
              O Rafael trocou de perfil, não de conta. Não teve login novo, não teve senha nova, e
              mesmo assim ele deixou de ser a Moura Burger e passou a ser uma pessoa física com CPF,
              CNH e uma subconta própria.
            </p>
            <p style={{ margin: '10px 0 0' }}>
              Essa é a parte que o protótipo não tem como mostrar, porque ela não é tela. É quem
              recebe.
            </p>
          </div>
        </div>

        <div className="caixa">
          <div className="caixa-cabeca">
            <IconeDocumento tamanho={17} />
            <h3>Recebedor deste perfil</h3>
          </div>
          <div className="caixa-corpo">
            <div className="linha-valor">
              <span>Titular</span>
              <b style={{ fontWeight: 500 }}>{subcontas.motorista.titular}</b>
            </div>
            <div className="linha-valor">
              <span>Documento</span>
              <span className="num">{subcontas.motorista.documento}</span>
            </div>
            <div className="linha-valor">
              <span>Subconta</span>
              <span className={`etiqueta ${docAprovado ? 'verde' : 'laranja'}`}>
                {docAprovado ? (
                  <>
                    <IconeCerto tamanho={12} /> aprovada
                  </>
                ) : (
                  <>
                    <IconeAlerta tamanho={12} /> {subcontas.motorista.status}
                  </>
                )}
              </span>
            </div>
            <p className="fora-escopo" style={{ marginTop: 12 }}>
              Duas subcontas para o mesmo ser humano, uma por documento. Aprovadas em filas
              diferentes, em dias diferentes. É papel, não é código, e é isso que costuma segurar a
              data de lançamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
