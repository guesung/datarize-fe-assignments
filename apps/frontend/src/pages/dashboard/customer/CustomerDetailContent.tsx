import { useCustomerPurchases } from '@/hooks'
import type { Customer } from '@/types'
import { formatCurrency, formatDate } from '@/utils'

interface CustomerDetailContentProps {
  customer: Customer
}

export default function CustomerDetailContent({ customer }: CustomerDetailContentProps) {
  const { data } = useCustomerPurchases(customer.id)

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 py-8">구매 내역이 없습니다.</p>
  }

  return (
    <div className="space-y-4">
      {data.map((purchase) => (
        <div key={`${purchase.date}-${purchase.product}`} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
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
  )
}
