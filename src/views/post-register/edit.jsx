import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { serveURL } from "../../constants/index";
import { useParams } from "react-router-dom";
import "./index.css";
import "react-slideshow-image/dist/styles.css";
import { Tabs } from "antd";
import BasicInformationEdit from "./basic_information_edit";
import UtilityEdit from "./utility_edit";

export const EditHouseContext = createContext();

export default function PostEdit() {
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
  const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });
  const [imageAlbum, setImageAlbum] = useState([]);
  const [utilities, setUtilities] = useState([]);

  const [activeKey, setActiveKey] = useState();
  const [loading, setLoading] = useState(true);
  const { houseID } = useParams();

  const contextValue = {
    houseID,
    type,
    setType,
    title,
    setTitle,
    district,
    setDistrict,
    ward,
    setWard,
    address,
    setAddress,
    land_area,
    setLandArea,
    price,
    setPrice,
    description,
    setDescription,
    bedroom_num,
    setBedroomNumber,
    bathroom_num,
    setBathroomNumber,
    coordinates,
    setCoordinates,
    imageAlbum,
    setImageAlbum,
    utilities,
    setUtilities,
    activeKey,
    setActiveKey,
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serveURL}posts/getHouseWithID/${houseID}`
      );
      const {
        type,
        title,
        district,
        ward,
        address,
        land_area,
        price,
        description,
        bedroom_num,
        bathroom_num,
        latitude,
        longitude,
        images,
        house_utilities,
      } = response.data;
      setType(type);
      setTitle(title);
      setDistrict(district);
      setWard(ward);
      setAddress(address);
      setLandArea(land_area);
      setPrice(price);
      setDescription(description);
      setBedroomNumber(bedroom_num);
      setBathroomNumber(bathroom_num);
      setCoordinates({ lat: latitude, lon: longitude });
      setImageAlbum(images);
      setUtilities(house_utilities);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }, [houseID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const items = [
    {
      label: "Thông tin cơ bản",
      key: "1",
      children: <BasicInformationEdit />,
    },
    {
      label: "Tiện ích",
      key: "2",
      children: <UtilityEdit />,
    },
  ];

  return (
    <EditHouseContext.Provider value={contextValue}>
      <div className="main-box">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="left-box">
            <Tabs
              type="card"
              items={items}
              activeKey={activeKey}
              onChange={setActiveKey}
            />
          </div>
        )}
      </div>
    </EditHouseContext.Provider>
  );
}
