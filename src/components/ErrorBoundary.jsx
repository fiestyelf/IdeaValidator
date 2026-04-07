import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like Sentry here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-hsl(var(--bg-deep)) flex items-center justify-center p-8 selection:bg-hsl(var(--primary)/30)">
          <div className="glass-panel p-10 md:p-16 max-w-2xl w-full relative overflow-hidden group shadow-[0_0_120px_hsla(var(--primary),0.05)] text-center space-y-8">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:40px_40px]" />
             
             <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
                  <AlertTriangle size={40} />
                </div>
             </div>

             <div className="space-y-4">
                <h1 className="text-4xl font-black font-headline tracking-tighter text-white uppercase italic">
                  Neural Link <span className="text-red-500">Severed.</span>
                </h1>
                <p className="text-white/60 font-medium">
                  A critical error occurred in the frontend rendering engine. Our systems have logged the anomaly.
                </p>
             </div>

             <div className="pt-8 flex justify-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  <RefreshCw size={16} />
                  Reinitialize Engine
                </button>
             </div>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
