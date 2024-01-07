import { useEffect, useState } from "react";
import userApi from "../../apis/userApi";
import { LuDot } from "react-icons/lu";
import { IBadroom, IBedroom } from "../../common/icons";
import { AiFillHeart } from "react-icons/ai";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import clsx from "clsx";
import avatarImg from "../../assets/avatar.png";
import { toast } from "react-toastify";

export default function SavedListPost() {
  const [savedListPost, setSavedListPost] = useState([]);
  const user_id = JSON.parse(localStorage.getItem("user"))?.id;
  const perPage = 3;
  const pageNum = Math.ceil(savedListPost.length / perPage);
  const [curPage, setCurPage] = useState(1);
  const [curPageStartIndex, setCurPageStartIndex] = useState(0);
  const navigate = useNavigate();

  const getSavedListPost = async () => {
    const res = await userApi.getBm(user_id);
    console.log("res::", res);
    setSavedListPost(res);
  };

  const handleRedirectPage = (type, index) => {
    if (type === "BACK") {
      if (curPage > 1) {
        setCurPage(curPage - 1);
      }
    } else if (type === "NEXT") {
      if (curPage < pageNum) {
        setCurPage(curPage + 1);
      }
    } else {
      setCurPage(index + 1);
    }
    //scroll to top
    const offset = 0;
    document.body.scrollTop = offset; // For Safari
    document.documentElement.scrollTop = offset; // For Chrome, Firefox, IE and Opera
  };
  const handleRemoveSaved = async (post_id) => {
    await userApi.deleteBm(user_id, post_id);
    toast.success("Đã bỏ lưu khỏi mục Yêu thích!");    
    await getSavedListPost();
    //scroll to top:
    const offset = 220;
    document.body.scrollTop = offset; // For Safari
    document.documentElement.scrollTop = offset; // For Chrome, Firefox, IE and Opera
  };

  useEffect(() => {
    setCurPageStartIndex((curPage - 1) * perPage);
  }, [curPage]);
  useEffect(() => {
    if (user_id) getSavedListPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="d-flex align-items-center my-2 px-1">
        <span className="fs-20 fw-700">Bài đăng đã lưu</span>
        <span className="ms-auto fs-14 fw-500">
          Đã yêu thích: {savedListPost.length} bài viết{" "}
        </span>
      </div>
      {savedListPost.length > 0 ? (
        Array.from({ length: perPage }, (_, index) => {
          if (curPageStartIndex + index > savedListPost.length - 1) return null;
          let item = savedListPost[curPageStartIndex + index];
          let images = item.images;
          return (
            <div
              className="border-main rounded p-2 mb-4 shadow"
              key={index}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex" style={{ maxHeight: "300px" }}>
                <img
                  className="pe-1"
                  src={images[0].url}
                  alt={images[0].url}
                  width="34%"
                />
                <div style={{ width: "32%" }}>
                  <img
                    className="pe-1 pb-1"
                    src={images[1].url}
                    alt={images[1].url}
                    style={{ width: "100%", maxHeight: "50%" }}
                  />
                  <img
                    className="pe-1"
                    src={images[2].url}
                    alt={images[2].url}
                    style={{ width: "100%", maxHeight: "50%" }}
                  />
                </div>
                <img src={images[3].url} alt={images[3].url} width="34%" />
              </div>
              <div
                className="fw-bold mt-2 cursor-pointer fs-18 fw-700 text-hover-main"
                onClick={() => {
                  navigate("/post/" + item.id);
                }}
              >
                {item.title}
              </div>
              <div className="mt-2">
                <div className="d-inline-block fw-bold text-danger fw-700">
                  {item.price / 1000000} triệu/tháng
                  <LuDot className="mx-1" />
                  {item.land_area} m<sup>2</sup>
                </div>
                <div className="d-inline-block ms-4">
                  {item.bedroom_num} <IBedroom />
                  <LuDot className="mx-1" />
                  {item.bedroom_num} <IBadroom />
                  <LuDot className="mx-1" />
                  <span className="fs-14">
                    {item.district}
                    {", Hà Nội"}
                  </span>
                </div>
              </div>
              <div className="mt-2 fw-600">Địa chỉ: {item.address}</div>
              <div className="pt-1 d-flex align-items-center border-0 border-top mt-1">
                <img src={avatarImg} alt="" width="46x" />
                <div>
                  <div className="fs-14 fw-600">{item.user?.name}</div>
                  <div className="text-sm fw-400">
                    {dayjs(item.created_at).format("HH:ss")}
                    {" - "}
                    {dayjs(item.created_at).format("DD/MM/YYYY")}
                  </div>
                </div>
                <div className="ms-auto bg-main text-white fs-14 fw-600 p-1 rounded-2">
                {item.user?.phone}
                </div>
                <AiFillHeart
                  className="text-danger mx-3 cursor-pointer"
                  onClick={() => handleRemoveSaved(item.id)}
                />
              </div>
            </div>
          );
        })
      ) : (
        <h4>Bạn chưa lưu bài đăng nào!</h4>
      )}
      {savedListPost.length > 0 && (
        <Stack direction="horizontal" className="justify-content-end">
          <Button
            variant=""
            onClick={() => handleRedirectPage("BACK", 0)}
            className="me-2 border border-2 fw-bold"
          >
            {"<"}
          </Button>
          {Array.from({ length: pageNum }, (_, index) => (
            <Button
              variant=""
              key={index}
              className={clsx(
                "me-2 border border-2 fw-bold",
                curPage === index + 1 && "border-primary"
              )}
              onClick={() => handleRedirectPage("", index)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant=""
            className="border border-2 fw-bold"
            onClick={() => handleRedirectPage("NEXT", 0)}
          >
            {">"}
          </Button>
        </Stack>
      )}
    </>
  );
}
