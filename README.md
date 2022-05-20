# Project Study Time Checker

* 사용자의 학습 시간을 측정하는 서비스 입니다.
* 도메인: [https://study-time-checking-project.netlify.app/](https://study-time-checking-project.netlify.app/)
* Rest API: [https://lumbar-plot-db9.notion.site/REST-API-494bb9a60e1b421eadc6fb27a1972ecb](https://lumbar-plot-db9.notion.site/REST-API-494bb9a60e1b421eadc6fb27a1972ecb)


# 구현 계획

1. Layout 구현: ``AuthorLayout``, ``MainLayout``
2. Author 저장용 Context 구현
3. App 구현: ``Author - App - Layout``



<br /><hr /><br />



# 컴포넌트 구조

```bash
├─ <BrowserRouter />
│     └── <MainContext />
│           └─ <App />
│                 └─ <Outlet />
│                       ├─ <Home />
│                       └─ <Study />
```



<br /><hr /><br />



# MainContext 구조

```typescript
// MainStateContext
interface MainStateContext {
  email: string;
  password: string;
  token: string;
}

enum DispatchType {
  INIT: "INIT"
  LOGIN: "LOGIN"
  LOGOUT: "LOGOUT"
}

interface DispatchPayload {
  email: string;
  password: string;
}

// MainDispatchContext
interface MainDispatchContext {
  ({ type: DispatchType, payload: DispatchPayload }) => void
}
```