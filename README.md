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
├── apis/           # API 클라이언트 및 엔드포인트
├── components/     # 공통 UI 컴포넌트 (Modal, Loading 등)
├── hooks/
│   ├── common/     # 공통 유틸리티 훅 (useDebounce 등)
│   └── queries/    # React Query 훅
├── pages/
│   └── dashboard/  # 대시보드 페이지 및 전용 컴포넌트
├── types/          # 타입 정의
├── utils/          # 유틸리티 함수
├── App.tsx
└── main.tsx
```

## API 명세

| 엔드포인트                          | 설명             | 쿼리 파라미터                                |
| ----------------------------------- | ---------------- | -------------------------------------------- |
| `GET /api/purchase-frequency`       | 구매 빈도 데이터 | `from`, `to` (ISO 8601 형식, optional)       |
| `GET /api/customers`                | 고객 목록        | `sortBy` (asc/desc), `name` (검색, optional) |
| `GET /api/customers/{id}/purchases` | 고객 구매 내역   | -                                            |
