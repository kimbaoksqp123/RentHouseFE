import React, { useState, useEffect } from "react";
import axios from "axios";
import { serveURL } from "../../constants/index";
import { Table, Tag, Modal, Spin, Result } from "antd";
import moment from "moment";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import RefreshButton from "../../components/RefreshButton";
import { useNavigate } from "react-router-dom";

export default function ManagerHouse() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user.id : null;
  const [rentHouses, setRentHouses] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Gọi fetchData() khi component được render lần đầu tiên

  const fetchData = () => {
    axios
      .get(`${serveURL}posts/rent_house/index`, {
        params: {
          userID: userID,
        },
      })
      .then((response) => {
        setRentHouses(response.data);
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
        return "yellow";
      case 4:
        return "error";
      default:
        return "default"; // Trạng thái mặc định nếu không khớp
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Trống";
      case 2:
        return "Đã thuê";
      case 3:
        return "Ẩn";
      case 4:
        return "Đã khóa";
      default:
        return "Không xác định"; // Văn bản mặc định nếu không khớp
    }
  };

  const handleFilter = (filteredValue, record) => {
    return filteredValue.includes(record.status);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentHouseId, setCurrentHouseId] = useState(null);
  const [action, setAction] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [resultTitle, setResultTitle] = useState(null);

  const handleAction = (action, id) => {
    setCurrentHouseId(id);
    setAction(action);
    if (action === "edit"){
      navigate(`/house/${id}/edit`);
    }
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (action === "hiden") {
      setModalTitle("Bạn có chắc muốn ẩn phòng trọ");
      setResultTitle("Ẩn phòng trọ");
    } else if (action === "unhiden") {
      setModalTitle("Bạn có chắc muốn hiển thị phòng trọ?");
      setResultTitle("Hiển thị phòng trọ");
    } else if (action === "delete") {
      setModalTitle("Bạn có chắc muốn xóa phòng trọ?");
      setResultTitle("Xóa phòng trọ");
    } else if (action === "cancel") {
      setModalTitle("Bạn có chắc muốn hủy cho thuê phòng trọ?");
      setResultTitle("Hủy cho thuê phòng trọ");
    }
  }, [action]);

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setResult(null);
  };

  const handleModalAcction = () => {
    setIsLoading(true);
    if (action === "edit") {
      navigate(`/house/${currentHouseId}`);
      setIsLoading(false);
      return;
    }
    const url = `${serveURL}posts/${currentHouseId}/${action}`;
    // console.log(url);
    axios
      .post(url, { id: currentHouseId, action: action })
      .then((response) => {
        setIsLoading(false);
        setResult({
          status: "success",
        });
        setTimeout(() => {
          setIsModalVisible(false);
          fetchData();
          setResult(null);
        }, 2000);
      })
      .catch((error) => {
        console.error(`Error accepting request:`, error);
        setIsLoading(false);
        setResult({ status: "error" });
        setIsModalVisible(false);
      });
  };

  const columns = [
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "20%",
      align: "center",
    },

    {
      title: "Phường",
      dataIndex: "ward",
      width: "8%",
      align: "center",
    },
    {
      title: "Quận",
      dataIndex: "district",
      width: "10%",
      align: "center",
    },
    {
      title: "Giá thuê",
      dataIndex: "price",
      width: "10%",
      sorter: (a, b) => a.price - b.price,
      render: (price) => {
        // Chia giá trị cho 1 triệu và làm tròn đến 1 chữ số thập phân nếu cần
        const formattedPrice = (price / 1000000).toFixed(
          price % 1000000 === 0 ? 0 : 1
        );
        return `${formattedPrice} triệu`;
      },
      align: "center",
    },
    {
      title: "Diện tích (m²)",
      dataIndex: "land_area",
      width: "8%",
      align: "center",
      sorter: (a, b) => a.land_area - b.land_area,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "10%",
      align: "center",
      filters: [
        {
          text: "Trống",
          value: "1",
        },
        {
          text: "Đã thuê",
          value: "2",
        },
        {
          text: "Ẩn",
          value: "3",
        },
        {
          text: "Bị khóa",
          value: "4",
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
      title: "Lượt xem phòng",
      dataIndex: "view_number",
      width: "8%",
      align: "center",
      sorter: (a, b) => a.view_number - b.view_number,
    },
    {
      title: "Phòng ngủ",
      dataIndex: "bedroom_num",
      align: "center",
      width: "5%",
    },
    {
      title: "Phòng tắm",
      dataIndex: "bathroom_num",
      align: "center",
      width: "5%",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      width: "15%",
      align: "center",
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
      title: "Chi tiết",
      dataIndex: "id",
      width: "5%",
      align: "center",
      render: (id) => (
        <Link to={`/house/${id}`}>
          <div className="flex items-center">
            <HomeOutlined className="text-xl cursor-pointer mx-auto" />
          </div>
        </Link>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "status",
      width: "10%",
      align: "center",
      render: (status, record) => {
        const { id } = record;
        const actions = [];
        if (status === 1) {
          actions.push(
            <div className="flex flex-col  items-center w-32">
              <button
                key="edit"
                className="w-full mb-2 bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
                onClick={() => handleAction("edit", id)}
              >
                Chỉnh sửa
              </button>

              <button
                key="hiden"
                className="w-full mb-2 bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded"
                onClick={() => handleAction("hiden", id)}
              >
                Ẩn
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
                key="unrent"
                className="w-full mb-2 bg-yellow-400 hover:bg-yellow-300 text-white py-2 px-4 rounded"
                onClick={() => handleAction("unrent", id)}
              >
                Hủy cho thuê
              </button>
            </div>
          );
        } else if (status === 3) {
          actions.push(
            <div className="flex flex-col  items-center w-32">
              <button
                key="edit"
                className="w-full mb-2 bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
                onClick={() => handleAction("edit", id)}
              >
                Chỉnh sửa
              </button>
              <button
                key="unhiden"
                className="w-full mb-2 bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded"
                onClick={() => handleAction("unhiden", id)}
              >
                Hiển thị
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
        }

        return <div className="flex space-x-2">{actions}</div>;
      },
    },
  ];
  return (
    <div className="main">
      <div className="main-box flex flex-col">
        <RefreshButton handleRefresh={handleRefresh} />
        <Table
          className="mb-3"
          columns={columns}
          dataSource={rentHouses}
          bordered
          scroll={{
            y: 500,
          }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
          pagination={false}
        />
        <Modal
          title={modalTitle}
          centered
          open={isModalVisible}
          onOk={handleModalAcction}
          onCancel={handleModalCancel}
          okText="Xác nhận"
          cancelText="Hủy bỏ"
          okButtonProps={{
            className: "bg-blue-500",
            style: { borderColor: "blue" },
          }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spin />
            </div>
          ) : result ? (
            <Result
              status={result.status}
              title={result.status === "success" ? `${resultTitle} thành công` :  `${resultTitle} thất bại`}
            />
          ) : null}
        </Modal>
      </div>
    </div>
  );
}
