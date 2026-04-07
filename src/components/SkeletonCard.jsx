export default function SkeletonCard({ height = 120, width = '100%', variant = 'default' }) {
  return (
    <div
      className={`relative overflow-hidden glass-panel border-white/5 bg-white/[0.02] shadow-inner animate-pulse`}
      style={{ height, width, borderRadius: 24 }}
    >
       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
       <div className="p-8 space-y-4">
          <div className="h-2 w-1/4 bg-white/5 rounded-full" />
          <div className="h-4 w-3/4 bg-white/10 rounded-full" />
          <div className="h-2 w-1/2 bg-hsl(var(--primary)/20) rounded-full mt-auto" />
       </div>
    </div>
  )
}
