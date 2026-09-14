import React from 'react';
import { AlertTriangle, RefreshCcw, Sparkles } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Hana AI Companion caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center p-4">
          <div className="glass-card p-6 sm:p-8 max-w-lg w-full text-center space-y-5 border border-rose-500/30 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <span className="badge badge-purple text-xs mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Hana AI Companion Safety
              </span>
              <h2 className="text-xl sm:text-2xl font-black gradient-title font-heading">
                Something went wrong
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Hana encountered an unexpected browser issue. Don't worry, your learned progress is safely stored in local memory.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-slate-950/80 border border-white/10 p-3 rounded-xl text-left text-xs text-rose-300 font-mono overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <button onClick={this.handleReload} className="btn btn-gold w-full text-sm">
              <RefreshCcw className="w-4 h-4" />
              Reload Hana Companion
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
