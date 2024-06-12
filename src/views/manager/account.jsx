import React, { useState, useEffect } from "react";
import axios from "axios";
import { serveURL } from "../../constants/index";
import { Table, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../assets/avatar.png";

export default function ManagerAccount() {
  const [userData, setUserData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData([user]); // Ensure userData is an array
    }
  }, []);

  const handleAction = (action) => {
    setAction(action);
    if (action === "delete") {
        setIsModalVisible(true);
    } else (action === "edit") && navigate(`/user/${userData[0].id}/edit`);  
  };

  useEffect(() => {
    if (action === "delete") {
      setModalTitle("Bạn có chắc muốn xóa tài khoản khỏi hệ thống?");
    }
  }, [action]);

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalAction = () => {
    const userID = userData ? userData[0].id : null;
    if (action === "edit") {
      navigate(`/user/${userID}/edit`);
      return;
    } else {
      const url = `${serveURL}users/${userID}/${action}`;
      axios
        .post(url, { id: userID, action: action })
        .then((response) => {
          setIsModalVisible(false);
          // Refresh the request list or handle state update here
        })
        .catch((error) => {
          console.error(`Error performing action:`, error);
          setIsModalVisible(false);
        });
    }
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: "15%",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      align: "center",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      width: "10%",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "20%",
      align: "center",
    },
    {
      title: "Số CCCD",
      dataIndex: "cccd_number",
      width: "10%",
      align: "center",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      width: "10%",
      align: "center",
      render: (avatar) => (
        <div>
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-30 h-30 rounded-full" />
          ) : (
            <img src={avatarImg} alt="Default Avatar" className="w-30 h-30 rounded-full" />
          )}
        </div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "status",
      width: "10%",
      align: "center",
      render: (_, record) => (
        <div>
          <button
            key="edit"
            className="w-full mb-2 bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
            onClick={() => handleAction("edit")}
          >
            Chỉnh sửa
          </button>
          <button
            key="delete"
             className="w-full bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
            onClick={() => handleAction("delete")}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="main">
      <div className="main-box flex flex-col">
        <Table
        className="mb-10"
          columns={columns}
          dataSource={userData} // Use userData which is an array
          bordered
          showSorterTooltip={{
            target: "sorter-icon",
          }}
          pagination={false}
        />
        <Modal
          title={modalTitle}
          centered
          open={isModalVisible}
          onOk={handleModalAction}
          onCancel={handleModalCancel}
          okText="Xác nhận"
          cancelText="Hủy bỏ"
          okButtonProps={{
            className: "bg-blue-500",
            style: { borderColor: "blue" },
          }}
        ></Modal>
      </div>
    </div>
  );
}
