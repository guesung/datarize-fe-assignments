import { useCustomerPurchases } from '../../hooks';
import { Loading, ErrorMessage } from '../common';
import type { Customer } from '../../types';

interface CustomerDetailProps {
  customer: Customer;
  onClose: () => void;
}

export function CustomerDetail({ customer, onClose }: CustomerDetailProps) {
  const { data, isLoading, isError, error, refetch } = useCustomerPurchases(customer.id);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {customer.name}님의 구매 내역
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isLoading && <Loading />}

          {isError && (
            <ErrorMessage
              message={error instanceof Error ? error.message : '구매 내역을 불러오는데 실패했습니다.'}
              onRetry={() => refetch()}
            />
          )}

          {data && data.length > 0 && (
            <div className="space-y-4">
              {data.map((purchase, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <img
                    src={purchase.imgSrc}
                    alt={purchase.product}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=No+Image';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{purchase.product}</h3>
                    <p className="text-sm text-gray-500">구매일: {formatDate(purchase.date)}</p>
                    <p className="text-sm text-gray-500">수량: {purchase.quantity}개</p>
                    <p className="text-sm font-medium text-blue-600">
                      {formatCurrency(purchase.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data && data.length === 0 && (
            <p className="text-center text-gray-500 py-8">구매 내역이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
