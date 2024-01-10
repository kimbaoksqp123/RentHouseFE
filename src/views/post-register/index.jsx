import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./index.css";
import "react-slideshow-image/dist/styles.css";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import avatarImg from "../../assets/avatar.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Upload, Modal, Space, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 5,
    },
    sm: {
      span: 3,
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

export default function PostRegister() {
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imageAlbum, setImageAlbum] = useState([]);

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
  const handleImageAlbum = ({ fileList: newFileList }) => {
    setImageAlbum(newFileList);
    form.setFieldsValue({
      imageAlbum: newFileList.map((file) => file.originFileObj),
    });
    console.log(form.getFieldValue());
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  // const { user } = useAuth();
  // const userID = user ? user.id : null;
  const userID = 12;
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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/house/store",
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response from the API as needed
      console.log("API Response:", response.data);
      if (response.status === 200) {
        // Redirect to the list page
        navigate("/search");
      }
    } catch (error) {
      // Handle errors
      console.error("Error sending data to API:", error);
    }
  };
  

  return (
    <div className="main-box">
      <div className="left-box">
        <div className="post-detail">
        <Form
      {...formItemLayout}
      style={{ width: 900, marginTop: 20 }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item name="userID" label="User ID" hidden></Form.Item>
      <Form.Item name="house_typeID" label="Kiểu nhà trọ" rules={[
          {
            required: true,
            message: "Hãy nhập tên phòng trọ",
          },
        ]}>
        <Select placeholder="Chọn kiểu trọ">
          <Select.Option value="1">Chung cư Mini</Select.Option>
          <Select.Option value="2">Homestay</Select.Option>
          <Select.Option value="3">Nhà nguyên căn</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Tên phòng trọ"
        rules={[
          {
            required: true,
            message: "Hãy nhập tên phòng trọ",
          },
        ]}
      >
        <Input placeholder="Nhập tên phòng trọ"></Input>
      </Form.Item>
      <Form.Item name="address" label="Địa chỉ" rules={[
          {
            required: true,
            message: "Hãy nhập tên phòng trọ",
          },
        ]}>
        <Input placeholder="Nhập địa chỉ"></Input>
      </Form.Item>
      <Form.Item
        name="acreage"
        label="Diện tích"
        rules={[
          {
            type: "number",
            message: "Diện tích phải là chữ số",
          },
          {
            required: true,
            message: "Hãy nhập diện tích!",
          },
          {
            validator: (_, value) => {
              if (value <= 0) {
                return Promise.resolve();
              }
              return Promise.reject("Diện tích phải lớn hơn 0!");
            },
          },
        ]}
      >
        <Input placeholder="Nhập diện tích"></Input>
      </Form.Item>
      <Form.Item
        name="number_of_people"
        label="Số người ở tối đa"
        rules={[
          {
            type: "number",
            message: "Số người ở tối đa là chữ số",
          },
          {
            required: true,
            message: "Hãy nhập Số người ở tối đa!",
          },
          {
            validator: (_, value) => {
              if (value <= 0) {
                return Promise.resolve();
              }
              return Promise.reject("Số người ở tối đa phải lớn hơn 0!");
            },
          },
        ]}
      >
        <Input placeholder="Nhập số người ở tối đa"></Input>
      </Form.Item>
      <Form.Item
        name="cost"
        label="Giá thuê(VNĐ)"
        rules={[
          {
            type: "number",
            message: "Giá thuê là chữ số",
          },
          {
            required: true,
            message: "Hãy nhập Giá thuê!",
          },
          {
            validator: (_, value) => {
              if (value <= 0) {
                return Promise.resolve();
              }
              return Promise.reject("Giá thuê phải lớn hơn 0!");
            },
          },
        ]}
      >
        <Input placeholder="Nhập giá thuê"></Input>
      </Form.Item>
      <Form.Item name="description" label="Mô tả" rules={[
          {
            required: true,
            message: "Hãy nhập mô tả",
          },
        ]}>
        <Input placeholder="Nhập mô tả"></Input>
      </Form.Item>
      <Form.Item name="image" label="Upload" valuePropName="image">
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
      <Form.Item name="imageAlbum" label="Upload" valuePropName="imageAlbum">
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={imageAlbum}
          onPreview={handlePreview}
          onChange={handleImageAlbum}
        >
          {imageAlbum.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 10,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
        </div>{" "}
      </div>

      <div className="right-box mt-5 ">
        <div className="box-border owner-info">
          <img
            alt="img"
            src={avatarImg}
            className="mt-3"
            style={{ width: "100px", borderRadius: "50%" }}
          ></img>

          <div className="phone-info mb-2">
            <FontAwesomeIcon icon={faPhone} />
          </div>
        </div>
        <div className="box-border mt-4 ">
          <p style={{ fontSize: "20px", fontWeight: "700" }}>Tin nổi bật</p>
        </div>
        <div className="box-border mt-4 ">
          <p style={{ fontSize: "20px", fontWeight: "700" }}>
            Kết quả tương tự
          </p>
        </div>
      </div>
    </div>
  );
}
