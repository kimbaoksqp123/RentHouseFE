import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "react-slideshow-image/dist/styles.css";
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
  Spin,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { EditHouseContext } from "./edit";
import { serveURL } from "../../constants/index";

const formItemLayout = {
  labelCol: {
    xs: { span: 5 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 24, offset: 1 },
  },
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function UtilityEdit() {
  const {
    houseID,
    type,
    title,
    district,
    ward,
    address,
    land_area,
    price,
    description,
    bedroom_num,
    bathroom_num,
    coordinates,
    imageAlbum,
    utilities,
    setUtilities
  } = useContext(EditHouseContext);

  console.log(utilities);

  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [listUtility, setListUtility] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleChange = (index) => ({ fileList: newFileList }) => {
    const newImageFileLists = [...fileList];
    newImageFileLists[index] = newFileList;
    setFileList(newImageFileLists);

    const currentUtilities = form.getFieldValue("utilities");

    const updatedUtilities = newImageFileLists.map((file, idx) => ({
      ...currentUtilities[idx],
      image: file && file.length > 0 ? file[0].originFileObj : null,
    }));

    form.setFieldsValue({ utilities: updatedUtilities });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Thêm</div>
    </div>
  );

  const [form] = Form.useForm();
  const token = localStorage.getItem("token");
  const addUtility = () => {
    setUtilities([...utilities, {}]);
  };

  const removeUtility = (index) => {
    const newUtilities = [...utilities];
    newUtilities.splice(index, 1);
    setUtilities(newUtilities);

    const newImageFileLists = [...fileList];
    newImageFileLists.splice(index, 1);
    setFileList(newImageFileLists);

    form.setFieldsValue({
      utilities: fileList.map((file) => ({
        image: file && file.length > 0 ? file[0].originFileObj : null,
      })),
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      type: type,
      title: title,
      district: district,
      ward: ward,
      address: address,
      land_area: land_area,
      price: price,
      description: description,
      bedroom_num: bedroom_num,
      bathroom_num: bathroom_num,
      imageAlbum: imageAlbum,
      latitude: coordinates.lat,
      longitude: coordinates.lon,
    });
  }, [
    form,
    coordinates.lat,
    coordinates.lon,
    type,
    title,
    district,
    ward,
    address,
    land_area,
    price,
    description,
    bedroom_num,
    bathroom_num,
    imageAlbum,
  ]);

  useEffect(() => {
    const fetchUtilityData = async () => {
      try {
        const response = await axios.get(`${serveURL}utilities`);
        setListUtility(response.data);
      } catch (error) {
        console.error("Error fetching utility data:", error);
      }
    };

    fetchUtilityData();
  }, []);

  useEffect(() => {
    const initialFileList = utilities.map((utility, index) => {
      return utility.image
        ? [
            {
              uid: index,
              name: utility.image,
              status: "done",
              url: utility.image,
              image: utility.image,
            },
          ]
        : [];
    });
    setFileList(initialFileList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(fileList);

  const onFinish = async (values) => {
    setIsLoading(true);
    const newValues = {
      ...values,
      fileList: fileList,
      type: type,
      title: title,
      district: district,
      ward: ward,
      address: address,
      land_area: land_area,
      price: price,
      description: description,
      bedroom_num: bedroom_num,
      bathroom_num: bathroom_num,
      imageAlbum: imageAlbum,
      latitude: coordinates.lat,
      longitude: coordinates.lon,
    };
    console.log(newValues);
    try {
      const response = await axios.post(`${serveURL}posts/update/${houseID}`, newValues, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const house = response.data;
        const houseID = house.id;
        navigate(`/house/${houseID}`);
      }
    } catch (error) {
      console.error("Error sending data to API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="utilities mb-2">
      <Spin spinning={isLoading}>
        <Form {...formItemLayout} form={form} onFinish={onFinish}>
          {utilities.map((utility, index) => (
            <div
              key={index}
              className="utility rounded-lg border border-green-500 bg-white shadow-md p-4 mb-4"
            >
              <Form.Item name={["utilities", index, "id"]} label="ID" initialValue={utility.id} hidden></Form.Item>
              <Form.Item
                name={["utilities", index, "utility_id"]}
                initialValue={utility.utility_id}
                label="Kiểu tiện ích"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn kiểu tiện ích",
                  },
                ]}
              >
                <Select placeholder="Chọn tiện ích">
                  {listUtility.map((utility, index) => (
                    <Select.Option key={utility.id} value={utility.id}>
                      {utility.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={["utilities", index, "price"]}
                label="Chi phí(VNĐ)"
                initialValue={utility.price}
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
                      return Promise.reject(
                        "Giá thuê phải lớn hơn 0 hoặc bằng 0!"
                      );
                    },
                  },
                ]}
              >
                <Input placeholder="Chi chí trên 1 đơn vị tiện ích"></Input>
              </Form.Item>
              <Form.Item
                name={["utilities", index, "quantity"]}
                initialValue={utility.quantity}
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
              <Form.Item
                key={index}
                name={["utilities", index, "image"]}
                initialValue={utility.image}
                label="Ảnh"
                valuePropName="image"
              >
                <Upload
                  accept="image/*"
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList[index] || []}
                  onPreview={handlePreview}
                  beforeUpload={() => false}
                  onChange={handleChange(index)}
                >
                  {fileList[index]?.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-2.5 rounded"
                size="large"
                onClick={() => removeUtility(index)}
              >
                <GrSubtractCircle className="text-2xl" />
              </Button>
            </div>
          ))}
          <Space className="mt-3">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-2.5 rounded"
              size="large"
              onClick={addUtility}
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
      </Spin>
    </div>
  );
}
