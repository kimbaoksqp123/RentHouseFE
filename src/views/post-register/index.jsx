import React, { createContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import "react-slideshow-image/dist/styles.css";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import avatarImg from "../../assets/avatar.png";
import { Tabs } from "antd";
import { tabRegister } from "../../constants/index";

export const HouseContext = createContext();

export default function PostRegister() {
  const [sendData, setSendData] = useState({ currentTab: 0, houseID: null });
  const handleDataFromChild = (data) => {
    setSendData({
      currentTab: data["currenTab"],
      houseID: data["houseID"],
    });
  };
  return (
    <HouseContext.Provider value={sendData}>
      <div className="main-box">
        <div className="left-box">
          <Tabs
            type="card"
            items={tabRegister.map((tab) => {
              return {
                label: `${tab.name}`,
                key: tab.id,
                children: React.cloneElement(tab.children, {
                  sendDataToParent: handleDataFromChild,
                }),
              };
            })}
            activeKey={sendData.currentTab}
          />
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
          <div className="box-border mt-4 ">
            <p style={{ fontSize: "20px", fontWeight: "700" }}>Tin nổi bật</p>
          </div>
          <div className="box-border mt-4 ">
            <p style={{ fontSize: "20px", fontWeight: "700" }}>
              Kết quả tương tự
            </p>
          </div>
        </div>
      </div>
    </HouseContext.Provider>
  );
}
