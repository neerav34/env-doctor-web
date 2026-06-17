const YAML = `name: env-doctor
on:
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: neerav34/env-doctor-action@v1`

export default function ActionSection() {
  return (
    <section className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit">
              GitHub Action
            </span>
            <h2 className="text-3xl font-mono font-bold text-zinc-100 leading-tight">
              Comments on every PR.
              <br />
              <span className="text-gradient">Automatically.</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed text-sm">
              Add the action to your repo and env-doctor runs on every pull request —
              posting a comment with a full breakdown of errors, warnings, and passed checks.
              No setup beyond 8 lines of YAML.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/neerav34/env-doctor-action"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-mono font-medium rounded-lg bg-green-500 text-zinc-950 hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20"
              >
                View on GitHub →
              </a>
              <a
                href="https://github.com/marketplace/actions/env-doctor"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-mono font-medium rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors"
              >
                GitHub Marketplace
              </a>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-black/30">
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/60 border-b border-zinc-700/50">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-mono text-zinc-500">.github/workflows/env-doctor.yml</span>
            </div>
            <pre className="p-5 font-mono text-sm overflow-x-auto leading-relaxed">
              {YAML.split('\n').map((line, i) => {
                const trimmed = line.trimStart()
                const indent = line.length - trimmed.length

                let colored: React.ReactNode = line
                if (trimmed.startsWith('#')) {
                  colored = <span className="text-zinc-600">{line}</span>
                } else if (trimmed.startsWith('name:') || trimmed.startsWith('on:') || trimmed.startsWith('jobs:')) {
                  const [key, ...rest] = line.split(':')
                  colored = <><span className="text-blue-400">{key}</span><span className="text-zinc-400">:</span>{rest.length ? <span className="text-zinc-300">{rest.join(':')}</span> : null}</>
                } else if (trimmed.startsWith('- uses:')) {
                  colored = <><span className="text-zinc-500">{' '.repeat(indent)}- </span><span className="text-zinc-400">uses: </span><span className="text-green-400">{trimmed.replace('- uses: ', '')}</span></>
                } else if (trimmed.startsWith('- run:') || trimmed.startsWith('run:')) {
                  const [key, ...rest] = line.split(':')
                  colored = <><span className="text-zinc-400">{key}:</span><span className="text-amber-400">{rest.join(':')}</span></>
                } else if (trimmed.includes(':')) {
                  const colonIdx = line.indexOf(':')
                  colored = <><span className="text-zinc-400">{line.slice(0, colonIdx)}</span><span className="text-zinc-600">:</span><span className="text-zinc-300">{line.slice(colonIdx + 1)}</span></>
                }

                return <div key={i}>{colored}</div>
              })}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
