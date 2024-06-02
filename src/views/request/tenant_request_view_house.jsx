import React, { useState, useEffect } from "react";
import axios from "axios";
import { serveURL } from "../../constants/index";
import { Table, Tag, message, Modal, Input } from "antd";
import moment from "moment";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import RefreshButton from "../../components/RefreshButton";

export default function TenantRequestViewHouse() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user.id : null;
  const [tenantRequests, setTenantRequests] = useState([]);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Gọi fetchData() khi component được render lần đầu tiên

  const fetchData = () => {
    axios
    .get(`${serveURL}request_view_houses/tenant_request/index`, {
      params: {
        userID: userID,
      },
    })

    .then((response) => {
      setTenantRequests(response.data);
    })
    .catch((error) => {
      console.error("Error fetching requests:", error);
    });
  };

  const handleRefresh = () => {
    fetchData(); // Gọi lại fetchData() khi bấm vào nút Refresh
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "processing";
      case 2:
        return "success";
      case 3:
        return "error";
      case 4:
        return "red";
      case 5:
        return "yellow";
      default:
        return "default"; // Trạng thái mặc định nếu không khớp
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Chờ";
      case 2:
        return "Chấp nhận";
      case 3:
        return "Từ chối";
      case 4:
        return "Đã xóa";
      case 5:
        return "Đã hủy";
      default:
        return "Không xác định"; // Văn bản mặc định nếu không khớp
    }
  };

  const handleFilter = (filteredValue, record) => {
    return filteredValue.includes(record.status);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [action, setAction] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  const handleAction = (action, id) => {
    setCurrentRequestId(id);
    setAction(action);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (action === "accept") {
      setModalTitle("Chấp nhận lịch hẹn");
    } else if (action === "reject") {
      setModalTitle("Từ chối lịch hẹn");
    } else if (action === "delete") {
      setModalTitle("Bạn có chắc muốn xóa lịch hẹn?");
    } else if (action === "cancel") {
      setModalTitle("Bạn có chắc muốn hủy lịch hẹn?");
    }
  }, [action]);

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalAcction = () => {
    const url = `${serveURL}request_view_houses/tenant_request/${currentRequestId}/${action}`;
    // console.log(url, modalText);
    axios
      .post(url, { id: currentRequestId, message: modalText, action: action })
      .then((response) => {
        message.success(`${action} thành công`);
        setIsModalVisible(false);
        // Refresh the request list or handle state update here
      })
      .catch((error) => {
        console.error(`Error accepting request:`, error);
        message.error(`${action} thất bại`);
        setIsModalVisible(false);
      });
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "user_id",
      width: "8%",
      render: (user_id) => (
        <Link to={`/user/${user_id}/information`}>
          <div className="flex items-center">
            <UserOutlined className="text-xl cursor-pointer mx-auto" />
          </div>
        </Link>
      ),
    },
    {
      title: "Phòng trọ",
      dataIndex: "house_id",
      width: "8%",
      render: (house_id) => (
        <Link to={`/house/${house_id}`}>
          <div className="flex items-center">
            <HomeOutlined className="text-xl cursor-pointer mx-auto" />
          </div>
        </Link>
      ),
    },
    {
      title: "Lời nhắn từ khách",
      dataIndex: "tenant_message",
      width: "20%",
    },
    {
      title: "Lời nhắn của tôi",
      dataIndex: "rent_message",
      width: "20%",
    },
    {
      title: "Lịch hẹn",
      dataIndex: "view_time",
      width: "15%",
      sorter: (a, b) => moment(a.view_time).unix() - moment(b.view_time).unix(),
      render: (view_time) => {
        const formattedTime = moment(view_time).format("HH [giờ] mm [phút]");
        const formattedDate = moment(view_time).format("DD-MM-YYYY");
        return (
          <div>
            <p>Thời gian: {formattedTime}</p>
            <p>Ngày: {formattedDate}</p>
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "10%",
      filters: [
        {
          text: "Chờ",
          value: "1",
        },
        {
          text: "Chấp nhận",
          value: "2",
        },
        {
          text: "Từ chối",
          value: "3",
        },
        {
          text: "Đã hủy",
          value: "5",
        },
      ],
      onFilter: handleFilter,
      render: (status) => (
        <div className="flex items-center">
          <Tag color={getStatusColor(status)} className=" w-20 text-center">
            {getStatusText(status)}
          </Tag>
        </div>
      ),
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      width: "15%",
      sorter: (a, b) =>
        moment(a.created_at).unix() - moment(b.created_at).unix(),
      render: (created_at) => {
        const formattedTime = moment(created_at).format("HH [giờ] mm [phút]");
        const formattedDate = moment(created_at).format("DD-MM-YYYY");
        return (
          <div>
            <p>Thời gian: {formattedTime}</p>
            <p>Ngày: {formattedDate}</p>
          </div>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "status",
      width: "10%",
      render: (status, record) => {
        const { id } = record;
        const actions = [];
        if (status === 1) {
          actions.push(
            <div className="flex flex-col  items-center w-32">
              <button
                key="accept"
                className="w-full mb-2 bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded"
                // onClick={() => handleAction("accept", id)}
                onClick={() => handleAction("accept", id)}
              >
                Chấp nhận
              </button>

              <button
                key="reject"
                className="w-full mb-2 bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded"
                onClick={() => handleAction("reject", id)}
              >
                Từ chối
              </button>

              <button
                key="delete"
                className="w-full bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
                onClick={() => handleAction("delete", id)}
              >
                Xóa
              </button>
            </div>
          );
        } else if (status === 2) {
          actions.push(
            <div className="flex flex-col  items-center w-32">
              <button
                key="cancel"
                className="w-full mb-2 bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded"
                onClick={() => handleAction("cancel", id)}
              >
                Hủy hẹn
              </button>

              <button
                key="delete"
                className="w-full bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
                onClick={() => handleAction("delete", id)}
              >
                Xóa
              </button>
            </div>
          );
        } else if (status === 3 || status === 5) {
          actions.push(
            <div className="flex flex-col  items-center w-32">
              <button
                key="delete"
                className="w-full bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
                onClick={() => handleAction("delete", id)}
              >
                Xóa
              </button>
            </div>
          );
        }

        return <div className="flex space-x-2">{actions}</div>;
      },
    },
  ];

  return (
    <div className="main-box flex flex-col">
      <RefreshButton handleRefresh={handleRefresh}/>
      <Table
        columns={columns}
        dataSource={tenantRequests}
        bordered
        scroll={{
          y: 500,
        }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
      <Modal
        title={modalTitle}
        centered
        open={isModalVisible}
        onOk={handleModalAcction}
        onCancel={handleModalCancel}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        {action !== "delete" && (
          <>
            <p>Nhập lời nhắn của bạn tới khách hàng:</p>
            <Input.TextArea
              value={modalText}
              onChange={(e) => setModalText(e.target.value)}
              rows={4}
            />
          </>
        )}
      </Modal>
    </div>
  );
}
