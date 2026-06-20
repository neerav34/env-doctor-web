'use client'

import { useState, useEffect, useCallback } from 'react'

const LINES = [
  { text: '$ env-doctor check', cls: 'text-green-400 font-semibold' },
  { text: '', cls: '' },
  { text: '  Scanning 47 files...', cls: 'text-zinc-500' },
  { text: '', cls: '' },
  { text: '  ❌  DATABASE_URL     missing from .env.example', cls: 'text-red-400' },
  { text: '  ❌  STRIPE_SECRET    not defined anywhere', cls: 'text-red-400' },
  { text: '  ⚠️   OLD_API_KEY     in .env but never used', cls: 'text-amber-400' },
  { text: '', cls: '' },
  { text: '  2 errors · 1 warning · 44 passed', cls: 'text-zinc-300' },
  { text: '  Health score: 76/100', cls: 'text-green-400 font-semibold' },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="ml-3 px-2.5 py-1 text-xs font-mono rounded border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
    >
      {copied ? 'copied!' : 'copy'}
    </button>
  )
}

export default function Hero() {
  const [visible, setVisible] = useState(0)

  const animate = useCallback(() => {
    setVisible(0)
  }, [])

  useEffect(() => {
    if (visible < LINES.length) {
      const t = setTimeout(() => setVisible(v => v + 1), visible === 0 ? 400 : 220)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(animate, 3500)
      return () => clearTimeout(t)
    }
  }, [visible, animate])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-14 overflow-hidden">
      {/* backgrounds */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* left */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                v1.0.6 — now on npm
              </span>
            </div>

            <div>
              <h1 className="text-6xl lg:text-7xl font-mono font-bold tracking-tight leading-none">
                <span className="text-zinc-100">env</span>
                <span className="text-gradient">-doctor</span>
              </h1>
              <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
                The <span className="text-zinc-200 font-medium">eslint of environment variables.</span>
                <br />
                Catch missing <code className="text-green-400 text-sm bg-green-500/10 px-1.5 py-0.5 rounded">.env</code> entries before they hit production.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm w-fit">
              <span className="text-zinc-500 select-none">$</span>
              <span className="text-zinc-100">npx @neerav34/env-doctor check</span>
              <CopyButton text="npx @neerav34/env-doctor check" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.npmjs.com/package/@neerav34/env-doctor"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-mono font-medium rounded-lg bg-green-500 text-zinc-950 hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20"
              >
                View on npm →
              </a>
              <a
                href="https://github.com/neerav34/env-doctor"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-mono font-medium rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors"
              >
                GitHub
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2">
              {[
                { label: '7 languages', color: 'text-blue-400' },
                { label: '63 tests', color: 'text-green-400' },
                { label: 'MIT license', color: 'text-zinc-400' },
              ].map(({ label, color }) => (
                <span key={label} className={`text-xs font-mono ${color}`}>
                  ✓ {label}
                </span>
              ))}
            </div>
          </div>

          {/* right — animated terminal */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/60 border-b border-zinc-700/50">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-mono text-zinc-500">terminal</span>
            </div>
            <div className="p-5 font-mono text-sm min-h-[260px] space-y-1">
              {LINES.slice(0, visible).map((line, i) => (
                <div key={i} className={`${line.cls} leading-relaxed`}>
                  {line.text || ' '}
                </div>
              ))}
              {visible < LINES.length && (
                <span className="inline-block w-2 h-4 bg-green-400 animate-cursor-blink align-middle" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600">
        <span className="text-xs font-mono">scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
