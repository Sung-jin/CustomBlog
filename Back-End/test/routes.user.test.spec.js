import request from 'supertest';
import { expect } from 'chai';

import app from '../app.js';

exports.userTest = () => {
    describe('GET /', () => {
        it('should respond with text message "test"', (done) => {
            request(app)
            .get('/user')
            .expect(200)
            .end((err, res) => {
                if (err) {
                done(err);
                    return;
                }

                expect(res.text).to.equal('test');
                done();
            });
        });
    });
}