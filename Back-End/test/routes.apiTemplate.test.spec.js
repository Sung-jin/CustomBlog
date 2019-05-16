import request from 'supertest';
import { expect } from 'chai';

import app from '../app.js';

exports.templateTest = () => {
    describe('GET on template api', () => {
        it('api template success check"', (done) => {
            request(app)
            .get('/template')
            .query({id: 100})
            .expect(200, {
                id: 100,
                state: 200
              }, done);
        });

        it('api template null id check"', (done) => {
            request(app)
            .get('/template')
            .expect(422, done);
        });

        it('api template string id check"', (done) => {
            request(app)
            .get('/template')
            .query({id:'abc'})
            .expect(422, done);
        });

    });

    describe('POST on template api', () => {
        it('api template success check"', (done) => {
            request(app)
            .post('/template')
            .send({id: 100, sex: 'M'})
            .expect(200, {
                id: 100,
                sex: 'M',
                state: 200
            }, done);
        });

        it('api template null id check"', (done) => {
            request(app)
            .post('/template')
            .expect(422, done);
        });

        it('api template string id check"', (done) => {
            request(app)
            .post('/template')
            .send({id: 'abc', sex: 'M'})
            .expect(422, done);
        });

        it('api template invalid sex check"', (done) => {
            request(app)
            .post('/template')
            .send({id: 100, sex: 'A'})
            .expect(422, done);
        });

    });

    describe('PUT on template api', () => {
        it('api template success check"', (done) => {
            request(app)
            .put('/template')
            .send({id: 100, sex: 'M'})
            .expect(200, {
                id: 100,
                sex: 'M',
                state: 200
            }, done);
        });

        it('api template null id check"', (done) => {
            request(app)
            .put('/template')
            .expect(422, done);
        });

        it('api template string id check"', (done) => {
            request(app)
            .put('/template')
            .send({id: 'abc', sex: 'M'})
            .expect(422, done);
        });

        it('api template invalid sex check"', (done) => {
            request(app)
            .put('/template')
            .send({id: 100, sex: 'A'})
            .expect(422, done);
        });

    });

    describe('DELETE on template api', () => {
        it('api template success check"', (done) => {
            request(app)
            .delete('/template/100')
            .expect(200, {
                id: 100,
                state: 200
              }, done);
        });

        it('api template string id check"', (done) => {
            request(app)
            .delete('/template/abc')
            .expect(422, done);
        });

    });
}