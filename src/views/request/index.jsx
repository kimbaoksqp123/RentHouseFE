import React from "react";
import "./index.css";
import "react-slideshow-image/dist/styles.css";
import CreateRequestViewHouse from "./create_request_view_house";

export default function RequestViewHouse() {
  return (
    <div className="main-box">
      <div className="left-box">
        <div className="d-flex align-items-center my-2 px-1">
          <span className="fs-20 fw-700">Đặt lịch xem phòng</span>
        </div>
        <div className="create-view-house">
          <CreateRequestViewHouse />
        </div>
      </div>
    </div>
  );
}
