# Project Study Time Checker

* ``Webcam`` 을 통해 사용자의 학습시간을 측정 및 기록하는 서비스 입니다.
* ``Teachable Machine`` 과 ``Model`` 을 사용하여, ``canvas`` 에 나타난 사용자의 행동을 분류 합니다.
  * ``study``: 학습중
  * ``phone``: 폰 사용중
  * ``empty``: 자리비움
* 도메인: [https://study-time-checking-project.netlify.app/](https://study-time-checking-project.netlify.app/)
* Rest API: [https://lumbar-plot-db9.notion.site/REST-API-494bb9a60e1b421eadc6fb27a1972ecb](https://lumbar-plot-db9.notion.site/REST-API-494bb9a60e1b421eadc6fb27a1972ecb)
* 기획 및 시안: [https://www.figma.com/file/2TSGtGCkq7TZC778hS7m1w/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8(2022.05)---StudyTimeChecking?node-id=0%3A1](https://www.figma.com/file/2TSGtGCkq7TZC778hS7m1w/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8(2022.05)---StudyTimeChecking?node-id=0%3A1)



<br /><hr /><br />



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



<br /><hr /><br />



# 구현 결과

