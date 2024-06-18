import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, InputNumber } from "antd";
import { PostContext } from "../routes";
import { filterPostsWithinScope } from "../apis/matrixAPI";
export default function AdvanceFilter({ marginTop }) {
  const { listPost, setListPost, filterCondition } = useContext(PostContext);
  const [address, setAddress] = useState("");
  const [scope, setScope] = useState("");
  // const [prevListPost, setPrevListPost] = useState([]);
  const prevListPost = useRef(listPost);


  // useEffect(() => {
  //   setPrevListPost(listPost);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filterCondition]);
  
  const handleFilterClick = async () => {
    // Gọi hàm filterPostsWithinScope ở đây
    const filteredPosts = await filterPostsWithinScope(
      address,
      prevListPost,
      scope
    );
    setListPost(filteredPosts);
  };


  console.log(filterCondition);
  console.log(prevListPost);
 
  return (
    <div>
      <div
        className="border-main rounded shadow-sm"
        style={{ marginTop: marginTop }}
      >
        <div className="mt-1 ms-3 mb-2 fw-700">Lọc nâng cao</div>
        <div className="ms-3 me-3 mb-3">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="ms-3 me-3 mb-3">
          <label htmlFor="scope" className="form-label">
            Phạm vi (km)
          </label>
          <InputNumber
            id="scope"
            value={scope}
            onChange={(value) => setScope(value)}
            min={0}
            style={{ width: "100%" }}
          />
        </div>
        <div className="ms-3 me-3 mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleFilterClick}
          >
            Lọc
          </button>
        </div>
      </div>
    </div>
  );
}
