![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/99702761/215339490-0a4b255c-cac3-4384-aa21-f4d842442db1.gif)
# GaeNaDoo | 개나두

<p><a href='https://gnd-project.vercel.app/'>🔗 웹 사이트 </a> · <a href='https://www.figma.com/file/fC3JHJ1fwaoNHlQmM2VU73/ProjectB4?node-id=0%3A1'>🔗 와이어 프레임 </a> · <a href='https://www.notion.so/e47d9765fa854a98add99c778a6f2df1'>🔗 S.A </a> </p>

## 1. 프로젝트 소개

- 개발자 나두 할 수 있어!
- 무료 웹개발 강의 사이트 (로그인만 하면 모든 강의 무료!)
- 웹개발 공부를 하는 학생들이 강의를 듣기 편하도록 카테고리 별로 나누어 유튜브 강의를 제공한다.

---

## 2. 프로젝트 실행

- ```sh
  npm install
  ```
- ```sh
  npm start
  ```

---

## 3. 기술 스텍

<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4da56ad1-2b6f-404f-9e1b-1a3829e0d2d0/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230129T145713Z&X-Amz-Expires=86400&X-Amz-Signature=13549d8cd1040b37b5fa1751dcbb9e461f84a022f5dc0e4fcfda7e97a1a1fdd1&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" alt="logo"></p>

---

## 4. 구현 기능



- **공통**
  - 파이어베이스 데이터베이스에 API 데이터 추가
  - 타입스크립트 사용하기
- **헤더**
  - 검색 기능
- **로그인 페이지**
  - 회원가입/로그인 구현 (파이어베이스 인증 사용, 이메일, 구글계정)
  - 회원가입/로그인 유효성 검사
  - 로그아웃 시 lecture페이지 접근 금지
- **메인 페이지**

  - 강의 전체 목록 조회
    (파이어베이스 데이터베이스 사용)
  - 슬라이드 배너
  - 강의 필터링

  - 메인페이지 정렬 기능

- **강의 대시보드 페이지**
  - 강의에 대한 설명과 커리큘럼(강의 리스트) 조회
    (파이어베이스 데이터베이스 사용, 메인 페이지에서 강의 id와 매핑)
  - 강의 후기(댓글) CRUD 구현
    (파이어베이스 데이터베이스 사용)
  - 파이어베이스 데이터베이스를 활용한 pagination 구현
- **강의 페이지**
  - 단일 강의 조회
    (유튜브 API 사용)

---

## 5. 팀 구성

| 역할 | 이름 | 이메일 주소 |
| --- | --- | --- |
| 팀장 | 이정은 | mailto:jungwn9494@gmail.com |
| 팀원 | 박상우 | mailto:qtd950@gmail.com |
| 팀원 | 이태현 | mailto:xogus72453659@gmail.com |
| 팀원 | 남동현 | mailto:pvc9610@gmail.com |
| 팀원 | 지회수 | mailto:newasborn@gmail.com |


