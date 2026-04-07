import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 bg-surface-container-highest border border-violet-400/30 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(167,139,250,0.1)] cyan-glow"
        >
          <div className="w-8 h-8 rounded-sm bg-violet-400/10 flex items-center justify-center text-violet-400">
            <CheckCircle size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
