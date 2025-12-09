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



### 사전 요구사항
- JDK 17 이상
- Node.js 18 이상
- Oracle Database 12c
- Git



## 🎨 주요 기능

- ✅ Todo 추가, 수정, 삭제
- ✅ Todo 완료 상태 토글
- ✅ 더블클릭으로 인라인 편집
- ✅ 반응형 디자인
- ✅ 실시간 통계 (전체/완료 개수)
