import axios, { AxiosError, AxiosResponse } from 'axios';

export const axiosInstance = (
    baseUrl = 'http://localhost:3000',
    headers = {},
) => {
    const instance = axios.create({
        baseURL: baseUrl,
        headers: {
            ...headers,
        },
    });
    instance.interceptors.response.use(
        (response) => response,
        (error) => error.response,
    );

    return instance;
};
