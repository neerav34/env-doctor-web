export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-sm">
          <span className="text-zinc-500">env</span>
          <span className="text-green-400">-doctor</span>
          <span className="text-zinc-700 ml-2">—</span>
          <span className="text-zinc-600 ml-2 text-xs">MIT © </span>
          <a
            href="https://github.com/neerav34"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
          >
            Neerav Jha
          </a>
        </span>
        <div className="flex items-center gap-4">
          {[
            { href: 'https://www.npmjs.com/package/@neerav34/env-doctor', label: 'npm' },
            { href: 'https://github.com/neerav34/env-doctor', label: 'GitHub' },
            { href: 'https://github.com/neerav34/env-doctor-action', label: 'Action' },
            { href: 'https://github.com/neerav34/env-doctor/issues', label: 'Issues' },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
