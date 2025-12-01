# Todo List Application

Spring Boot + Next.js를 사용한 풀스택 Todo List 애플리케이션

## 🛠 기술 스택

### Backend
- Java 17
- Spring Boot 3.5.8
- Spring Data JPA
- Oracle Database 12c
- Lombok
- Gradle

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- React 18

## 📁 프로젝트 구조

```
todoList/
├── backend/          # Spring Boot 백엔드
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/jinie/todoList/
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   ├── repository/
│   │   │   │   ├── entity/
│   │   │   │   ├── dto/
│   │   │   │   └── config/
│   │   │   └── resources/
│   │   │       └── application.yaml
│   │   └── test/
│   └── build.gradle
│
└── frontend/         # Next.js 프론트엔드
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── lib/api/
    │   └── types/
    └── package.json
```

## 🚀 시작하기

### 사전 요구사항
- JDK 17 이상
- Node.js 18 이상
- Oracle Database 12c
- Git

### 데이터베이스 설정

1. Oracle Database 실행
2. 사용자 생성 및 권한 부여:
```sql
CREATE USER your_username IDENTIFIED BY your_password;
GRANT CONNECT, RESOURCE, DBA TO your_username;
```

3. `backend/src/main/resources/application-local.yaml` 생성:
```yaml
spring:
  datasource:
    url: jdbc:oracle:thin:@localhost:1521:XE
    username: your_username
    password: your_password
```

### Backend 실행

```bash
cd backend
./gradlew bootRun
```

서버가 http://localhost:8080 에서 실행됩니다.

### Frontend 실행

```bash
cd frontend
npm install
npm run dev
```

애플리케이션이 http://localhost:3000 에서 실행됩니다.

## 🔌 API 엔드포인트

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | 모든 Todo 조회 |
| GET | `/api/todos/{id}` | 특정 Todo 조회 |
| POST | `/api/todos` | 새 Todo 생성 |
| PUT | `/api/todos/{id}` | Todo 수정 |
| DELETE | `/api/todos/{id}` | Todo 삭제 |

### 요청/응답 예시

**POST /api/todos**
```json
{
  "title": "Spring Boot 공부하기",
  "completed": false
}
```

**Response**
```json
{
  "id": 1,
  "title": "Spring Boot 공부하기",
  "completed": false,
  "createdAt": "2024-11-27T10:30:00",
  "updatedAt": "2024-11-27T10:30:00"
}
```

## 🎨 주요 기능

- ✅ Todo 추가, 수정, 삭제
- ✅ Todo 완료 상태 토글
- ✅ 더블클릭으로 인라인 편집
- ✅ 반응형 디자인
- ✅ 실시간 통계 (전체/완료 개수)

## 📝 라이센스

MIT License
