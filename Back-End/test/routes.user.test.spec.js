import request from 'supertest';
import { expect } from 'chai';

import app from '../app.js';

exports.userTest = () => {
    describe('GET /', () => {
        it('should respond with text message "Deploy 이후 여기가 변했는지 확인하기 위함"', (done) => {
            request(app)
            .get('/user')
            .expect(200)
            .end((err, res) => {
                if (err) {
                done(err);
                    return;
                }

                expect(res.text).to.equal('Deploy 이후 여기가 변했는지 확인하기 위함');
                done();
            });
        });
    });
}