import React from "react";
import axios from "axios";
import "react-slideshow-image/dist/styles.css";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Form, Upload, Modal, Space, Input, Select, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { locationList } from "../../constants/locationList";
import { serveURL } from "../../constants/index";
import getCoordinates from '../../apis/geocode';

const { TextArea } = Input;

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

export default function BasicInformation({ sendDataToParent }) {
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState();
  // const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imageAlbum, setImageAlbum] = useState([]);
  const [currenTab, setCurrenTab] = useState(0);
  const [houseID, setHouseID] = useState();
  // const [sendData, setSendData] = useState({ currenTab: 0, houseID: null });

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

  const handleImageAlbum = ({ fileList: newFileList }) => {
    setImageAlbum(newFileList);
    form.setFieldsValue({
      imageAlbum: newFileList.map((file) => file.originFileObj),
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
        Upload
      </div>
    </div>
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user.id : null;
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
        // Redirect to the tab utilities register page
        const houseId = response.data.id;
        setHouseID(houseId);
        setCurrenTab(1);
        // navigate(`/house/${houseId}`);
      }
    } catch (error) {
      // Handle errors
      console.error("Error sending data to API:", error);
    }
  };

  useEffect(() => {
    // Set dữ liệu cho sendData
    sendDataToParent({ currenTab, houseID });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenTab, houseID]);

  const handleDistrictChange = (value, district) => {
    setSelectedDistrict(district);
    setSelectedWard(null);
    form.setFieldValue({
      ward: null,
    });
  };

  useEffect(() => {
    if (!selectedDistrict) {
      setWards("");
    } else {
      let wardList = locationList
        .find((item) => item.name === selectedDistrict.value)
        ?.wards.map((item) => {
          return item.name;
        });
      setWards(wardList);
    }
  }, [selectedDistrict]);

  const wardArray = Object.values(wards);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleGetCoordinates = async () => {
    try {
      const coords = await getCoordinates(address);
      setCoordinates(coords);   
    } catch (error) {
      setCoordinates({ lat: '', lon: '' });
    }
  };

  useEffect(() => {
    // Set the initial values when the component mounts
    form.setFieldsValue({
      latitude: coordinates.lat,
      longitude: coordinates.lon,
    });
  }, [form, coordinates.lat, coordinates.lon]); 

  

 

  const handleWardChange = (value, ward) => {
    setSelectedWard(ward);
  };

  return (
    <div className="basic_information">
      <Form {...formItemLayout} form={form} onFinish={onFinish}>
        <Form.Item name="userID" label="User ID" hidden></Form.Item>
        <Form.Item
          name="type"
          label="Kiểu nhà trọ"
          rules={[
            {
              required: true,
              message: "Hãy chọn kiểu phòng trọ",
            },
          ]}
        >
          <Select placeholder="Chọn kiểu trọ">
            <Select.Option value="1">Phòng trọ</Select.Option>
            <Select.Option value="2">Nhà nguyên căn</Select.Option>
            <Select.Option value="3">Chung cư Mini</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[
            {
              required: true,
              message: "Hãy nhập tiêu đề phòng trọ",
            },
          ]}
        >
          <Input placeholder="Nhập tiêu đề phòng trọ"></Input>
        </Form.Item>

        <Form.Item
          name="district"
          label="Quận/Huyện"
          rules={[
            {
              required: true,
              message: "Hãy chọn quận/huyện",
            },
          ]}
        >
          <Select placeholder="Quận/Huyện" onChange={handleDistrictChange}>
            {locationList.map((location) => (
              <Select.Option key={location.code} value={location.name}>
                {location.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="ward"
          label="Phường/Xã"
          rules={[
            {
              required: true,
              message: "Hãy chọn Phường/Xã",
            },
          ]}
        >
          <Select
            id="ward"
            placeholder="Chọn Phường/Xã"
            onChange={handleWardChange}
            value={selectedWard}
          >
            {wardArray.map((ward, index) => (
              <Select.Option key={index} value={ward}>
                {ward}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Hãy nhập địa chỉ phòng trọ",
            },
          ]}
        >
          <Input
            placeholder="Nhập địa chỉ"
            value={address}
            onChange={handleAddressChange}
            onBlur={handleGetCoordinates}
          ></Input>
        </Form.Item>
        <Form.Item
          name="land_area"
          label="Diện tích"
          rules={[
            {
              required: true,
              message: "Hãy nhập diện tích",
            },
            {
              type: "interger",
              message: "Diện tích phải là chữ số",
            },
            {
              validator: (_, value) => {
                if (value > 0) {
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
          name="price"
          label="Giá thuê(VNĐ)"
          rules={[
            {
              type: "interger",
              message: "Giá thuê là chữ số",
            },
            {
              required: true,
              message: "Hãy nhập Giá thuê!",
            },
            {
              validator: (_, value) => {
                if (value > 0) {
                  return Promise.resolve();
                }
                return Promise.reject("Giá thuê phải lớn hơn 0!");
              },
            },
          ]}
        >
          <Input placeholder="Nhập giá thuê"></Input>
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[
            {
              required: true,
              message: "Hãy nhập mô tả",
            },
          ]}
        >
          {/* <Input placeholder="Nhập mô tả"></Input> */}
          <TextArea placeholder="Nhập mô tả" rows={4} />
        </Form.Item>
        <Form.Item
          name="bedroom_num"
          label="Số phòng ngủ"
          rules={[
            {
              type: "interger",
              message: "số phòng ngủ là chữ số",
            },
            {
              required: true,
              message: "Hãy nhập số phòng ngủ!",
            },
            {
              validator: (_, value) => {
                if (value >= 0) {
                  return Promise.resolve();
                }
                return Promise.reject("số phòng ngủ phải lớn hơn 0!");
              },
            },
          ]}
        >
          <InputNumber
            placeholder="Nhập số phòng ngủ"
            min={0}
            max={10}
            className="w-40"
          />
        </Form.Item>
        <Form.Item
          name="bathroom_num"
          label="Số phòng tắm"
          rules={[
            {
              type: "interger",
              message: "Số phòng tắm là chữ số",
            },
            {
              required: true,
              message: "Hãy nhập Số phòng tắm!",
            },
            {
              validator: (_, value) => {
                if (value >= 0) {
                  return Promise.resolve();
                }
                return Promise.reject("Số phòng tắm phải lớn hơn 0!");
              },
            },
          ]}
        >
          <InputNumber
            placeholder="Nhập Số phòng tắm"
            min={0}
            max={10}
            className="w-40"
          />
        </Form.Item>
        <Form.Item
          name="imageAlbum"
          label="Album ảnh"
          valuePropName="imageAlbum"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && value.length >= 4) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Vui lòng tải lên ít nhất 4 ảnh!")
                );
              },
            }),
          ]}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={imageAlbum}
            onPreview={handlePreview}
            onChange={handleImageAlbum}
            beforeUpload={() => false}
          >
            {imageAlbum.length >= 10 ? null : uploadButton}
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
        <Form.Item name="latitude" label="Kinh độ" hidden></Form.Item>
        <Form.Item name="longitude" label="Vĩ độ" hidden></Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 10,
          }}
        >
          <Space>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-2.5 rounded"
              type="submit"
              style={{ fontSize: "large" }}
            >
              Tiếp theo
            </button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
