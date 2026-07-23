'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex-1 flex items-center justify-center py-16 bg-gray-50">
          <div className="text-center max-w-md">
            <span className="text-5xl">⚠️</span>
            <h2 className="text-xl font-bold text-gray-800 mt-4">Algo salió mal</h2>
            <p className="text-gray-600 mt-2">{this.state.error?.message || 'Error inesperado'}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="mt-6 bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-800 transition"
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
