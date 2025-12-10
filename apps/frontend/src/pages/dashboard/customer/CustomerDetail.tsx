import { Suspense } from 'react'
import { ErrorBoundary, Loading, Modal } from '@/components'
import type { Customer } from '@/types'
import CustomerDetailContent from './CustomerDetailContent'

interface CustomerDetailProps {
  customer: Customer
  onClose: () => void
}

export default function CustomerDetail({ customer, onClose }: CustomerDetailProps) {
  return (
    <Modal title={`${customer.name}님의 구매 내역`} onClose={onClose}>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <CustomerDetailContent customer={customer} />
        </Suspense>
      </ErrorBoundary>
    </Modal>
  )
}
