import { GraduationCap } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-600 text-white">
            <GraduationCap size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">RUET Lab Report Generator</h1>
            <p className="text-sm text-slate-600">Create, preview, and download .doc reports</p>
          </div>
        </div>
        <a href="https://www.ruet.ac.bd/" target="_blank" rel="noreferrer" className="text-sm text-emerald-700 hover:text-emerald-800 font-medium">RUET Website</a>
      </div>
    </header>
  )
}
