// Core
import request from 'supertest';
import { name, internet, phone } from 'faker';

// Instruments
import { app } from '../../../server';

const getUser = () => ({
    name:     `${name.firstName()} ${name.lastName()}`,
    email:    internet.email(),
    phone:    phone.phoneNumber(),
    password: internet.password(),
    sex:      'm',
});

const server = request.agent(app);
describe('users create:', () => {
    test('should return 200 for create user', async (done) => {
        const response = await server.post('/api/users').send(getUser());
        console.log('ξ * response', response.text);
        expect(response.statusCode).toBe(201);
        done();
    });

    test.skip('data should be an object', async (done) => {
        const response = await server.post('/api/users').send(getUser());
        const { data } = response.body;

        expect(Array.isArray(data)).toBeFalsy();
        expect(typeof data).toBe('object');
        done();
    });

    test.skip('data should have a required hash field', async (done) => {
        const response = await server.post('/api/users').send(getUser());
        const { data } = response.body;

        expect(data.hash).toBeDefined();
        done();
    });

    test.skip('data hash field should be a string', async (done) => {
        const response = await server.post('/api/users').send(getUser());
        const { data } = response.body;

        expect(Array.isArray(data)).toBeFalsy();
        expect(typeof data.hash).toBe('string');
        done();
    });
});


describe('students create:', () => {
    test('create student', () => {
        /* eslint-disable no-console */
        console.log('ξ * students create ->');
        /* eslint-enable no-console */
    });
});
