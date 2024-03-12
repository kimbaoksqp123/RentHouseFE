import axios from "axios";

const customAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    // paramsSerializer: params => queryString.stringify(params),
});

customAxios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

customAxios.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        console.log('>>Error:', error);
        return Promise.reject(error);
    }
);

export default customAxios;