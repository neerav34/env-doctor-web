const FEATURES = [
  {
    icon: '🌐',
    title: '7 languages',
    desc: 'JS/TS, Python, Go, Ruby, Rust, PHP, Shell, Docker. Dot notation, bracket notation, destructuring, and function calls all detected.',
    accent: 'group-hover:text-blue-400',
  },
  {
    icon: '⚡',
    title: 'Millisecond scans',
    desc: 'Scans hundreds of files in under 200ms. Respects .gitignore, custom ignore patterns, and nested directories.',
    accent: 'group-hover:text-yellow-400',
  },
  {
    icon: '🤖',
    title: 'GitHub Action',
    desc: 'Drop in two lines of YAML. Comments on every PR with a full table of errors and warnings.',
    accent: 'group-hover:text-purple-400',
  },
  {
    icon: '📄',
    title: '.env.example sync & diff',
    desc: 'Run env-doctor init to auto-generate .env.example. Run env-doctor diff to see exactly what changed since the last commit — added, removed, modified.',
    accent: 'group-hover:text-green-400',
  },
  {
    icon: '🗂️',
    title: 'Monorepo support',
    desc: 'Pass --monorepo and each package is scanned independently. Auto-discovers .env.local, .env.production, .env.staging and merges them all.',
    accent: 'group-hover:text-pink-400',
  },
  {
    icon: '🔒',
    title: 'Secret exposure & audit',
    desc: 'Flags browser-exposed secrets (NEXT_PUBLIC_, VITE_) and runs env-doctor audit to detect real leaked credentials — Stripe, AWS, GitHub, npm, and more.',
    accent: 'group-hover:text-orange-400',
  },
]

export default function Features() {
  return (
    <section className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-mono font-bold text-zinc-100">
            Everything you need to keep <span className="text-gradient">.env clean</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="group p-6 rounded-xl bg-zinc-900 border border-zinc-800 card-glow transition-all duration-200"
            >
              <div className={`text-2xl mb-3 transition-transform duration-200 group-hover:scale-110 inline-block`}>
                {f.icon}
              </div>
              <h3 className={`font-mono font-semibold text-zinc-100 mb-2 transition-colors ${f.accent}`}>
                {f.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
