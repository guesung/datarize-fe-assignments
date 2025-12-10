import { useCustomerPurchases } from '@/hooks'
import { Loading, ErrorMessage, Modal } from '@/components'
import type { Customer } from '@/types'
import { formatCurrency, formatDate, getErrorMessage } from '@/utils'

interface CustomerDetailProps {
  customer: Customer
  onClose: () => void
}

export default function CustomerDetail({ customer, onClose }: CustomerDetailProps) {
  const { data, isLoading, isError, error, refetch } = useCustomerPurchases(customer.id)

  return (
    <Modal title={`${customer.name}님의 구매 내역`} onClose={onClose}>
      {isLoading && <Loading />}

      {isError && (
        <ErrorMessage message={getErrorMessage(error, '구매 내역을 불러오는데 실패했습니다.')} onRetry={refetch} />
      )}

      {data && data.length > 0 && (
        <div className="space-y-4">
          {data.map((purchase, index) => (
            <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
              <img src={purchase.imgSrc} alt={purchase.product} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{purchase.product}</h3>
                <p className="text-sm text-gray-500">구매일: {formatDate(purchase.date)}</p>
                <p className="text-sm text-gray-500">수량: {purchase.quantity}개</p>
                <p className="text-sm font-medium text-blue-600">{formatCurrency(purchase.price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {data && data.length === 0 && <p className="text-center text-gray-500 py-8">구매 내역이 없습니다.</p>}
    </Modal>
  )
}
