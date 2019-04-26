# CI/CD 적용

참고
* [Node + Mocha + Travis + Istanbul + Coveralls: 오픈소스 프로젝트 단위 테스트 & 코드 커버리지 (Unit tests & Code coverage)](https://sanghaklee.tistory.com/53)
* [Custom Deployment](https://docs.travis-ci.com/user/deployment/custom/)

**테스트 코드 및 스크립트 작성 이후로 가정하여 CI/CD 적용**

## Travis

* 저장소와 연동하여 push 요청이 있을 경우, 설정한 설정대로 코드를 빌드 및 테스트하고 결과를 알려줌
* .travis.yml 이라는 Travis 설정 파일을 적용 할 프로젝트에 생성

```
# .travis.yml
# node.js 기준

language: node_js
node_js:
- "stable"
```

* 사용 할 언어 및 버전을 설정
* stable : 최신 / 6, 7, 8, 9... 와 같이 숫자로 하면 그 버전 사용
* git push 가 발생 할 경우, .travis.yml 와 Travis 에서 그 저장소와 연동했을 경우, 자동으로 저장소 클론 및 빌드, 테스트를 진행
* 나의 경우 projectDirectory/Back-End/.travis.yml 와 같이 루트 프로젝트 안의 다른 디렉토리에 트레비스가 존재
    * 위와같이 제일 최상단 디렉토리에 .travis.yml 이 존재하지 않을 경우 'make test' 가 기본 실행문이 되어 테스트가 진행되지 않음
    * 테스트 스크립트의 경우 [TDD/apply.md](../TDD/apply.md)에 과정 맟 스크립트가 있음
* 위의 문제를 해결하기 위해 .travis.yml 에 before_script 에 스크립트 작성

```
# .travis.yml

before_script:
  cd Back-End && npm install
```

* 또한, 이전에 테스트 스크립트를 -w 옵션으로 파일 변경을 계속 바라보는 형태로 작성해서 문제 발생
    * 이는 Travis 안에서 테스트가 끝나지 않는 문제 발생

```
# package.json

"scripts": {
    ...
    "test": "mocha --require @babel/register --recursive",
    "testCMD": "mocha --require @babel/register --recursive -w",
    ...
  },
```

* Travis 는 npm test 로 실행하기 때문에 개인적으로 로컬에서 코드를 작성하며 파일이 변경 될 때마다 테스트를 지켜보는 용도로 사용할 다른 스크립트 생성함
* npm test 를 통해 테스트가 동작할 수 있게 세팅만 했다면 Travis 에서 저장소와 연동 및 .travis.yml 파일에 타겟 언어만 잘 설정하면 push / pull request 가 발생 할 때마다 Travis 에서 자동으로 빌드 및 테스트를 진행함
* 나와 같이 경로 문제가 있다면 추가 설정해주면 됨

## [istanbul](https://gotwarlost.github.io/istanbul/)

* code coverage 분석 툴 중 하나
    * code coverage 는 테스트 케이스가 코드를 얼만큼 테스트 했는지 분석
    * 작성한 테스트 코드가 모든 코드에 대해 얼만큼 테스트를 거쳐서 확인했는지 알려주는 지표
* 나의 경우 babel 과 연동하기 위해 babel-istanbul 을 사용

```
# shell
$ npm install --save-dev babel-plugin-istanbul cross-env nyc
```

* cross-env : 멀티플렛폼 환경변수 설정
* nyc : coverage 인터페이스

* 바벨 설정에 istanbul 플러그인을 추가

```
#.babelrc

...
"env": {
    "test": {
      "plugins": [
        "istanbul"
      ]
    }
  }
...
```

* nyc 사용을 위한 설정 추가

```
# package.json

"nyc": {
    "require": [
      "@babel/register"
    ],
    "reporter": [
      "lcov",
      "text"
    ],
    "exclude": [
      "app.js"
    ],
    "sourceMap": false,
    "instrument": false
  },
```

* code coverage 스크립트 작성
* nyc 를 이용하여 code coverage 시각화
* %Stats : 명령문의 수행률
* %Branch : 분기문의 수행률
* %Funcs : 함수의 수행률
* %Lines : 코드수의 수행률
* Uncovered Line %s : 수행하지 못한 라인 넘버

```
# package.json

"scripts": {
    ...
    "cover": "cross-env NODE_ENV=test nyc mocha --require @babel/register --recursive",
    ...
  },
```

## [Coveralls](https://coveralls.io)

* Travis 테스트 이후 코드 커버리지 결과를 공개적으로 보고 할 수 있는 서비스
* 사용할 저장소와 연동 후 coveralls, mocha-lcov-reporter 설치

```
#shell

$ npm install --save-dev coveralls mocha-lcov-reporter
```

* 설치 이후 스크립트 추가

```

# package.json

"scripts": {
    ...
    "coveralls": "npm run cover -- --report lcovonly && cat ./coverage/lcov.info | coveralls",
    ...
  },
```

* 이후 .travis.yml 에 스크립트 추가

```
# .travis.yml

after_success:
  - npm run coveralls
```

* 위와 같이 Travis 및 coveralls 에 설정하면 Travis 에서 빌드 및 테스트 이후 그 결과를 coveralls 에 전송하고 시각화 해줌

## Deployment
* ~~지금 집 인터넷에 문제가 발생하여 공유기의 포트포워딩 및 외부 접속에 문제가 발생~~
* ~~이게 해결되야 로컬 서버에 세팅을 하고 되는걸 확인할텐데...~~
* 나의 경우 클라우드 서비스를 이용하지 않음
    * 로컬 서버를 사용해서 여기에 파일이 배포되었음 하니, ftp 를 이용
    * 클라우드 (aws, gcp...) 를 이용한 자동 배포는 포스팅이 많음 ㅎㅎ


## 세팅 결과

```
# .travis.yml

language: node_js
node_js:
- "stable"

before_script:
  cd Back-End && npm install

after_success:
  - npm run coveralls
```

```
#package.json

...
"scripts": {
    "build": "babel routes",
    "start": "nodemon --exec babel-node ./bin/www",
    "test": "mocha --require @babel/register --recursive",
    "testCMD": "mocha --require @babel/register --recursive -w",
    "cover": "cross-env NODE_ENV=test nyc mocha --require @babel/register --recursive",
    "coveralls": "npm run cover -- --report lcovonly && cat ./coverage/lcov.info | coveralls"
  },
  "nyc": {
    "require": [
      "@babel/register"
    ],
    "reporter": [
      "lcov",
      "text"
    ],
    "exclude": [
      "app.js"
    ],
    "sourceMap": false,
    "instrument": false
  },
...
```