import { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * 에러 바운더리 컴포넌트
 * - 하위 컴포넌트에서 발생한 에러를 catch하여 폴백 UI 표시
 * - 에러 복구를 위한 재시도 버튼 제공
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      // 커스텀 폴백이 있으면 사용
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 기본 에러 UI
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg">
          <div className="text-red-600 text-lg font-medium mb-2">오류가 발생했습니다</div>
          <p className="text-red-500 text-sm mb-4">{this.state.error?.message || '알 수 없는 오류가 발생했습니다.'}</p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
