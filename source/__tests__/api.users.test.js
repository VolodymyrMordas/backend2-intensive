import { axiosInstance } from '../axios.utils';
import hash from 'object-hash';

const user = {
    name:     'Andrew Polonskyi',
    email:    'jdoe@example.com',
    phone:    '+380662332377',
    password: 'ab12345Cd',
    sex:      'm',
    role:     'newbie',
};

const fields2Update = {
    name: 'Jason Statham',
};

const userHash = hash(user);


describe('get /users / эндпоинт используется получения всех пользователей', () => {
    test('get /users / Получить всех пользователей', async () => {
        const { status, data: { data } } = await axiosInstance()
            .get('/users');
        
        expect(status).toBe(200);
        expect(data).toBeTruthy();
        expect(data).toHaveLength(1);
    });

    test('should get 401 / не верный пейлоад', async () => {
        const { status } = await axiosInstance().get('/users');

        expect(status).toBe(400);
    });

    test('should get 500 / серверная ошибка', async () => {
        const { status } = await axiosInstance().get('/users');

        expect(status).toBe(500);
    });
});

describe('post /users / создать пользователя', () => {
    test('201 / успешное создание пользователя', async () => {
        const { status, data: { hash } } = await axiosInstance()
            .post('/users', user);

        expect(status).toBe(201);
        expect(hash).toBeTruthy();
    });

    test('400 / не верный пейлоад', async () => {
        const { status, data: { message }} = await axiosInstance()
            .post('/users', {
                name: 'John Doe',
            });

        expect(status).toBe(400);
    });
});

describe('get /users/{userHash} / получить пользователя по hash', () => {
    const userHash = hash(user);

    beforeEach(async () => {
        const { status, data: { hash } } = await axiosInstance()
            .post('/users', user);

        expect(status).toBe(201);
        expect(hash).toBeTruthy();
        expect(hash).toBe(userHash);
    });

    test('200 / получить всех пользователей', async () => {
        const { status, data: { data } } = await axiosInstance()
            .get(`/users/${userHash}`);
        const { name } = data;
        expect(status).toBe(200);
        expect(data).toBeTruthy();
        expect(name).toBe('Andrew Polonskyi');
    });
});


describe('put /users/{userHash} / обновить пользователя', () => {
    beforeEach(async () => {
        const { status, data: { hash } } = await axiosInstance()
            .post('/users', user);

        expect(status).toBe(201);
        expect(hash).toBeTruthy();
        expect(hash).toBe(userHash);
    });

    test('200 / эндпоинт используется для обновления пользователя по его hash', async () => {
        const { status, data: { data } } = await axiosInstance()
            .put(`/users/${userHash}`, {
                ...user, ...fields2Update,
            });

        const { name } = data;
        expect(status).toBe(200);
        expect(data).toBeTruthy();
        expect(name).toBe('Jason Statham');
    });

    test('400 / не верный пейлоад', async () => {
        const { status, data: { message } } = await axiosInstance()
            .put(`/users/${userHash}`, {
                ...user, ...fields2Update, fakeField: 'fakeField',
            });
        expect(status).toBe(400);
        expect(message).toBeTruthy();
    });
});


describe('delete /users/{userHash} / удалить пользователя', () => {
    beforeEach(async () => {
        const { status, data: { hash } } = await axiosInstance()
            .post('/users', user);

        expect(status).toBe(201);
        expect(hash).toBeTruthy();
        expect(hash).toBe(userHash);
    });

    test('204 / успех: отсутствует тело ответа', async () => {
        const { status, data } = await axiosInstance()
            .delete(`/users/${userHash}`);

        expect(status).toBe(204);
    });

    test('400 / не верный пейлоад', async () => {
        const { status, data: { message } } = await axiosInstance()
            .put(`/users/${userHash}`, {
                ...user, ...fields2Update, fakeField: 'fakeField',
            });
        expect(status).toBe(400);
        expect(message).toBeTruthy();
    });
});
