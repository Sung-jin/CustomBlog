const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    info: {
        title: 'CustomBlog API',
        version: '1.0.0',
        description: '블로그 관련 API 및 그외 필요한 API 구현과 테스트. swagger 연습도 할겸 만든 페이지!',
        contact: {
            email: 'osj4872@gmail.com'
        },
        license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
        },
    },
    host: '120.50.78.185',
    basePath: '/v1',
    tags: [
        {
            name: 'deploy',
            description: 'git branch의 deploy push가 travis 에 감지되면 지정한 key 값을 바탕으로 이 API 호출 시, 서버에서 deploy 실행',
        },
        {
            name: 'template',
            description: 'user API 에 대한 설명',
            externalDocs: {
                description: '이 API 에 대한 추가 문서 - ',
                url: '120.50.78.185'
            }
        }
    ],
    schemes: [
        'https', 'http'
    ]
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [
        'routes/**/*.js',
        'swagger/**/*.yaml'
    ]
    //파일 경로 기준이 불려져서 사용되는 곳인듯
    //app.js 에서 사용되니까 거기에서 yaml 파일들 및 라우트 파일들은 저 경로가 맞음
};

module.exports.swaggerSpec = swaggerJSDoc(options);
module.exports.swaggerUi = swaggerUi;