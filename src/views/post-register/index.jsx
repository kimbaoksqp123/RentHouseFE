import React, { createContext, useState } from "react";
import "./index.css";
import "react-slideshow-image/dist/styles.css";
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
      </div>
    </HouseContext.Provider>
  );
}
