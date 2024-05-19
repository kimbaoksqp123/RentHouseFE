import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import "react-slideshow-image/dist/styles.css";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import avatarImg from "../../assets/avatar.png";
import CreateRequestViewHouse from "./create_request_view_house";


export default function RequestViewHouse() {
  return (
    <div className="main-box">
      <div className="left-box">
        <div className="create-view-house">
          <CreateRequestViewHouse />
        </div>
      </div>

      <div className="right-box mt-5 ">
        <div className="box-border owner-info">
          <img
            alt="img"
            src={avatarImg}
            className="mt-3"
            style={{ width: "100px", borderRadius: "50%" }}
          ></img>

          <div className="phone-info mb-2">
            <FontAwesomeIcon icon={faPhone} />
          </div>
        </div>
      </div>
    </div>
  );
}
