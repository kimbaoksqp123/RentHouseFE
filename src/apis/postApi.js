import customAxios from "./customAxios";

const prefix = "/posts";
const postApi = {
  getList: (params) => {
    let userId = JSON.parse(localStorage.getItem('user'))?.id;
    let query = `${prefix}?user_id=${userId || ""}&sortType=${params.sortType || 0}&district=${params.district || ""}&ward=${params.ward || ""}&street=${params.street || ""}&priceMin=${params.priceMin || ""}&priceMax=${params.priceMax || ""}&areaMin=${params.areaMin || ""}&areaMax=${params.areaMax || ""}`;
    // if (params.type) {
    //   params.type?.forEach((item) => {
    //     query = query + `&type[]=${item}`;
    //   });
    // }
    return customAxios.post(query, {type: params.type});
  },
  getPostDetail: (id, userId) => {
    return customAxios.get(`${prefix}/${id}?user_id=${userId}`);
  },
  getHotNews: () => {
    return customAxios.get(`${prefix}/featured`);
  },
  getSimilarPosts: (price, area, type) => {
    return customAxios.get(`${prefix}/similar?price=${price}&area=${area}&type=${type}`);
  },
  reviewPost: (data) => {
    return customAxios.post(`/review/store`, data);
  },
  likeReview: (data) => {
    return customAxios.post(`/review/like`, data);
  },


};

export default postApi;
