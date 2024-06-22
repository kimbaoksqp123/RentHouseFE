import React, { useState, useEffect } from "react";
import axios from "axios";
import { serveURL } from "../../constants/index";
import { Table, message, Modal, Input } from "antd";
import moment from "moment";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import RefreshButton from "../../components/RefreshButton";
import { useNavigate } from "react-router-dom";
import PDFViewer from "../../components/PDFViewer";
import { getUserInfo } from "../../apis/getUser";

export default function TenantContract() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userID = user ? user.id : null;
  const [tenantContracts, setTenantContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    axios
      .get(`${serveURL}contracts/tenant_contract/index`, {
        params: {
          userID: userID,
        },
      })
      .then((response) => {
        setTenantContracts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  };

  const handleRefresh = () => {
    fetchData();
  };

  // PDF Viewer Modal
  const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const showPdfModal = (url) => {
    setPdfUrl(url);
    setIsPdfModalVisible(true);
  };

  const handlePdfModalCancel = () => {
    setIsPdfModalVisible(false);
    setPdfUrl("");
  };

  // Action Confirm Modal
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [action, setAction] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  const handleAction = (action, id) => {
    setAction(action);
    if (action === "create_contract") {
      sessionStorage.setItem("tenantID", id.user_id);
      sessionStorage.setItem("houseID", id.house_id);
      navigate(`/${userID}/contract/create`);
    } else {
      setCurrentRequestId(id);
      setIsConfirmModalVisible(true);
    }
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

  const handleConfirmModalCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const handleConfirmModalAction = () => {
    if (action === "create_contract") {
      navigate(`/${userID}/contract/create`);
      return;
    } else {
      const url = `${serveURL}request_view_houses/tenant_request/${currentRequestId}/${action}`;
      axios
        .post(url, { id: currentRequestId, message: modalText, action: action })
        .then((response) => {
          message.success(`${action} thành công`);
          setIsConfirmModalVisible(false);
          fetchData(); // Refresh the request list or handle state update here
        })
        .catch((error) => {
          console.error(`Error accepting request:`, error);
          message.error(`${action} thất bại`);
          setIsConfirmModalVisible(false);
        });
    }
  };

  const columns = [
    {
      title: "Người cho thuê",
      align: "center",
      dataIndex: "rent_id",
      width: "8%",
      render: (rent_id) => (
        <Link to={`/user/${rent_id}/information`}>
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
      align: "center",
      render: (house_id) => (
        <Link to={`/house/${house_id}`}>
          <div className="flex items-center">
            <HomeOutlined className="text-xl cursor-pointer mx-auto" />
          </div>
        </Link>
      ),
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_date",
      width: "15%",
      sorter: (a, b) => moment(a.start_date).unix() - moment(b.start_date).unix(),
      render: (start_date) => {
        const formattedDate = moment(start_date).format("DD-MM-YYYY");
        return <div><p>{formattedDate}</p></div>;
      },
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "end_date",
      width: "15%",
      sorter: (a, b) => moment(a.end_date).unix() - moment(b.end_date).unix(),
      render: (end_date) => {
        const formattedDate = moment(end_date).format("DD-MM-YYYY");
        return <div><p>{formattedDate}</p></div>;
      },
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      width: "15%",
      sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
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
      title: "File hợp đồng",
      dataIndex: "file",
      width: "5%",
      render: (file) => (
        <button
          key="view"
          className="mb-2 bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded"
          onClick={() => showPdfModal(file)}
        >
          Xem
        </button>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      width: "10%",
      render: (id) => (
        <div className="flex flex-col items-center w-32">
          <button
            key="edit"
            className="w-full mb-2 bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
            onClick={() => handleAction("edit", id)}
          >
            Sửa
          </button>
          <button
            key="delete"
            className="w-full mb-2 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
            onClick={() => handleAction("delete", id)}
          >
            Xóa
          </button>
          <button
            key="show"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded"
            onClick={() => handleAction("show", id)}
          >
            Xem chi tiết
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="main-box flex flex-col">
      <RefreshButton handleRefresh={handleRefresh} />
      <Table
        columns={columns}
        dataSource={tenantContracts}
        bordered
        scroll={{ y: 600 }}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Modal
        title="Preview File"
        open={isPdfModalVisible}
        onCancel={handlePdfModalCancel}
        footer={null}
        width="80%"
      >
        <PDFViewer pdfUrl={pdfUrl} />
      </Modal>
      <Modal
        title={modalTitle}
        centered
        open={isConfirmModalVisible}
        onOk={handleConfirmModalAction}
        onCancel={handleConfirmModalCancel}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
        okButtonProps={{ className: "bg-blue-500", style: { borderColor: "blue" } }}
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
