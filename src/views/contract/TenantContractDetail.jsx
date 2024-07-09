import React, { useState, useEffect, useContext } from "react";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import { serveURL } from "../../constants/index";
import { getUserInfo } from "../../apis/getUser";
import moment from "moment";
import { ContractContext } from "../manager/contract";

export default function TenantContractDetail() {
  const token = localStorage.getItem("token");
  const [contract, setContract] = useState(null);
  const [rentID, setRentID] = useState(null);
  const [rent, setRent] = useState(null);
  const [houseID, setHouseID] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const { contractID } = useContext(ContractContext);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    axios
      .get(`${serveURL}contracts/getContractWithID`, {
        params: {
          id: contractID,
        },
      })
      .then((response) => {
        setContract(response.data);
        setHouseID(response.data.house_id);
      })
      .catch((error) => {
        console.error("Error fetching contract:", error);
      });
  };

  useEffect(() => {
    const fetchHouseData = async () => {
      if (houseID != null) {
        try {
          const response = await axios.get(`${serveURL}posts/getHouseWithID/${houseID}`);
          setRentID(response.data.user_id);
        } catch (error) {
          console.error("Error fetching house data:", error);
        }
      }
    };

    fetchHouseData();
  }, [houseID]);
  
  useEffect(() => {
    const fetchRentInfo = async () => {
      if (rentID != null) {
        try {
          const data = await getUserInfo(rentID, token);
          setRent(data);
        } catch (error) {
          console.error("Error fetching rent information:", error);
        }
      }
    };

    fetchRentInfo();
  }, [rentID, token]);
  

  if (!contract || !rent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main border rounded p-4 border-green-600 shadow-md">
      <h4 className="mb-4 mt-2">A. Thông tin bên cho thuê</h4>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">
          Tên:
        </div>
        <div className="name border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
          {rent.name}
        </div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">
          Địa chỉ:
        </div>
        <div className="name border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
          {rent.address}
        </div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">
          Số ĐT:
        </div>
        <div className="name border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
          {rent.phone}
        </div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">
          Số CCCD:
        </div>
        <div className="name border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
          {rent.cccd_number}
        </div>
      </div>
      <h4 className="mb-4 mt-2">B. Thông tin bên thuê</h4>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">
          Tên:
        </div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
          {user.name}
        </div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">
          Địa chỉ:
        </div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
          {user.address}
        </div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">
          Số ĐT:
        </div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
          {user.phone}
        </div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">
          Số CCCD:
        </div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
          {rent.cccd_number}
        </div>
      </div>
      <h4 className="mb-4 mt-2">C. Nội dung hợp đồng</h4>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">
          Thời gian bắt đầu:
        </div>
        <div className="name border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
          {moment(contract.start_date).format("DD-MM-YYYY")}
        </div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">
          Thời gian kết thúc:
        </div>
        <div className="name border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
          {moment(contract.end_date).format("DD-MM-YYYY")}
        </div>
      </div>
    </div>
  );
}
