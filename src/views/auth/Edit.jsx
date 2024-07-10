import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Form, Space, Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { serveURL } from "../../constants/index";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 5,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 14,
    },
    sm: {
      span: 21,
      offset: 1,
    },
  },
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Edit() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleImage = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    form.setFieldsValue({
      avatar: newFileList.map((file) => file.originFileObj),
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Thêm
      </div>
    </div>
  );


  const onFinish = async (values) => {
    // Log the form data for testing purposes
    console.log("Received values from form:", values);

    // You can send the form data to your API using Axios
    // try {
    //   const response = await axios.post(
    //     `${serveURL}register`,
    //     values,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );

    //   // Handle the response from the API as needed

    //   if (response.status === 200) {
    //     // Redirect to the tab utilities register page
    //     navigate(`/`);
    //   }
    // } catch (error) {
    //   // Handle errors
    //   console.error("Error sending data to API:", error);
    // }
  };

  return (
    <div className="main flex flex-column justify-center align-items-center min-h-screen">
      <div className="header flex  justify-center align-items-center w-50 rounded border border-green-600 bg-white shadow p-2">
        <h4>Chỉnh sửa thông tin tài khoản</h4>
      </div>
      <div className="create_request_view_house w-50 rounded border border-green-600 bg-white shadow p-2">
        <Form {...formItemLayout} form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Họ và tên"
            initialValue={user.name}
            rules={[
              {
                required: true,
                message: "Hãy nhập họ và tên của bạn",
              },
            ]}
          >
            <Input placeholder="Nhập họ tên"></Input>
          </Form.Item>
          <Form.Item
            name="phone"
            label="SDT"
            initialValue={user.phone}
            rules={[
              {
                required: true,
                message: "Hãy nhập số điện thoại của bạn",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại"></Input>
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            initialValue={user.address}
            rules={[
              {
                required: true,
                message: "Hãy nhập địa chỉ của bạn",
              },
            ]}
          >
            <Input placeholder="Nhập địa chỉ"></Input>
          </Form.Item>

          <Form.Item
            name="cccd_number"
            label="CCCD"
            initialValue={user.cccd_number}
            rules={[
              {
                required: true,
                message: "Hãy nhập số CCCD của bạn",
              },
            ]}
          >
            <Input placeholder="Nhập số CCCD"></Input>
          </Form.Item>

          <Form.Item
              name="avatar"
              label="Ảnh"
              valuePropName="avatar"
              initialValue={user.avatar}
            >
              <Upload
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleImage}
                beforeUpload={() => false}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 10,
            }}
          >
            <Space>
              <button
                className="w-24 ml-2 bg-blue-500 hover:bg-blue-400 text-white py-2 px-2.5 rounded text-[16px]"
                type="submit"
              >
                Cập nhật
              </button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
