# [Swagger](https://swagger.io)

* API 기능 문서를 간단하게 HTML 을 통해 시각화를 도와주는 tool

# [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) 적용

참고
* [Swagger](https://swagger.io)
* [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
* [Node.js에 swagger 적용하기(node.js - swagger library)](https://avilos.codes/server/nodejs/node-js-swagger-library/)

## Setting

* 여러가지 시도한 결과 다음과 같은 결론을 내림
    1. Config, Models, API Specification 파일 분리
    2. Config 의 경우 swagger 세팅을 위한 전체적인 설정 및 문서 구조 세팅
    3. Models 의 경우 swagger 에서 사용 될 객체들 정의
    4. API Specification 의 경우 각각 라우트 기능별 그 기능의 input, output 에 대한 명세
* 위의 구조로 나눈 이유는 개인적인 생각으로 위와 같이 나누는게 유지, 확장에 편하다고 생각
    * Config 를 통해 swagger 의 전체적인 문서 링크, 전체 설명 등 전체적인 설정
    * Models 를 통해 swagger 에서 사용 될 객체를 정의
    * API Specification 을 라우트 기능을 만든 파일에 설정하여 그 파일에 바로 세팅 할 수 있도록 설정
* swagger 폴더 안에 Config 인 AVSwagger.js 와 사용될 객체를 정의할 modls.yaml
* 라우트안의 각각 파일 최상단에 swagger 에 대한 설정을 통해 그 기능과 1:1 매핑함