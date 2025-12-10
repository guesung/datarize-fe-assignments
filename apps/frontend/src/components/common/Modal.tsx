import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { CloseIcon } from '@/components/icons'

interface ModalProps {
  title: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ title, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // 포커스 트랩 - 모달 열릴 때 첫 번째 포커스 가능한 요소에 포커스
  useEffect(() => {
    const modalElement = modalRef.current
    if (!modalElement) return

    // 포커스 가능한 요소들
    const focusableElements = modalElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // 모달 열릴 때 첫 번째 요소에 포커스
    firstElement?.focus()

    // Tab 키로 포커스 이동 시 모달 내부에 갇히도록
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab: 역방향
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab: 정방향
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    modalElement.addEventListener('keydown', handleTab)
    return () => modalElement.removeEventListener('keydown', handleTab)
  }, [])

  // 배경(overlay) 클릭으로 모달 닫기
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 id="modal-title" className="text-xl font-bold">
            {title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="닫기">
            <CloseIcon />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">{children}</div>
      </div>
    </div>
  )
}
