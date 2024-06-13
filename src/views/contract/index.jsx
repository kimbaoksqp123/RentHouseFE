import React from "react";
import "react-slideshow-image/dist/styles.css";
import CreateContract from "./create_contract";

export default function Contract() {
  return (
    <div className="main-box">
      <div className="left-box">
        <div className="d-flex align-items-center my-2 px-1">
          <span className="fs-20 fw-700">Tạo hợp đồng thuê phòng</span>
        </div>
        <div className="create-contract">
          <CreateContract />
        </div>
      </div>
    </div>
  );
}
