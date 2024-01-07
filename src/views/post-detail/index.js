import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useContext } from "react";
import { Slide } from "react-slideshow-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { LuDot } from "react-icons/lu";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IBadroom, IBedroom } from "../../common/icons";
import "./index.css";
import "react-slideshow-image/dist/styles.css";

import {
  addressIcon,
  contactIcon,
  infoIcon,
  ownerIcon,
  phoneIcon,
} from "../../assets/icons";
import avatarImg from "../../assets/avatar.png";
import postApi from "../../apis/postApi";
import dayjs from "dayjs";
import Mcomment from "./mComment";
import { PostContext } from "../../routes";
import userApi from "../../apis/userApi";
import { toast } from "react-toastify";

const sliderButtonStyle = {
  display: "flex",
  width: "40px",
  height: "40px",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff",
  borderRadius: "50%",
  border: "0px",
  color: "#4FAE5A",
  margin: "10px",
};
const slideProperties = {
  prevArrow: (
    <button style={{ ...sliderButtonStyle }}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  ),
  nextArrow: (
    <button style={{ ...sliderButtonStyle }}>
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  ),
};

export default function PostDetail() {
  const { setCurNavOption } = useContext(PostContext);
  let navigate = useNavigate();
  const { postId } = useParams();
  const [postDetail, setPostDetail] = useState([]);
  const [hotNews, setHotNews] = useState([]);
  const [similarNews, setSimilarNews] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const getPostDetail = useCallback(async (id) => {
    const res = await postApi.getPostDetail(id, userId);
    setPostDetail(res);
    getSimilarPosts(res.price, res.land_area, res.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getSimilarPosts = async (price, area, type) => {
    const res2 = await postApi.getSimilarPosts(price, area, type);
    setSimilarNews(res2);
  };
  const getHotNews = useCallback(async () => {
    const res = await postApi.getHotNews();
    setHotNews(res);
  }, []);
  const handleSave = async () => {
    if (!userId) toast.warn("Vui lòng đăng nhập!");
    else {
      await userApi.addBm(userId, postDetail.id);
      toast.success("Đã lưu vào mục Yêu thích!");
      setPostDetail({ ...postDetail, isSaved: true });
    }
  };
  const handleRemoveSaved = async () => {
    await userApi.deleteBm(userId, postDetail.id);
    toast.success("Đã bỏ lưu khỏi mục Yêu thích!");
    setPostDetail({ ...postDetail, isSaved: false });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPostDetail(postId);
    getHotNews();
  }, [postId, getHotNews, getPostDetail]);
  useEffect(() => {
    setCurNavOption("post-detail");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return postDetail ? (
    <div className="main-box">
      <div className="left-box">
        <div
          style={{ color: "#499DFF", fontWeight: "600", marginBottom: "20px" }}
        >
          {postDetail.type === 1 && "Phòng trọ"}{" "}
          {postDetail.type === 2 && "Nhà nguyên căn"}{" "}
          {postDetail.type === 3 && "Chung cư"}&emsp;&gt;&emsp;Hà
          Nội&emsp;&gt;&emsp;{postDetail.ward}
        </div>
        <div className="post-detail">
          <div style={{ position: "relative" }}>
            {postDetail.images && (
              <Slide
                {...slideProperties}
                indicators={(index) => (
                  <div className="indicator">
                    <FontAwesomeIcon icon={faCircle} />
                  </div>
                )}
                scale={1.4}
              >
                {postDetail.images?.map((item) => {
                  return (
                    <div className="each-slide-effect" key={item.id}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={item.url}
                        alt={item.id}
                      ></img>
                    </div>
                  );
                })}
              </Slide>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              {postDetail.title}
            </p>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              Đã đăng vào {dayjs(postDetail.created_at).format("HH:ss")} ngày{" "}
              {dayjs(postDetail.created_at).format("DD/MM/YYYY")}
            </p>
            <div className="mt-2 mx-3">
              <div className="d-inline-block fw-bold text-danger">
                {postDetail.price / 1000000} triệu/tháng
                <LuDot className="mx-1" />
                {postDetail.land_area} m<sup>2</sup>
              </div>
              <div className="d-inline-block ms-4">
                {postDetail.bedroom_num} <IBedroom />
                <LuDot className="mx-1" />
                {postDetail.bathroom_num} <IBadroom />
                <LuDot className="mx-1" />
              </div>
              {!postDetail.isSaved ? (
                <AiOutlineHeart
                  className="text-danger ms-4"
                  style={{ cursor: "pointer" }}
                  onClick={handleSave}
                />
              ) : (
                <AiFillHeart
                  className="text-danger ms-4"
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveSaved}
                />
              )}
            </div>
            <div className="content-title" style={{ background: "none" }}>
              <img alt="img" src={addressIcon}></img>
              <p className="mb-0">Địa chỉ: {postDetail.address}</p>
            </div>
          </div>
          <div className="content">
            <div className="content-title">
              <img alt="img" src={infoIcon}></img>
              <p className="mb-0">Thông tin chi tiết</p>
            </div>
            <div>
              <div
                style={{ fontSize: "14px", fontWeight: "500", padding: "10px" }}
              >
                {postDetail.description}
              </div>
            </div>
          </div>
          <div className="content">
            <div className="content-title mb-3">
              <img alt="img" src={contactIcon}></img>
              <p className="mb-0">Thông tin liên hệ</p>
            </div>
            <div>
              <div className="content mt-0">
                <div
                  className="content-title mx-3"
                  style={{ background: "none" }}
                >
                  <img alt="img" src={ownerIcon}></img>
                  <p className="mb-0">Chủ sở hữu: {postDetail.user?.name}</p>
                </div>
              </div>
              <div className="content mt-0">
                <div
                  className="content-title mx-3"
                  style={{ background: "none" }}
                >
                  <img alt="img" src={phoneIcon}></img>
                  <p className="mb-0">Điện thoại: {postDetail.user?.phone}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="content-title">
              <img alt="img" src={contactIcon}></img>
              <p className="mb-0">Bản đồ</p>
            </div>
            <p
              style={{ fontSize: "14px", fontWeight: "500", marginTop: "10px" }}
            >
              Địa chỉ: {postDetail.address}
            </p>
            <iframe
              title="maps"
              src={`https://maps.google.com/maps?q=${postDetail.latitude}, ${postDetail.longitude}&z=15&output=embed`}
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* phan binh luan*/}
        {postDetail.reviews && (
          <div className="post-comment">
            <Mcomment
              listCommentData={postDetail.reviews}
              postId={postDetail.id}
            />
          </div>
        )}
      </div>
      <div className="right-box mt-5 ">
        <div className="box-border owner-info">
          <img
            alt="img"
            src={avatarImg}
            className="mt-3"
            style={{ width: "100px", borderRadius: "50%" }}
          ></img>
          <p className="mt-3">{postDetail.user?.name}</p>
          <div className="phone-info mb-2">
            <FontAwesomeIcon icon={faPhone} />
            <span>{postDetail.user?.phone}</span>
          </div>
        </div>
        <div className="box-border mt-4 ">
          <p style={{ fontSize: "20px", fontWeight: "700" }}>Tin nổi bật</p>
          {hotNews &&
            hotNews.map((item) => {
              return (
                <div
                  className="hot-news"
                  key={item.id}
                  onClick={() => {
                    navigate("/post/" + item.id);
                  }}
                >
                  <img
                    alt="img"
                    className="right-img"
                    src={item.images[0]?.url}
                  ></img>
                  <div>
                    <div
                      className="text-overflow mb-1"
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#499DFF",
                      }}
                    >
                      {item.description}
                    </div>
                    <div className="hotnews-price">
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#4FAE5A",
                        }}
                      >
                        {item.price / 1000000} triệu/tháng
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#737373",
                        }}
                      >
                        {dayjs(item.created_at).format("HH:ss")} ngày{" "}
                        {dayjs(item.created_at).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="box-border mt-4 ">
          <p style={{ fontSize: "20px", fontWeight: "700" }}>
            Kết quả tương tự
          </p>
          {similarNews &&
            similarNews.map((item) => {
              return (
                <div
                  className="hot-news"
                  key={item.id}
                  onClick={() => {
                    navigate("/post/" + item.id);
                  }}
                >
                  <img
                    alt="img"
                    className="right-img"
                    src={item.images[0]?.url}
                  ></img>
                  <div>
                    <div
                      className="text-overflow mb-1"
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#499DFF",
                      }}
                    >
                      {item.description}
                    </div>
                    <div className="hotnews-price">
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#4FAE5A",
                        }}
                      >
                        {item.price / 1000000} triệu/tháng
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#737373",
                        }}
                      >
                        {dayjs(item.created_at).format("HH:ss")} ngày{" "}
                        {dayjs(item.created_at).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    "Đang tải dữ liệu"
  );
}
