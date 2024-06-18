import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { useEffect, useState } from "react";
import { Form, DatePicker, Space, Input, ConfigProvider, Upload } from "antd";
import { toast } from "react-toastify";
import { serveURL } from "../../constants/index";
import { getUserInfo } from "../../apis/getUser";
import { UploadOutlined } from '@ant-design/icons';


import moment from "moment";
import "moment/locale/vi"; // Import locale cho moment.js
import locale from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

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

export default function CreateContract() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const tenantID = sessionStorage.getItem("tenantID");
  const houseID = sessionStorage.getItem("houseID");
  const [tenantInfo, setTenantInfo] = useState(null);

  useEffect(() => {
    const fetchTenantInfo = async () => {
      if (tenantID) {
        try {
          const data = await getUserInfo(tenantID, token);
          setTenantInfo(data);
        } catch (error) {
          console.error("Error fetching tenant information:", error);
        }
      }
    };

    fetchTenantInfo();
  }, [tenantID, token]);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      tenantID: tenantID,
    });
  }, [form, tenantID]);

  useEffect(() => {
    form.setFieldsValue({
      houseID: houseID,
    });
  }, [form, houseID]);
  const onFinish = async (values) => {
    // Log the form data for testing purposes
    console.log("Received values from form:", values);

    // You can send the form data to your API using Axios
    try {
      const response = await axios.post(
        `${serveURL}request_view_houses/store`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response from the API as needed

      if (response.status === 200) {
        // Show success message
        toast.success("Đặt lịch thành công");

        // Redirect to the tab utilities register page
        navigate(`/house/${houseID}`);
      }
    } catch (error) {
      // Handle errors
      console.error("Error sending data to API:", error);
    }
  };

  // Thiết lập locale cho moment.js
  moment.locale("vi");

  return (
    <div className="create_request_view_house">
      <ConfigProvider locale={locale}>
        <Form {...formItemLayout} form={form} onFinish={onFinish}>
          <h4>A. Thông tin bên cho thuê</h4>
          <div className="rent_infor">
            <Form.Item name="rent_name" label="Tên">
              <Input disabled placeholder={user?.name} />
            </Form.Item>
            <Form.Item name="rent_address" label="Địa chỉ">
              <Input disabled placeholder={user?.address} />
            </Form.Item>
            <Form.Item name="rent_phone" label="Số ĐT">
              <Input disabled placeholder={user?.phone} />
            </Form.Item>
            <Form.Item name="rent_cccd_number" label="Số CCCD">
              <Input disabled placeholder={user?.cccd_number} />
            </Form.Item>
          </div>
          <h4>B. Thông tin bên thuê</h4>
          <Form.Item name="tenant_name" label="Tên">
              <Input disabled placeholder={tenantInfo?.name} />
            </Form.Item>
            <Form.Item name="tenant_address" label="Địa chỉ">
              <Input disabled placeholder={tenantInfo?.address} />
            </Form.Item>
            <Form.Item name="tenant_phone" label="Số ĐT">
              <Input disabled placeholder={tenantInfo?.phone} />
            </Form.Item>
            <Form.Item name="tenant_cccd_number" label="Số CCCD">
              <Input disabled placeholder={tenantInfo?.cccd_number} />
            </Form.Item>
            <h4>C. Nội dung hợp đồng</h4>
          <Form.Item name="tenantID" label="Tenant ID" hidden></Form.Item>
          <Form.Item name="houseID" label="House ID" hidden></Form.Item>
          <Form.Item
            name="start_date"
            label="Thời gian bắt đầu"
            rules={[
              {
                required: true,
                message: "Hãy chọn thời gian bắt đầu hợp đồng",
              },
              {
                validator: (_, value) => {
                  if (value && dayjs(value).isAfter(dayjs())) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Thời gian phải sau thời điểm hiện tại"
                  );
                },
              },
            ]}
          >
            <Space direction="vertical" size={14}>
              <DatePicker
                renderExtraFooter={() => ""}
                format="DD/MM/YYYY"
                onChange={(value) => {
                  if (value)
                    form.setFieldValue(
                      "start_date",
                      dayjs(value).format("YYYY-MM-DD")
                    );
                }}
              />
            </Space>
          </Form.Item>

          <Form.Item
            name="end_date"
            label="Thời gian kết thúc"
            rules={[
              {
                required: true,
                message: "Hãy chọn thời gian kết thúc hợp đồng",
              },
              {
                validator: (_, value) => {
                  if (value && dayjs(value).isAfter(dayjs())) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Thời gian phải sau thời điểm hiện tại"
                  );
                },
              },
            ]}
          >
            <Space direction="vertical" size={14}>
              <DatePicker
                renderExtraFooter={() => ""}
                format="DD/MM/YYYY"
                onChange={(value) => {
                  if (value)
                    form.setFieldValue(
                      "end_date",
                      dayjs(value).format("YYYY-MM-DD")
                    );
                }}
              />
            </Space>
          </Form.Item>

          <Form.Item
            name="file"
            label="File đính kèm"
            rules={[
              {
                required: true,
                message: "Hãy tải lên file đính kèm",
              },
            ]}
          >
            
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 10,
            }}
          >
            <Space>
              <button
                className="w-16 ml-2 bg-green-500 hover:bg-green-600 text-white py-2 px-2.5 rounded text-base"
                type="submit"
              >
                Gửi
              </button>
            </Space>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
}
