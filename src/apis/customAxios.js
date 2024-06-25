import axios from "axios";

const customAxios = axios.create({
    baseURL: "https://rent-house-0e71d6c3b728.herokuapp.com/api",
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