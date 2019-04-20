# TDD 적용

참고
* [Node.js 로 TDD 를 도전해보자](https://seokjun.kim/node-js-tdd/)
* [NodeJS에서 가장 많이 사용하는 테스트 프레임웍, Mocha](http://jeonghwan-kim.github.io/mocha/)


## TDD 환경 설정

1. 라이브러리 설치

```
$ npm install --save-dev @babel/cli @babel/core @babel/preset-env
$ npm install --save-dev chai mocha supertest
$ npm install --save nodemon
```

* ES5, ES6 이상 문법의 호환성을 위해 babel 을 설치
* 테스트 프레임 워크인 mocha, 라이브러리 chai 설치
* superTest 는 통합테스트 라이브러리, 내부적으로 express 구동 및 요청과 그 결과 검증까지 실행
* 코드 수정시 자동으로 서버 재실행 해주는 라이브러리 nodemon 설치

2. package.json 에서 npm script 작성

```
"scripts": {
    "build": "babel routes -d dist -w",
    "start": "nodemon ./bin/www",
    "test": "node_modules/mocha/bin/mocha $(find ./dist -name '*.spec.js') --recursive -w"
  }

//위의 스크립트에서 아래의 스크립트 형태로 변경

"scripts": {
    "build": "babel routes",
    "start": "nodemon --exec babel-node ./bin/www",
    "test": "node_modules/mocha/bin/mocha --require @babel/register --recursive -w"
  }
```

* build - 바벨을 이용하여 routes 폴더 아래에 있는 것들 컨버팅
* start - nodemon 을 이용하여 파일 변경시 바벨 컨버팅 실행 후 서버 실행
* test - mocha 를 이용하여 바벨 컨버팅 이후 *.spec.js 파일의 내용으로 테스트 실행 및 -w 옵션으로 변경 될 때마다 자동으로 테스트 실행

3. 폴더/파일별 의미

* routes : api 경로 별 routes 기능 명세
* test/app.spec.js : 테스트 코드 작성하는 파일
* .babelrc : 바벨을 설정하기 위한 파일

## TDD 및 서버 실행

* ~~총 3개의 커맨드 창 필요~~
    * ~~파일이 변경 될 때마다 바벨이 실행 되어야 하는데, "babel routes -d dist -w && nodemon ./bin/www" 와 같이 한번에 연결하면 nodemon 이 실행안되고 바벨 스크립트만 계속 봄 (-w 때문)~~
    * ~~"nodemon -exec npm run build ./bin/www" 할 경우, 파일이 변경이 되지 않더라도 바벨이 실행되며 파일이 변경된 것으로 나와서 nodemon 이 다시 스크립트 실행하며 계속 바벨실행 -> 파일변경 -> 스크립트 실행 ... 을 반복하게 됨~~
    * ~~좋은 방법은 아닌거 같지만 서버실행과 테스트 실행을 같이 하면서 개발을 하고 싶어서 위와 같이 스크립트를 3개를 실행~~
* ~~또는 npm script 3개를 백그라운드로 실행해도 됨~~
* 바벨을 통해서 컨버팅만 하고싶으면 npm run build
* 테스트만 진행하고 싶으면 npm test
* 서버를 실행하고 싶으면 npm start