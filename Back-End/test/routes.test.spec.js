import request from 'supertest';
import { expect } from 'chai';

import app from '../app.js';

/*
이것도 나중에 리뷰를 받아보자
생각한 구조가 라우팅 별로 테스트 코드 작성할 수 있게 만들기 위해
라우팅 단위로 파일 만들어서 그부분만 함수화 시켜서
테스트 스크립트에 쓰이는 파일에 테스트 하고 싶은거만 import 하여 테스트 하면 관리가 쉬워지지 않을까..?
*/

exports.indexTest = () => {
    describe('GET /', () => {
        it('should respond with text message "Hello World"', (done) => {
            request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) {
                done(err);
                    return;
                }

                expect(res.text).to.equal('Hello World');
                done();
            });
        });
    });
}