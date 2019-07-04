import { axiosInstance } from '../axios.utils';

describe('get /login', () => {
    test('should fail / 400 / не верный пейлоад', async () => {
        const { status, data: { message } }
          = await axiosInstance().post('/login');

        expect(status).toBe(400);
        expect(message).toBe('incorrect payload');
    });

    test('should fail / 400 / не верный пейлоад', async () => {
        const { status, data: { message } }
          = await axiosInstance().post('/login', null, {
              headers: {
                  authorization: 'sd',
              },
          });

        expect(status).toBe(400);
        expect(message).toBe('incorrect payload');
    });

    test('should fail / 204 / успех: отсутствует тело ответа', async () => {
        const { status } = await axiosInstance().post('/login', null, {
            headers: {
                authorization: 'dm9sb2R5bXlybW9yZGFzOnF3ZXJ0eQ==',
            },
        });

        expect(status).toBe(204);
    });
});
