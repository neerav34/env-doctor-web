const STEPS = [
  {
    n: '01',
    title: 'Install',
    desc: 'One command. Works globally or as a project dev dependency.',
    code: 'npm install -g @neerav34/env-doctor',
  },
  {
    n: '02',
    title: 'Run',
    desc: 'Point it at any project. It finds .env, .env.example, and scans all source files.',
    code: 'env-doctor check',
  },
  {
    n: '03',
    title: 'Fix',
    desc: 'See exactly which vars are missing, unused, or drifted — with file and line references.',
    code: 'env-doctor init  # auto-fix .env.example',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-mono font-bold text-zinc-100">
            Up and running in <span className="text-gradient">30 seconds</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-8 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-px bg-gradient-to-r from-zinc-800 via-green-500/30 to-zinc-800" />

          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center font-mono text-xs font-bold text-green-400">
                  {step.n}
                </span>
                <h3 className="font-mono font-semibold text-zinc-100">{step.title}</h3>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed pl-11">
                {step.desc}
              </p>
              <div className="ml-11 flex items-center gap-2 px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg">
                <span className="text-zinc-600 font-mono text-xs select-none">$</span>
                <code className="font-mono text-xs text-green-400 break-all">{step.code}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
