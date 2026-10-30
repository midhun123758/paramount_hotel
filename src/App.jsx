import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">front_end_5star</h1>
              <p className="text-sm text-slate-400">React + Vite + Tailwind CSS</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            5-Star Ready
          </span>
        </div>

        <p className="text-slate-300 text-base leading-relaxed mb-6">
          Your React project is set up and ready in{' '}
          <code className="text-amber-300 bg-slate-800 px-2 py-0.5 rounded text-sm font-mono">
            C:\Users\MIDHUN\OneDrive\Desktop\front_end_5star
          </code>
          . Tailwind CSS is integrated and working seamlessly.
        </p>

        <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800/80 mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-slate-400">Interactive State Test</div>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">{count} clicks</div>
          </div>
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold transition-all duration-200 shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer"
          >
            Increment Count
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="font-semibold text-slate-200 mb-1">⚡ Next Steps</div>
            <div className="text-slate-400 text-xs">
              Run <code className="text-amber-300">npm run dev</code> to start the development server.
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="font-semibold text-slate-200 mb-1">🎨 Tailwind CSS v4</div>
            <div className="text-slate-400 text-xs">
              Pre-configured in Vite. Start styling with standard utility classes.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
