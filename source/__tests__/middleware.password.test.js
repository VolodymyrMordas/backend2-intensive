import { axiosInstance } from '../axios.utils';

describe('check header', () => {
    test('204 / password is ok', async () => {
        const { status } = await axiosInstance().post('/logout', null, {
            headers: {
                Authorization: 'dm9sb2R5bXlybW9yZGFzOnF3ZXJ0eQ==',
            },
        });

        expect(status).toBe(204);
    });

    test('401 / password is not ok', async () => {
        const { status } = await axiosInstance().post('/logout', null, {
            headers: {
                Authorization: 'wrong password',
            },
        });

        expect(status).toBe(401);
    });
});
