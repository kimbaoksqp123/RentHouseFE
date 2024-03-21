import React from "react";
import axios from "axios";
import "react-slideshow-image/dist/styles.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Upload,
  Modal,
  Space,
  Input,
  Select,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { serveURL } from "../../constants/index";
import { IoMdAddCircleOutline } from "react-icons/io";

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
      span: 24,
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

export default function Utility() {
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

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
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    form.setFieldsValue({
      image: newFileList.length > 0 ? newFileList[0].originFileObj : null,
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
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user.id : null;

  // console.log(userID);

  const token = localStorage.getItem("token");

  const [form] = Form.useForm();

  useEffect(() => {
    // Set the initial values when the component mounts
    form.setFieldsValue({
      userID: userID,
    });
  }, [form, userID]); // Run the effect when form or userID changes

  const onFinish = async (values) => {
    // Log the form data for testing purposes
    console.log("Received values from form:", values);

    // You can send the form data to your API using Axios
    try {
      const response = await axios.post(`${serveURL}posts/store`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response from the API as needed

      if (response.status === 200) {
        // Redirect to the page detail

        const houseId = response.data.id;
        navigate(`/house/${houseId}`);
      }
    } catch (error) {
      // Handle errors
      console.error("Error sending data to API:", error);
    }
  };
  return (
    <div className="utilities ">
      <Form {...formItemLayout} form={form} onFinish={onFinish}>
        <div className="utility rounded-lg border border-green-500 bg-white shadow-md p-4">
          <Form.Item name="houseID" label="House ID" hidden></Form.Item>
          <Form.Item
            name="type"
            label="Kiểu tiện ích"
            rules={[
              {
                required: true,
                message: "Hãy chọn kiểu tiện ích",
              },
            ]}
          >
            <Select placeholder="Chọn tiện ích">
              <Select.Option value="1">Phòng trọ</Select.Option>
              <Select.Option value="2">Nhà nguyên căn</Select.Option>
              <Select.Option value="3">Chung cư Mini</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Chi phí(VNĐ)"
            rules={[
              {
                type: "interger",
                message: "Chi phí tiện ích là chữ số",
              },
              {
                required: true,
                message: "Hãy nhập Chi phí tiện ích!",
              },
              {
                validator: (_, value) => {
                  if (value >= 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Giá thuê phải lớn hơn 0 hoặc bằng 0!");
                },
              },
            ]}
          >
            <Input placeholder="Chi chí trên 1 đơn vị tiện ích"></Input>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[
              {
                type: "interger",
                message: "Số lượng là chữ số",
              },
              {
                required: true,
                message: "Hãy nhập Số lượng!",
              },
              {
                validator: (_, value) => {
                  if (value > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Số lượng phải lớn hơn 0!");
                },
              },
            ]}
          >
            <InputNumber
              placeholder="Nhập Số lượng"
              min={0}
              max={10}
              defaultValue={0}
            />
          </Form.Item>
          <Form.Item name="image" label="Ảnh" valuePropName="image">
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
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
        </div>
        <div className="utility rounded-lg border border-green-500 bg-white shadow-md p-4">
          <Form.Item name="houseID" label="House ID" hidden></Form.Item>
          <Form.Item
            name="type"
            label="Kiểu tiện ích"
            rules={[
              {
                required: true,
                message: "Hãy chọn kiểu tiện ích",
              },
            ]}
          >
            <Select placeholder="Chọn tiện ích">
              <Select.Option value="1">Phòng trọ</Select.Option>
              <Select.Option value="2">Nhà nguyên căn</Select.Option>
              <Select.Option value="3">Chung cư Mini</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Chi phí(VNĐ)"
            rules={[
              {
                type: "interger",
                message: "Chi phí tiện ích là chữ số",
              },
              {
                required: true,
                message: "Hãy nhập Chi phí tiện ích!",
              },
              {
                validator: (_, value) => {
                  if (value >= 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Giá thuê phải lớn hơn 0 hoặc bằng 0!");
                },
              },
            ]}
          >
            <Input placeholder="Chi chí trên 1 đơn vị tiện ích"></Input>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[
              {
                type: "interger",
                message: "Số lượng là chữ số",
              },
              {
                required: true,
                message: "Hãy nhập Số lượng!",
              },
              {
                validator: (_, value) => {
                  if (value > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Số lượng phải lớn hơn 0!");
                },
              },
            ]}
          >
            <InputNumber
              placeholder="Nhập Số lượng"
              min={0}
              max={10}
              defaultValue={0}
            />
          </Form.Item>
          <Form.Item name="image" label="Ảnh" valuePropName="image">
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
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
        </div>
        <Space className="mt-3">
        <Button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-2.5 rounded"
            size="large"
          >
            <IoMdAddCircleOutline className="text-2xl" />
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-2.5 rounded"
            htmlType="submit"
            size="large"
          >
            Lưu
          </Button>
        </Space>
      </Form>
    </div>
  );
}
