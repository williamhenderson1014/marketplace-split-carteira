'use client'

import { useRef, useState } from 'react'
import { subcontas, compraDoDono, reais } from '../lib/data'
import { usePilula } from '../lib/hooks'
import {
  IconePessoa,
  IconeLoja,
  IconeMoto,
  IconeAlerta,
  IconeCerto,
  IconeCadeado,
  IconeCartao,
} from './icons'

export default function Carteira({ c, docAprovado }) {
  const [noPerfil, setNoPerfil] = useState(true)
  const [juntando, setJuntando] = useState(false)
  const tempo = useRef(null)
  const [refChave, estiloChave] = usePilula(noPerfil ? 0 : 1)

  const somado = c.aoVendedor + c.aoMotorista - compraDoDono.valor

  function trocar(v) {
    if (v === noPerfil || juntando) return
    setJuntando(true)
    clearTimeout(tempo.current)
    tempo.current = setTimeout(() => {
      setNoPerfil(v)
      setJuntando(false)
    }, 420)
  }

  return (
    <section className="faixa-carteira">
      <div className="limite">
        <span className="micro">A troca de perfil</span>
        <div className="carteira-cabeca">
          <h2>
            Uma conta só. Mas duas receitas, dois documentos, dois recebedores.
          </h2>
          <p>
            Vocês escreveram que o mesmo usuário precisa alternar entre Cliente, Motorista e Empresa
            sem login novo, e isso está certo. A pergunta que decide o projeto é outra: onde mora a
            carteira. Vire a chave e veja o mesmo dia fechar de dois jeitos.
          </p>
        </div>

        <div className="chave-carteira" ref={refChave} role="group" aria-label="onde mora a carteira">
          <span className="pilula" style={estiloChave} />
          <button data-pilula className={noPerfil ? 'ativo' : ''} onClick={() => trocar(true)}>
            Carteira no perfil, certo
          </button>
          <button data-pilula className={!noPerfil ? 'ativo' : ''} onClick={() => trocar(false)}>
            Carteira na conta, o atalho
          </button>
        </div>

        {noPerfil ? (
          <div className="carteiras">
            <div className={`cartao-carteira${juntando ? ' juntando' : ''}`}>
              <h4>
                <IconePessoa tamanho={15} /> Perfil cliente
              </h4>
              <div className="doc">CPF ***.418.902-**, mesma pessoa</div>
              <div className="saldo" style={{ color: 'rgba(255,255,255,.4)' }}>
                <small>R$</small>0,00
              </div>
              <div className="linha-fina" />
              <p>
                Este perfil não tem carteira, tem meio de pagamento. O almoço de R${' '}
                {reais(compraDoDono.valor)} que ele comprou hoje na {compraDoDono.onde} é despesa
                pessoal e não encosta em nada que a loja faturou.
              </p>
              <button className="bt-saque" disabled>
                <IconeCartao tamanho={14} /> Sem saque neste perfil
              </button>
            </div>

            <div
              className={`cartao-carteira${juntando ? ' juntando' : ''}`}
              style={{ animationDelay: juntando ? '60ms' : '90ms' }}
            >
              <h4>
                <IconeLoja tamanho={15} /> Perfil vendedor
              </h4>
              <div className="doc">{subcontas.vendedor.documento}</div>
              <div className="saldo">
                <small>R$</small>
                {reais(c.aoVendedor)}
              </div>
              <div className="linha-fina" />
              <p>
                Subconta {subcontas.vendedor.id}, aprovada em {subcontas.vendedor.desde}. Recebe pela
                venda dos itens, já sem a comissão. Nota fiscal sai por este CNPJ.
              </p>
              <button className="bt-saque">Sacar para a conta da empresa</button>
            </div>

            <div
              className={`cartao-carteira${juntando ? ' juntando' : ''}`}
              style={{ animationDelay: juntando ? '120ms' : '180ms' }}
            >
              <h4>
                <IconeMoto tamanho={15} /> Perfil motorista
              </h4>
              <div className="doc">{subcontas.motorista.documento}</div>
              <div className="saldo" style={{ color: docAprovado ? undefined : '#ff9c6b' }}>
                <small>R$</small>
                {reais(c.aoMotorista)}
              </div>
              <div className="linha-fina" />
              <p>
                Subconta {subcontas.motorista.id}
                {docAprovado
                  ? ', aprovada agora. O saque vai para a pessoa física, com o rendimento dela.'
                  : ', em análise. O valor existe, está separado e ainda não pode sair, e é bom que seja assim.'}
              </p>
              <button className="bt-saque" disabled={!docAprovado}>
                {docAprovado ? 'Sacar para a conta pessoal' : 'Aguardando documento'}
              </button>
            </div>
          </div>
        ) : (
          <div className="carteiras">
            <div className={`cartao-carteira quebrado${juntando ? ' juntando' : ''}`}>
              <h4>
                <IconeAlerta tamanho={15} /> Carteira única da conta de Rafael Moura
              </h4>
              <div className="doc">um saldo, um saque, um documento na hora de sair</div>
              <div className="saldo">
                <small>R$</small>
                {reais(somado)}
              </div>
              <p className="conta-soma">
                <b>{reais(c.aoVendedor)}</b>
                <span>da loja, mais</span>
                <b>{reais(c.aoMotorista)}</b>
                <span>da entrega, menos</span>
                <b>{reais(compraDoDono.valor)}</b>
                <span>do almoço que ele comprou</span>
              </p>
              <span className="risco" />
              <div className="consequencias">
                <div className="consequencia" style={{ animationDelay: '120ms' }}>
                  <IconeAlerta tamanho={15} />
                  <span>
                    <b>R$ {reais(c.aoMotorista)} entraram como pessoa física</b> e vão sair junto com
                    o dinheiro do CNPJ. Quem entregou e quem vendeu são a mesma pessoa e recebedores
                    diferentes, e o repasse não sabe disso.
                  </span>
                </div>
                <div className="consequencia" style={{ animationDelay: '210ms' }}>
                  <IconeAlerta tamanho={15} />
                  <span>
                    <b>O almoço de R$ {reais(compraDoDono.valor)} virou desconto no faturamento.</b>{' '}
                    Uma compra de cliente abateu venda de loja, e no fim do mês o relatório mostra
                    uma loja que vendeu menos do que vendeu.
                  </span>
                </div>
                <div className="consequencia" style={{ animationDelay: '300ms' }}>
                  <IconeCadeado tamanho={15} />
                  <span>
                    <b>Depois não se conserta com migração.</b> Quando isto aparece, já saiu
                    transferência para a rua, e separar as duas receitas vira estorno de dinheiro que
                    não está mais com vocês.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="remate">
          {noPerfil ? (
            <>
              <IconeCerto tamanho={16} /> <b>Um login em cima, três recebedores embaixo.</b> A troca
              de perfil deixa de ser uma tela e passa a ser qual carteira responde. É a mesma
              exigência que vocês escreveram, resolvida no lugar onde ela realmente vive, e é uma
              decisão que custa pouco agora e custa o projeto inteiro depois.
            </>
          ) : (
            <>
              <IconeAlerta tamanho={16} /> <b>Nada aqui está quebrado na tela.</b> O app abre, o
              pedido entra, a entrega acontece e a soma parece certa. É por isso que uma auditoria
              feita tela por tela devolve que falta pouco. Seguindo um pedido até o dinheiro cair,
              ela devolve isto.
            </>
          )}
        </p>
      </div>
    </section>
  )
}
