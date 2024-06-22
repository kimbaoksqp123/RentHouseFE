import React, { useState, useEffect }from "react";
import "react-slideshow-image/dist/styles.css";
import { getContractWithID } from "../../apis/contract";
import { getUserInfo } from "../../apis/getUser";
import moment from "moment";

export default function RentContractDetail({rentID, contractID, token}) {
  const [contract, setContract] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [tenantID, setTenantID] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchContract = async () => {
      try {
        const contractData = await getContractWithID(contractID, token);
        setContract(contractData);
        setTenantID(contractData.tenant_id);
      } catch (error) {
        console.error("Error fetching contract:", error);
      }
    };
    fetchContract();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(tenantID);
  useEffect(() => {
    const fetchTenantInfo = async () => {
      if (tenantID != null) {
        try {
          const data = await getUserInfo(tenantID, token);
          setTenant(data);
        } catch (error) {
          console.error("Error fetching tenant information:", error);
        }
      }
    };

    fetchTenantInfo();
  }, [tenantID, token]);

  return (
    <div className="main border rounded p-4 border-green-600 shadow-md">
      <h4 className= "mb-4 mt-2">A. Thông tin bên cho thuê</h4>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">Tên:</div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">{user.name}</div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">Địa chỉ:</div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">{user.address}</div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">Số ĐT:</div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">{user.phone}</div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">Số CCCD:</div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">{user.cccd_number}</div>
      </div>
      <h4 className= "mb-4 mt-2">B. Thông tin bên thuê</h4>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">Tên:</div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">{tenant.name}</div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">Địa chỉ:</div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">{tenant.address}</div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">Số ĐT:</div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">{tenant.phone}</div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">Số CCCD:</div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">{tenant.cccd_number}</div>
      </div>
      <h4 className= "mb-4 mt-2">C. Nội dung hợp đồng</h4>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">Thời gian bắt đầu:</div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">{moment(contract.start_date).format("DD-MM-YYYY")}</div>
      </div>
      <div className="content flex w-full ml-4 text-base">
        <div className="label w-32 mr-4 text-right h-12 flex items-center">Thời gian kết thúc:</div>
        <div className="name  border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">{moment(contract.end_date).format("DD-MM-YYYY")}</div>
      </div>
    </div>
  );
}
