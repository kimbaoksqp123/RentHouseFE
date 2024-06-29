import React, { useContext, useState, useEffect } from "react";
import "react-slideshow-image/dist/styles.css";
import { Form, Upload, Modal, Space, Input, Select, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { locationList } from "../../constants/locationList";
import getCoordinates from "../../apis/geocoding";
import { HouseContext } from "./index";

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

export default function BasicInformation() {
  const {
    setUserID,
    type,
    setType,
    title,
    setTitle,
    district,
    setDistrict,
    setWard,
    address,
    setAddress,
    land_area,
    setLandArea,
    price,
    setPrice,
    description,
    setDescription,
    bedroom_num,
    setBedroomNumber,
    bathroom_num,
    setBathroomNumber,
    setCoordinates,
    imageAlbum,
    setImageAlbum,
    setActiveKey,
  } = useContext(HouseContext);
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

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
  const [form] = Form.useForm();

  useEffect(() => {
    setUserID(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onFinish = async (values) => {
    // Log the form data for testing purposes
    // console.log("Received values from form:", values);
    setActiveKey('2');
    // console.log(
    //   userID,
    //   district,
    //   ward,
    //   type,
    //   address,
    //   imageAlbum,
    //   land_area,
    //   price
    // );
  };

  const handleDistrictChange = (value, district) => {
    setSelectedDistrict(district);
    setSelectedWard(null);
    form.setFieldValue({
      ward: null,
    });
    setDistrict(value);
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
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleGetCoordinates = async () => {
    try {
      const coords = await getCoordinates(address);
      setCoordinates(coords);
    } catch (error) {
      setCoordinates({ lat: "", lon: "" });
    }
  };

  const handleWardChange = (value, ward) => {
    setSelectedWard(ward);
    setWard(value);
  };


  return (
    <div className="basic_information">
      <Form {...formItemLayout} form={form} onFinish={onFinish}>
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
          <Select
            placeholder="Chọn kiểu trọ"
            value={type}
            onChange={(value) => setType(value)}
          >
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
          <Input
            placeholder="Nhập tiêu đề phòng trọ"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
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
          <Select
            placeholder="Quận/Huyện"
            value={district}
            onChange={handleDistrictChange}
          >
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
            value={selectedWard}
            onChange={handleWardChange}
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
              type: "number",
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
          <InputNumber
            placeholder="Nhập diện tích"
            className="w-40"
            value={land_area}
            onChange={(value) => setLandArea(value)}
          />
        </Form.Item>
        <Form.Item
          name="price"
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
                if (value > 0) {
                  return Promise.resolve();
                }
                return Promise.reject("Giá thuê phải lớn hơn 0!");
              },
            },
          ]}
        >
          <InputNumber
            placeholder="Nhập giá thuê"
            value={price}
            onChange={(value) => setPrice(value)}
            className="w-40"
          ></InputNumber>
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
          <TextArea
            placeholder="Nhập mô tả"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="bedroom_num"
          label="Số phòng ngủ"
          rules={[
            {
              type: "number",
              message: "Số phòng ngủ là chữ số",
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
                return Promise.reject("Số phòng ngủ phải lớn hơn 0!");
              },
            },
          ]}
        >
          <InputNumber
            placeholder="Nhập số phòng ngủ"
            min={0}
            max={10}
            className="w-40"
            value={bedroom_num}
            onChange={(value) => setBedroomNumber(value)}
          />
        </Form.Item>
        <Form.Item
          name="bathroom_num"
          label="Số phòng tắm"
          rules={[
            {
              type: "number",
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
            value={bathroom_num}
            onChange={(value) => setBathroomNumber(value)}
          />
        </Form.Item>
        <Form.Item
          name="imageAlbum"
          label="Album ảnh"
          valuePropName="fileList"
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
              // type="submit"
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
