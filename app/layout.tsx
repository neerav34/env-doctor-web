import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'env-doctor — The eslint of environment variables',
  description: 'Catch missing .env entries before they hit production. Multi-language env var linter for JS, Python, Go, Ruby, Rust, PHP.',
  keywords: ['env', 'dotenv', 'environment variables', 'cli', 'developer tools', 'linter'],
  openGraph: {
    title: 'env-doctor',
    description: 'The eslint of environment variables',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-zinc-950 text-zinc-100 antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
