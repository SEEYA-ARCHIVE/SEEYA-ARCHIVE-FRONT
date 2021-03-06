# SEEYA Archive

## 컨벤션

### 브랜치 & PR

> feature/#[이슈번호]

- 마스터 기준으로 배포 진행
- 이슈 기준으로 각 브랜치 생성
- develop 브랜치로 각 피쳐브랜치 PR / 스쿼시 머지로 진행한다.
- PR 날리면 상대방이 리뷰하고 approve되면 본인이 직접 머지한다.

### 커밋메세지

> [feat]: [내용]

| 제목     | 내용                              |
| -------- | --------------------------------- |
| init     | 작업 세팅 커밋 (패키지 설치 등)   |
| feat     | 기능 추가 및 변경 (화면 영향 o)   |
| style    | css 변경                          |
| fix      | 기존의 버그 수정                  |
| hotfix   | 급한 버그 수정                    |
| refactor | 더 좋은 코드 개선 (화면 영향 x)   |
| chore    | 주석, 개행, 포맷팅 등 사소한 작업 |
| docs     | 문서 작성                         |

### 코드 컨벤션

- 함수는 웬만하면 arrow function으로 생성
- 컴포넌트 파일명은 컴포넌트 이름.tsx + 대문자로 시작
- 폴더명은 카멜케이스

### 타입스크립트 컨벤션

- 기본은 interface, 유니온등 필요한 경우에는 type

### 컴포넌트 기본 템플릿

```
import React, { FC } from "react";

interface Props {}

const Modal: FC<Props> = (props) => {
  return <div>Modal</div>;
};

export default Modal;
```
