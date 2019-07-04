import { axiosInstance } from '../axios.utils';

describe('test /logout', () => {
    test('get 204 / успех: отсутствует тело ответа', async () => {
        const { status } = await axiosInstance()
            .post('/logout', {
                login: 'john_deer',
            });

        expect(status).toBe(204);
    });

    test('get 400 / не верный пейлоад', async () => {
        const { status } = await axiosInstance().post('/logout');
        expect(status).toBe(400);
    });

    test('get 401 / требуется логин', async () => {
        const { status } = await axiosInstance().post('/logout');

        expect(status).toBe(401);
    });

    test('get 500 / серверная ошибка', async () => {
        const { status } = await axiosInstance().post('/logout');
        expect(status).toBe(500);
    });
});
