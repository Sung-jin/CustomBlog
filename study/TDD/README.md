# TDD

**TDD 자체가 처음이기 때문에 우선은 여러 자료들을 읽으면서 받아적고 있음**<br>
**서버에 TDD 를 적용하면서 익히게 된 내용을 바탕으로 다시 작성 할 예정**<br>

참고<br>

* [nodejs 테스트 도구와 방법론 (테스트의 중요성, 전략, mocha, chai, sinon, istanbul, 유용한 팁)](https://sjh836.tistory.com/174)
* [\[Agile\] TDD(테스트 주도 개발)란](https://gmlwjd9405.github.io/2018/06/03/agile-tdd.html)


## Test-driven development

* 테스트 주도 개발
    * **즉, 프로그램을 작성하기 전에 테스트 먼저 작성!**
* 단위 테스트와 다름
* 매우 짧은 개발 사이클을 반복하는 소프트웨어 개발 프로세스
* 결정과 피드백 사이의 갭을 조절하기 위한 테크닉
    - 결정 : 프로그램 작성 시, '이렇게 작성하겠다' 라는 것을 결정
    - 피드백 : 프로그램이 성공 or 실패 or 에러 등과 같은 피드백이 생성
    - 갭 : 결정과 피드백 사이이며, 이를 인식하면 TDD 를 하는 것
* 불확실성이 높을 때 TDD 를 적용하면 좋음
* 결론적으로 TDD 를 이용하면 결함↓, 코드 복잡도↓, 유지보수↑, 협력↑ 등의 긍정적인 측면이 존재하지만 개발시간↑, TDD 의 어려움 및 적용에 대한 고정관념 등의 여러 요인들이 존재
* [TDD 를 연습하면서 참고하기 좋은 팁 10](https://medium.com/@rinae/tdd-test-driven-development-를-연습하면서-참고하기-좋은-팁-10가지-d8cf46ae1806)


## TDD 순서

1. 요구사항을 검증하는 자동화된 테스트 케이스를 작성
2. 그 텍스트 케이스를 통과하기 위한 최소한의 코드를 생성
3. 작성한 코드를 표준에 맞도록 리펙토링


## TDD 의 중요성

1. 반복행위의 감소 -> 비용의 감소
2. 오류, 버그의 확인 및 수정 -> 리펙토링의 베이스
3. 코드의 올바른 동작에 대한 하나의 스펙문서
4. 레거시 코드를 보는 관점


## 테스트 전략

* 테스트 커버리지를 100% 로 유지 할 필요는 없음
* 테스트 코드는 주요 레이어, 로직에만 적용해도 충분


## Node.js 테스트 도구

* 테스트 라이브러리들은 전역설치를 하지말고 개발 폴더에서 설치하는게 좋음

1. mocha
> * 테스트 프레임워크
> * 공식문서 : https://mochajs.org/<br>
> * 테스트 블록
>   * describe = context : 테스트 suite
>   * it = specify : 단위 테스트
> * 훅 메소드
>   * before() : 블록 범위 내 전체 테스트 전에 실행
>   * after() : 블록 범위 내 전체 테스트 후에 실행
>   * beforeEach() : 블록 범위 내 각 단위테스트 직전에 실행
>   * afterEach() : 블록 범위 내 각 단위테스트 직후에 실행
> * 팁
>   * context 를 사용할 일이 있다면, 화살표 함수 사용 할 시 this 에 접근할 수 없음
>   * 타임아웃은 개별 테스트 케이스의 describe 레벨에서, 적역은 mocah --timeout 5000
>   * 특정 조건에서 런타임에 테스트를 무시는 this.skip();
>   * npm 스크립트 등록 후 사용
>       * npm test = "mocha --exit --timeout 5000 test/**/*.spec.js"
>   * '#태그'와 mocha grep 을 통해 태그가 달린 것만 테스트 가능

2. chai
> * 단언 라이브러리
> * 공식문서 : https://www.chaijs.com/
> * 단언문
>   * expect(걀과값).to.(not).equal(기대값);
>       * not 은 저 위치에 추가 가능
>   * expect(결과값_객체).to.deep.equal(기대값_객체)
>   * expect(결과값).to.be.a(기대되는 타입);
>       * ex) expect(result.size).to.be.a.("number");
>   * expect(에외던지는 함수).to.throw(예외);
>   * 이외에 native 함수의 조합 가능
>       * ex) NaN 테스트 : expect(isNaN(result)).to.equal(true);

3. sinon
> * mocking 라이브러리
> * 공식문서 : https://sinonjs.org/
> * spy : spy 로 감싸진 함수의 인자, 반환 값, 호출횟수 등 모든 것이 기록됨
> * stub : 실제 함수를 바꿔서 반환 값 등을 조작 가능
> * mock : spy, stub 의 특성을 모두 가지고 있음
> * sinon.stub(userDAO, "insert").thorws("예외!"); - 예외 발샏 mocking
> * sinon.stub(userDAO, "update").resolves(1); - Promise 반환
> * spy, stub, mock 모두 wrap 을 하는 방식 -> unwrap 을 해줘야 다른 단위테스트에 영향 X
> * sinon sandbox / sinon test 래핑함수를 사용하면 자동으로 unwrap 도는 아래와 같이 훅 메소드 활용
```javascript
// stubHelper.js
function unwrapMethod(stub) { 
    for (let method in stub) { 
        stub[method].restore(); 
        delete stub[method]; 
    } 
}
    
// userService.spec.js 
describe("UserService", () => { 
    const stub = {}; 
    afterEach("stub method restore", () => stubHelper.unwrapMethod(stub)); 
    it("update_성공", async () => {
        //생략... 
        stub.update = sinon.stub(userDAO, "update").resolves(1); 
        //생략... 
    }); 
}):
```

4. nyc
> * 테스트 커버리지 도구
> * 공식문서 : https://istanbul.js.org/
> * npm script 는 "coverage": "nyc --reporter html npm test"
> * Statements: 실행된 명령문 / 전체 명령문
> * Branches: 실행된 문기문 / 전체 분기문
> * Functions: 실행된 함수 / 전체 함수
> * Lines: 실행된 라인 수 / 전체 코드라인 수
> * 시각화 자료를 통해 테스트 하지 않은 것을 확인 할 수 있음

## Node.js 테스트 방법론

1. 테스트 코드의 가독성
* given, (mocking), when, then 패턴
    * 단순하지만 흐름이 명확
    * given 끝에 mocking 을 일관되게 하는 것을 추천
    * hook 을 이용하여 중복을 제거
* 테스트 그룹핑
    * describe, context, it 을 적절히 활용하여 구분
```javascript
// 대분류 
describe("파일명/클래스명 등", () => { 
    // 소분류 
    context("유사 테스트군", () => { 
        // 상위 describe와 구분을 주기위해 context 사용. describe 사용해도 무관함 
        // 단위테스트 
        it("메소드명_성공", () => { 
            // ... 
        }); 
        
        // 단위테스트 
        it("메소드명_실패_원인", () => { 
            // ... 
        }); 
    }); 
}); 

// 예제 
describe("UserService", () => { 
    context("Read", () => { 
        it("findBy_성공", () => {...}); 
        
        it("findBy_실패_없는유저", () => {...}); 
        
        it("findListBy_성공", () => {...}); 
    }); 
    
    context("Create", () => {...});
});
```

2. 비동기에서
* describe 레벨에서 async/await 불가
* hook 메소드나 단위 테스트에서 사용해야 함
```javascript
beforeEach(async () => { 
    // await ... 
}); 

it("delete 성공test", async () => { 
    // given 
    const id = "devljh"; 
    
    // mocking 
    sinon.stub(userDAO, "delete").resolves(1); 
    
    // when 
    const result = await userService.delete(id); 
    
    // then 
    expect(result.success).to.equal(true); 
});
```

3. 예외 테스트
* 예외를 던지는 함수를 assertion
```javascript
const fn = () => testHelper.throwError();
expect(fn).to.throw(Error);
```
* 예외를 잡아서 assertion
```javascript
// given
const id = "없는 아이디";

// mocking
stub.selectById = sinon.stub(userDAO, "selectById").resolves(undefined);

// when
const result = await userService.findBy(id).catch(e => e);

// then
expect(result).to.be.an("error");
expect(result.constructor).to.equal(NoDataError); // 프로토타입 체이닝으로 constructor 를 호출하여 비교
```

4. 테스트 코드에 유용한 함수
* Object.prototype.constructor
    * typeof, instanceof 보다 constructor 를 통해 확인하는 것을 추천
    * 주로 커스텀 에러를 던질 떄 확인하는 용도로 사용
* Array.prototype.every
    * boolean 을 반환하며, 배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트
```javascript
// when
const resultList = await service.parallel();

// then
expect(resultList.every(result => result.success)).to.equal(true); // 이렇게 하지 않았으면 for 루프를 돌리며 기대값과 비교
```
* Array.prototype.includes
    * ES6 에 추가된 함수
    * boolean 반환