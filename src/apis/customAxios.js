import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://cwy5doxgyfv4ga6c3l7lhzuha40epngj.lambda-url.ap-southeast-1.on.aws/api",
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
