# 쇼핑몰 구매 데이터 대시보드

7월 한 달간의 쇼핑몰 구매 데이터를 시각화하고 분석하는 대시보드 애플리케이션입니다.

## 프로젝트 설정 및 실행

### 요구 사항

- Node.js 20.13.1
- Yarn 1.22.22

### 설치 및 실행

```bash
# 프로젝트 루트(apps)에서 의존성 설치
cd apps
yarn install

# 백엔드 서버 실행 (localhost:4000)
yarn start-server

# 프론트엔드 개발 서버 실행 (localhost:5173)
yarn start-client
```

### 개발 명령어

```bash
# 린트 검사
yarn workspace frontend lint

# 타입 체크
yarn workspace frontend tsc -b

# 빌드
yarn workspace frontend build

# 테스트 실행
yarn workspace frontend test

# 코드 포맷팅
yarn workspace frontend format
```

## 기술 스택

- **React 18** + **TypeScript** + **Vite**
- **TanStack Query (React Query)** - 서버 상태 관리
- **Recharts** - 차트 시각화
- **ky** - HTTP 클라이언트
- **Tailwind CSS** - 스타일링
- **Vitest** + **Testing Library** - 테스트

## 주요 기능

### 1. 가격대별 구매 빈도 차트

- 2만원 이하부터 10만원 이상까지 만원 단위로 구분된 바 차트
- 날짜 범위 선택으로 특정 기간 조회 가능
- 단일 날짜 조회 지원

### 2. 고객 목록 및 검색

- 고객 ID, 이름, 총 구매 횟수, 총 구매 금액 표시
- 구매 금액 기준 오름차순/내림차순 정렬
- 고객 이름으로 검색

### 3. 고객 상세 구매 내역

- 고객 Row 클릭 시 모달로 상세 정보 표시
- 구매 날짜, 제품명, 가격, 썸네일 이미지 포함

## 프로젝트 구조

```
src/
├── api/
│   └── client.ts           # ky 기반 API 클라이언트
├── components/
│   ├── chart/
│   │   └── PurchaseFrequencyChart.tsx  # 구매 빈도 차트
│   ├── common/
│   │   ├── DateRangePicker.tsx   # 날짜 범위 선택
│   │   ├── ErrorBoundary.tsx     # 에러 바운더리
│   │   ├── ErrorMessage.tsx      # 에러 메시지
│   │   └── Loading.tsx           # 로딩 스피너
│   └── customer/
│       ├── CustomerDetail.tsx    # 고객 상세 모달
│       ├── CustomerList.tsx      # 고객 목록 테이블
│       └── CustomerSearch.tsx    # 고객 검색/정렬
├── hooks/
│   ├── useCustomerPurchases.ts   # 고객 구매 내역 조회
│   ├── useCustomers.ts           # 고객 목록 조회
│   └── usePurchaseFrequency.ts   # 구매 빈도 조회
├── types/
│   └── index.ts            # API 응답 타입 정의
├── utils/
│   └── format.ts           # 포맷팅 유틸 함수
├── App.tsx                 # 메인 앱 컴포넌트
└── main.tsx               # 앱 진입점
```

## API 명세

| 엔드포인트                       | 설명              | 쿼리 파라미터                                |
| -------------------------------- | ----------------- | -------------------------------------------- |
| `GET /api/purchase-frequency`    | 구매 빈도 데이터  | `from`, `to` (ISO 8601 형식, optional)       |
| `GET /api/customers`             | 고객 목록         | `sortBy` (asc/desc), `name` (검색, optional) |
| `GET /api/customers/{id}/purchases` | 고객 구매 내역 | -                                            |
