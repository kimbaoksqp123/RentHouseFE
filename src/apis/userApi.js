import customAxios from "./customAxios";

const prefix = "/user";
const userApi = {
  login: (data) => {
    return customAxios.post(`/login`, data);
  },
  getBm: (user_id) => {
    return customAxios.get(`${prefix}/getBm?user_id=${user_id}`);
  },
  addBm: (user_id, post_id) => {
    return customAxios.post(`${prefix}/addBm`, { user_id, post_id });
  },
  deleteBm: (user_id, post_id) => {
    return customAxios.delete(
      `${prefix}/deleteBm?user_id=${user_id}&post_id=${post_id}`
    );
  },
};

export default userApi;
