import React, { createContext, useState } from "react";
import "./index.css";
import "react-slideshow-image/dist/styles.css";
import { Tabs } from "antd";
import BasicInformation from "./basic_information";
import Utility from "./utility";

export const HouseContext = createContext();

export default function PostRegister() {
  const [userID, setUserID] = useState(null);
  const [type, setType] = useState(null);
  const [title, setTitle] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [address, setAddress] = useState(null);
  const [land_area, setLandArea] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [bedroom_num, setBedroomNumber] = useState(null);
  const [bathroom_num, setBathroomNumber] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });
  const [imageAlbum, setImageAlbum] = useState([]);
  const [activeKey, setActiveKey] = useState();

  const contextValue = {
    userID, setUserID,
    type, setType,
    title, setTitle,
    district, setDistrict,
    ward, setWard,
    address, setAddress,
    land_area, setLandArea,
    price, setPrice,
    description, setDescription,
    bedroom_num, setBedroomNumber,
    bathroom_num, setBathroomNumber,
    coordinates, setCoordinates,
    imageAlbum, setImageAlbum,
    activeKey, setActiveKey,
  };

  const items = [
    {
      label: 'Thông tin cơ bản',
      key: '1',
      children: <BasicInformation />,
    },
    {
      label: 'Tiện ích',
      key: '2',
      children: <Utility />,
    },
  ];

  return (
    <HouseContext.Provider value={contextValue}>
      <div className="main-box">
        <div className="left-box">
          <Tabs
            type="card"
            items={items}
            activeKey={activeKey}
            
          />
        </div>
      </div>
    </HouseContext.Provider>
  );
}
