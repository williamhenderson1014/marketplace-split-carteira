'use client'

import { subcontas, reais, comissao } from '../lib/data'
import { Valor, ValorGrande } from './ui'
import {
  IconeCadeado,
  IconeCerto,
  IconeAlerta,
  IconeLoja,
  IconeMoto,
  IconeMarca,
  IconeDocumento,
} from './icons'

export default function Dinheiro({ etapa, c, docAprovado, aprovar }) {
  const pago = etapa >= 1
  const repassado = etapa >= 5
  const pct = (v) => (c.total ? Math.max(2, (v / c.total) * 100) : 0)

  const linhas = [
    {
      id: 'vendedor',
      nome: 'Moura Burger',
      icone: <IconeLoja tamanho={14} />,
      doc: subcontas.vendedor.documento,
      sub: subcontas.vendedor.id,
      valor: c.aoVendedor,
      cor: 'verde',
      liberado: true,
    },
    {
      id: 'motorista',
      nome: 'Rafael Moura, entrega',
      icone: <IconeMoto tamanho={14} />,
      doc: subcontas.motorista.documento,
      sub: subcontas.motorista.id,
      valor: c.aoMotorista,
      cor: docAprovado ? 'verde' : 'laranja',
      liberado: docAprovado,
    },
    {
      id: 'plataforma',
      nome: `Plataforma, ${Math.round(comissao * 100)}% dos itens`,
      icone: <IconeMarca tamanho={14} />,
      doc: 'comissão da plataforma',
      sub: 'sc_a10002',
      valor: c.taxaPlataforma,
      cor: 'tinta',
      liberado: true,
    },
  ]

  return (
    <div className="caixa">
      <div className="caixa-cabeca">
        <IconeCadeado tamanho={17} />
        <h3>O dinheiro do pedido 4471</h3>
      </div>

      <div className="custodia">
        <span className="micro">{pago ? 'em custódia no gateway' : 'ainda no carrinho'}</span>
        <div className="grande" style={{ marginTop: 2, opacity: pago ? 1 : 0.42 }}>
          <ValorGrande v={c.total} doZero={false} />
        </div>
        <p className="aviso-custodia">
          <IconeCadeado tamanho={14} />
          {pago
            ? 'O valor está preso no gateway, em nome do pedido. Não entra na conta bancária da plataforma em momento nenhum, e é isso que evita que vocês precisem de licença para guardar dinheiro dos outros.'
            : 'Mexa no carrinho do celular e este número acompanha. Enquanto o PIX não confirma, não existe dinheiro para dividir.'}
        </p>
      </div>

      <div className="split">
        <span className="micro" style={{ display: 'block', padding: '12px 0 2px' }}>
          {repassado ? 'repasse feito, um por documento' : 'como vai ser dividido'}
        </span>

        {c.linhas.length === 0 && (
          <p className="vazio-dinheiro">
            Carrinho vazio. Sem item não tem venda, sem venda não tem repasse, e a tela do vendedor
            fica muda também.
          </p>
        )}

        {c.linhas.length > 0 &&
          linhas.map((l, i) => (
            <div className="split-linha" key={l.id} style={{ opacity: repassado ? 1 : 0.62 }}>
              <div className="split-cabeca">
                <span style={{ color: 'var(--fraco)', display: 'flex' }}>{l.icone}</span>
                <b>{l.nome}</b>
                <span
                  className="valor-split"
                  style={{ color: l.liberado ? undefined : 'var(--laranja)' }}
                >
                  {repassado ? (
                    <Valor v={l.valor} doZero />
                  ) : (
                    <span className="num">R$ {reais(l.valor)}</span>
                  )}
                </span>
              </div>
              <div className="split-doc">
                {l.doc} · {l.sub}
              </div>
              <div className="barra-split">
                <i
                  className={l.cor}
                  style={{ width: `${pct(l.valor)}%`, animationDelay: `${i * 130}ms` }}
                />
              </div>
              {l.id === 'motorista' && repassado && (
                <div style={{ marginTop: 8 }}>
                  {docAprovado ? (
                    <span className="etiqueta verde">
                      <IconeCerto tamanho={12} /> subconta aprovada, valor liberado
                    </span>
                  ) : (
                    <>
                      <span className="etiqueta laranja">
                        <IconeAlerta tamanho={12} /> retido, subconta em análise
                      </span>
                      <button className="aprovar" onClick={aprovar}>
                        <IconeDocumento tamanho={13} /> Aprovar a CNH e liberar os R${' '}
                        {reais(c.aoMotorista)}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

        {c.linhas.length > 0 && (
          <p className="aviso-custodia" style={{ marginTop: 14 }}>
            <IconeAlerta tamanho={14} />
            {repassado
              ? 'Três destinos, três documentos, um pedido só. A soma bate no centavo com o que a Bruna pagou, e nenhum centavo passou por uma conta comum da plataforma no caminho.'
              : 'A divisão acontece dentro do gateway, no mesmo instante do repasse. Se ela acontecer depois, por transferência manual, vocês viram banco sem ser banco.'}
          </p>
        )}
      </div>
    </div>
  )
}
