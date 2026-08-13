import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'AinFast · uma conta, três perfis, um pedido',
  description:
    'Maquete de um marketplace de delivery com três perfis na mesma conta, seguindo um pedido do carrinho até o repasse dividido por documento. Dados inventados, sem backend.',
}

export const viewport = {
  themeColor: '#14181d',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
