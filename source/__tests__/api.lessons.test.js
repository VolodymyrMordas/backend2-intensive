import axios from 'axios';

const api_url = 'http://localhost:3000';

describe.skip('', () => {
    test('should ', async () => {
        const { status } = await axios.get(`${api_url}/Users/ggg`);
        expect(status).toBe(200);
    });
});
