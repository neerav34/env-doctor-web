'use client'

import { useState, useMemo } from 'react'
import { detectVarsInCode } from '@/lib/detector'

const EXAMPLES = {
  'JS/TS': `const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const PORT = process.env.PORT ?? 3000
const JWT_SECRET = process.env['JWT_SECRET']
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY
const VITE_URL = import.meta.env.VITE_API_URL

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required')
}`,
  Python: `import os
import psycopg2

db_url = os.environ.get('DATABASE_URL')
secret_key = os.environ['SECRET_KEY']
debug = os.getenv('DEBUG', 'false')
port = int(os.getenv('PORT', '5000'))
redis_url = os.environ.get('REDIS_URL')`,
  Go: `package main

import (
  "log"
  "os"
)

func main() {
  dbURL := os.Getenv("DATABASE_URL")
  port  := os.Getenv("PORT")
  secret := os.Getenv("JWT_SECRET")

  if dbURL == "" {
    log.Fatal("DATABASE_URL is required")
  }
}`,
}

type Tab = keyof typeof EXAMPLES

export default function LiveDemo() {
  const [activeTab, setActiveTab] = useState<Tab>('JS/TS')
  const [code, setCode] = useState(EXAMPLES['JS/TS'])

  const vars = useMemo(() => detectVarsInCode(code), [code])

  function switchTab(tab: Tab) {
    setActiveTab(tab)
    setCode(EXAMPLES[tab])
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-mono font-bold text-zinc-100">
            Try it <span className="text-gradient">live</span>
          </h2>
          <p className="mt-3 text-zinc-500 font-mono text-sm">
            Paste any code — env-doctor detects all env vars in real time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl shadow-black/30">
          {/* editor */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
              <div className="flex gap-1.5 mr-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              {(Object.keys(EXAMPLES) as Tab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                    activeTab === tab
                      ? 'bg-zinc-800 text-zinc-100'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 p-5 font-mono text-sm text-zinc-300 bg-zinc-950 resize-none outline-none min-h-[320px] leading-relaxed"
              placeholder="Paste your code here..."
            />
          </div>

          {/* results */}
          <div className="flex flex-col border-l border-zinc-800">
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
              <span className="text-xs font-mono text-zinc-500">detected variables</span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                vars.length === 0
                  ? 'bg-zinc-800 text-zinc-500'
                  : 'bg-green-500/10 text-green-400 border border-green-500/20'
              }`}>
                {vars.length} found
              </span>
            </div>

            <div className="flex-1 p-4 bg-zinc-950 overflow-y-auto min-h-[320px]">
              {vars.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-600 font-mono text-sm gap-2">
                  <span className="text-2xl">🔍</span>
                  <span>no env vars detected</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {vars.map(v => (
                    <div
                      key={v.name}
                      className="flex items-start justify-between gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-mono text-sm font-semibold text-green-400 truncate">
                          {v.name}
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-zinc-600">
                            line{v.lines.length > 1 ? 's' : ''} {v.lines.slice(0, 3).join(', ')}{v.lines.length > 3 ? '…' : ''}
                          </span>
                          <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">
                            {v.lang}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-600 whitespace-nowrap">
                        ×{v.occurrences}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs font-mono text-zinc-600">
          Running entirely in your browser — no data leaves your machine
        </p>
      </div>
    </section>
  )
}
