import { Component, ReactNode } from 'react'
import { QueryClient, useQueryClient } from '@tanstack/react-query'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryInnerProps extends ErrorBoundaryProps {
  queryClient: QueryClient
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundaryInner extends Component<ErrorBoundaryInnerProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryInnerProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  handleReset = () => {
    // React Query 캐시도 리셋하여 에러 상태 제거
    this.props.queryClient.resetQueries()
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

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

// 함수형 래퍼 컴포넌트: useQueryClient 훅을 사용하여 queryClient를 전달
export default function ErrorBoundary(props: ErrorBoundaryProps) {
  const queryClient = useQueryClient()
  return <ErrorBoundaryInner {...props} queryClient={queryClient} />
}
