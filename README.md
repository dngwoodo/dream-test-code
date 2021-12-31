```shell
npm i

npm run start
```
```shell
npm test

npm test -- --coverage

npm test -- --u
```
```shell
npm run cypress
```
<br/>

## 스냅샷 테스트
현재 강의에서는 스냅샷 테스트를 사용하고 있다. 하지만 내 생각은 아래와 같다.

스냅샷 테스트로 ui 테스트를 진행할 때 처음 테스트때 실수를 하게 된다면 테스트로 잡을 수 없는 영역이 생긴다.

그리고 누군가 실수로 인해 잘못 변경된 지점에서 스냅샷을 변경해버린다면 돌이킬 수 없을 것 같다.

그렇기 때문에 스냅샷 테스트보다는 일반적인 ui 테스트를 활용해보면 좋을 것 같다.

<br/>

## 텍스트가 없는 버튼 테스트
이미지나 아이콘만 들어가 있는 버튼을 테스트 할 때는 `title`이라는 속성을 사용해서 `getByTitle`이라는 api를 사용할 수 있다. 해당 버튼을 hover하면 툴팁으로 title속성값이 표시된다.

<br/>

## 프론트엔드에서의 통합 테스트(integration test)
테스트의 범위에 따라서 유닛테스트이냐 통합테스트이냐로 분류된다. 그래서 명확하게 구분하는 것이 쉽지 않다. 

현재 프로젝트에서 Habits 컴포넌트가 통합 테스트에 가깝다. 하위 컴포넌트도 테스트를 진행하기 때문이다. 즉, Habits라는 컴포넌트는 다른 컴포넌트들에 의존적이다.

그리고 어플리케이션 자체 로직을 테스트하는 것은 명백히 통합 테스트이다. 즉, app.jsx가 통합테스트라고 생각하면 된다.

<br/>

## E2E 테스트
cypress + testing-library/cypress를 같이 사용하니 사용자가 화면을 바라볼때 얻을 수 있는 정보들을 이용해서 테스트할 수 있다. testing-library가 추구하는 철학처럼 class나 id와 같은 내부 구현사항에 의존적이지 않는게 좋다.

cypress는 기본적으로 네트워크 요청이 끝날때까지(최대 5초) 기다려준다. 하지만 네트워크로 받아오는 데이터가 일정하지 않을 수 있기 때문에 따로 데이터를 준비해서 사용할 수 있다. 데이터는 `cypress/fixtures/todos.json` 이런 파일에 넣어준다.

```js
beforeEach(() => {
  // todos라는 경로에 get요청을 보낼때 todos.json 데이터로 대체하는 코드이다.
  // as는 cypress를 실행시켰을 때 실행되는 요청 이름을 결정한다.
  cy.intercept('GET', /(todos)/g, { fixtures: 'todos.json' }).as('getTodos');

  cy.visit('/');
});

it('display todos', () => {
  cy.findByText('아무것도 안하기').should('exist');
  cy.findByText('무엇이든 하기').should('exist');
})
```
<br/>

## 시각적인 테스팅 하는 법(visual testing)
- story book
- story book + chromatic
  https://www.chromatic.com/
- story book + percy
  https://percy.io/

디자인 시스템을 변경했을 때 시각적으로 px이 틀어진다던지 그런 경우가 생겨서 design qa때 많은 시간을 쓸 때가 있는데 이 조합으로 어느정도 커버할 수 있을 것 같다.