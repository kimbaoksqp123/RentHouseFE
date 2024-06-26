import { IBadroom, IBedroom } from "../../common/icons";
import { useNavigate } from "react-router-dom";
import { sortTypes } from "../../constants";
import Form from "react-bootstrap/Form";
import { LuDot } from "react-icons/lu";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import userApi from "../../apis/userApi";
import { PostContext } from "../../routes";
import { toast } from "react-toastify";
import { Pagination } from 'antd';

export default function ListPost() {
  const {
    listPost,
    setListPost,
    sortType,
    setSortType,
    curPage,
    setCurPage,
  } = useContext(PostContext);
  let navigate = useNavigate();
  const perPage = 3;
  const [curPageStartIndex, setCurPageStartIndex] = useState(0);
  const user_id = JSON.parse(localStorage.getItem("user"))?.id;
  const handleRedirectPage = (page) => {
    setCurPage(page);
    // scroll to top
    const offset = 220;
    document.body.scrollTop = offset; // For Safari
    document.documentElement.scrollTop = offset; // For Chrome, Firefox, IE and Opera
  };

  const handleSave = async (post_id) => {
    if (!user_id) toast.warn("Vui lòng đăng nhập!");
    else {
      await userApi.addBm(user_id, post_id);
      toast.success("Đã lưu vào mục Yêu thích!");
      let temp = [...listPost];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === post_id) {
          temp[i].isSaved = true;
        }
      }
      setListPost(temp);
    }
  };

  const handleRemoveSaved = async (post_id) => {
    await userApi.deleteBm(user_id, post_id);
    toast.success("Đã bỏ lưu khỏi mục Yêu thích!");
    let temp = [...listPost];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === post_id) {
        temp[i].isSaved = false;
      }
    }
    setListPost(temp);
  };

  useEffect(() => {
    setCurPageStartIndex((curPage - 1) * perPage);
  }, [curPage]);

  useEffect(() => {
    setCurPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  return (
    <>
      <div className="text-main fs-14 fw-500">
        Hiện có {listPost.length} kết quả
      </div>
      <Form className="mb-3">
        <Form.Group>
          <Form.Label className="fs-14 fw-500">Sắp xếp:</Form.Label>
          <Form.Select
            size="sm"
            className="w-25 d-inline-block ms-3 mt-2 border-success text-secondary"
            onChange={(e) => {
              setSortType(e.target.value);
            }}
            style={{ fontSize: "14px", fontWeight: "600px" }}
          >
            {sortTypes?.map((item, index) => (
              <option
                value={item.value}
                key={index}
                className="fs-14 fw-600"
                selected={item.value === sortType}
              >
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      {listPost.length > 0 ? (
        Array.from({ length: perPage }, (_, index) => {
          if (curPageStartIndex + index > listPost.length - 1) return null;
          let item = listPost[curPageStartIndex + index];
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
                  navigate("/house/" + item.id);
                }}
              >
                {item.title}
              </div>
              <div className="mt-2 d-flex">
                <div className="d-flex  fw-bold text-danger fw-700">
                  {item.price / 1000000} triệu/tháng
                  <LuDot className="mx-1" />
                  {item.land_area} m<sup>2</sup>
                </div>
                <div className="d-flex  ms-4">
                  {item.bedroom_num} <IBedroom />
                  <LuDot className="mx-1" />
                  {item.bedroom_num} <IBadroom />
                  <LuDot className="mx-1" />
                  <span className="fs-14">
                    {item.district}
                    {", Hà Nội"}
                  </span>
                </div>
                {!item.isSaved ? (
                  <AiOutlineHeart
                    className="text-danger ms-4 cursor-pointer"
                    onClick={() => handleSave(item.id)}
                  />
                ) : (
                  <AiFillHeart
                    className="text-danger ms-4 cursor-pointer"
                    onClick={() => handleRemoveSaved(item.id)}
                  />
                )}
              </div>
              
              <div className="mt-2 fw-600">Địa chỉ: {item.address}</div>
              <div className="text-sm fw-500">
                Đã đăng vào {dayjs(item.created_at).format("HH:ss")} ngày{" "}
                {dayjs(item.created_at).format("DD/MM/YYYY")}
              </div>
            </div>
          );
        })
      ) : (
        <h4>Không có bài đăng nào phù hợp!</h4>
      )}
      {listPost.length > 0 && (
        <Pagination
          total={listPost.length}
          pageSize={perPage}
          current={curPage}
          onChange={handleRedirectPage}
          showSizeChanger={false}
          className="flex justify-center mt-4"
        />
      )}
    </>
  );
}
